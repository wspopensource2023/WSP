import json
import requests
import jsonpath
import pyquery
import re

def choose_candidates(items, min_char, max_char):
    scores = []
    for index, item in enumerate(items):
        score = 0
        if item:
            if len(item) >= min_char:
                score += 1
            if len(item) <= max_char:
                score += 1
        scores.append(score)
    return items[scores.index(max(scores))]


def get_jsonpath_string(data, path):
    result = jsonpath.jsonpath(data, path)
    if result and len(result) > 0:
        return result[0]
    return ''


def scrape_bilibili_fans(id: str):
    if not id:
        return {}
    try:
        uri = 'https://api.bilibili.com/x/relation/stat?jsonp=jsonp&vmid=' + id
        response = requests.get(uri, headers={
            'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
        })
        data = json.loads(response.text)
        follower = get_jsonpath_string(data, '$.data.follower')
        following = get_jsonpath_string(data, '$.data.following')
        return {
            'follower': follower,
            'following': following
        }
    except Exception:
        return {}


def scrape_bilibili_profile(id: str):
    if not id:
        return {}
    try:
        uri = 'https://api.bilibili.com/x/space/wbi/acc/info?mid=' + id
        response = requests.get(uri, headers={
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36 Edg/117.0.2045.47',
        })
        data = json.loads(response.text)
        username = get_jsonpath_string(data, '$.data.name')
        profile_image_url = get_jsonpath_string(data, '$.data.face')
        description = get_jsonpath_string(data, '$.data.sign')
        fans_data = scrape_bilibili_fans(id)
        return {
            'uid': id,
            'username': username,
            'profile_image_url': profile_image_url,
            'followers_count': fans_data.get('follower', 0),
            'description': description,
            'profile_uri': 'https://space.bilibili.com/' + id,
        }
    except Exception:
        return {}


def scrape_weibo_profile(id: str):
    if not id:
        return {}
    try:
        uri = 'https://m.weibo.cn/api/container/getIndex?type=uid&value=' + id
        response = requests.get(uri, headers={
            'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
        })
        data = json.loads(response.text)
        username = get_jsonpath_string(data, '$.data.userInfo.screen_name')
        profile_image_url = get_jsonpath_string(data, '$.data.userInfo.profile_image_url')
        followers_count = get_jsonpath_string(data, '$.data.userInfo.followers_count')
        description = get_jsonpath_string(data, '$.data.userInfo.description')
        return {
            'uid': id,
            'username': username,
            'profile_image_url': profile_image_url,
            'followers_count': followers_count,
            'description': description,
            'profile_uri': 'https://weibo.com/u/' + id,
        }
    except Exception:
        return {}


def scrape_xiaohongshu_profile(id: str):
    if not id:
        return {}
    try:
        uri = 'https://www.xiaohongshu.com/user/profile/' + id
        response = requests.get(uri, headers={
            'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
        })
        match = re.search(r'<script>window.__INITIAL_STATE__=(.+?)</script>', response.text)
        if not match:
            return {}
        document = json.loads( match.group(1))
        nickname = get_jsonpath_string(document, '$.profile.userInfo.nickname')
        description = get_jsonpath_string(document, '$.profile.userInfo.desc')
        images = 'https:' + get_jsonpath_string(document, '$.profile.userInfo.images')
        bannerImage = 'https:' + get_jsonpath_string(document, '$.profile.userInfo.bannerImage')
        follows = get_jsonpath_string(document, '$.profile.userInfo.follows')
        fans = get_jsonpath_string(document, '$.profile.userInfo.fans')
        likeAndCollect = get_jsonpath_string(document, '$.profile.userInfo.likeAndCollect')
        return {
            'nickname': nickname,
            'description': description,
            'images': images,
            'bannerImage': bannerImage,
            'follows': follows,
            'fans': fans,
            'likeAndCollect': likeAndCollect,
            'profile_uri': 'https://www.xiaohongshu.com/user/profile/' + id,
        }
    except Exception:
        return {}

def scrape_zhihu_profile(id: str):
    if not id:
        return {}
    try:
        uri = 'https://www.zhihu.com/people/' + id
        response = requests.get(uri, headers={
            'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
        })
        document = pyquery.PyQuery(response.text)
        data = json.loads(document.find('#js-initialData').text())
        json_doc = get_jsonpath_string(data, '$.initialState.entities.users.' + id)
        username = get_jsonpath_string(json_doc, '$.name')
        profile_image_url = get_jsonpath_string(json_doc, '$.avatarUrl')
        short_description = get_jsonpath_string(json_doc, '$.headline')
        long_desciption = get_jsonpath_string(json_doc, '$.description')
        followers_count = get_jsonpath_string(json_doc, '$.followerCount')
        return {
            'uid': id,
            'username': username,
            'profile_image_url': profile_image_url,
            'short_description': short_description,
            "long_desciption": long_desciption,
            "description": short_description or long_desciption,
            'followers_count': followers_count,
            'profile_uri': uri,
        }
    except Exception:
        return {}

def get_xiaohongshu_user_description(uid):
    profile = scrape_xiaohongshu_profile(uid)
    return profile.get('description')

def get_weibo_user_description(uid):
    profile = scrape_weibo_profile(uid)
    return profile.get('description')

def get_zhihu_user_description(uid):
    profile = scrape_zhihu_profile(uid)
    return profile.get('short_description', '') + ' ' + profile.get('long_desciption', '')

def get_bilibili_user_description(uid):
    profile = scrape_bilibili_profile(uid)
    return profile.get('description')

def get_user_description(platform, uid):
    platform = platform.lower()
    if platform == 'xiaohongshu':
        return get_xiaohongshu_user_description(uid)
    if platform == 'weibo':
        return get_weibo_user_description(uid)
    if platform == 'zhihu':
        return get_zhihu_user_description(uid)
    if platform == 'bilibili':
        return get_bilibili_user_description(uid)
    return ''

if __name__ == '__main__':
    # print('bilibili:', get_bilibili_user_description("10119428"))
    # print('zhihu:', get_zhihu_user_description("xxxxxx"))
    # print('xiaohongshu:', get_xiaohongshu_user_description("5abd0a4311be104d73bd4167"))
    # print('weibo:', get_weibo_user_description("7875501696"))

    print('bilibili', get_user_description('bilibili', '3546557857139682'))
    # print(get_user_description('zhihu', 'xxxxxx'))
    # print(get_user_description('xiaohongshu', '5abd0a4311be104d73bd4167'))
    # print(get_user_description('weibo', '7875501696'))