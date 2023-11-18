from tools.audit import *
from service.service import *

def audit_profile(profile: object):
    if has_sensitive_image(profile.spec.avatar):
        return False, ERR_SENSITIVE_AVATAR
    # if has_sensitive_word(profile.json()):
    #     return False, ERR_SENSITIVE_NICKNAME
    if has_sensitive_word(profile.spec.description):
        return False, ERR_SENSITIVE_DESC
    return True, None

def audit_account_profile(avatar: str, name: str, desc: str, banner: str):
    if has_sensitive_word(name):
        return False, ERR_SENSITIVE_NICKNAME
    
    if has_sensitive_word(desc):
        return False, ERR_SENSITIVE_DESC
    
    if has_sensitive_image(avatar):
        return False, ERR_SENSITIVE_AVATAR
    
    if has_sensitive_image(banner):
        return False, ERR_SENSITIVE_BANNER
    return True, None