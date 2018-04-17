#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 18-2-4 下午3:41
# @Author  : Sim
# @Site    : 
# @File    : huobi.py
# @Software: PyCharm
import urllib
import requests
from highcharts import Highstock
import json

# API 请求地址
MARKET_URL = "https://api.huobi.pro"

def http_get_request(url, params, add_to_headers=None):
    headers = {
        "Content-type": "application/x-www-form-urlencoded",
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
    }
    if add_to_headers:
        headers.update(add_to_headers)
    postdata = urllib.parse.urlencode(params)

    try:
        print(url)
        response = requests.get(url, postdata, headers=headers, timeout=5)

        if response.status_code == 200:
            return response.json()
        else:
            return
    except BaseException as e:
        print("httpGet failed, detail is:%s,%s" %(response.text,e))
        return

def translate(data):
    lines = data["data"]
    lines.reverse()

    lines_list = []
    for line in lines:
        line_list = []

        line_list.append(line['id'] * 1000)
        line_list.append(line['open'])
        line_list.append(line['high'])
        line_list.append(line['low'])
        line_list.append(line['close'])
        line_list.append(line['vol'])

        lines_list.append(line_list)

    return lines_list



def creatChart(klines,symbol):
    filename = "%s_dayk" % symbol
    ohlc=[]
    volume=[]
    for line in klines:
        ohlc.append(
            [line[0],
             #open
             float(line[1]),
             #high
             float(line[2]),
             # low
             float(line[3]),
             # close
             float(line[4])
             ]
        )
        volume.append(
            [line[0],
             float(line[5])
             ]
        )

    H = Highstock()

    groupingUnits = [
    ['day', [1]]
    ]


    options = {
        'rangeSelector': {
                    'selected': 4
                },

        'chart': {
            'zoomType': 'x',
            'reflow': True,
            'height': 900
        },

        'title': {
            'text': '%s'%( symbol)
        },

        'subtitle': {
            'text': filename
        },

        'yAxis': [{
            'labels': {
                'align': 'right',
                'x': -3
            },
            'title': {
                'text': 'OHLC'
            },
            'height': '60%',
            'lineWidth': 2
            },
            {
            'labels': {
                'align': 'right',
                'x': -3
            },
            'title': {
                'text': 'Volume'
            },
            'top': '65%',
            'height': '35%',
            'offset': 0,
            'lineWidth': 2
        }],
    }

    H.add_data_set(ohlc, 'candlestick', symbol, dataGrouping = {
                        'units': groupingUnits
                    }
    )
    H.add_data_set(volume, 'column', 'Volume', yAxis = 1, dataGrouping = {
                        'units': groupingUnits
                    }
    )

    H.set_dict_options( options )

    H.save_file(filename)

    print("===--- Completed ---===")


# 获取KLine
def get_kline(symbol, period, size=150):
    """
    :param symbol
    :param period: 可选值：{1min, 5min, 15min, 30min, 60min, 1day, 1mon, 1week, 1year }
    :param size: 可选值： [1,2000]
    :return:
    """
    params = {'symbol': symbol,
              'period': period,
              'size': size}

    url = MARKET_URL + '/market/history/kline'
    return http_get_request(url, params)
    # return translate(http_get_request(url, params))

# 获取tradedetail
def get_trade(symbol):
    """
    :param symbol
    :return:
    """
    params = {'symbol': symbol}

    url = MARKET_URL + '/market/trade'
    return http_get_request(url, params)

if __name__ == '__main__':
    symbol = "btcusdt"
    klines = get_kline("btcusdt","1day")
    print(klines)

    # trade_data = get_trade(symbol)
    # print(trade_data)

    # with open('btcusdt.json','w') as f:
    #     json.dump(klines,f)

