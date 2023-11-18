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
import requests
from dao.model import *
from service.log import logger
import uuid


@router.post("/CreateConditionTemplate")
def create_condition_template(
    account=Depends(get_current_account),
    condition_name: str = Body(embed=True),
    condition_description: str = Body(embed=True),
    detection_condition_api: str = Body(embed=True),
):
    """
    创建条件模板

    模版名、描述
    执行条件检测的api
    """

    homie(account)
    condition_template_db.insert_one(
        {
            "condition_template_id": str(uuid.uuid4()),
            "condition_name": condition_name,
            "condition_description": condition_description,
            "detection_condition_api": detection_condition_api,
            "condition_secret": str(uuid.uuid4()),
        }
    )
    return {"code": 0}


@router.post("/ListConditionTemplate")
def list_condition_template(
    account=Depends(get_current_account),
    limit: int = Body(embed=True),
    skip: int = Body(embed=True),
    keyword: str = Body(None, embed=True),
):
    """
    列出所有条件模板
    """
    homie(account)
    if limit is None:
        limit = 10
    skip = skip - 1
    if skip is None:
        skip = 0
    skip = skip * limit

    if not keyword:
        condition_template = condition_template_db.find().skip(skip).limit(limit)
    else:
        query = {"condition_name": {"$regex": re.compile(keyword)}}
        condition_template = condition_template_db.find(query).skip(skip).limit(limit)
    l = []
    for i in condition_template:
        del i["_id"]
        l.append(i)
    return {"code": 0, "data": l}


@router.post("/CreateAchievementCondition")
def create_achievement_condition(
    account=Depends(get_current_account),
    achievement_id: str = Body(embed=True),
    condition_template_id: str = Body(embed=True),
    issuer_params: str = Body(embed=True),
):
    """
    创建条件绑定到成就 achievement_condition 表
    """
    homie(account)
    achievement_condition_db.insert_one(
        {
            "achievement_id": achievement_id,
            "condition_template_id": condition_template_id,
            "issuer_params": issuer_params,
            "create_time": datetime.now(),
        }
    )
    return {"code": 0}


@router.post("/ListAchievementCondition")
def list_achievement_condition(
    account=Depends(get_current_account),
    skip: int = Body(embed=True),
    limit: int = Body(embed=True),
):
    """
    列出所有条件绑定到成就 achievement_condition 表
    """
    homie(account)
    if limit is None:
        limit = 10
    skip = skip - 1
    if skip is None:
        skip = 0
    skip = skip * limit
    l = []
    total = achievement_condition_db.count_documents({})

    ach_con = (
        achievement_condition_db.find().skip(skip).limit(limit).sort("create_time", -1)
    )
    achievement_id_list = []
    condition_template_id_list = []

    for i in ach_con:
        l.append(i)
        achievement_id_list.append(i["achievement_id"])
        condition_template_id_list.append(i["condition_template_id"])
    achievement_id_list = list(set(achievement_id_list))
    condition_template_id_list = list(set(condition_template_id_list))

    ach_map = db.get_collection("achievement").find(
        {"achievement_id": {"$in": achievement_id_list}}
    )
    ach_map = {i["achievement_id"]: i["achievement_name"] for i in ach_map}
    con_map = db.get_collection("condition_template").find(
        {"condition_template_id": {"$in": condition_template_id_list}}
    )
    con_map = {i["condition_template_id"]: i["condition_name"] for i in con_map}
    result = []
    for i in l:
        del i["_id"]
        i["achievement_name"] = ach_map[i["achievement_id"]]
        i["condition_name"] = con_map[i["condition_template_id"]]
        result.append(i)

    return {"code": 0, "data": result, "total": total}


@router.post("/VerifyCondition")
def verify_condition(
    account=Depends(get_current_account),
    achievement_id: str = Body(embed=True),
    condition_id: str = Body(embed=True),
    account_params: dict = Body(embed=True),
):
    """
    验证条件是否满足
    """
    account_id = account["account_id"]
    achievement_condition = achievement_condition_db.find_one(
        {"achievement_id": achievement_id, "condition_template_id": condition_id}
    )
    if achievement_condition is None:
        return STDResponse(code=1, msg="成就不存在", data={})
    condition_template_id = achievement_condition["condition_template_id"]
    template = condition_template_db.find_one(
        {"condition_template_id": condition_template_id}
    )
    if template is None:
        return STDResponse(code=1, msg="模板不存在！", data={})
    detection_condition_api = template["detection_condition_api"]
    issuer_param = achievement_condition.get("issuer_params", "{}")
    body = {
        "account_id": account_id,
        "issuer_params": json.loads(issuer_param),
        "account_params": account_params,
    }
    secret_key = template["condition_secret"]
    headers = {"x-xxxxxx-condition-secret": secret_key}
    r = requests.post(detection_condition_api, json=body, headers=headers)
    if r.status_code == 200 and r.json().get("code") == 0:
        achievement_condition_status_db.update_one(
            {
                "achievement_id": achievement_id,
                "account_id": account_id,
                "condition_template_id": condition_template_id,
            },
            {"$set": {"status": "finished"}},
            upsert=True,
        )
        return STDResponse(code=0, msg="验证成功！", data={})
    else:
        return STDResponse(code=1, msg="验证失败！", data={})
