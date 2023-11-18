from service.service import *
from fastapi import (
    Form,
    Depends,
    UploadFile,
    HTTPException,
    status,
    Body,
    APIRouter,
    Request,
    Response,
)
from dao.model import *
from service.log import logger
import uuid
from urllib.parse import urlparse, urlunparse
import requests


# parse
# https://m.weibo.cn/status/N3L8lokkk
# https://weibo.com/6300207081/N3L8lokkk
# to N3L8lokkk
def get_weibo_post_id_from_uri(uri):
    def parse_pc(uri):
        pattern = r"weibo.com/\d+/(\w+)$"
        match = re.search(pattern, uri)
        if match:
            return match.group(1)
        return None

    def parse_mobile(uri):
        pattern = r"m.weibo.cn/status/(\w+)$"
        match = re.search(pattern, uri)
        if match:
            return match.group(1)
        return None

    uri = urlunparse(urlparse(uri)._replace(query=None, fragment=None))
    parsed_id = parse_pc(uri)
    if parsed_id:
        return parsed_id
    return parse_mobile(uri)


def get_weibo_post_json_from_uri(uri):
    post_id = get_weibo_post_id_from_uri(uri)
    request_uri = f"https://weibo.com/ajax/statuses/show?id={post_id}"
    response = requests.get(
        request_uri,
        headers={
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.66 Safari/537.36"
        },
    )
    return response.json()


def update_weibo_binding(account_id: str, weibo_uid: str):
    binding_db.update_one(
        {"account_id": account_id},
        get_mongodb_upsert_data({"weibo_uid": weibo_uid, "account_id": account_id}),
        upsert=True,
    )


def get_weibo_binding(account_id: str):
    return binding_db.find_one({"account_id": account_id})


@router.post("/ConditionWeiboTag")
def ConditionWeiboTag(
    request: Request,
    account_id: str = Body(embed=True),
    issuer_params: dict = Body(embed=True),
    account_params: dict = Body(embed=True),
):
    s = request.headers.get("x-xxxxxx-condition-secret")
    if s != "84af2783-9048-4a8a-a948-a7e8faa48887":
        return {"code": 1, "status": "secret wrong"}
    weibo_binding = get_weibo_binding(account_id) or {}
    bound_weibo_uid = weibo_binding.get("weibo_uid", "")
    if not bound_weibo_uid:
        raise ERR_WEIBO_UNBOUND
    tag = issuer_params.get("tag", "")
    post_uri = account_params.get("post_uri", "")
    weibo_json = get_weibo_post_json_from_uri(post_uri)
    weibo_content = weibo_json.get("text_raw", "")
    weibo_uid = weibo_json.get("user", {}).get("idstr", "")
    target_str = f"#{tag}#"
    if target_str in weibo_content and bound_weibo_uid == weibo_uid:
        return STDResponse({})
    return STDResponse({}, code=1)
