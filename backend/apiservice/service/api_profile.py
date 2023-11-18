from service.audit import audit_profile
from tools.wxwork_bot import *
from service.service import *
from service.api_premium import *
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
from third_party import scrape
import config
from typing import Optional

@router.post("/Me", name="获取自己的信息")
def api_get_account(account=Depends(get_current_account), without_profiles: bool = Body(embed=True, default=False)):
    account_id = account.get("account_id")
    if not account_id:
        raise ERR_INVALID_SESSION
    profiles = []
    if not without_profiles:
        profile_rcs = list_account_profiles(account_id)
        profiles = get_profile_list_from_db_records(profile_rcs)

    bind = account_3rd_binding_db.find_one({"account_id": account_id})
    if bind:
        del bind["_id"]
        del bind["account_id"]
    premium_status = PremiumStatus(**account.get('premium_status', {}))  
    return STDResponse(
        {
            "account_id": account_id,
            "wallet_address": account.get("wallet_address"),
            "profiles": profiles,
            "bind": bind,
            "avatar": account.get("avatar"),
            "name": account.get("name"),
            "banner": account.get("banner"),
            "desc": account.get("desc"),
            "premium_status": premium_status,
            "is_premium_activated": premium_status.is_activated()
        }
    )


@router.post("/GetProfileByID", name="根据ID获取Profile")
def api_get_profile(profile_id: str = Body(embed=True), account=Depends(get_current_account)):
    if not profile_id:
        raise ERR_INVALID_PROFILE_ID
    account_id = account.get("account_id")
    if not account_id:
        raise ERR_INVALID_SESSION
    profile = profile_db.find_one({"account_id": account_id, "profile_id": profile_id, "deleted_at": 0})
    if not profile:
        raise ERR_INVALID_PROFILE_ID
    return STDResponse({"profile": ProfileCRD.parse_raw(profile.get("profile"))})


def get_profile_list_from_db_records(profile_rcs):
    if profile_rcs:
        return [ProfileCRD.parse_raw(profile.get("profile")) for profile in profile_rcs]
    return []


@router.post("/GetProfile", name="获取用户的Profile信息")
def api_get_profile(slug: str = Body(embed=True)):
    profile = profile_db.find_one({"slug": slug, "deleted_at": 0})
    if not profile:
        raise ERR_INVALID_PROFILE_ID
    return STDResponse({"profile": ProfileCRD.parse_raw(profile.get("profile"))})



@router.post("/DeleteProfile", name="删除Profile")
def api_get_profile(profile_id: str = Body(embed=True)):
    profile = profile_db.find_one({"profile_id": profile_id, "deleted_at": 0})
    if not profile:
        raise ERR_INVALID_PROFILE_ID
    profile_db.update_one(
        {"profile_id": profile_id},
        get_mongodb_upsert_data({"deleted_at": int(time.time()), "slug": profile_id}),
        upsert=True,
    )
    return STDResponse({})


@router.post("/GetProfileShareQRImage", name="获取Profile分享二维码")
def api_get_profile_share_image(
    profile_id: str = Body(embed=True), account=Depends(get_current_account)
):
    profile = profile_db.find_one({"profile_id": profile_id, "deleted_at": 0})
    if not profile:
        raise ERR_INVALID_PROFILE_ID
    image_uri = config.AliYunOssFileBaseURI +  profile.get("share_qrcode")
    return STDResponse({"image_uri": image_uri})


@router.post("/UpdateProfile", name="上传用户Profile配置")
def api_save_profile(
    profile: ProfileCRD = Body(embed=True), account=Depends(get_current_account)
):
    account_id = account.get("account_id")
    if not account_id:
        raise ERR_INVALID_SESSION
    profile_id = profile.spec.profileId
    existed_profile = None
    premium_status = PremiumStatus(**account.get('premium_status', {})) 
    is_premium_activated = premium_status.is_activated()
    has_premium_content = get_profile_premium_contents(profile)
    if not is_premium_activated and has_premium_content:
        raise ERR_CONTAINS_PREMIUM_CONTENT
    if not profile_id:
        if count_account_profiles(account_id) > 2 and not is_premium_activated:
            raise ERR_TOO_MANY_PROFILES
        profile_id = generate_uuid()
        profile.spec.profileId = profile_id
    else:
        existed_profile = profile_db.find_one({"profile_id": profile_id})
        if not existed_profile:
            raise ERR_INVALID_PROFILE_ID
        if existed_profile.get("account_id") != account_id:
            raise ERR_NOT_PERMITTED
        if existed_profile.get("deleted_at") > 0:
            raise ERR_INVALID_PROFILE_ID
    if not profile.spec.slug:
        profile.spec.slug = profile_id
    if not validate_profile_slug(profile_id, profile.spec.slug):
        raise ERR_INVALID_PROFILE_SLUG

    # ok, err = audit_profile(profile)
    # if not ok: 
    #     raise err

    profile.spec.accountId = account_id

    avatar = profile.spec.avatar

    slug = profile.spec.slug

    share_qrcode = ""
    if existed_profile:
        existed_profile_slug = existed_profile.get("slug", "")
        existed_profile_crd = ProfileCRD.parse_raw(existed_profile.get("profile"))
        slug_updated = existed_profile_slug != slug
        avatar_updated = existed_profile_crd.spec.avatar != avatar
        if (not slug_updated) and (not avatar_updated):
            share_qrcode = existed_profile.get("share_qrcode", "")

    if not share_qrcode:
        share_qrcode = get_share_qrcode(slug, avatar)
    profile_json = profile.json(exclude_none=True, exclude_unset=True)
    logger.debug(f"UpdateProfile: {account_id} {profile_id} {profile_json}")
    profile_db.update_one(
        {"profile_id": profile_id},
        get_mongodb_upsert_data(
            {
                "account_id": account_id,
                "profile_id": profile_id,
                "slug": slug,
                "profile": profile_json,
                "share_qrcode": share_qrcode,
                "deleted_at": 0,
            }
        ),
        upsert=True,
    )

    WXWorkBot(account_id).send_profile_update_msg()
    return STDResponse(
        {
            "profile_id": profile_id,
        }
    )


