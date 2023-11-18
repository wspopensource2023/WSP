import time
from datetime import datetime, timedelta
from typing import Union
from fastapi import (
    Depends,
    APIRouter,
)
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from eth_account import Account
import random
import config
import uuid
import string
from jose import JWTError, jwt
from dao.mongo import *
from dao.model import *
from tools.qrcode import *
from service.log import logger
import re

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

router = APIRouter()

ERR_ONLY_PREMIUM_CAN_UPLOAD_VIDEO = Exception('上传视频是会员权益哦')
ERR_SHARE_LINK_NOT_FOUND_IN_USER_DESCRIPTION = Exception("用户简介中没有找到分享链接")
ERR_PROFILE_NOT_FOUND = Exception("数字身份不存在")
ERR_PLATFORM_NOT_SUPPORTED = Exception("不受支持的平台")
ERR_CONTAINS_PREMIUM_CONTENT = Exception("包含会员才能使用的内容")
ERR_INVALID_PARAMS = Exception("参数错误")
ERR_INVALID_SMS_CODE = Exception("无效的验证码")
ERR_INVALID_SESSION = Exception("无效的登录状态，请重新登录")
ERR_TOO_MANY_PROFILES = Exception("免费用户最多只能创建2个数字身份")
ERR_INVALID_PROFILE_SLUG = Exception("个性域名格式错误，只能包含字母和数字，长度6-18位")
ERR_SENSITIVE_AVATAR = Exception("头像包含敏感内容")
ERR_SENSITIVE_NICKNAME = Exception("昵称包含敏感内容")
ERR_SENSITIVE_DESC = Exception("简介包含敏感内容")
ERR_SENSITIVE_BANNER = Exception("背景图包含敏感内容")
ERR_INVALID_FILE_TYPE = Exception("不支持的文件类型")
ERR_INVALID_PROFILE_ID = Exception("无效的数字身份ID")
ERR_NOT_PERMITTED = Exception("没有权限操作这个数字身份")
ERR_WECHAT_INVALID_CODE = Exception("未知的微信Code码")
ERR_WECHAT_INVALID_WeChatAS = Exception("未知的WeChatAppID或者WeChatAppSecret")
ERR_CAN_NOT_QUERY_OTHERS = Exception("只能查询你的数据")
ERR_BADGE_NOT_EXISTS = Exception("徽章不存在")
ERR_ACHIEVEMENT_NOT_START = Exception("活动尚未开始")
ERR_ALREADY_HAVE_BADGE = Exception("已经领取")
ERR_ACHIEVEMENT_END = Exception("活动已经结束")
ERR_STOCK_EMPTY = Exception("库存不足")
ERR_INVALID_INVITE_CODE = Exception("无效的邀请码或者已经到达邀请上限")
ERR_UNKNOWN_SLUG = Exception("未知的个性域名")
ERR_WEIBO_UNBOUND = Exception("尚未绑定微博")
ERR_BILIBILI_UNBOUND = Exception("尚未绑定bilibili")
ERR_CAMPAIGN_NOT_EXISTS = Exception("活动不存在")


def is_whitelist_relation(name: str, edge_name: str):
    pairs = [
        ["同学", "同学"],
        ["朋友", "朋友"],
        ["同事", "同事"],
        ["学生", "老师"],
        ["男友", "女友"],
        ["丈夫", "妻子"],
        ["家人", "家人"],
    ]
    for item in pairs:
        p0 = item[0]
        p1 = item[1]
        if p0 == name and p1 == edge_name:
            return True
        if p1 == name and p0 == edge_name:
            return True
    return False


def homie(account):
    """
    homie ?
    """
    phone = account.get("phone")
    if not phone:
        raise ERR_INVALID_SESSION
    if not is_admin_phone(phone):
        raise ERR_INVALID_SESSION


def is_admin_phone(phone: str):
    return phone in [
    ]


def validate_profile_slug(profile_id, slug):
    if slug == profile_id:
        return True
    return re.match("^[a-zA-Z0-9\-]{6,18}$", slug)


def generate_uuid():
    return str(uuid.uuid4())


def generate_random_string(length):
    letters_and_digits = string.ascii_letters + string.digits
    return "".join(random.choice(letters_and_digits) for i in range(length))


def generate_ethereum_account():
    ethereum_account = Account.create()
    ethereum_account_private_key = ethereum_account.key.hex()
    ethereum_account_address = ethereum_account.address
    return {
        "account": ethereum_account,
        "private_key": ethereum_account_private_key,
        "address": ethereum_account_address,
    }


def generate_sms_code():
    code = ""
    for i in range(6):
        code += str(random.randint(1, 9))
    return code


def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
        to_encode, config.JWTSecretKey, algorithm=config.JWTAlgorithm
    )
    return encoded_jwt


def get_timestamp():
    return int(time.time())


def get_mongodb_upsert_data(data: dict):
    timestamp = get_timestamp()
    data["updated_at"] = timestamp
    return {
        "$set": data,
        "$setOnInsert": {"created_at": timestamp},
    }


def list_account_profiles(account_id: str):
    return get_list_from_cursor(
        profile_db.find({"account_id": account_id, "deleted_at": 0}).sort(
            [("created_at", 1)]
        )
    )


def count_account_profiles(account_id: str):
    return profile_db.count_documents({"account_id": account_id, "deleted_at": 0})


def get_list_from_cursor(cursor):
    if not cursor:  # todo: 检查[]是否是false
        return []
    data = []
    for item in cursor:
        del item["_id"]
        data.append(item)
    return data


def validate_sms_code(phone: str, sms_code: str):
    print("validate_sms_code", phone, sms_code)
    if is_admin_phone(phone) and sms_code == "000000":
        return True
    sms = sms_code_db.find_one({"phone": phone})
    if sms:
        stored_sms_code = sms.get("code")
        updated_at = int(sms.get("updated_at"))
        if (
            time.time() - updated_at < config.AliYunSmsCodeExpiration
            and stored_sms_code == sms_code
        ):
            return True
    return False


def get_share_qrcode(slug: str, avatar: str):
    path = "https://m.xxxxxx.com/" + slug
    share_qrcode = get_qrcode(path, avatar)
    return share_qrcode


def get_current_account(token: str = Depends(oauth2_scheme)):
    if token == "anonymous":
        return {}
    try:
        payload = jwt.decode(
            token, config.JWTSecretKey, algorithms=[config.JWTAlgorithm]
        )
        account_id: str = payload.get("sub")
        if account_id is None:
            return {}
    except JWTError as e:
        return {}
    account = account_db.find_one({"account_id": account_id})
    if account is None:
        return {}
    del account["_id"]
    return dict(account)


def search_profiles_from_slug(slug: str):
    profiles = get_list_from_cursor(
        profile_db.find(
            {"slug": {"$regex": re.compile(slug, re.IGNORECASE)}, "deleted_at": 0},
        ).limit(10)
    )
    if not profiles:
        return []
    # move the exact match to the first
    for i in range(len(profiles)):
        if profiles[i]["slug"] == slug:
            profiles.insert(0, profiles.pop(i))
            break
    return profiles


def add_upload_files(account_id: str, file_type: str, file_path: str):
    upload_files_db.insert_one(
        {
            "account_id": account_id,
            "file_type": file_type,
            "file_path": file_path,
            "created_at": get_timestamp(),
        }
    )


def STDResponse(data, code=0, msg=""):
    return {"code": code, "msg": msg, "data": data}


def STDPaginationResponse(data, count=0):
    return {
        "code": 0,
        "data": {
            "items": data,
            "count": count,
        },
    }
