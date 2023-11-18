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


@router.post("/GetRealParams", name="get real params")
def get_real_params(
    scene=Depends(get_current_account),
):
    return STDResponse({"achievement_id": "13d96475-e2b8-46e5-8b9d-af10a408c85f"})


@router.post("/GetBackendOverview", name="get backend overview")
def get_backend_overview(
    limit: int = Body(embed=True),
    skip: int = Body(embed=True),
    account=Depends(get_current_account),
):
    homie(account)
    if limit is None:
        limit = 10
    if skip is None:
        skip = 0
    skip = skip - 1

    cursor = account_db.find({}).sort("updated_at", -1).skip(skip * limit).limit(limit)

    if not cursor:
        return Response({})
    items = []
    for i in cursor:
        i.pop("_id")
        i["updated_at"] = time.strftime(
            "%Y-%m-%d %H:%M:%S", time.localtime(i["updated_at"])
        )
        items.append(i)

    total_count = db.get_collection("profile").count_documents({})
    return {"code": 0, "data": items, "total": total_count}


@router.post("/block", name="后台拉黑")
def ban(
    profile_id: str = Body(embed=True),
    reason: str = Body(embed=True),
    account=Depends(get_current_account),
):
    homie(account)
    profile_db.update_one(
        {"profile_id": profile_id}, {"$set": {"status": 1, "reason": reason}}
    )
    return {"code": 0}


@router.post("/remove", name="后台拉白")
def black_list_removed(
    profile_id: str = Body(embed=True),
    account=Depends(get_current_account),
):
    homie(account)
    profile_db.update_one({"profile_id": profile_id}, {"$set": {"status": 0}})
    return {"code": 0}


@router.post("/UpdateAchievement")
def update_achievement(
    account=Depends(get_current_account),
    achievement_id: str = Body(embed=True),
    achievement_image: str = Body(None, embed=True),
    issuance_start_time: str = Body(None, embed=True),
    issuance_end_time: str = Body(None, embed=True),
    issuance_quantity: int = Body(None, embed=True),
    achievement_name: str = Body(None, embed=True),
    achievement_introduction: str = Body(None, embed=True),
    issuer_account_id: str = Body(None, embed=True),
    prize: str = Body(None, embed=True),
    contact_address: str = Body(None, embed=True),
):
    """
    后台创建修改，管理员后台创建

    achievement_image 成就图片地址
    issuance_start_time 发行开始日志
    issuance_end_time 发行结束日期
    issuance_quantity 发行数量
    achievement_name 成就名字
    achievement_introduction 成就介绍
    issuer_phone 发行人手机号
    prize： 奖品, sbt

    contact_address 合约地址

    库存字段建表验证：
    https://www.mongodb.com/docs/manual/core/schema-validation/specify-json-schema/#std-label-schema-validation-json
    """
    homie(account)

    if not achievement_id:
        return {"code": 1, "msg": "achievement_id is required"}

    l = []
    for i in db.get_collection("campaign").find(
        {"campaign_type": "achievement", "achievement_ids": {"$in": [achievement_id]}}
    ):
        l.append(i)

    if len(l) == 1:
        campaign_id = l[0]["campaign_id"]
        db.get_collection("campaign").update_one(
            {"campaign_id": campaign_id},
            {
                "$set": {
                    "campaign_name": achievement_name,
                    "campaign_image": achievement_image,
                }
            },
        )

    if db.get_collection("achievement").update_one(
        {"achievement_id": achievement_id},
        {
            "$set": {
                "achievement_image": achievement_image,
                "issuance_start_time": issuance_start_time,
                "issuance_end_time": issuance_end_time,
                "issuance_quantity": issuance_quantity,
                "achievement_name": achievement_name,
                "achievement_introduction": achievement_introduction,
                "issuer_account_id": issuer_account_id,
                "prize": prize,
                "contact_address": contact_address,
            }
        },
    ):
        return {"code": 0, "msg": "update success"}
    else:
        return {"code": 1, "msg": "update failed"}
