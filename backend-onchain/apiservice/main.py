import json
import uvicorn
from fastapi import FastAPI, Request, Response, APIRouter
from pymongo.errors import DuplicateKeyError
from starlette.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from prometheus_client import start_http_server, Counter, Histogram
import time
from service.logging import logger
import traceback
import service.api_wallet
import service.service

app = FastAPI(
    title='Web3 Social Profile',
    openapi_url=None,
    docs_url=None,
    redoc_url=None,
    swagger_ui_oauth2_redirect_url=None,
)

def expose_openapi(app):
    s = json.dumps(app.openapi())
    with open("openapi.json", "w") as f:
        f.write(s)

v1 = APIRouter()
v1.include_router(service.service.router, tags=["apis"])
app.include_router(v1, prefix='/v1')
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
expose_openapi(app)

if __name__ == '__main__':
    uvicorn.run(app, host="0.0.0.0", port=7000)
