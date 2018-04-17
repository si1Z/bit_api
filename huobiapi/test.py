#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2018/4/16 下午6:21
# @Author  : zhujinghui 
# @site    : 
# @File    : test.py
# @Software: PyCharm
import requests

url = "https://api.huobi.pro/market/history/kline?symbol=btcusdt&size=150&period=1day"

rsp = requests.get(url)

print(rsp.text)