#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2018/4/16 下午5:37
# @Author  : zhujinghui 
# @site    : 
# @File    : main.py
# @Software: PyCharm

from HuobiServices import *
import json

def save(data,filename):
    with open("{}.json".format(filename),'w') as f:
        json.dump(data,f)

symbol = "btcusdt"
klines = get_kline("btcusdt","1min")
save(klines,"btcusdt_1day_kline")



# trade_data = get_trade(symbol)
# save(trade_data,"btcusdt_trade")
#
# tricker_data = get_ticker(symbol)
# save(tricker_data,"btcusdt_tricker")
#
#
# detail_data = get_detail(symbol)
# save(detail_data,"btcusdt_detail")