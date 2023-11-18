import copy
from tools.wxwork_bot import WXWorkBot

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


@router.post("/GetCampaignDetail")
def campaign_detail(
    campaign_id: str = Body(embed=True),
):
    """
    获取活动详情
    """

    campaign = campaign_db.find_one({"campaign_id": campaign_id})
    # todo 返回活动列表

    if campaign:
        del campaign["_id"]
        return {"code": 0, "data": campaign}
    else:
        return {"code": 1, "data": "campaign not found"}


@router.post("/ListCampaign", name="获取活动列表")
def list_campaigns(
    skip: int = Body(embed=True),
    limit: int = Body(embed=True),
    campaign_type=Body(None, embed=True),
    issuer_account_id: str = Body(None, embed=True),
):
    if limit is None:
        limit = 10
    skip = skip - 1
    if skip is None:
        skip = 0

    skip = skip * limit
    l = []
    query_condition = {}
    if issuer_account_id:
        query_condition["issuer_account_id"] = issuer_account_id
    if campaign_type is None or campaign_type == "":
        cursor = (
            campaign_db.find(query_condition)
            .sort("create_time", -1)
            .skip(skip)
            .limit(limit)
        )
        total_count = db.get_collection("campaign").count_documents({})
    else:
        query_condition["campaign_type"] = campaign_type
        cursor = (
            campaign_db.find(query_condition)
            .sort("create_time", -1)
            .skip(skip)
            .limit(limit)
        )
        total_count = db.get_collection("campaign").count_documents(
            {"campaign_type": campaign_type}
        )
    issuer_account_ids = set()

    for i in cursor:
        del i["_id"]
        l.append(i)
        issuer_account_ids.add(i["issuer_account_id"])

    issuer = db.get_collection("account").find(
        {"issuer": True, "account_id": {"$in": list(issuer_account_ids)}}
    )
    issuer_dict = {}
    for i in issuer:
        issuer_dict[i["account_id"]] = i
    for i in l:
        i["issuer_name"] = issuer_dict.get(i["issuer_account_id"], "").get("name", "")
        i["issuer_avatar"] = issuer_dict.get(i["issuer_account_id"], "").get(
            "avatar", ""
        )
    return STDResponse({"total_count": total_count, "campaign_list": l})


@router.post("/ListAchievement", name="获取徽章活动列表")
def get_badge_list(
    limit: int = Body(embed=True),
    skip: int = Body(embed=True),
    keyword: str = Body(None, embed=True),
    issuer_account_id: str = Body(None, embed=True),
):
    if limit is None:
        limit = 10
    skip = skip - 1
    if skip is None:
        skip = 0
    skip = skip * limit
    l = []
    query_condition = {}
    if issuer_account_id:
        query_condition["issuer_account_id"] = issuer_account_id
    if not keyword:
        cursor = (
            achievement_db.find(query_condition)
            .skip(skip)
            .limit(limit)
            .sort("create_time", -1)
        )
    else:
        query_condition["achievement_name"] = {"$regex": keyword}
        cursor = (
            achievement_db.find(query_condition)
            .skip(skip)
            .limit(limit)
            .sort("create_time", -1)
        )
    for i in cursor:
        del i["_id"]
        l.append(i)
    total_count = db.get_collection("achievement").estimated_document_count()
    return STDResponse({"total_count": total_count, "achievement_list": l})


@router.post("/ListAchievementByCampaign")
def list_achievement_by_campaign(
    campaign_id: str = Body(embed=True),
):
    # 查询当前活动
    campaign_info = campaign_db.find_one({"campaign_id": campaign_id})
    if not campaign_info:
        raise ERR_CAMPAIGN_NOT_EXISTS
    # 查询所有成就
    id_list = campaign_info.get("achievement_ids", [])
    achievement_list = achievement_db.find(
        {"achievement_id": {"$in": id_list}}, {"_id": False}
    )

    return STDResponse(data=list(achievement_list))


