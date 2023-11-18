import copy

from service.service import *
from service.audit import audit_account_profile
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


@router.post("/GetAccountProfile", name="get backend overview")
def get_account_profile(
    account_id: str = Body(embed=True),
):
    account = db.get_collection("account").find_one({"account_id": account_id})
    if not account:
        return {"code": 1, "msg": "account not exist"}
    result = {
        "account_id": account.get("account_id"),
        "account_name": account.get("name"),
        "account_avatar": account.get("avatar"),
        "account_desc": account.get("desc"),
        "account_banner": account.get("banner"),
        "issuer": account.get("issuer"),
        "register_time": account.get("created_at"),
    }
    return {"code": 0, "data": result}


@router.post("/UpdateAccountProfile", name="get backend overview")
def update_account_profile(
    account=Depends(get_current_account),
    name: str = Body(None, embed=True),
    avatar: str = Body(None, embed=True),
    desc: str = Body(None, embed=True),
    banner: str = Body(None, embed=True),
):
    account_id = account.get("account_id")
    if not account_id:
        raise ERR_INVALID_SESSION

    # ok, err = audit_account_profile(name, avatar, desc, banner)
    # if not ok:
    #     return err

    update_params = {}
    if name:
        update_params["name"] = name
    if avatar:
        update_params["avatar"] = avatar
    if desc:
        update_params["desc"] = desc
    if banner:
        update_params["banner"] = banner

    if account_db.update_one({"account_id": account_id}, {"$set": update_params}):
        return {"code": 0}
    else:
        return {"code": 1}


def get_issuers_map(issuers):
    issuer_map = {}

    for i in db.get_collection("account").find({"account_id": {"$in": issuers}}):
        issuer_map[i.get("account_id")] = i
    return issuer_map


@router.post("/ListAccountCampaign", name="用户参与的活动列表")
def list_account_campaign(
    account_id: str = Body(embed=True),
    limit: int = Body(embed=True),
    skip: int = Body(embed=True),
):
    """
    用户参与的活动列表
    """
    if limit is None:
        limit = 10
    skip = skip - 1
    if skip is None:
        skip = 0
    skip = skip * limit

    cursor = (
        db.get_collection("account_achievement")
        .find({"account_id": account_id})
        .sort("receive_time", -1)
        .skip(skip)
        .limit(limit)
    )
    if not cursor:
        return {"code": 0, "data": [], "total": 0}
    items = []
    achievement_ids = []

    for i in cursor:
        i.pop("_id")
        items.append(i)
        achievement_ids.append(i.get("achievement_id"))

    cursor = db.get_collection("achievement").find(
        {"achievement_id": {"$in": achievement_ids}}
    )
    achievement_map = {}
    for i in cursor:
        i.pop("_id")
        achievement_map[i.get("achievement_id")] = i
    issuer_list = []
    for i in items:
        i["campaign_image"] = achievement_map.get(i.get("achievement_id")).get(
            "achievement_image"
        )
        i["campaign_name"] = achievement_map.get(i.get("achievement_id")).get(
            "achievement_name"
        )
        i["issuer_account_id"] = achievement_map.get(i.get("achievement_id")).get(
            "issuer_account_id"
        )
        issuer_list.append(
            achievement_map.get(i.get("achievement_id")).get("issuer_account_id")
        )

    issuer_map = get_issuers_map(issuer_list)
    for i in items:
        i["issuer_name"] = issuer_map.get(i.get("issuer_account_id")).get("name")
        i["issuer_avatar"] = issuer_map.get(i.get("issuer_account_id")).get("avatar")

    total = db.get_collection("account_achievement").count_documents(
        {"account_id": account_id}
    )
    return {"code": 0, "data": items, "total": total}


@router.post("/ListAccountCampaignIssued", name="发行发发行的活动列表")
def list_account_campaign_issued(
    account_id: str = Body(embed=True),
    limit: int = Body(embed=True),
    skip: int = Body(embed=True),
):
    """
    发行发发行的活动列表
    """

    if limit is None:
        limit = 10
    skip = skip - 1
    if skip is None:
        skip = 0
    skip = skip * limit

    cursor = (
        db.get_collection("campaign")
        .find({"issuer_account_id": account_id})
        .sort("create_time", -1)
        .skip(skip)
        .limit(limit)
    )
    if not cursor:
        return {"code": 0, "data": [], "total": 0}
    items = []
    for i in cursor:
        i.pop("_id")
        items.append(i)
    total = db.get_collection("campaign").count_documents(
        {"issuer_account_id": account_id}
    )
    account = db.get_collection("account").find_one({"account_id": account_id})
    if not account:
        return {"code": 1, "msg": "account not exist"}
    for i in items:
        i["issuer_name"] = account.get("name")
        i["issuer_avatar"] = account.get("avatar")
    return {"code": 0, "data": items, "total": total}
