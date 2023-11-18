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


@router.post("/UpdateFollowState", name="修改喜欢状态")
def api_update_profile_follow(
    edge_profile_id: str = Body(embed=True),
    state: bool = Body(embed=True),
    account=Depends(get_current_account),
):
    account_id = account.get("account_id")
    if not account_id:
        raise ERR_INVALID_SESSION
    db.get_collection("follow").update_one(
        {"account_id": account_id, "edge_profile_id": edge_profile_id},
        get_mongodb_upsert_data(
            {
                "account_id": account_id,
                "edge_profile_id": edge_profile_id,
                "state": state,
            }
        ),
        upsert=True,
    )
    return STDResponse({})


@router.post("/GetFollowList", name="获取我喜欢的列表")
def api_get_follow_list(
    account=Depends(get_current_account),
    limit: int = Body(embed=True),
    skip: int = Body(embed=True),
):
    account_id = account.get("account_id")
    if not account_id:
        raise ERR_INVALID_SESSION

    if limit is None:
        limit = 10
    skip = skip - 1
    if skip is None:
        skip = 0

    skip = skip * limit

    follow_id_list = []
    for i in (
        db.get_collection("follow")
        .find({"account_id": account_id, "state": True})
        .sort("created_at", -1)
        .skip(skip)
        .limit(limit)
    ):
        follow_id_list.append(i.get("edge_profile_id"))
    total_count = db.get_collection("follow").count_documents(
        {"account_id": account_id, "state": True}
    )

    result = []
    for i in db.get_collection("profile").find({"profile_id": {"$in": follow_id_list}}):
        del i["_id"]
        result.append(i)

    return STDResponse(
        {"code": 0, "msg": "查询成功", "data": result, "total_count": total_count}
    )