@router.post("/CreateCampaign", name="后台创建活动")
def create_campaign(
    account=Depends(get_current_account),
    issuer_account_id: str = Body(embed=True),
    campaign_name: str = Body(embed=True),
    campaign_introduction: str = Body(embed=True),
    campaign_summary: str = Body(embed=True),
    campaign_image: str = Body(embed=True),
    campaign_tags: List[str] = Body(None, embed=True),
):
    """
    一个活动可以包含多个成就，只能有一个发行人

    issuer_phone 发行人
    campaign_name 活动名称
    campaign_introduction 活动介绍
    campaign_summary 活动概要
    campaign_image 活动图片

    campaign_type campaign or achievement
    """
    homie(account)
    campaign_id = uuid.uuid4()
    issuer = db.get_collection("account").find_one({"account_id": issuer_account_id})
    if not issuer:
        return {"code": 1, "data": "issuer not found"}

    campaign_db.insert_one(
        {
            "create_time": datetime.now(),
            "campaign_id": str(campaign_id),
            "campaign_name": campaign_name,
            "campaign_introduction": campaign_introduction,
            "campaign_image": campaign_image,
            "campaign_type": "campaign",
            "issuer_account_id": issuer_account_id,
            "campaign_summary": campaign_summary,
            "campaign_tags": campaign_tags,
        }
    )
    db.get_collection("account").update_one(
        {"account_id": issuer_account_id}, {"$set": {"issuer": True}}
    )
    return {"code": 0, "data": "success"}


@router.post("/CreateAchievement", name="后台创建成就，管理员后台创建")
def create_achievement(
    account=Depends(get_current_account),
    achievement_image: str = Body(embed=True),
    issuance_start_time: str = Body(embed=True),
    issuance_end_time: str = Body(embed=True),
    issuance_quantity: int = Body(embed=True),
    achievement_name: str = Body(embed=True),
    achievement_introduction: str = Body(embed=True),
    issuer_account_id: str = Body(embed=True),
    campaign_id: str = Body(None, embed=True),
    contract_address: str = Body(None, embed=True),
    achievement_summary: str = Body(embed=True),
    blockchain: str = Body(None, embed=True),
    achievement_tags: List[str] = Body(None, embed=True),
):
    """
    achievement_image 成就图片地址
    issuance_start_time 发行开始日志
    issuance_end_time 发行结束日期
    issuance_quantity 发行数量
    achievement_name 成就名字
    achievement_introduction 成就介绍
    campaign_id 活动id,一个活动可以包含多个成就
    issuer_account_id 发行人account id
    stock 库存
    contract_address 合约地址
    achievement_summary 成就概要
    blockchain 区块链类型

    库存字段建表验证：
    https://www.mongodb.com/docs/manual/core/schema-validation/specify-json-schema/#std-label-schema-validation-json
    """
    homie(account)

    issuer_info = db.get_collection("account").find_one(
        {"account_id": issuer_account_id}
    )
    if not issuer_info:
        return {"code": 1, "data": "issuer_account_id not exists"}

    achievement_id = str(uuid.uuid4())
    if not campaign_id:
        campaign_id = str(uuid.uuid4())
        campaign_db.insert_one(
            {
                "create_time": datetime.now(),
                "campaign_id": campaign_id,
                "campaign_image": achievement_image,
                "campaign_name": achievement_name,
                "achievement_ids": [achievement_id],
                "campaign_type": "achievement",
                "issuer_account_id": issuer_account_id,
                "campaign_summary": achievement_summary,
                "campaign_tags": achievement_tags,
            }
        )
    else:
        campaign_db.update_one(
            {"campaign_id": campaign_id},
            {"$addToSet": {"achievement_ids": achievement_id}},
        )

    if blockchain is None or blockchain == "":
        blockchain = "Conflux"

    achievement_db.insert_one(
        {
            "create_time": datetime.now(),
            "campaign_id": campaign_id,
            "achievement_image": achievement_image,
            "issuance_start_time": issuance_start_time,
            "issuance_end_time": issuance_end_time,
            "issuance_quantity": issuance_quantity,
            "achievement_name": achievement_name,
            "achievement_introduction": achievement_introduction,
            "stock": issuance_quantity,
            "achievement_id": str(achievement_id),
            "contract_address": contract_address,
            "issuer_account_id": issuer_account_id,
            "achievement_summary": achievement_summary,
            "blockchain": blockchain,
            "achievement_tags": achievement_tags,
        }
    )
    db.get_collection("account").update_one(
        {"account_id": issuer_account_id}, {"$set": {"issuer": True}}
    )
    return {"code": 0, "data": "success"}


