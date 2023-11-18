import json
import uvicorn
from fastapi import FastAPI, Request, Response, APIRouter
from pymongo.errors import DuplicateKeyError
from starlette.middleware.cors import CORSMiddleware
from service.service import router, get_current_account
import service.api_basic, service.api_sbt, service.api_profile, service.api_backend, service.api_feedback, service.api_condition, service.api_condition_weibo, service.api_condition_bilibili, service.api_condition_offline, service.api_account_3rd_binding, service.api_account_profile, service.api_profile_follow, service.api_wechat, service.api_condition_login
from third_party.aliyun_oss import upload_file, upload_local_file
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from prometheus_client import start_http_server, Counter, Histogram
import time
from service.log import logger
import traceback

c = Counter("request_count", "Total webapp request count", ["path", "status"])
h = Histogram("request_latency_seconds", "Description of histogram", ["path"])

app = FastAPI(
    title="Web3 Social Profile",
    openapi_url=None,
    docs_url=None,
    redoc_url=None,
    swagger_ui_oauth2_redirect_url=None,
)


def expose_openapi(app):
    s = json.dumps(app.openapi())
    with open("openapi.json", "w") as f:
        f.write(s)


class aiwrap:
    def __init__(self, obj):
        self._it = iter(obj)

    def __aiter__(self):
        return self

    async def __anext__(self):
        try:
            value = next(self._it)
        except StopIteration:
            raise StopAsyncIteration
        return value


@app.middleware("http")
async def monitor(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time

    resp_body = [section async for section in response.__dict__["body_iterator"]]
    # Repairing FastAPI response
    response.__setattr__("body_iterator", aiwrap(resp_body))

    if response.status_code != 200:
        try:
            resp_body = json.loads(resp_body[0].decode())
            if resp_body["code"] != 0:
                account_id = get_current_account(
                    request.headers.get("authorization").split(" ")[1]
                ).get("account_id")
                logger.info(resp_body, account_id)
        except Exception as e:
            resp_body = str(resp_body)
            logger.info("request url :", request.url.path)
            logger.info(resp_body, e)

    path = request.url.path
    status = response.status_code
    c.labels(path, status).inc()
    h.labels(path).observe(process_time)
    return response


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    error_fields = []
    for item in exc.errors():
        loc = item.get("loc", [])
        if len(loc) == 2:
            error_fields.append(loc[1])
    print("[validation_exception_handler]", exc)
    message = "参数错误：{}".format(", ".join(error_fields))
    return JSONResponse(
        status_code=200,
        content={"code": 422, "message": message},
        headers={"Access-Control-Allow-Origin": request.headers.get("origin", "")},
    )


@app.middleware("http")
def set_anonymous_header(request: Request, call_next):
    if "authorization" not in request.headers:
        request.headers.__dict__["_list"].append(
            (
                "authorization".encode(),
                "bearer anonymous".encode(),
            )
        )
    return call_next(request)


@app.middleware("http")
async def exception_handling(request: Request, call_next):
    try:
        return await call_next(request)
    except DuplicateKeyError as exc:
        key = next(iter(exc.details["keyPattern"].keys()))
        return JSONResponse(
            status_code=200,
            content={"code": 500, "message": f"{str(key)} 记录重复"},
            headers={"Access-Control-Allow-Origin": request.headers.get("origin", "")},
        )
    except Exception as exc:
        logger.error(f"exception_handling: {str(exc)}, {traceback.format_exc()}")
        return JSONResponse(
            status_code=200,
            content={"code": 500, "message": f"{str(exc)}"},
            headers={"Access-Control-Allow-Origin": request.headers.get("origin", "")},
        )


v1 = APIRouter()
v1.include_router(router, tags=["apis"])
app.include_router(v1, prefix="/v1")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
expose_openapi(app)
upload_local_file("./openapi.json", dirname="internal", file_name="openapi.json")
print("openapi uploaded")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=30001)
