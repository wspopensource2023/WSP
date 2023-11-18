import unittest
from third_party.aliyun_green import AliyunGreen

class TestAliyunGreen(unittest.TestCase):
    def test_has_sensitive_image(self):
        green = AliyunGreen('http://static.xxxxxx.com/images/aliyun_green_test/sex.jpg')
        res = green.checkImage()