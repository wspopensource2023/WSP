import pytest
from service.api_condition_bilibili import *
import jsonpath_ng

def test_get_bilibili_json_from_uri():
    assert get_bilibili_post_id_from_uri("https://m.bilibili.com/opus/803720614802096132?spm_id_from=444.41.0.0") == '803720614802096132'
    assert get_bilibili_post_id_from_uri("https://www.bilibili.com/opus/803720614802096132?spm_id_from=444.41.0.0") == '803720614802096132'
    parsed_bilibili_post = parse_bilibili_post_json(
            get_bilibili_post_json_from_uri('https://www.bilibili.com/opus/803720614802096132?spm_id_from=444.41.0.0')
        )
    assert parsed_bilibili_post['id'] == '28763589'
    assert parsed_bilibili_post['content'] == '春花秋月何时了'
    