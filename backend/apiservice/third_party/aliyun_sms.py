"""
短信相关
"""
import config
from aliyunsdkcore.client import AcsClient
from aliyunsdkcore.auth.credentials import AccessKeyCredential
from aliyunsdkdysmsapi.request.v20170525.SendSmsRequest import SendSmsRequest

import json

credentials = AccessKeyCredential(config.AliYunSmsAccessKeyId, config.AliYunSmsAccessKeySecret)

def send_sms_code(phone: str, code: str, template: str = config.AliYunSmsTemplateCode):
    client = AcsClient(region_id='cn-hangzhou', credential=credentials)

    request = SendSmsRequest()
    request.set_accept_format('json')

    request.set_SignName(config.AliYunSmsSignName)
    request.set_TemplateCode(template)
    request.set_PhoneNumbers(phone)
    request.set_TemplateParam(json.dumps({
        "code": code,
    }))
    response = json.loads(client.do_action_with_exception(request))
    if response.get('Code') != 'OK':
        raise Exception(response.get("Message"))
    return
