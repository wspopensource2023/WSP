import requests,base64,hashlib
 
class WXWorkBot:
    def __init__(self, account_id: str):
        self.headers = {"Content-Type": "text/html"}
        self.send_url = "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=d8c93c30-bd2f-4ec5-886b-530a69505c0e"  # 测试机器人webhook地址
        self.auth = ('Content-Type', 'application/json')
        self.account_id = account_id
 
    def send_requests(self,send_data):
        res = requests.post(url=self.send_url, headers=self.headers, json=send_data, auth=self.auth)
        print(res.json())
         
    def send_profile_update_msg(self):
        print('send_profile_update_msg')
        # 发送消息
        send_data = {
            "msgtype": "text",
            "text": {
                "content": self.account_id + '的Profile有更新',
                "mentioned_list":  ["@all"]
            }
        }
        self.send_requests(send_data)
        
    def send_collect_achievement_msg(self, achievement_name: str):
        print('send_collect_achievement_msg')
        send_data = {
            "msgtype": "text",
            "text": {
                "content": self.account_id + '领取了徽章' + achievement_name,
                "mentioned_list":  ["@all"]
            }
        }
        self.send_requests(send_data)