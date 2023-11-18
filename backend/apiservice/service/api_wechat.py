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
import httpx
import config
import os
from third_party import aliyun_oss,wechat
from urllib.parse import urljoin
from service.api_basic import login

@router.post("/wechat/GetShareConfig", name="获取微信分享配置")
def api_get_weixin_share_signature(
    url: str = Body(embed=True),
):
    return STDResponse(wechat.SDK().get_share_signature(url))

@router.post("/mpcode/GetAchievementDetail", name="获取成就详情小程序码")
def api_get_weixin_mpcode(
    scene: str = Body(embed=True),
    path: str = Body(embed=True),
    env_version: str = Body(embed=True),
):
    
    access_token = wechat.SDK().get_mp_access_token()
    if not access_token:
        return {"code": 2, "data": ""}

    code_res = httpx.post(
        "%s/wxa/getwxacodeunlimit?"
        "access_token=%s" % (config.WeChatUrl, access_token),
        json={
            "page": path,
            "width": "300px",
            "scene": scene,
            "env_version": env_version,
            "check_path": False,
            "line_color": {"r": "0", "g": "0", "b": "0"},
        },
    )

    fileName = scene + ".png"

    filePath = os.getcwd() + "/tmp/weixinmpcode/achievementdetail/" + fileName
    print(filePath)
    f = open(filePath, "wb")
    f.write(code_res.read())
    f.close()
    oss_path = aliyun_oss.upload_local_file(
        filePath, fileName, dirname="images/weixinmpcode"
    )
    os.remove(filePath)
    print(config.AliYunOssFileBaseURI)
    image_url = urljoin(config.AliYunOssFileBaseURI, oss_path)
    print(image_url)
    return STDResponse({"image_uri": image_url})


@router.post("/GetWeixinMPCode", name="获取微信小程序码")
def api_get_weixin_mpcode(
    scene: str = Body(embed=True),
    path: str = Body(embed=True),
    uns: str = Body(embed=True),
):
    token_res = httpx.get(
        "%s/cgi-bin/token?appid=%s&secret=%s&grant_type=client_credential"
        % (config.WeChatUrl, config.WeChatAppID, config.WeChatAppSecret)
    )

    if token_res.status_code != 200:
        return {"code": 1, "data": "failed get access token err:%s" % token_res.read()}

    token_res = token_res.json()

    access_token = token_res.get("access_token", None)

    if not access_token:
        return {"code": 2, "data": ""}

    code_res = httpx.post(
        "%s/wxa/getwxacode?" "access_token=%s" % (config.WeChatUrl, access_token),
        json={
            "path": path,
            "width": "300px",
            "scene": scene,
            "line_color": {"r": "0", "g": "0", "b": "0"},
        },
    )
    fileName = uns + ".png"
    filePath = os.getcwd() + "/tmp/weixinmpcode/" + fileName
    f = open(filePath, "wb")
    f.write(code_res.read())
    f.close()
    oss_path = aliyun_oss.upload_local_file(
        filePath, fileName, dirname="images/weixinmpcode"
    )
    os.remove(filePath)
    return STDResponse({"image_uri": urljoin(config.AliYunOssFileBaseURI, oss_path)})


@router.post("/LoginByWeixinPhone", name="微信手机号登录")
def api_get_user_phone_number(code: str = Body(embed=True)):
    if code == "":
        raise ERR_WECHAT_INVALID_CODE
    if config.WeChatAppID == "" or config.WeChatAppSecret == "":
        raise ERR_WECHAT_INVALID_WeChatAS

    res = httpx.get(
        "%s/cgi-bin/token?"
        "appid=%s&secret=%s&grant_type=client_credential"
        % (config.WeChatUrl, config.WeChatAppID, config.WeChatAppSecret)
    )

    if res.status_code != 200:
        return {"code": 1, "data": "failed get access token err:%s" % res.read()}

    res = res.json()
    access_token = res.get("access_token", None)
    if not access_token:
        return {"code": 2, "data": ""}

    user_info = httpx.post(
        "%s/wxa/business/getuserphonenumber?access_token=%s"
        % (config.WeChatUrl, access_token),
        json={"code": code},
    )

    if user_info.status_code != 200:
        return user_info

    if user_info.json()["errcode"] != 0:
        return {"code": 3, "data": ""}

    # 获取到手机号后尝试直接登陆
    phone = user_info.json()["phone_info"]["phoneNumber"]
    return login(phone)


@router.get("/wechat/callback")
def wechat_callback(code: str = "", state: str = ""):
    """
    微信登陆回调接口
    :param code:
    :param state:
    :return:
    """

    token_info = httpx.post(
        "%s/sns/oauth2/access_token?appid=%s&secret=%s&code=%s&grant_type"
        "=authorization_code"
        % (config.WeChatUrl, config.WeChatWebAppID, config.WeChatWebSecret, code),
        json={"code": code},
    )

    if token_info.status_code != 200:
        return {"code": 1, "data": "failed get access token err:%s" % token_info.read()}

    res = token_info.json()
    access_token = res.get("access_token", None)
    openid = res.get("openid", None)
    if not access_token:
        return {"code": 2, "data": ""}

    user_info = httpx.get(
        "%s/sns/userinfo?access_token=%s&openid=%s"
        % (config.WeChatUrl, access_token, openid)
    )

    if user_info.status_code != 200:
        return {"code": 3, "data": "failed get user info err:%s" % user_info.read()}

    return user_info.json()
