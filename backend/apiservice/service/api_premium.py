import enum
from dao.model import *
from service.service import *
import time
from fastapi import (
    Depends,
    Body,
)
import third_party.scrape

class PremiumType(enum.Enum):
    INACTIVE = "INACTIVE"
    MONTH_BILLING = "MONTH_BILLING"
    YEAR_BILLING = "YEAR_BILLING"
    CONTRIBUTOR = "CONTRIBUTOR"

class PremiumStatus(BaseModel):
    premium_type: PremiumType = PremiumType.INACTIVE
    expired_at: int = 0

    def is_activated(self):
        if self.premium_type == PremiumType.INACTIVE:
            return False
        return time.time() < self.expired_at

def get_profile_premium_contents(profile: ProfileCRD):
    if not profile or not profile.spec:
        return None
    content = []
    if profile.spec.style:
        if profile.spec.style.get("profile.background.mode") == "video":
            content.append('视频背景')
    return content


@router.post("/ActivatePremiumBySocialMediaDesc", name="通过社交媒体账号的简介来激活会员")
def api_activate_premium_by_social_media_desc(
        account=Depends(get_current_account), 
        profile_id: str = Body(embed=True, default=''),
        platform: str = Body(embed=True, default=''), 
        uid: str = Body(embed=True, default=''),
    ):
    if platform not in ['weibo', 'zhihu', 'xiaohongshu', 'bilibili']:
        raise ERR_PLATFORM_NOT_SUPPORTED
    account_id = account.get("account_id")
    if not account_id:
        raise ERR_INVALID_SESSION
    profile_row = profile_db.find_one({
        "account_id": account_id,
        "profile_id": profile_id, 
        "deleted_at": 0,
    })
    profile = ProfileCRD.parse_raw(profile_row.get("profile"))
    if not profile:
        raise ERR_PROFILE_NOT_FOUND
    user_description = third_party.scrape.get_user_description(platform, uid)
    link = f'xxxxxx.com/{profile.spec.slug}'
    logger.info(f'[api_activate_premium_by_social_media_desc] 检测 |{user_description}| 是否包含 |{link}|')
    if link not in user_description:
        raise ERR_SHARE_LINK_NOT_FOUND_IN_USER_DESCRIPTION
    profile_id = profile.spec.profileId
    premium_social_media_desc.update_one(
        {"account_id": account_id},
        get_mongodb_upsert_data(
            {
                "account_id": account_id,
                "profile_id": profile_id,
                'platform': platform,
                platform: uid,
            }
        ),
        upsert=True,
    )
    account_db.update_one(
        {"account_id": account_id},
        get_mongodb_upsert_data(
            {
                "account_id": account_id,
                "premium_status": {
                    'premium_type': PremiumType.CONTRIBUTOR.value,
                    'expired_at': (time.time() + 365 * 86400)
                },
            }
        ),
        upsert=True,
    )