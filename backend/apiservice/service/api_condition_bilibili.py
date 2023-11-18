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
from pyquery import PyQuery as pq
import jsonpath_ng


# parse
# https://m.bilibili.com/opus/803720614802096132?spm_id_from=444.41.0.0
# https://www.bilibili.com/opus/803720614802096132?spm_id_from=444.41.0.0
# https://t.bilibili.com/803720614802096132?spm_id_from=444.41.0.0
# to 803720614802096132
def get_bilibili_post_id_from_uri(uri):
    uri = urlunparse(urlparse(uri)._replace(query=None, fragment=None))
    if "//t.bilibili.com" in uri:
        pattern = r"t.bilibili.com/(\d+)$"
    else:
        pattern = r"bilibili.com/opus/(\d+)$"
    match = re.search(pattern, uri)
    if match:
        return match.group(1)
    return None


def get_bilibili_post_json_from_uri(uri):
    post_id = get_bilibili_post_id_from_uri(uri)
    request_uri = f"https://api.bilibili.com/x/polymer/web-dynamic/v1/detail?timezone_offset=-480&platform=h5&id={post_id}"
    response = requests.get(
        request_uri,
        headers={
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.66 Safari/537.36"
        },
    )
    return response.json()


def parse_bilibili_post_json(data):
    def parse_content(data):
        results = jsonpath_ng.parse("data.item.modules.module_dynamic.desc.text").find(
            data
        )
        if len(results) > 0:
            return results[0].value

    def parse_mid(data):
        results = jsonpath_ng.parse("data.item.modules.module_author.mid").find(data)
        if len(results) > 0:
            return results[0].value

    return {"id": str(parse_mid(data)), "content": parse_content(data)}


@router.post("/ConditionBilibiliTag")
def ConditionBilibiliTag(
    request: Request,
    account_id: str = Body(embed=True),
    issuer_params: dict = Body(embed=True),
    account_params: dict = Body(embed=True),
):
    s = request.headers.get("x-xxxxxx-condition-secret")
    if s != "825edb80-ab63-450d-97e6-f1ff93e59171":
        return {"code": 1, "status": "secret wrong"}
    bilibili_binding = get_bilibili_binding(account_id) or {}
    bound_bilibili_uid = bilibili_binding.get("bilibili_uid", "")
    if not bound_bilibili_uid:
        raise ERR_BILIBILI_UNBOUND
    tag = issuer_params.get("tag", "")
    post_uri = account_params.get("post_uri", "")
    parsed_bilibili_post = parse_bilibili_post_json(
        get_bilibili_post_json_from_uri(post_uri)
    )
    bilibili_content = parsed_bilibili_post.get("content", "")
    bilibili_uid = parsed_bilibili_post.get("id", "")
    target_str = f"#{tag}#"
    if target_str in bilibili_content and bound_bilibili_uid == bilibili_uid:
        return STDResponse({})
    return STDResponse({}, code=1)


def update_bilibili_binding(account_id: str, bilibili_uid: str):
    binding_db.update_one(
        {"account_id": account_id},
        get_mongodb_upsert_data(
            {"bilibili_uid": bilibili_uid, "account_id": account_id}
        ),
        upsert=True,
    )


def get_bilibili_binding(account_id: str):
    return binding_db.find_one({"account_id": account_id})
