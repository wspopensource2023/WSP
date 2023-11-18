import pytest
from service.api_condition_weibo import *

def test_get_weibo_post_json_from_uri():
    assert len(get_weibo_post_json_from_uri("https://weibo.com/6300207081/N3L8lokkk").get('text_raw', '')) != 0

def test_get_weibo_post_id_from_uri():
    # Test cases for weibo.com URLs
    assert get_weibo_post_id_from_uri("https://weibo.com/6300207081/N3L8lokkk") == "N3L8lokkk"
    assert get_weibo_post_id_from_uri("https://weibo.com/6300207081/N3L8lokkk?from=page_100505_profile&wvr=6&mod=weibotime") == "N3L8lokkk"
    assert get_weibo_post_id_from_uri("https://weibo.com/123456789/N3L8lokkk#aaaa") == "N3L8lokkk"
    assert get_weibo_post_id_from_uri("https://weibo.com/123456789/N3L8lokkk") == "N3L8lokkk"
    assert get_weibo_post_id_from_uri("https://weibo.com/6300207081/") == None
    assert get_weibo_post_id_from_uri("https://weibo.com/6300207081") == None
    assert get_weibo_post_id_from_uri("https://weibo.com/u/6300207081") == None
    assert get_weibo_post_id_from_uri("https://weibo.com/") == None
    
    # Test cases for m.weibo.cn URLs
    assert get_weibo_post_id_from_uri("https://m.weibo.cn/status/N3L8lokkk") == "N3L8lokkk"
    assert get_weibo_post_id_from_uri("https://m.weibo.cn/status/N3L8lokkk?jumpfrom=weibocom") == "N3L8lokkk"
    assert get_weibo_post_id_from_uri("https://m.weibo.cn/status/123456789") == "123456789"
    assert get_weibo_post_id_from_uri("https://m.weibo.cn/") == None
    assert get_weibo_post_id_from_uri("https://m.weibo.cn") == None
    assert get_weibo_post_id_from_uri("https://m.weibo.cn/u/123456789") == None
    
    # Test case for unsupported URL format
    assert get_weibo_post_id_from_uri("https://www.google.com/") == None