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
from .api_condition_weibo import get_weibo_post_json_from_uri, update_weibo_binding
from .api_condition_bilibili import (
    parse_bilibili_post_json,
    get_bilibili_post_json_from_uri,
    update_bilibili_binding,
)


@router.post("/ConditionWeiboBind")
def ConditionWeiboBind(
    account=Depends(get_current_account), account_params: dict = Body(embed=True)
):
    account_id = account["account_id"]
    post_uri = account_params.get("post_uri", "")
    weibo_json = get_weibo_post_json_from_uri(post_uri)
    weibo_content = weibo_json.get("text_raw", "")
    weibo_uid = weibo_json.get("user", {}).get("idstr", "")
    target_str = f" did:{account_id} "
    if target_str in weibo_content:
        account_3rd_binding_db.update_one(
            {"account_id": account_id}, {"$set": {"weibo_uid": weibo_uid}}, upsert=True
        )
        return STDResponse({})
    return STDResponse({}, code=1)


@router.post("/ConditionBilibiliBind")
def ConditionBilibiliBind(
    account=Depends(get_current_account), account_params: dict = Body(embed=True)
):
    account_id = account["account_id"]
    post_uri = account_params.get("post_uri", "")
    parsed_bilibili_post = parse_bilibili_post_json(
        get_bilibili_post_json_from_uri(post_uri)
    )
    bilibili_content = parsed_bilibili_post.get("content", "")
    bilibili_uid = parsed_bilibili_post.get("id", "")
    target_str = f" did:{account_id} "

    if target_str in bilibili_content:
        account_3rd_binding_db.update_one(
            {"account_id": account_id},
            {"$set": {"bilibili_uid": bilibili_uid}},
            upsert=True,
        )
        return STDResponse({})
    return STDResponse({}, code=1)
