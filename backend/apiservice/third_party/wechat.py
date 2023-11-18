import json
import config
import httpx
import requests
import hashlib
import time

class SDK():
    @staticmethod
    def get_mp_access_token():
        # 获取access_token
        # access_token = sr.get("wx:access_token")
        # if access_token:
        #     return access_token
        url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={}&secret={}".format(config.WeChatAppID,
                                                                                                               config.WeChatSecret)
        res = requests.get(url).json()  # dict类型
        access_token = res["access_token"]
        # sr.setex("wx:access_token", 7200, access_token)
        return access_token
    
    @staticmethod
    def get_access_token():
        # 获取access_token
        # access_token = sr.get("wx:access_token")
        # if access_token:
        #     return access_token
        url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={}&secret={}".format(config.WeChatWebAppID,
                                                                                                               config.WeChatWebSecret)
        res = requests.get(url).json()  # dict类型
        access_token = res["access_token"]
        # sr.setex("wx:access_token", 7200, access_token)
        return access_token
 
    @staticmethod
    def create_nonce_str():
        # 获取noncestr（随机字符串）
        import random
        chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        str = ""
        for i in range(0, 16):
            s = random.randint(0, len(chars) - 1)
            str += chars[s:s + 1]
        return str
 
    def get_jsapi_ticket(self):
        # 获取jsapi_ticket
        # jsapi_ticket = sr.get("wx:jsapi_ticket")
        # if jsapi_ticket:
        #     return jsapi_ticket
        access_token = self.get_access_token()
        url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token={access_token}&type=jsapi".format(
            access_token=access_token)
        jsapi_ticket = requests.get(url).json()["ticket"]
        # sr.setex("wx:jsapi_ticket", 7200, jsapi_ticket)
        print(jsapi_ticket)
        return jsapi_ticket
 
    def get_share_signature(self, url: str):
        timestamp = int(time.time())
        js_ticket = self.get_jsapi_ticket()
        nonce = self.create_nonce_str()
        ret = {
            "noncestr": nonce,
            "jsapi_ticket": js_ticket,
            "timestamp": timestamp,
            "url": url
        }
        temp = "&".join(['%s=%s' % (key.lower(), ret[key]) for key in sorted(ret)])
        # 2. 将三个参数字符串拼接成一个字符串进行sha1加密
        # sig是计算出来的签名结果
        sig = hashlib.sha1(temp.encode("utf8")).hexdigest()
        sign_package = {
            "appId": config.WeChatWebAppID,
            "nonceStr": nonce,
            "timestamp": timestamp,
            "url": url,
            "signature": sig
        }
        return sign_package