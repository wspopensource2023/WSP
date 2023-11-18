import re
from tools.sensitive_words import sensitive_words
from third_party.aliyun_green import *

def has_sensitive_word(text: str) -> bool:
    if not text:
        return False
    for word in sensitive_words:
        pattern = re.compile(word, re.IGNORECASE)
        if pattern.search(text):
            return True
    return False

# 当被标记为有违规标签，且置信度大于80时，返回True
def has_sensitive_image(image_url: str) -> bool:
    green = AliyunGreen(image_url)
    res = green.checkImage()
    for scene in res.result:
        if scene.label == 'nonLabel':
            continue
        if scene.confidence >= 80:
            return True
    return False