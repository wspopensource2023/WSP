import unittest
from tools.wxwork_bot import *

class TestWXWorkBot(unittest.TestCase):
    def test_send_profile_update_msg(self):
        print('send_text')
        bot = WXWorkBot("")
        bot.send_profile_update_msg()
        
    def test_send_collect_achievement_msg(self):
        print('send_text')
        bot = WXWorkBot("")
        bot.send_collect_achievement_msg("猫咪救助者")