@router.post("/CollectAchievement", name="领取徽章")
def get_badge(
    account=Depends(get_current_account),
    achievement_id: str = Body(embed=True),
):
    account_id = account.get("account_id")
    if not account_id:
        raise ERR_INVALID_SESSION

    # 校验徽章是否存在
    coll = db.get_collection("achievement")
    badge = coll.find_one({"achievement_id": achievement_id})
    if not badge:
        raise ERR_BADGE_NOT_EXISTS
    # 校验徽章是否在领取时间范围内
    now = datetime.now().timestamp()
    if (
        now
        < datetime.strptime(
            badge["issuance_start_time"], "%Y-%m-%d %H:%M:%S"
        ).timestamp()
    ):
        raise ERR_ACHIEVEMENT_NOT_START
    if (
        now
        > datetime.strptime(badge["issuance_end_time"], "%Y-%m-%d %H:%M:%S").timestamp()
    ):
        raise ERR_ACHIEVEMENT_END
    # 校验徽章是否有完成条件
    if not db.get_collection("achievement_condition").find_one(
        {"achievement_id": achievement_id}
    ):
        return {"code": 1, "data": "no condition"}
    if badge["stock"] == 0:
        raise ERR_STOCK_EMPTY
    # 校验徽章是否已经领取
    if account_achievement_db.find_one(
        {"account_id": account_id, "achievement_id": achievement_id}
    ):
        raise ERR_ALREADY_HAVE_BADGE
    # 条件完成检测
    achievement_condition_status = achievement_condition_status_db.find(
        {"account_id": account_id, "achievement_id": achievement_id}
    )
    for s in achievement_condition_status:
        if s["status"] != "finished":
            return {"code": 1, "data": "condition not completed"}
    try:
        coll.find_one_and_update(
            {"achievement_id": achievement_id}, {"$inc": {"stock": -1}}
        )
    except Exception as e:
        if e.code == 121:
            return {"code": 1, "data": "badge release completed"}
        else:
            return {"code": 1, "data": "sth error"}
    # display_index -1 不展示 0 - N 排序
    if account_achievement_db.insert_one(
        {
            "achievement_id": achievement_id,
            "account_id": account_id,
            "display_index": 0,
            "receive_time": datetime.now(),
            "onchain_time": 0,
        }
    ):
        WXWorkBot(account_id).send_collect_achievement_msg(badge["achievement_name"])

        return {"code": 0, "data": "success"}
    else:
        return {"code": 1, "data": "sth error"}


@router.post("/ListAchievementParticipant", name="根据活动获取参与的用户")
def get_user_by_badge(
    achievement_id: str = Body(embed=True),
    limit: int = Body(embed=True),
    skip: int = Body(embed=True),
):
    limit = 30
    skip = 0
    skip = skip * limit

    r = (
        db.get_collection("account_achievement")
        .find({"achievement_id": achievement_id})
        .skip(skip)
        .limit(limit)
    )
    account_id_list = [i["account_id"] for i in r]
    account_list = db.get_collection("account").find(
        {"account_id": {"$in": account_id_list}}
    )
    result = []
    for account in account_list:
        result.append(
            {
                "account_id": account["account_id"],
                "avatar": account["avatar"],
                "name": account["name"],
                "banner": account["banner"],
                "desc": account["desc"],
            }
        )
    total_count = db.get_collection("account_achievement").count_documents(
        {"achievement_id": achievement_id}
    )
    return STDResponse(data={"total_count": total_count, "data": result})


from typing import Optional