@router.post("/SearchProfile", name="搜索数字身份")
def api_search_profile(
    keywords: str = Body(embed=True),
):
    profile_rcs = search_profiles_from_slug(keywords.lower())
    profiles = get_profile_list_from_db_records(profile_rcs)
    return STDPaginationResponse(profiles, count=len(profiles))


@router.post("/AIGCWeiboCRD", name="生成微博的CRD")
def api_aigc_weibo_crd(
    uid: str = Body(embed=True), account=Depends(get_current_account)
):
    account_id = account.get("account_id")
    if not account_id:
        raise ERR_INVALID_SESSION
    if not uid:
        raise ERR_INVALID_PARAMS
    profile = scrape.scrape_weibo_profile(uid)
    return STDResponse(
        WeiboCRD(
            **{
                "apiVersion": "v1",
                "kind": CRD.Kind.Weibo,
                "spec": WeiboCRD.Spec(
                    **{
                        "uid": uid,
                        "title": profile.get("username") or uid,
                        "visible": True,
                        "icon": "weibo",
                        "subtitle": profile.get("description") or "暂无描述",
                        "url": profile.get("profile_uri", ""),
                        "style": {},
                    }
                ),
            }
        )
    )


@router.post("/AIGCXiaoHongShuCRD", name="生成小红书的CRD")
def api_aigc_xiaohongshu_crd(
    uid: str = Body(embed=True), account=Depends(get_current_account)
):
    account_id = account.get("account_id")
    if not account_id:
        raise ERR_INVALID_SESSION
    if not uid:
        raise ERR_INVALID_PARAMS
    profile = scrape.scrape_xiaohongshu_profile(uid)
    return STDResponse(
        XiaoHongShuCRD(
            **{
                "apiVersion": "v1",
                "kind": CRD.Kind.XiaoHongShu,
                "spec": XiaoHongShuCRD.Spec(
                    **{
                        "uid": uid,
                        "title": profile.get("nickname") or uid,
                        "visible": True,
                        "icon": "xiaohongshu",
                        "subtitle": profile.get("description") or "暂无描述",
                        "url": profile.get("profile_uri", ""),
                        "style": {},
                    }
                ),
            }
        )
    )


@router.post("/AIGCBilibiliCRD", name="生成哔哩哔哩的CRD")
def api_aigc_bilibili_crd(
    uid: str = Body(embed=True), account=Depends(get_current_account)
):
    account_id = account.get("account_id")
    if not account_id:
        raise ERR_INVALID_SESSION
    if not uid:
        raise ERR_INVALID_PARAMS
    profile = scrape.scrape_bilibili_profile(uid)
    return STDResponse(BilibiliCRD(
            **{
                "apiVersion": "v1",
                "kind": CRD.Kind.Bilibili,
                "spec": BilibiliCRD.Spec(
                    **{
                        "uid": uid,
                        "title": profile.get("username") or uid,
                        "visible": True,
                        "icon": "bilibili",
                        "subtitle": profile.get("description") or "暂无描述",
                        "url": profile.get("profile_uri", ""),
                        "style": {},
                    }
                ),
            }
        ))


@router.post("/AIGCZhiHuCRD", name="生成知乎的CRD")
def api_aigc_zhihu_crd(
    uid: str = Body(embed=True), account=Depends(get_current_account)
):
    account_id = account.get("account_id")
    if not account_id:
        raise ERR_INVALID_SESSION
    if not uid:
        raise ERR_INVALID_PARAMS
    profile = scrape.scrape_zhihu_profile(uid)
    return STDResponse(
        ZhiHuCRD(
            **{
                "apiVersion": "v1",
                "kind": CRD.Kind.ZhiHu,
                "spec": ZhiHuCRD.Spec(
                    **{
                        "uid": uid,
                        "title": profile.get("username") or uid,
                        "visible": True,
                        "icon": "zhihu",
                        "subtitle": profile.get("description") or "暂无描述",
                        "url": profile.get("profile_uri", ""),
                        "style": {},
                    }
                ),
            }
        )
    )
