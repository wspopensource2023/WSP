import copy
import datetime
import hashlib

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


@router.post("/VerifyIssuer")
def verify_issuer(
    account=Depends(get_current_account),
):
    """
    验证是否发行方
    """
    if account.get("issuer") is True:
        return STDResponse(data={"is_issuer": True})
    else:
        return STDResponse(data={"is_issuer": False})


@router.post("/CreateInvitationCode")
def create_invitation_code(
    account=Depends(get_current_account),
    count: int = Body(embed=True),
    condition_id: str = Body(embed=True),
    achievement_id: str = Body(embed=True),
):
    """
    创建邀请码

    collection invitation_code 包含下面字段:

    invitation_code
    condition_id
    achievement_id
    status: received, created # 领取状态
    receiver_account_id: '' # 领取者
    """
    account_id = account.get("account_id")
    if not account_id:
        raise ERR_INVALID_SESSION

    achievement = db.get_collection("achievement").find_one(
        {"achievement_id": achievement_id}
    )
    issuer_phone = achievement.get("issuer_phone", "")
    if issuer_phone != account["phone"]:
        return {"code": 1, "msg": "只有发行者才能创建邀请码"}
    achievement_total_count = achievement.get("issuance_quantity")

    current_invitation_count = db.get_collection("invitation_code").count_documents(
        {"achievement_id": achievement_id, "condition_id": condition_id}
    )

    if current_invitation_count + count > achievement_total_count:
        return {"code": 1, "msg": "邀请码数量超过发行数量"}

    if achievement_total_count - current_invitation_count < count:
        count = achievement_total_count - current_invitation_count

    uuid_list = []
    for i in range(count):
        time_str = str(int(time.time()))
        random_code = hashlib.md5(
            (time_str + str(uuid.uuid4())).encode("utf-8")
        ).hexdigest()
        uuid_list.append(random_code[:8])

    ctime = datetime.now()
    if db.get_collection("invitation_code").insert_many(
        [
            {
                "invitation_code": uu,
                "condition_id": condition_id,
                "achievement_id": achievement_id,
                "status": "created",
                "ctime": ctime,
            }
            for uu in uuid_list
        ]
    ):
        return {"code": 0, "msg": "创建成功", "data": uuid_list}

    return {"code": 1, "msg": "创建失败", "data": []}


@router.post("/VerifyInvitationCode")
def verify_invitation_code(
    request: Request,
    account_id: str = Body(embed=True),
    account_params: dict = Body(embed=True),
):
    """
    验证邀请码
    """
    s = request.headers.get("x-xxxxxx-condition-secret")
    if s != "f7bc1f75-86a9-42bc-a5c9-20ac095250cb":
        return {"code": 1, "status": "secret wrong"}

    if not account_id:
        raise ERR_INVALID_SESSION

    invitation_code = account_params.get("invitation_code", "")

    invitation_code_collection = invitation_code_db
    invitation_code_info = invitation_code_collection.find_one(
        {"invitation_code": invitation_code}
    )
    if not invitation_code_info:
        return STDResponse({"code": 1, "msg": "邀请码不存在"})
    if invitation_code_info.get("status") == "received":
        return STDResponse({"code": 1, "msg": "邀请码已被领取"})
    # upsert invitation_code status to received
    receive_time = datetime.now()
    if invitation_code_collection.update_one(
        {"invitation_code": invitation_code},
        {
            "$set": {
                "status": "received",
                "receive_time": receive_time,
                "receiver_account_id": account_id,
            }
        },
    ):
        return STDResponse({"code": 0, "msg": "验证成功"})
    else:
        return STDResponse({"code": 1, "msg": "验证失败"})


@router.post("/ListInvitationCode")
def list_invitation_code(
    account=Depends(get_current_account),
    achievement_id: str = Body(embed=True),
    condition_id: str = Body(embed=True),
    skip: int = Body(embed=True),
    limit: int = Body(embed=True),
    status: str = Body(None, embed=True),
):
    """
    issuer查询自己发行的邀请码

    """
    account_id = account.get("account_id")
    if not account_id:
        raise ERR_INVALID_SESSION
    if limit is None:
        limit = 10
    skip = skip - 1
    if skip is None:
        skip = 0
    skip = skip * limit

    achievement = db.get_collection("achievement").find_one(
        {"achievement_id": achievement_id}
    )
    issuer_phone = achievement.get("issuer_phone", "")
    if issuer_phone != account["phone"]:
        return {"code": 1, "msg": "只有发行者才能创建邀请码"}

    result = []
    if status:
        invitation_code_list = (
            invitation_code_db.find(
                {
                    "condition_id": condition_id,
                    "achievement_id": achievement_id,
                    "status": status,
                }
            )
            .skip(skip)
            .limit(limit)
        )

        total_count = invitation_code_db.count_documents(
            {
                "condition_id": condition_id,
                "achievement_id": achievement_id,
                "status": status,
            }
        )
    else:
        invitation_code_collection = invitation_code_db
        invitation_code_list = (
            invitation_code_collection.find(
                {"condition_id": condition_id, "achievement_id": achievement_id}
            )
            .skip(skip)
            .limit(limit)
        )
        total_count = invitation_code_db.count_documents(
            {"condition_id": condition_id, "achievement_id": achievement_id}
        )

    for i in invitation_code_list:
        del i["_id"]
        result.append(i)
    if invitation_code_list:
        return STDResponse(
            {"code": 0, "msg": "查询成功", "data": result, "total_count": total_count}
        )
    else:
        return STDResponse({"code": 1, "msg": "查询失败", "data": [], "total_count": 0})