@router.post("/ListUserAchievement", name="获取某个用户所有的成就")
def get_badge_by_user(
    account=Depends(get_current_account),
    participant_account_id: Optional[str] = Body(embed=True),
    limit: int = Body(embed=True),
    skip: int = Body(embed=True),
):
    if limit is None:
        limit = 10
    skip = skip - 1
    if skip is None:
        skip = 0
    skip = skip * limit

    account_id = account.get("account_id")
    display = False
    if account_id == participant_account_id:
        display = True
    query_condition = {}
    if participant_account_id:
        query_condition["account_id"] = participant_account_id
    if display:
        r = (
            db.get_collection("account_achievement")
            .find(query_condition)
            .sort("receive_time", -1)
            .skip(skip)
            .limit(limit)
        )
    else:
        query_condition["display_index"] = {"$gte": 0}
        r = (
            db.get_collection("account_achievement")
            .find(query_condition)
            .sort("receive_time", -1)
            .skip(skip)
            .limit(limit)
        )

    achievement_id_list = [i["achievement_id"] for i in r]
    l = []
    for i in db.get_collection("achievement").find(
        {"achievement_id": {"$in": achievement_id_list}}
    ):
        del i["_id"]
        issuer = account_db.find_one(
            {
                "account_id": i["issuer_account_id"],
                "deleted_at": 0
            }
        )
        i['issuer'] = {
            'name': issuer['name'],
            'avatar': issuer['avatar'],
            'desc': issuer['desc']
        }
        l.append(i)
    total_count = db.get_collection("account_achievement").count_documents(
        {"account_id": participant_account_id}
    )
    data = {"total_count": total_count, "achievement_list": l}
    return STDResponse(data=data)


@router.post("/GetAchievement", name="获取成就详情")
def get_badge_summary(
    account=Depends(get_current_account),
    achievement_id: str = Body(embed=True),
):
    """
    根据用户和成就查询条件完成的状态
    """
    account_id = account.get("account_id")
    achievement_info = achievement_db.find_one({"achievement_id": achievement_id})
    if not achievement_info:
        raise ERR_BADGE_NOT_EXISTS
    del achievement_info["_id"]

    achievement_condition_list = achievement_condition_db.find(
        {"achievement_id": achievement_id}
    ).sort("_id")
    condition_list = copy.copy(list(achievement_condition_list))
    condition_template_id_list = [i["condition_template_id"] for i in condition_list]

    condition_template_list = condition_template_db.find(
        {"condition_template_id": {"$in": condition_template_id_list}}
    )

    condition_template_map = {}
    for condition_template in condition_template_list:
        condition_template_map[
            condition_template["condition_template_id"]
        ] = condition_template
        del condition_template["_id"]

    status_map = {}
    is_received = False
    if account_id:
        account_achievement = account_achievement_db.find_one(
            {"achievement_id": achievement_id, "account_id": account_id}
        )
        is_received = True if account_achievement else False
        status_list = achievement_condition_status_db.find(
            {"achievement_id": achievement_id, "account_id": account_id}
        )
        for s in status_list:
            status_map[s["condition_template_id"]] = s["status"]

    # todo 冗余代码，上面已经拿过一次account了
    issuer_info = db.get_collection("account").find_one(
        {"account_id": achievement_info["issuer_account_id"]}
    )
    if issuer_info:
        del issuer_info["_id"]
        del issuer_info["phone"]
    for condition in condition_list:
        condition["status"] = status_map.get(
            condition["condition_template_id"], "unfinished"
        )
        condition["condition_template"] = condition_template_map.get(
            condition["condition_template_id"]
        )

        if condition["condition_template"]:
            del condition["condition_template"]["condition_secret"]
            del condition["condition_template"]["detection_condition_api"]
        del condition["_id"]

    campaign_info = db.get_collection("campaign").find_one(
        {"campaign_id": achievement_info["campaign_id"]}
    )

    achievement_info["type"] = "achievement"
    if campaign_info.get("campaign_type") == "campaign":
        achievement_info["campaign_name"] = campaign_info["campaign_name"]
        achievement_info["campaign_introduction"] = campaign_info[
            "campaign_introduction"
        ]
        achievement_info["campaign_summary"] = campaign_info["campaign_summary"]
        achievement_info["campaign_image"] = campaign_info["campaign_image"]
        achievement_info["contain_achievement"] = len(campaign_info["achievement_ids"])
        achievement_info["type"] = "campaign"

    achievement_info["condition_list"] = condition_list
    achievement_info["is_received"] = is_received
    achievement_info["issuer"] = issuer_info if issuer_info else {}

    return STDResponse(data=achievement_info)


def validate_phone(phone: str):
    # todo 验证手机号从名片数据库中获取
    return re.compile("^1[2345678]\d{9}$").match(phone)
