import unittest
from tools.audit import *

class TestAudit(unittest.TestCase):
    def test_has_sensitive_word(self):
        res = has_sensitive_word('我日你')
        self.assertEqual(res, True, "违规词")
        
    def test_has_sensitive_image(self):
        res = has_sensitive_image('http://static.xxxxxx.com/images/aliyun_green_test/sex.jpg')
        self.assertEqual(res, True, "违规图片")
        
    def test_has_sensitive_image2(self):
        res = has_sensitive_image('http://static.xxxxxx.com/images/aliyun_green_test/2.jpg')
        self.assertEqual(res, False, "正常图片")