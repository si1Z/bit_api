webpackJsonp([1], {
    "++vu": function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.api = t.operator = void 0;
        var a = o(n("mvHQ")),
        i = o(n("xe4/"));
        function o(e) {
            return e && e.__esModule ? e: {
            default:
                e
            }
        }
        function r(e) {
            var t = (e = e || {}).symbol || "btccny",
            n = e.period || "1min",
            a = e.step || "step0",
            i = {
                kline: function(e) {
                    return "market." + ((e = e || {}).symbol || t) + ".kline." + (e.period || n)
                },
                trade: function(e) {
                    return "market." + ((e = e || {}).symbol || t) + ".trade.detail"
                },
                ticker: function(e) {
                    return "market." + ((e = e || {}).symbol || t) + ".detail"
                },
                depth: function(e) {
                    return "market." + ((e = e || {}).symbol || t) + ".depth." + (e.step || a)
                },
                overview: function(e) {
                    return "market.overview"
                }
            };
            function o(e, t) {
                for (var n in t) e[n] = t[n];
                return e
            }
            function r(e, t) {
                var n = o(t || {}),
                a = {
                    kline: {},
                    trade: {},
                    depth: {},
                    ticker: {},
                    overview: {}
                };
                for (var r in a) l(r);
                function l(t) {
                    a[t] = function(a) {
                        var r = {};
                        return r[e] = i[t](a),
                        o(r, n)
                    }
                }
                return a
            }
            return {
                req: function(e) {
                    return r("req", e)
                },
                sub: function(e) {
                    return r("sub", e)
                },
                unsub: function(e) {
                    return r("unsub", e)
                }
            }
        }
        var l = [];
        l[1] = "req",
        l[2] = "sub",
        l[4] = "unsub",
        top.window.api = top.window.api = r;
        var s = function() {
            var e = {};
            function t() {
                var t = this.host,
                n = this,
                o = {
                    req: "rep",
                    sub: "ch",
                    unsub: "unsubbed"
                };
                if (n.msgList = {},
                n.callback = {},
                t) return e[t] ?
                function() {
                    return e[t]
                }: (e[t] = new WebSocket(t), e[t].ts = 1 * new Date, r(e[t]),
                function() {
                    return e[t]
                });
                function r(e) {
                    e.onerror = s,
                    e.onclose = c,
                    e.msg = f,
                    e.onmessage = u,
                    e.onopen = m
                }
                function s(e) {
                    top.window.debug_is_open && console.error(t + "::WebSocket on error ====>", e)
                }
                function c(n) {
                    top.window.debug_is_open && console.warn(t + "::WebSocket on close ====>", n),
                    e[t] = new WebSocket(t),
                    e[t].ts = 1 * new Date,
                    e[t].isOpen = 0,
                    r(e[t])
                }
                function u(e) {
                    new FileReader;
                    try {
                        d(JSON.parse(e.data))
                    } catch(t) {
                        if ("string" == typeof e.data) return; !
                        function e(t, n, a) {
                            var i = new FileReader;
                            if (a) i.addEventListener("loadend",
                            function() {
                                for (var e = "",
                                t = new Uint8Array(i.result), a = t.byteLength, o = 0; o < a; o++) e += String.fromCharCode(t[o]);
                                n(e)
                            }),
                            i.readAsArrayBuffer(t);
                            else {
                                i.addEventListener("loadend",
                                function() {
                                    n(i.result)
                                });
                                try {
                                    i.readAsBinaryString(t)
                                } catch(a) {
                                    e(t, n, !0)
                                }
                            }
                        } (e.data,
                        function(e) {
                            d(JSON.parse(i.
                        default.inflate(e, {
                                to: "string"
                            })))
                        })
                    }
                }
                function d(i) {
                    var o, r = i.rep ? "rep": i.unsubbed ? "unsubbed": "ch",
                    l = i.rep || i.unsubbed || i.subbed || i.ch || i.ping,
                    s = n.callback[r] ? n.callback[r][l] : null;
                    if (top.window.unzip_is_open && console.warn(t + "::WebSocket on message ====>", i, n.callback[r]), "error" != i.status) return i.ping ? (o = i.ping, void e[t].send((0, a.
                default)({
                        pong:
                        o
                    }))):
                    s ? ("unsubbed" == r && (delete n.callback.ch[l], p(4, "unsub." + l, l)), "unsubbed" == r && delete n.callback[r][l], "rep" == r && (delete n.callback[r][l], p(1, "req." + l, l)), void s(i, r, l)) : void 0
                }
                function p(e, t, a) {
                    if (1 == e) return delete n.msgList[t];
                    4 == e && (delete n.msgList[t], delete n.msgList["sub." + a])
                }
                function m() {
                    for (var a in e[t].isOpen = 1, n.msgList) e[t].send(n.msgList[a])
                }
                function f(i, o) {
                    var r, s = parseInt([~~ !! i.unsub, ~~ !! i.sub, ~~ !! i.req].join(""), 2);
                    r = l[s] + "." + (i.req || i.sub || i.unsub),
                    n.msgList[r] = (0, a.
                default)(i),
                    e[t].isOpen && e[t].send(n.msgList[r]),
                    o && g && g(i, o)
                }
                function g(e, t) {
                    var a = l[parseInt([~~ !! e.unsub, ~~ !! e.sub, ~~ !! e.req].join(""), 2)],
                    i = e[a];
                    n.callback[o[a]] || (n.callback[o[a]] = {}),
                    n.callback[o[a]][i] = t
                }
            }
            function n(e) {
                var t;
                if (!top.window.getSearchParameters) {
                    t = location.search.replace("?", "").split("&"),
                    top.window.getSearchParameters = {};
                    for (var n, a = 0,
                    i = t.length; a < i; a++) n = t[a].split("="),
                    top.window.getSearchParameters[n[0]] = decodeURIComponent(n[1])
                }
                return top.window.getSearchParameters[e]
            }
            function o() {
                var e, t = [].slice.apply(arguments);
                if (! (t.length < 2)) return t.shift().apply(e = t.shift(), t.length ? t: [e])
            }
            function r() {
                var e = {},
                t = {},
                n = this;
                function a(t, n) {
                    var a = parseInt([~~ !! t.unsubbed, ~~ !! t.subbed || ~~ !! t.ch, ~~ !! t.rep].join(""), 2),
                    i = l[a] + "." + (t.rep || t.subbed || t.ch || t.unsubbed);
                    if (e[i]) for (var o = e[i].length; o--;) e[i][o](t);
                    1 == a && delete e[i],
                    t.unsubbed && n && n(1)
                }
                return {
                    plugin: function(i, o) {
                        var r = 1 * new Date + ~~ (1e5 * Math.random()),
                        s = parseInt([~~ !! i.unsub, ~~ !! i.sub, ~~ !! i.req].join(""), 2),
                        c = l[s] + "." + (i.req || i.sub || i.unsub);
                        e[c] || (e[c] = [], t[c] = 0),
                        e[c].push(o),
                        o.alias = "fn_" + r.toString(r % 16 + 20),
                        o.msg = c,
                        o.bodywords = o.toString().replace(/[^\d\w]/g, ""),
                        !t[c] && n().msg(i, a) && (t[c] = 1)
                    },
                    unplug: function(t, i, o) {
                        var r = parseInt([~~ !! t.unsub, ~~ !! t.sub, ~~ !! t.req].join(""), 2),
                        s = l[r] + "." + (t.req || t.sub || t.unsub),
                        c = s.replace(/^unsub/, "sub"),
                        u = {
                            unsub: s.replace(/^sub/, "unsub").replace("unsub.", "")
                        },
                        d = e[c];
                        if ("req" != l[r] && d) {
                            for (var p = d.length; p--;) {
                                if (i.alias && d[p].alias === i.alias) {
                                    d.splice(p, 1),
                                    o && o(0);
                                    break
                                }
                                if (!i.alias && d[p].bodywords == i.toString().replace(/[^\d\w]/g, "")) {
                                    i.name || console.warn("匿名函数有可能导致移除错误!"),
                                    d.splice(p, 1),
                                    o && o(0);
                                    break
                                }
                            }
                            d.length || (delete e[c], n().msg(u,
                            function(e) {
                                a(e, o)
                            }))
                        }
                    },
                    info: n()
                }
            }
            return top.window.debug_is_open = n("debug_is_open"),
            top.window.unzip_is_open = n("unzip_is_open"),
            {
                handsup: function(e) {
                    if (e) return top.window["__operator" + e] ? top.window["__operator" + e] : top.window["__operator" + e] = o(r, o(t, {
                        host: e
                    }))
                }
            }
        } ();
        top.window.operator = top.window.operator || s,
        t.operator = s,
        t.api = r
    },
    "/6YX": function(e, t) {
        e.exports = '<div class="credits_confirm">\n    <div block="content"></div>\n    \x3c!--滑块???--\x3e\n    <div class="dia_input">\n        <div class="input_top">\n            <%= lang(\'验证\')%>\n        </div>\n        <div class="input_middle">\n            <div class="ali_captcha" id="ali_captcha"></div>\n        </div>\n    </div>\n</div>\n\n<block name="content">\n    <div class="dia_input credit_detail">\n        <div class="detail_in">\n            <div class="input_top">\n                <%= lang(\'点卡套餐\')%>\n                <em><%=data.name%> x<%=data.quantity%></em>\n            </div>\n        </div>\n        <div class="detail_in">\n            <div class="input_top">\n                <%= lang(\'点数\')%>\n                <em><%=data["total-points"]%> <%= lang(\'点\') %></em>\n            </div>\n        </div>\n        <%if(data["total-gift"]*1>0){%>\n        <div class="buy_detail">\n            <div class="input_top">\n                <%= lang(\'赠送币数\')%>\n                <em class="uppercase"><%=data["total-gift"]%>  <%=data["gift-currency"]%></em>\n            </div>\n        </div>\n        <%}%>\n    </div>\n\n    <div class="dia_input">\n        <div class="input_top">\n            <%= lang(\'应付金额\')%>\n        </div>\n        <div class="input_middle">\n            <p class="total_amount"><%=data["total-amount"]%> <em class="uppercase"><%=data.currency%></em></p>\n            <% if(data.currency != "usdt"){%>\n            <p class="price_tips"><%= lang(\'折算价格\')%>:1USDT = <%=Num((1/data["price"]),STORE.currencyDataObj[data.currency]["show-precision"])%> <span class="uppercase"><%=data.currency%></span> <i class="hb_icon_tip"><em><%= lang(\'根据行情实时折算，以最终生成的购买订单中价格为准\')%></em></i></p>\n            <%}%>\n        </div>\n    </div>\n</block>\n<block name="dia_title">\n    <p class="title_tips"><%if(n > 0){%><%= lang(\'请在 %s 秒内支付完毕\').replace(\'%s\',\'<i style="width:30px;text-align:center;display:inline-block;">\'+n+\'</i>\')%><%}else{%><%= lang(\'订单已失效\')%><%}%></p>\n</block>'
    },
    "/j7V": function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = {
            linear: function(e) {
                return 1
            },
            easeIn: function(e) {
                return 1 / e
            },
            easeOut: function(e) {
                return e
            }
        };
        t.
    default = function(e) {
            var t = e || {},
            n = function(e) {
                var t, n, i = e || {},
                o = i.time || 3e3,
                r = i.loop || "linear",
                l = i.step || 1,
                s = 0;
                return {
                    time: function() {
                        return s++,
                        a[r](s * l) * o
                    },
                    refresh: function() {
                        s = 0,
                        t && clearTimeout(t),
                        t = null,
                        n && n()
                    },
                    hold: function(e, a) {
                        t = e,
                        n = a
                    }
                }
            } (t);
            return function e() {
                t.fn && t.fn(t.data || {}).then(function(a) {
                    t.thenback && t.thenback(a),
                    t.loop && n.hold(setTimeout(e, n.time()), e)
                })
            } (),
            {
                looper: n
            }
        }
    },
    "/tGS": function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        n("DjjW");
        var a, i = n("fnlE"),
        o = (a = i) && a.__esModule ? a: {
        default:
            a
        },
        r = n("cnkX"),
        l = n("f8yD");
        var s = {
            lang: (0, l.Extend)({
                prev: "prev",
                next: "next"
            },
            window.LANG.pagination)
        };
        t.
    default = function(e) {
            var t = this;
            t.wrap = e,
            t.ele = new r.Entity((0, l.TmpL)(o.
        default, s)),
            t.pageNow = 0,
            t.prevPage = 0,
            t.nextPage = 0,
            t.setDelay = 0,
            t.delayState = !0,
            t.delay = function() {
                t.setDelay && t.delayState && (t.delayState = !1, setTimeout(function() {
                    t.delayState = !0
                },
                t.setDelay))
            },
            t.loadState = function(e) {
                t.isLoad = !!e
            },
            t.Init = function(e, n) {
                t.wrap = e || t.wrap,
                t.wrap.appendChild(t.ele),
                l.Event.add(t.ele, "click",
                function(e) {
                    if (t.delayState && !t.isLoad) {
                        t.delay();
                        var a, i = l.Event.target(e),
                        o = (0, l.attFather)(i, "data-direction"); (o = o && o.node) && (a = o.getAttribute("data-direction"), t.Stop || ("next" === a ? t.pageNow++:t.pageNow--), t.direction = a, t.View(), o && t.Then && t.Then(a, t.pageNow), o && n && n(a, t.pageNow))
                    }
                }),
                t.btns = t.ele.getElementsByTagName("button"),
                t.prevBtn = t.btns[0],
                t.nextBtn = t.btns[1],
                t.View()
            },
            t.Set = function(e) {
                var n = e || {};
                t.pageNow = void 0 !== n.pageNow ? n.pageNow: t.pageNow,
                t.prevPage = void 0 !== n.prvePage ? n.prvePage: t.prevPage,
                t.nextPage = void 0 !== n.nextPage ? n.nextPage: t.nextPage
            },
            t.View = function() {
                t.pageNow || t.prevPage ? t.BtnView("prev", "inline-block") : t.BtnView("prev", "none"),
                t.nextPage ? t.BtnView("next", "inline-block") : t.BtnView("next", "none")
            },
            t.BtnView = function(e, n) {
                t[e + "Btn"] && (t[e + "Btn"].style.display = n)
            }
        }
    },
    "04Xc": function(e, t) {
        e.exports = '<block name="order_confirm_buy">\n    <div class="dia_input">\n        <div class="input_top">\n          <b>\n            <%=lang("买入价")%>\n          </b>\n        </div>\n        <div class="input_middle">\n          <% if (type === \'buy-limit\') { %>\n            <div class="input_amount upper"><%= price %> <%= quote %></div>\n            <em class="upper"><%= legalPrice[0] %></em>\n          <% } else if (type === \'buy-market\') { %>\n            <div class="input_amount f-20"><%= lang("以市场上最优价格买入") %></div>\n          <% } %>\n        </div>\n      </div>\n      <div class="dia_input">\n        <div class="input_top">\n          <b>\n              <% if (type === \'buy-limit\') { %>\n                <%= lang("买入量") %>\n              <% } else if (type === \'buy-market\') { %>\n                <%= lang("预估买入量") %>\n              <% } %>\n          </b>\n        </div>\n        <div class="input_middle">\n            <% if (type === \'buy-limit\') { %>\n              <div class="input_amount upper"><%= amount %> <%= base %></div>\n            <% } else if (type === \'buy-market\') { %>\n              <div class="input_amount upper"><%= avgAmount %> <%= base %></div>\n            <% } %>\n        </div>\n      </div>\n      <div class="dia_input">\n        <div class="input_top">\n          <b>\n              <%= lang("交易额") %>\n          </b>\n        </div>\n        <div class="input_middle upper">\n          <div class="input_total upper">\n            <% if (type === \'buy-limit\') { %>\n              <%= total %>\n            <% } else if (type === \'buy-market\') { %>\n              <%= amount %>\n            <% } %>\n            <%= quote %>\n          </div>\n        </div>\n      </div>\n</block>\n<block name="order_confirm_sell">\n  <div class="dia_input">\n    <div class="input_top">\n      <b>\n        <%=lang("卖出价")%>\n      </b>\n    </div>\n    <div class="input_middle">\n      <% if (type === \'sell-limit\') { %>\n        <div class="input_amount upper"><%= price %> <%= quote %></div>\n        <em class="upper"><%= legalPrice[1] %></em>\n      <% } else if (type === \'sell-market\') { %>\n        <div class="input_amount f-20"><%= lang("以市场上最优价格卖出") %></div>\n      <% } %>\n    </div>\n  </div>\n  <div class="dia_input">\n    <div class="input_top">\n      <b>\n          <%= lang("卖出量") %>\n      </b>\n    </div>\n    <div class="input_middle">\n        <div class="input_amount upper"><%= amount %> <%= base %></div>\n    </div>\n  </div>\n  <div class="dia_input">\n    <div class="input_top">\n      <b>\n        <% if (type === \'sell-limit\') { %>\n          <%= lang("交易额") %>\n        <% } else if (type === \'sell-market\') { %>\n          <%= lang("预估交易额") %>\n        <% } %>\n      </b>\n    </div>\n    <div class="input_middle">\n      <div class="input_total upper"><%= total %> <%= quote %></div>\n    </div>\n  </div>\n</block>'
    },
    13 : function(e, t, n) {
        e.exports = n("EwMI")
    },
    "20md": function(e, t) {},
    "2lGR": function(e, t) {
        e.exports = '<block name="setting">\n    <div class="dia_input">\n                <div class="input_top">\n                    <b>\n                        <%=lang("折算货币")%>\n                    </b>\n                </div>\n                <div class="input_middle">\n            <div id="exchange_rate_select" class="exchange_rate_select"></div>\n                </div>\n      </div>\n      <div class="dia_input">\n          <div class="input_top">\n            <b>\n              <%=lang("主题")%>\n            </b>\n          </div>\n          <div class="input_middle">\n            <label>\n                <input type="radio" name="theme" value="hb-night"><%=lang("黑色")%>\n            </label>\n            <label>\n                <input type="radio" name="theme" value="hb-day"><%=lang("白色")%>\n            </label>\n          </div>\n        </div>\n</block>\n'
    },
    "3Op6": function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.order_book_fire = void 0;
        var a = n("f8yD"),
        i = n("Ald6"),
        o = n("4AVY"),
        r = n("++vu"),
        l = (n("wB0j"), n("YtCS")),
        s = n("cnkX"),
        c = u(n("n4zI"));
        u(n("NUe0"));
        function u(e) {
            return e && e.__esModule ? e: {
            default:
                e
            }
        }
        var d = r.operator.handsup(l.API_ENV.ws),
        p = void 0; (0, o.Subscribe)("__tickerSub",
        function(e) {
            var t = e.info;
            p,
            p = t.tick.close
        }),
        t.order_book_fire = function() {
            var e = new s.DomState,
            t = {
                symbol_config: c.
            default.symbolDataObj[(PAGE_COIN + PAGE_QUOTE).toLowerCase()],
                coin: PAGE_COIN,
                quote: PAGE_QUOTE,
                account: {},
                market: {
                    depth: {},
                    ticker: {}
                },
                depths: {},
                writeDepth: !1
            },
            n = {
                precision: {
                    price: t.symbol_config["trade-price-precision"],
                    amount: t.symbol_config["trade-amount-precision"],
                    volumes: t.symbol_config["trade-total-precision"],
                    fee: t.symbol_config["fee-precision"]
                },
                depthApi: {
                    symbol: t.coin + t.quote,
                    step: "step0"
                },
                depthApiPick: {
                    pick: ["bids.7", "asks.7"]
                }
            };
            function l() {
                l.price && l.price.getAttribute("force") && (t.writeDepth = !1, l.price.removeAttribute("force"), m(1)),
                setTimeout(l, 100)
            }
            function u(e) {
                if (e && e.length) {
                    var t = 0;
                    return e.forEach(function(e, n) {
                        t < +e[1] && n < 7 && (t = +e[1])
                    }),
                    t
                }
            }
            function m(i) {
                var o = t.depths,
                r = e.getElementsByName("price");
                if (! (o.bids[0] && o.asks[0] || p)) return setTimeout(function() {
                    m(i)
                },
                200);
                r && (t.writeDepth || (l.price = r[0], ("" == r[1].value || i) && (r[1].value = (0, a.Num)(o.bids[0] ? o.bids[0][0] : p || 0, n.precision.price), a.Event.trigger(r[1], "input")), ("" == r[0].value || i) && (r[0].value = (0, a.Num)(o.asks[0] ? o.asks[0][0] : p || 0, o.floatLength), a.Event.trigger(r[0], "input")), t.writeDepth = !0))
            }
            function f(o) {
                var r = (0, i.GetChannelId)(o),
                l = (0, i.MateSymbol)(r, c.
            default.symbolDataArr);
                o.tick && (c.
            default.market.depth[l] = o.tick, o.tick.asksMaxVal = u(o.tick.asks), o.tick.bidsMaxVal = u(o.tick.bids), t.market.depth[l] = o.tick, t.market.depth[l].symbol = [t.coin, t.quote], t.market.depth[l].floatLength = n.precision.price, t.market.depth[l].amountFloatLength = n.precision.amount, t.market.depth[l].quote_currency = t.quote.toUpperCase(), (0, a.RenderView)("market_depth", t.market.depth[l], e.depthListHtml), t.depths = t.market.depth[l], m())
            }
            l(),
            (0, o.Subscribe)("__marketDay",
            function(e) {
                var n = e.info[t.coin + t.quote];
                t.market.ticker = n ? n.ticker: {},
                t.ticker_version = 1 * new Date
            }),
            (0, o.Subscribe)("__marketTicker",
            function(e) {
                var n = e.info[t.coin + t.quote];
                t.market.ticker = n ? n.ticker: {},
                t.ticker_version = 1 * new Date
            }),
            window.Num = a.Num,
            d.plugin((0, r.api)(n.depthApi).sub(n.depthApiPick).depth(), f),
            e.Ready(function() {
                e.depthSelect = e.getElementById("depth_select"),
                e.depthList = e.getElementById("market_depth"),
                e.depthStep = e.getElementById("depth_step"),
                e.depthListHtml = e.depthList.querySelector("script[name='normal']").innerHTML,
                (0, a.RenderView)("market_depth", {
                    quote_currency: t.quote.toUpperCase()
                },
                e.depthListHtml),
                a.Event.add(e, "click",
                function(t) {
                    a.dom.removeClass(e.depthSelect, "slide_down")
                }),
                a.Event.add(e.depthSelect, "click",
                function(t) {
                    t.stopPropagation(),
                    a.dom.hasClass(e.depthSelect, "slide_down") ? a.dom.removeClass(e.depthSelect, "slide_down") : a.dom.addClass(e.depthSelect, "slide_down");
                    var i, o, l = a.Event.target(t),
                    s = (0, a.attFather)(l, "data-depth"),
                    c = void 0;
                    s && (i = (c = s.node).getAttribute("data-depth"), o = c.innerText, e.depthStep.innerText = o, a.dom.removeClass(e.depthSelect, "slide_down"), a.dom.removeClass(e.depthSelect.querySelector(".active"), "active"), a.dom.addClass(c, "active"), d.unplug((0, r.api)(n.depthApi).sub(n.depthApiPick).depth(), f), n.depthApi.step = "step" + i, d.plugin((0, r.api)(n.depthApi).sub(n.depthApiPick).depth(), f))
                });
                var i = void 0;
                a.Event.add(e.depthList, "click",
                function(t) {
                    var n = a.Event.target(t),
                    o = (0, a.attFather)(n, "data-info");
                    o && o.attr && (e.formPrice[0].value = o.attr, e.formPrice[1].value = o.attr, e.formPrice[0].className = "focus", e.formPrice[1].className = "focus", a.Event.trigger(e.formPrice[0], "input"), a.Event.trigger(e.formPrice[1], "input")),
                    i && clearTimeout(i),
                    i = null,
                    i = setTimeout(function() {
                        e.formPrice[0].className = "",
                        e.formPrice[1].className = ""
                    },
                    300)
                })
            })
        }
    },
    "3qqy": function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a, i = n("//Fk"),
        o = (a = i) && a.__esModule ? a: {
        default:
            a
        };
        n("4GF6");
        var r = {
            langMap: {
                "zh-cn": "cn",
                "zh-hk": "tw",
                "en-us": "en",
                "ja-jp": "ja_JP",
                "ko-kr": "ko_KR",
                "ru-ru": "ru_RU",
                "fr-fr": "fr_FR",
                "es-es": "es_ES",
                "de-de": "de_DE",
                "th-th": "th_TH",
                "vi-vi": "vi_VN",
                "tr-tr": "tr_TR"
            },
            script: "//aeis.alicdn.com/sd/ncpc/nc.js?v=180323"
        };
        function l() {
            var e = this;
            return e.NC = window.noCaptcha && new window.noCaptcha,
            e.Init = function(t) {
                var n = t || {};
                n.token = t.token || [n.appkey, (new Date).getTime(), Math.random()].join(":"),
                n.language = r.langMap[localStorage.lang] || "en",
                n.foreign = "cn" !== r.langMap[localStorage.lang],
                e.option = n,
                e.NC.init(n),
                e.inited = 1
            },
            e.Reload = function(t) {
                e.option && (t && (e.option.token = t), e.Init(e.option))
            },
            e
        }
        t.
    default = function() {
            if (window.noCaptcha) return new l;
            var e = document.getElementsByTagName("script")[0],
            t = document.createElement("script");
            return t.async = !0,
            t.src = r.script,
            e.parentNode.insertBefore(t, e),
            new o.
        default(function(e) {
                t.onload = function() {
                    e(new l)
                }
            })
        }
    },
    "46Hv": function(e, t, n) {
        "use strict";
        var a, i = n("LssR"),
        o = (a = i) && a.__esModule ? a: {
        default:
            a
        };
        n("UQGx");
        var r = n("cnkX"),
        l = n("f8yD"),
        s = n("YtCS"),
        c = n("KbPw");
        var u = new r.DomState,
        d = {
            mgtLang: s.LANGUAGE,
            userLang: localStorage.lang.toLowerCase() || s.DEFAULT_LANG,
            browserLang: (0, l.getBrowserLanguage)()
        };
        u.Ready(function() {
            u.selectLang = new r.Entity((0, l.TmpL)(o.
        default, d), "select_lang"),
            u.selectLangDT = u.selectLang.querySelector("dt"),
            u.selectLangDD = u.selectLang.querySelector("dd"),
            l.Event.add(u.selectLang, "click",
            function(e) {
                var t = l.Event.target(e),
                n = (0, l.tarFather)(t, "p"); (0, l.tarFather)(t, "dt") && (l.dom.hasClass(u.selectLang, "open") ? l.dom.removeClass(u.selectLang, "open") : l.dom.addClass(u.selectLang, "open")),
                n && (u.selectLangDT.innerHTML = n.innerHTML, u.selectLangDD.style.display = "none", location.href = (0, c.LangPath)(n.getAttribute("data-lang").toLowerCase()))
            }),
            l.Event.add(u.selectLang, "blur",
            function() {
                l.dom.removeClass(u.selectLang, "open")
            })
        })
    },
    "4AVY": function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.Subscribe = t.Publish = t.Action = void 0;
        var a = o(n("mvHQ")),
        i = o(n("pFYg"));
        function o(e) {
            return e && e.__esModule ? e: {
            default:
                e
            }
        }
        var r = !1,
        l = {
            bind: document.addEventListener ?
            function(e, t, n) {
                e.addEventListener(t, n, !1)
            }: function(e, t, n) {
                e.attachEvent("on" + t, n)
            }
        };
        var s = {},
        c = {},
        u = function(e, t) {
            return s[e] = s[e] || {},
            c[e] = c[e] || [],
            t && c[e].push(t),
            s[e].callback = c[e],
            s[e]
        };
        function d(e) {
            var t = e.key,
            n = (e.newValue, e.oldValue, m(t, e));
            n && (n.source = "storage", r && console.log("%c ↗ subscribe(storage):" + t, "color:sienna"))
        }
        function p(e) {
            var t = e.type;
            e.info,
            e.version;
            m(t, e),
            r && console.log("%c ↗ subscribe(document):" + t, "color:sienna")
        }
        var m = function(e, t) {
            if (s[e]) {
                var n = s[e].callback,
                a = (t.key, t.newValue),
                i = (t.oldValue, a ? JSON.parse(a) : {}),
                o = i.version,
                r = i.data;
                t.info = t.info || r,
                t.version = t.version || o,
                s[e].version = t.version;
                for (var l = 0; l < n.length; l++) n[l] && n[l](t);
                return s[e]
            }
        };
        t.Action = function(e, t) {
            var n = document.createEvent("HTMLEvents");
            return n.initEvent(e, !1, !1),
            n.localSync = t,
            n
        },
        t.Publish = function(e, t) {
            e && "object" === (void 0 === e ? "undefined": (0, i.
        default)(e)) ? (e.info = t, e.version = (new Date).getTime(), e.localSync && localStorage.setItem(e.type, (0, a.
        default)({
                version:
                e.version,
                data: e.info
            })), r && console.log("%c ↙ publish:" + e.type, "color:green"), document.dispatchEvent(e)) : console.error("Publish: action is not defined", "action:", e)
        },
        t.Subscribe = function(e, t) {
            if (e) {
                var n = u(e, t);
                l.bind(window, "storage", d),
                "storage" !== n.source && (document.addEventListener(e, p), n.source = "document")
            } else console.error("Subscribe: action is not defined")
        }
    },
    "4GF6": function(e, t) {},
    "5XLv": function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = p(n("Xxa5")),
        i = p(n("exGp"));
        n("kaZT");
        var o = p(n("egCj")),
        r = n("gLaJ"),
        l = n("f8yD"),
        s = n("aVmh"),
        c = n("zcHd"),
        u = (p(n("5nIp")), n("RxF2"), n("Fe3k")),
        d = p(n("3qqy"));
        function p(e) {
            return e && e.__esModule ? e: {
            default:
                e
            }
        }
        var m = new u.GetUserAccount,
        f = (0, l.Lang)(),
        g = (0, l.SplitTemplate)(o.
    default),
        v = new c.Toast,
        _ = void 0,
        y = void 0,
        b = void 0,
        h = void 0,
        k = void 0,
        w = void 0,
        L = void 0,
        S = void 0,
        E = 1;
        t.
    default = function() {
            var e, t = (e = (0, i.
        default)(a.
        default.mark(function e() {
                return a.
            default.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                    case 0:
                        if (e.t0 = L, e.t0) {
                            e.next = 5;
                            break
                        }
                        return e.next = 4,
                        (0, d.
                    default)();
                    case 4:
                        e.t0 = e.sent;
                    case 5:
                        L = e.t0;
                    case 6:
                    case "end":
                        return e.stop()
                    }
                },
                e, this)
            })),
            function() {
                return e.apply(this, arguments)
            }),
            n = {};
            function o() {
                _.dialog.querySelector("input").value = E || "",
                _.dialog.querySelector('[block="amount"]').innerHTML = (E ? (0, s.mul)(y.cost, E) : "---") + " HT"
            }
            function c() {
                return _.dialog.querySelector("input") && _.dialog.querySelector("input").getAttribute("isfocus") ? (((E = 1 * _.dialog.querySelector("input").value) <= 0 || !E) && (E = null), E > y.limit && (E = 1 * y.limit), o(), void setTimeout(c, 50)) : setTimeout(c, 50)
            }
            function u(e) {
                var t = l.Event.target(e),
                a = (0, l.attFather)(t, "action"); (0, l.attFather)(t, "stop") && l.Event.stop(e),
                a && n[a.attr] && n[a.attr](a.node)
            }
            function p(e) {
                if ("close" === e.type) return T();
                if (!k && "submit" === e.type) {
                    if (!S) return v.Error(LANG.dialog["请先拖动滑块验证"], 2e3);
                    if (!E) return T(),
                    v.Error(LANG.dialog["投票数量不能为0"], 2e3);
                    if (1 * (0, s.mul)(y.cost, E) > 1 * window.spotBalance) return T(),
                    v.Error(LANG.dialog["可用HT不足"], 2e3);
                    k = 1,
                    y.success({
                        aLiData: S,
                        voteAmount: E
                    },
                    T)
                }
            }
            function T(e) {
                var t;
                e && (_ && _.Close(t), window.spotBalance = null, w = null, E = 1),
                L.Reload(),
                S = null,
                k = 0
            }
            return (0, l.J)(function() {
                this.sub = function() {
                    E - 1 <= 0 ? E = 1 : E -= 1,
                    o()
                },
                this.add = function() {
                    E + 1 > y.limit ? E = 1 * y.limit: E += 1,
                    o()
                }
            },
            n),
            m.Then = function(e) {
                e.list.forEach(function(e) {
                    "ht" === e.currency && "trade" === e.type && (window.spotBalance = e.balance)
                }),
                window.spotBalance && _.dialog && _.dialog.querySelector('[block="tradeht"]') && (_.dialog.querySelector('[block="tradeht"]').innerHTML = (0, l.Num)(window.spotBalance, 8))
            },
            t(),
            {
                open: function e(t) {
                    var n;
                    L ? (window.spotBalance || w || (w = 1, m.Get("spot")), t && t(), (n = _.dialog.querySelector("#limit_vote")).innerHTML = (0, l.StrReplaceKey)(n.dataset.value, y.limit), o(), _.dialog.querySelector('p[data="dia_title"]').innerHTML = LANG.dialog["使用HT进行投票后，已支付的HT不予退还"], _.Open(), L.inited ? L.Reload() : L.Init({
                        renderTo: "#ali_captcha",
                        appkey: "FFFF0000000001796AA8",
                        scene: "activity",
                        callback: function(e) {
                            S = e
                        }
                    })) : setTimeout(function() {
                        e(t)
                    },
                    100)
                },
                title: function(e) {
                    return f._keys(e),
                    f.getLang("投票")
                },
                construct: function(e) {
                    k = 0,
                    y = e,
                    E = 1,
                    f._keys(e.lang),
                    b = {
                        Num: l.Num,
                        lang: f.getLang,
                        page: {
                            title: e.title
                        },
                        btn: {
                            submit: f.getLang("确定")
                        }
                    },
                    _ = _ || new r.Dialog({
                        html: (0, l.TmpL)((0, r.dialogMix)(g.html).html, b)
                    }),
                    !h && l.Event.add(_.dialog, "click", u),
                    h || (l.Event.add(_.dialog.querySelector("input"), "focus",
                    function() {
                        _.dialog.querySelector("input").setAttribute("isfocus", 1)
                    }), l.Event.add(_.dialog.querySelector("input"), "blur",
                    function() {
                        _.dialog.querySelector("input").removeAttribute("isfocus")
                    }), c()),
                    h = 1,
                    _.Then = p
                }
            }
        } ()
    },
    "5hcz": function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = s(n("Dd8w")),
        i = n("f8yD"),
        o = s(n("/tGS")),
        r = n("cnkX"),
        l = n("zcHd");
        function s(e) {
            return e && e.__esModule ? e: {
            default:
                e
            }
        }
        t.
    default = function(e) {
            var t = this,
            n = e || {};
            t.api = n.api,
            t.renderId = n.renderId,
            t.Pagination = {},
            t.DomState = {},
            t.Toast = {},
            t.apiOption = {},
            t.isLoad = !1,
            t.getSize = 0,
            o.
        default.call(t.Pagination),
            r.DomState.call(t.DomState),
            l.Toast.call(t.Toast),
            t.Get = function(e, n) {
                t.apiOption = e,
                t.getSize = e.size,
                t.getSize += 1,
                t.isLoad = !0,
                t.Pagination.loadState(!0),
                t.api({
                    params: (0, a.
                default)({},
                    e, {
                        size: t.getSize
                    })
                }).then(function(a) {
                    var o = a.data,
                    r = o.data,
                    l = void 0;
                    t.Then && t.Then(a),
                    "ok" === o.status ? (l = r.length, t.data = r, l ? (t.dataId = [r[0].id, r[l - 1].id], l < e.size ? t.Pagination.Set({
                        nextPage: 0
                    }) : t.Pagination.Set({
                        nextPage: 1
                    })) : t.Pagination.Set({
                        nextPage: 0,
                        prevPage: 0
                    }), t.Pagination.View(), r.splice(e.size, l), t.DomState.Ready(function() {
                        t.Pagination.wrap.style.display = l ? "block": "none",
                        (0, i.RenderView)(t.renderId, r)
                    }), n && n(r)) : t.Toast.Error(o["err-msg"]),
                    t.isLoad = !1,
                    t.Pagination.loadState(!1)
                })
            },
            t.Reset = function() {
                t.apiOption && (delete t.apiOption.from, delete t.apiOption.direct, delete t.apiOption.pageNow),
                t.Pagination.Set({
                    pageNow: 0
                })
            },
            t.DomState.Ready(function() {
                t.pagination = n.page && t.Pagination.Init(document.querySelector(n.page),
                function(e, n) {
                    t.apiOption.direct = e,
                    t.apiOption.pageNow = n,
                    t.apiOption.from = "prev" === e ? t.dataId[0] : t.dataId[1],
                    t.isLoad || t.Get(t.apiOption)
                }),
                t.Pagination.Set({
                    nextPage: 0,
                    prevPage: 0
                })
            })
        }
    },
    "5nIp": function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a, i = n("yjPH"),
        o = (a = i) && a.__esModule ? a: {
        default:
            a
        },
        r = n("cnkX"),
        l = n("f8yD");
        n("ek93"),
        t.
    default = function(e) {
            var t = this;
            t.Init = function() {
                t.tips = new r.Entity(o.
            default, "body"),
                t.elemIcon = t.tips.querySelector(".icon"),
                t.elemMsg = t.tips.querySelector(".msg"),
                t.Hide()
            },
            t.Show = function(e, n, a, i) {
                var o, r, s = (0, l.getOffset)(e),
                c = (e.offsetHeight, e.offsetWidth),
                u = void 0;
                switch (a = a || "center", t.elem = e, t.msg = n, t.visibility = 1, i ? t.elemMsg.innerText = n: t.elemMsg.innerHTML = n, t.tips.style.visibility = "visible", o = t.tips.offsetHeight, r = t.tips.offsetWidth, a) {
                case "left":
                    u = s.left + c + 10 - r + "px";
                    break;
                case "right":
                    u = s.left - 10 + "px";
                    break;
                default:
                    u = s.left + c / 2 - r / 2 + "px"
                }
                t.tips.style.left = u,
                t.tips.style.top = s.top - o - 3 + "px",
                t.tips.className = "component_tips tips_position_" + a
            },
            l.Event.add(window, "resize",
            function() {
                t.visibility && t.Show(t.elem, t.msg)
            }),
            t.Hide = function() {
                t.tips.style.visibility = "hidden",
                t.tips.style.top = "-999px",
                t.visibility = 0
            },
            t.Init()
        }
    },
    "7qVe": function(e, t) {},
    "9VC0": function(e, t) {},
    DjjW: function(e, t) {},
    EF3m: function(e, t) {},
    EwMI: function(e, t, n) {
        "use strict";
        var a, i, o = V(n("BO1k")),
        r = V(n("mvHQ")),
        l = V(n("pFYg")),
        s = V(n("hiCB")),
        c = V(n("fZjL")),
        u = V(n("//Fk")),
        d = V(n("Xxa5")),
        p = V(n("exGp")),
        m = V(n("d7EF")),
        f = (a = (0, p.
    default)(d.
    default.mark(function e() {
            var t, n, a, i;
            return d.
        default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                case 0:
                    if (!ue) {
                        e.next = 2;
                        break
                    }
                    return e.abrupt("return", ue);
                case 2:
                    return t = "PRO",
                    n = "ORDER_CONFIRM",
                    e.next = 6,
                    (0, b.storeGet)({
                        params: {
                            website: t,
                            store_key: n
                        }
                    });
                case 6:
                    if (a = e.sent, !(i = a.data).success || !i.data) {
                        e.next = 11;
                        break
                    }
                    return ue = i.data.store_value,
                    e.abrupt("return", "Y" === i.data.store_value);
                case 11:
                case "end":
                    return e.stop()
                }
            },
            e, this)
        })),
        function() {
            return a.apply(this, arguments)
        }),
        g = (i = (0, p.
    default)(d.
    default.mark(function e() {
            var t, n, a, i, p, f, g, T, I, D, P, V, W, J, K, re, le, ve, ye, be, he, ke, we, Le, Se, Ee, Te, xe, Ie, Oe, Me, Ne, Ae, De, qe, Ce, Pe, He, Re, Be, Fe, Ge, je, Ue, Ve, ze, Ye, Qe, We, Je, Ke, Ze, Xe;
            return d.
        default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                case 0:
                    return Xe = function() {
                        _e.Ready(function() {
                            var e = D.market.ticker.close,
                            t = (D.coin + "/" + D.quote).toUpperCase(),
                            n = (e = (0, _.Num)(e, le.precision.price || 0)) ? e + " " + t + " " + ie: t + " " + ie;
                            document.title = n
                        })
                    },
                    Ze = function(e, t) {
                        var n = e * ne;
                        ne && (n ? (t.style.cssText = "", t.innerHTML = "≈ " + (0, _.Num)(n, fe(n)) + " " + se) : (t.style.height = "0", t.innerHTML = ""))
                    },
                    Je = function e() {
                        if (!D.market.ticker.close) return setTimeout(e, 200);
                        var t = (0, r.
                    default)(D.market.ticker),
                        n = JSON.parse(t),
                        a = JSON.parse((0, r.
                    default)(D.market.dayKline));
                        n.close = (0, _.Num)(n.close, le.precision.price),
                        n.high = (0, _.Num)(a.high, le.precision.price),
                        n.low = (0, _.Num)(a.low, le.precision.price),
                        n.amount = (0, _.Num)(n.amount, 0),
                        n.myRate = $.rate,
                        n.symbol = (D.coin + "/" + D.quote).toUpperCase(),
                        n.coin = D.coin.toUpperCase(),
                        _e.Ready(function() {
                            _e.getElementById("tickerClose").innerHTML = n.close || "---",
                            (0, _.RenderView)("ticker_wrap", n),
                            We() && n.close && Qe(n.close)
                        })
                    },
                    We = function() {
                        return "object" === ("undefined" == typeof localStorage ? "undefined": (0, l.
                    default)(localStorage)) && localStorage.lang && ("zh-cn" === localStorage.lang || "zh-hk" === localStorage.lang),
                        !0
                    },
                    Qe = function e(t) {
                        if (!Ye) return setTimeout(function() {
                            return e(t)
                        },
                        300);
                        if ("usdt" === D.quote) ne = Ye;
                        else {
                            if (!A.
                        default.symbolDataObj[D.quote + "usdt"]) return;
                            if (!D.market.AllSymbolTicker[D.quote + "usdt"] || !D.market.AllSymbolTicker[D.quote + "usdt"].close) return setTimeout(function() {
                                return e(t)
                            },
                            300);
                            ne = Ye * D.market.AllSymbolTicker[D.quote + "usdt"].close
                        }
                        var n = (0, _.Num)((0, E.mul)(t, ne), fe((0, E.mul)(t, ne)));
                        _e.getElementById("tickerCny").innerHTML = "≈ " + n + " " + se,
                        _e.getElementById("tickerCny_ticker_bar").innerHTML = "≈ " + n + " " + se,
                        _e.formSellLimit && _.Event.trigger(_e.formSellLimit.price, "input"),
                        _e.formSellLimit && _.Event.trigger(_e.formBuyLimit.price, "input")
                    },
                    ze = function(e) { (0, b.getExchange)({
                            params: {
                                symbol: e
                            }
                        }).then(function(e) {
                            var n = e.data;
                            "ok" === n.status ? _e.Ready(function() {
                                le.limit.buyLimit.price.less = n.data["buy-limit-must-less-than"],
                                le.limit.buyLimit.amount.min = n.data["limit-order-must-greater-than"],
                                le.limit.buyLimit.amount.mgtMax = n.data["limit-order-must-less-than"],
                                le.limit.sellLimit.price.greater = n.data["sell-limit-must-greater-than"],
                                le.limit.sellLimit.amount.min = n.data["limit-order-must-greater-than"],
                                le.limit.sellLimit.amount.mgtMax = n.data["limit-order-must-less-than"],
                                le.limit.buyMarket.amount.min = n.data["market-buy-order-must-greater-than"],
                                le.limit.buyMarket.amount.mgtMax = n.data["market-buy-order-must-less-than"],
                                le.limit.sellMarket.amount.min = n.data["market-sell-order-must-greater-than"],
                                le.limit.sellMarket.amount.mgtMax = n.data["market-sell-order-must-less-than"],
                                _e.modTrade = _e.getElementById("mod_trade"),
                                _e.formTradeButton = _e.modTrade.querySelectorAll('button[type="submit"]'),
                                _e.formTradeButton.forEach(function(e) {
                                    e.disabled = !1
                                })
                            }) : "base-symbol-error" === n["err-code"] && (t.Error(n["err-msg"], 3e4), _e.Ready(function() {
                                _e.formTradeButton.forEach(function(e) {
                                    e.disabled = !0
                                })
                            }))
                        })
                    },
                    Ve = function(e, t, n, a) {
                        e.value = 1 * n && 1 * (1 * t).toFixed(void 0 === a ? le.precision.amount: a) ? (0, _.Num)((0, E.mul)(t, n / 100), void 0 === a ? le.precision.amount: a) : "",
                        _.Event.trigger(e, "input", "range")
                    },
                    Ue = function(e, t) {
                        return e && t ? (0, E.mul)(e, t) : 0
                    },
                    function(e, t) {
                        return new RegExp("^(([0-9]{1}\\d*)|([0]{1}))(\\.(\\d){0," + (t || 4) + "})?$").test(e)
                    },
                    Ae = function(e, t, n) {
                        e.Drag.redrag(1 * n && 1 * t ? n / t * 100 : 0)
                    },
                    Ne = function(e, n, a) {
                        var i = {
                            exchange: D.account.id,
                            margin: A.
                        default.marginBalance["account-id"]
                        };
                        if (i[z]) {
                            void 0 !== e.data.price && (e.data.price = (0, _.Num)(e.data.price, le.precision.price)),
                            e.data["account-id"] = i[z],
                            e.data.source = {
                                exchange: "web",
                                margin: "margin-web"
                            } [z],
                            a.disabled = !0;
                            var o = [_e.buyLimitMathPrice, _e.sellLimitMathPrice].map(function(e) {
                                return e.innerHTML
                            });
                            "Y" === ue ? F.
                        default.Open(e.data, A.
                        default.market.depth[PAGE_COIN + PAGE_QUOTE], o) : r(),
                            F.
                        default.Submit = function() {
                                r()
                            },
                            F.
                        default.callback(function(e) {
                                "close" === e.type && (a.disabled = !1)
                            })
                        } else console.warn("get account error");
                        function r() { (0, b.createOrder)(e).then(function(e) {
                                var i = e.data,
                                o = i.data;
                                "ok" === i.status ? (0, b.placeOrder)({
                                    path: {
                                        "order-id": o
                                    }
                                }).then(function(e) {
                                    var o = e.data;
                                    o.data;
                                    "ok" === o.status ? (t.Show(window.LANG.exchange["委托成功"] || "委托成功", 2e3), n.amount.value = "", _.Event.trigger(n.amount, "input"), y.UserAccount.Get(A.
                                default.currencyDataArr), (0, L.QueryOrderList)(le.queryOrderList, "openOrders"), (0, L.QueryHistoryOrderList)(le.queryHistoryOrderList, "orderHistory"), "margin" === z && Q(de)) : t.Error(i["err-msg"], 3e3),
                                    F.
                                default.Close(),
                                    a.disabled = !1
                                }) : t.Error(i["err-msg"], 3e3),
                                F.
                            default.Close(),
                                a.disabled = !1
                            })
                        }
                    },
                    Me = function() {
                        var e = this;
                        e.AuthNow = function(t) {
                            var n, a;
                            if ("price" === t || "amount" === t) return n = le.limit,
                            a = D.market.ticker,
                            function(i, o, r) {
                                var l = void 0,
                                s = (0, _.Hump)(r.FormDataCommon.type, "-"),
                                c = r.FormDataCommon.type.split("-"),
                                u = o.msg.errorMsg.split("|"),
                                d = n[s],
                                p = void 0,
                                m = void 0,
                                f = void 0,
                                g = void 0;
                                return "buy" === c[0] && ("price" === t && (p = d.price.min, m = (0, _.Num)(d.price.less * a.close, le.precision.price), f = parseInt(100 * d.price.less) + "%"), "amount" === t && (p = d.amount.min, m = Math.min(d.amount.max, d.amount.mgtMax))),
                                "sell" === c[0] && ("price" === t && (p = (0, _.Num)(d.price.greater * a.close, le.precision.price), m = d.price.max, g = parseInt(100 * d.price.greater) + "%"), "amount" === t && (p = d.amount.min, m = Math.min(d.amount.max, d.amount.mgtMax))),
                                i ? (p = (0, _.Num)(p, e.AuthInput.dataset.precision ? ve(e.AuthInput.dataset.precision) : le.precision[t]), m = (0, _.Num)(m, e.AuthInput.dataset.precision ? ve(e.AuthInput.dataset.precision) : le.precision[t]), 1 * i < 1 * p && (e.Msg = u[1].replace("%s", "sell" === c[0] && g || p), l = 3), 1 * i > 1 * m && (e.Msg = u[0].replace("%s", "buy" === c[0] && f || m), l = 3)) : l = 1,
                                l
                            }
                        },
                        e.Then = function(t, n) {
                            le.precision.price;
                            D.SubmitFormData = {},
                            "submit" === n.type ? (D.SubmitFormData = n.formData, D.SubmitFormInputs = n.inputs, D.SubmitFormButton = n.button, Ne({
                                data: n.formData
                            },
                            n.inputs, n.button)) : (te.Show(n.ele, '<i class="huobi_pro_warning"></i> ' + e.Msg), n.ele.focus(), _.dom.addClass(n.ele, "input_error"), n.ele.getAttribute("isBind") && _.Event.add(n.ele, "input",
                            function() {
                                te.Hide(),
                                _.dom.removeClass(n.ele, "input_error")
                            }), _.Event.add(n.ele, "blur",
                            function() {
                                te.Hide(),
                                _.dom.removeClass(n.ele, "input_error")
                            }), n.ele.setAttribute("isBind", 1))
                        }
                    },
                    Oe = function e() {
                        if (Ie) {
                            var t = "exchange" == z ? A.
                        default.balance:
                            A.
                        default.marginBalance;
                            if ("exchange" == z && !A.
                        default.balance.trade || "margin" == z && (!A.
                        default.marginBalance || !A.
                        default.marginBalance.trade)) return xe && clearTimeout(xe),
                            xe = setTimeout(e, 100);
                            D.formData.buyLimit.price ? le.limit.buyLimit.amount.max = +t.trade[D.quote.toLowerCase()] ? (0, _.Num)(t.trade[D.quote.toLowerCase()] / D.formData.buyLimit.price, le.precision.amount) : 0 : le.limit.buyLimit.amount.max = (0, _.Num)(0, le.precision.amount),
                            le.limit.sellLimit.amount.max = (0, _.Num)(t.trade[D.coin], le.precision.amount),
                            le.limit.buyMarket.amount.max = (0, _.Num)((0, _.Num)(t.trade[D.quote.toLowerCase()], A.
                        default.currencyDataObj[PAGE_QUOTE]["show-precision"]), ve("volumes")),
                            le.limit.sellMarket.amount.max = (0, _.Num)(t.trade[D.coin], le.precision.amount),
                            _e.Ready(function() {
                                _e.formBuyLimit.querySelector(".max_num").innerHTML = (0, _.Num)(le.limit.buyLimit.amount.max, le.precision.amount),
                                _e.formSellLimit.querySelector(".max_num").innerHTML = (0, _.Num)(le.limit.sellLimit.amount.max, le.precision.amount),
                                _e.formBuyMarket.querySelector(".max_num").innerHTML = (0, _.Num)(le.limit.buyMarket.amount.max, ve("volumes")),
                                _e.formSellMarket.querySelector(".max_num").innerHTML = (0, _.Num)(le.limit.sellMarket.amount.max, le.precision.amount),
                                Ae(Be, le.limit.buyLimit.amount.max, D.formData.buyLimit.amount),
                                Ae(Fe, le.limit.sellLimit.amount.max, D.formData.sellLimit.amount)
                            })
                        }
                    },
                    Te = function() {
                        _e.Ready(function() {
                            var e = _e.getElementById("otcGuide");
                            e && "object" === ("undefined" == typeof localStorage ? "undefined": (0, l.
                        default)(localStorage)) && localStorage.lang && "zh-cn" === localStorage.lang && (e.style.display = "block")
                        })
                    },
                    Ee = function(e) {
                        e.subbed || (0, w.Publish)(x.ACTIONS.__dayKlineSub, e)
                    },
                    Se = function(e) {
                        e.subbed || (0, w.Publish)(x.ACTIONS.__tickerSub, e)
                    },
                    Le = function(e) {
                        var t = e.info;
                        D.market.dayKline = t.tick,
                        Je()
                    },
                    we = function(e) {
                        var t = e.info;
                        D.market.ticker = t.tick,
                        Je(),
                        Xe()
                    },
                    ke = function() {
                        p.plugin((0, S.api)({
                            symbol: (D.coin + D.quote).toLowerCase()
                        }).sub().ticker(), Se),
                        p.plugin((0, S.api)({
                            symbol: (D.coin + D.quote).toLowerCase(),
                            period: "1day"
                        }).sub().kline(), Ee)
                    },
                    ve = function(e) {
                        var t = ee[(PAGE_COIN + PAGE_QUOTE).toLowerCase()] || s.
                    default;
                        return Math.min(t, le.precision[e])
                    },
                    I = function(e) {
                        var t = document.querySelector("#depth_chart"),
                        n = _.dom.hasClass(document.querySelector("html"), "hb-night") ? "hb-night": "hb-day";
                        e.subbed || (T || (t.innerHTML = "", T = (0, C.
                    default)("depth_chart", {
                            priceFix: A.
                        default.symbolDataObj[f]["trade-price-precision"],
                            amountFix: A.
                        default.symbolDataObj[f]["trade-amount-precision"],
                            lang: localStorage.lang.toLowerCase(),
                            theme: n
                        })), T.putData(e.tick))
                    },
                    e.next = 23,
                    j.
                default.symbols(Y);
                case 23:
                    return e.next = 25,
                    j.
                default.margin(Y);
                case 25:
                    return e.next = 27,
                    j.
                default.currencyinfo(Y);
                case 27:
                    return e.t0 = e.sent,
                    e.next = 30,
                    u.
                default.all[e.t0];
                case 30:
                    if (t = new q.Toast, n = A.
                default.symbolDataObj["exchange" == z ? A.
                default.symbolDataArr[0]:
                    A.
                default.marginDataArr[0]], a = "exchange" == z ? A.
                default.symbolDataObj:
                    A.
                default.marginDataObj, i = localStorage[Z] ? localStorage[Z].split("_") : null, PAGE_SYMBOL_ARR[0] && PAGE_SYMBOL_ARR[1] ? (window.PAGE_COIN = PAGE_SYMBOL_ARR[0].toLowerCase(), window.PAGE_QUOTE = PAGE_SYMBOL_ARR[1].toLowerCase()) : (window.PAGE_COIN = i ? i[0] : n["base-currency"], window.PAGE_QUOTE = i ? i[1] : n["quote-currency"], a[window.PAGE_COIN + window.PAGE_QUOTE] || (window.PAGE_COIN = n["base-currency"], window.PAGE_QUOTE = n["quote-currency"]), window.location.hash = "#" + window.PAGE_COIN + "_" + window.PAGE_QUOTE), _e.Ready(ge), p = S.operator.handsup(v.API_ENV.ws), f = (PAGE_COIN + PAGE_QUOTE).toLowerCase(), g = (0, S.api)({
                        symbol: f
                    }).sub().depth({
                        step: "percent10"
                    }), T = null, !(0, c.
                default)("exchange" == z ? A.
                default.symbolDataObj:
                    A.
                default.marginDataObj).filter(function(e) {
                        return ! ("exchange" == z ? A.
                    default.symbolDataObj:
                        A.
                    default.marginDataObj)[e].delist
                    }).includes((PAGE_COIN + PAGE_QUOTE).toLowerCase()) ? window.location.href = "/": localStorage.setItem(Z, PAGE_COIN + "_" + PAGE_QUOTE), _e.Ready(function() {
                        _.Event.add(window, "resize",
                        function() {
                            return T && T.forceUpdate()
                        }),
                        (0, w.Subscribe)("__changeTheme",
                        function(e) {
                            T && T.initTheme(e.info),
                            T && T.forceUpdate()
                        }),
                        p.plugin(g, I)
                    }), D = {
                        symbol_config: A.
                    default.symbolDataObj[(PAGE_COIN + PAGE_QUOTE).toLowerCase()],
                        imgCaptcha: {},
                        loginData: {},
                        loginControl: {},
                        account: {},
                        quote: PAGE_QUOTE,
                        coin: PAGE_COIN,
                        orderList: [],
                        auth: {
                            trade: {}
                        },
                        formData: {
                            buyLimit: {},
                            sellLimit: {},
                            buyMarket: {},
                            sellMarket: {}
                        },
                        formCache: {
                            buyLimit: {},
                            sellLimit: {},
                            buyMarket: {},
                            sellMarket: {},
                            buy: {},
                            sell: {}
                        },
                        market: {
                            AllSymbolTicker: {},
                            depth: {},
                            ticker: {},
                            dayKline: {}
                        },
                        SubmitFormData: {}
                    },
                    P = h.huobiResolution.get(), V = (0, m.
                default)(P, 2), W = V[0], J = void 0 === W ? "15min": W, K = V[1], re = void 0 === K ? 1 : K, _e.Ready(function() {
                        window.tvWidget = new k.
                    default({
                            ws:
                            p.info,
                            base: top.PAGE_COIN,
                            quote: top.PAGE_QUOTE,
                            period: J,
                            chartType: re,
                            props: {
                                library_path: "/charting_library/",
                                fullscreen: !1,
                                width: "100%",
                                height: 480
                            },
                            cssfile: "hb-night" === (0, R.get)() ? "/charting_library/static/night.css": "/charting_library/static/day.css",
                            themeName: (0, R.get)(),
                            symbols: [D.symbol_config],
                            lang: localStorage.getItem("lang").substr(0, 2)
                        })
                    }), (le = {
                        precision: {
                            price: D.symbol_config["trade-price-precision"],
                            amount: D.symbol_config["trade-amount-precision"],
                            volumes: D.symbol_config["trade-total-precision"],
                            fee: D.symbol_config["fee-precision"]
                        },
                        range: {
                            buyLimit: 0,
                            sellLimit: 0,
                            buyMarket: 0,
                            sellMarket: 0
                        },
                        queryOrderList: {
                            size: 11,
                            symbol: D.coin + D.quote,
                            states: "submitted,partial-filled",
                            types: "",
                            quote: D.quote,
                            coin: D.coin
                        },
                        queryHistoryOrderList: {
                            size: 11,
                            symbol: D.coin + D.quote,
                            states: "partial-canceled,filled,canceled",
                            types: "",
                            quote: D.quote,
                            coin: D.coin
                        },
                        symbol: PAGE_COIN + PAGE_QUOTE,
                        size: 11
                    }).limit = {
                        buyLimit: {
                            price: {
                                min: 1 * (0, _.Num)(Math.pow(.1, le.precision.price), le.precision.price),
                                less: 1.1
                            },
                            amount: {
                                min: .001,
                                max: 1e4,
                                mgtMax: 1e4
                            }
                        },
                        sellLimit: {
                            price: {
                                greater: .9,
                                max: 99999
                            },
                            amount: {
                                min: .001,
                                max: 1e4,
                                mgtMax: 1e4
                            }
                        },
                        buyMarket: {
                            amount: {
                                min: 1 * (0, _.Num)(Math.pow(.1, le.precision.price), le.precision.price),
                                max: 1e3,
                                mgtMax: 1e4
                            }
                        },
                        sellMarket: {
                            amount: {
                                min: .001,
                                max: 1e4,
                                mgtMax: 1e4
                            }
                        },
                        circuitBreak: {
                            less: 10,
                            greater: 100,
                            rate: 0
                        }
                    },
                    (0, L.setBuyMarketPrecision)(ve("volumes")), top.window.SYMBOLDATA = {
                        accuracy: {}
                    },
                    (0, w.Subscribe)("__getUserAccount",
                    function(e) {
                        D.account = A.
                    default.account[A.
                    default.useAccountId]
                    }), (0, w.Subscribe)("__getUserBalance",
                    function(e) {
                        var t = e.info,
                        n = !1;
                        for (var a in _e.Ready(function() { (0, _.Inner)(".buy_available", (0, _.Num)(t.trade[D.quote], A.
                        default.currencyDataObj[PAGE_QUOTE]["show-precision"])),
                            (0, _.Inner)(".sell_available", (0, _.Num)(t.trade[D.coin], A.
                        default.currencyDataObj[PAGE_COIN]["show-precision"]))
                        }), t.total) 1 * t.total[a] && (n = !0);
                        n || "exchange" !== TRADE_TYPE || _.cookies.get("otc_login_guide") || Te(),
                        Oe()
                    }), (0, w.Subscribe)("__allSymbolTicker",
                    function(e) {
                        var t = e.info.ch.split(".")[1];
                        D.market.AllSymbolTicker[t] = D.market.AllSymbolTicker[t] ? D.market.AllSymbolTicker[t] : {},
                        D.market.AllSymbolTicker[t] = e.info.tick
                    }), (0, w.Subscribe)("__allSymbolDayKline",
                    function(e) {
                        var t = e.info,
                        n = t.ch.split(".")[1];
                        D.market.AllSymbolTicker[n] = D.market.AllSymbolTicker[n] ? D.market.AllSymbolTicker[n] : {},
                        D.market.AllSymbolTicker[n] = t.tick;
                        var a = (t.tick.close - t.tick.open) / t.tick.open * 100,
                        i = 1 * (0, _.Num)(a, 2) ? (0, _.Num)(a, 2) : (0, _.Num)(0, 2),
                        o = (1 * i > 0 ? "+": "") + i + "%";
                        n == PAGE_COIN + PAGE_QUOTE && ($.rate = {
                            showRate: o,
                            rate: 1 * i
                        },
                        Je())
                    }), (0, w.Subscribe)("__userIsLogin",
                    function(e) {
                        e.info ? (be(), ze(D.coin + D.quote), ye(!0)) : ye()
                    }), ye = function(e) {
                        _e.Ready(function() {
                            var t = _e.getElementById("open_orders_scroll"),
                            n = _e.getElementById("order_history_scroll");
                            e ? (t && (t.style.display = "block"), n && (n.style.display = "block")) : (t && (t.style.display = "none"), n && (n.style.display = "none"))
                        })
                    },
                    function(e, t) {
                        return e.currentStyle ? e.currentStyle[t] : window.getComputedStyle(e, null)[t]
                    },
                    be = function() {
                        for (var e = A.
                    default.symbolData,
                        t = 0,
                        n = e.length; t < n; t++) {
                            var a = e[t]["symbol-name"].replace("/", "").toLowerCase();
                            top.window.SYMBOLDATA[a] = e[t]["symbol-name"],
                            top.window.SYMBOLDATA.accuracy[a.toLowerCase()] = {
                                fee: e[t]["fee-precision"],
                                amount: e[t]["trade-amount-precision"],
                                price: e[t]["trade-price-precision"],
                                total: e[t]["trade-total-precision"]
                            }
                        }
                        he()
                    },
                    void 0, he = function(e) { (0, L.QueryOrderList)(le.queryOrderList, "openOrders"),
                        (0, L.QueryHistoryOrderList)(le.queryHistoryOrderList, "orderHistory"),
                        setInterval(function() {
                            0 == top.window.PAGECONFIG.openOrders.page && (delete le.queryOrderList.from, delete le.queryOrderList.direct, (0, L.QueryOrderList)(le.queryOrderList, "openOrders")),
                            0 == top.window.PAGECONFIG.orderHistory.page && (delete le.queryHistoryOrderList.from, delete le.queryHistoryOrderList.direct, (0, L.QueryHistoryOrderList)(le.queryHistoryOrderList, "orderHistory"))
                        },
                        5e3)
                    },
                    (0, w.Subscribe)("__tickerSub", we), (0, w.Subscribe)("__dayKlineSub", Le), ke(),
                    function e(t) {
                        var n, a = "[object Array]" === Object.prototype.toString.call(t) ? [] : {};
                        if ("object" === (void 0 === t ? "undefined": (0, l.
                    default)(t))) {
                            if (window.JSON) n = (0, r.
                        default)(t),
                            a = JSON.parse(n);
                            else for (var i in t) a[i] = "object" === (0, l.
                        default)(t[i]) ? e(t[i]) : t[i];
                            return a
                        }
                    },
                    (0, w.Subscribe)("__userIsLogin",
                    function(e) {
                        Ie = e.info
                    }), De = new M.
                default, (qe = new M.
                default).Then = function(e) {
                        te.Hide(),
                        Ge.Drag.setInit(),
                        je.Drag.setInit(),
                        Be.Drag.redrag(0, "reset"),
                        Fe.Drag.redrag(0, "reset"),
                        Ge.Drag.redrag(0, "reset"),
                        je.Drag.redrag(0, "reset"),
                        e && _e.formBuyLimit.price && _e.formBuyLimit.price.setAttribute("force", 1)
                    },
                    Ce = (0, N.
                default)(), Pe = (0, N.
                default)(), He = (0, N.
                default)(), Re = (0, N.
                default)(), Be = (0, N.
                default)(), Fe = (0, N.
                default)(), Ge = (0, N.
                default)(), je = (0, N.
                default)(), 1, e.t1 = !ce, !e.t1) {
                        e.next = 82;
                        break
                    }
                    return e.next = 81,
                    (0, U.shortestWay)("usdt_" + se);
                case 81:
                    e.t1 = e.sent;
                case 82:
                    Ye = e.t1,
                    _e.Ready(function() {
                        pe() || (document.querySelector("#chartMask").style.display = "none");
                        _e.sbq = _e.querySelectorAll('span[unit="show_buy_quote"]');
                        var e = !0,
                        t = !1,
                        n = void 0;
                        try {
                            for (var a, i = (0, o.
                        default)(_e.sbq); ! (e = (a = i.next()).done); e = !0) {
                                a.value.innerHTML = D.quote
                            }
                        } catch(e) {
                            t = !0,
                            n = e
                        } finally {
                            try { ! e && i.
                                return && i.
                                return ()
                            } finally {
                                if (t) throw n
                            }
                        }
                        _e.ssq = _e.querySelectorAll('span[unit="show_sell_quote"]');
                        var r = !0,
                        l = !1,
                        s = void 0;
                        try {
                            for (var c, u = (0, o.
                        default)(_e.ssq); ! (r = (c = u.next()).done); r = !0) {
                                c.value.innerHTML = D.quote
                            }
                        } catch(e) {
                            l = !0,
                            s = e
                        } finally {
                            try { ! r && u.
                                return && u.
                                return ()
                            } finally {
                                if (l) throw s
                            }
                        }
                        _e.sbq_logout = _e.querySelectorAll('span[unit="show_buy_quote_logout"]');
                        var d = !0,
                        p = !1,
                        m = void 0;
                        try {
                            for (var f, g = (0, o.
                        default)(_e.sbq_logout); ! (d = (f = g.next()).done); d = !0) {
                                f.value.innerHTML = D.quote
                            }
                        } catch(e) {
                            p = !0,
                            m = e
                        } finally {
                            try { ! d && g.
                                return && g.
                                return ()
                            } finally {
                                if (p) throw m
                            }
                        }
                        _e.ssq_logout = _e.querySelectorAll('span[unit="show_sell_quote_logout"]');
                        var v = !0,
                        _ = !1,
                        y = void 0;
                        try {
                            for (var b, h = (0, o.
                        default)(_e.ssq_logout); ! (v = (b = h.next()).done); v = !0) {
                                b.value.innerHTML = D.quote
                            }
                        } catch(e) {
                            _ = !0,
                            y = e
                        } finally {
                            try { ! v && h.
                                return && h.
                                return ()
                            } finally {
                                if (_) throw y
                            }
                        }
                    }),
                    _e.Ready(function() {
                        qe.Init(document.getElementById("mod_trade")),
                        De.Init(document.getElementById("mod_trade_logout")),
                        _e.formBuyLimit = _e.getElementById("form_buy_limit"),
                        _e.formSellLimit = _e.getElementById("form_sell_limit"),
                        _e.formBuyMarket = _e.getElementById("form_buy_market"),
                        _e.formSellMarket = _e.getElementById("form_sell_market"),
                        _e.marginAccount = _e.querySelector("#margin_account"),
                        _e.marginHbQuote = _e.querySelector("#margin_hb_quote"),
                        _e.marginHbBase = _e.querySelector("#margin_hb_base"),
                        _e.marginHbQuote1 = _e.querySelector("#margin_hb_quote1"),
                        _e.marginHbBase1 = _e.querySelector("#margin_hb_base1"),
                        _e.marginAccounts = {
                            coin: (0, _.nodes2array)(_e.marginAccount.querySelectorAll("span")),
                            percent: _e.marginAccount.querySelector("p.percent"),
                            riskVal: _e.marginAccount.querySelector("i.risk_val"),
                            fire: _e.marginAccount.querySelector("b")
                        },
                        _e.formPrice = _e.querySelectorAll("input[name='price']"),
                        _e.depositLimitQuote = _e.querySelector("#deposit_limit_quote"),
                        _e.depositLimitCoin = _e.querySelector("#deposit_limit_coin"),
                        _e.depositMarketQuote = _e.querySelector("#deposit_market_quote"),
                        _e.depositMarketCoin = _e.querySelector("#deposit_market_coin"),
                        _e.totalBalance = _e.querySelector("#total_balance"),
                        _e.totalBalanceToLogin = _e.querySelector("#total_balance_to_login"),
                        _e.buyLimitMathPrice = _e.querySelector("#buy_limit_math_price"),
                        _e.sellLimitMathPrice = _e.querySelector("#sell_limit_math_price"),
                        "margin" == z && _.cookies.get("HB-PRO-TOKEN") && (_e.marginAccount.style.display = "block", _e.marginHbQuote.style.display = "none", _e.marginHbBase.style.display = "none", _e.marginHbQuote1.style.display = "none", _e.marginHbBase1.style.display = "none"),
                        A.
                    default.currencyDataObj[PAGE_COIN]["deposit-enabled"] && (_e.depositLimitCoin.style.display = "", _e.depositMarketCoin.style.display = ""),
                        A.
                    default.currencyDataObj[PAGE_QUOTE]["deposit-enabled"] && (_e.depositLimitQuote.style.display = "", _e.depositMarketQuote.style.display = ""),
                        _.cookies.get("HB-PRO-TOKEN") ? _e.totalBalance.style.display = "": _e.totalBalanceToLogin.style.display = "";
                        var e = new O.FormValidator({
                            form: _e.formBuyLimit
                        }),
                        t = new O.FormValidator({
                            form: _e.formSellLimit
                        }),
                        n = new O.FormValidator({
                            form: _e.formBuyMarket
                        }),
                        a = new O.FormValidator({
                            form: _e.formSellMarket
                        });
                        function i(e, t) {
                            var n = function(e, t) {
                                var n = {
                                    buyLimit: {
                                        price: "price",
                                        amount: "amount"
                                    },
                                    sellLimit: {
                                        price: "price",
                                        amount: "amount"
                                    },
                                    buyMarket: {
                                        amount: "volumes"
                                    },
                                    sellMarket: {
                                        amount: "amount"
                                    }
                                };
                                return "volumes" == n[e][t] ? ve("volumes") : le.precision[n[e][t]]
                            } (e, t),
                            a = (D.formData[e][t] + "").split("."),
                            i = a[1] ? a[1].length: 0,
                            o = void 0;
                            return o = isNaN(D.formData[e][t]) ? D.formCache[e][t] || "": i > n ? (0, _.Num)(D.formData[e][t], n) : D.formData[e][t],
                            D.formCache[e][t] = o,
                            D.formData[e][t] = o,
                            o
                        }
                        function o(e, t) {
                            e.querySelector("span").innerHTML = (0, _.Num)(t, ve("volumes")) + " " + D.quote.toUpperCase()
                        }
                        Me.call(e),
                        Me.call(t),
                        Me.call(n),
                        Me.call(a),
                        _.Event.add(_e.formBuyLimit, "input",
                        function(t) {
                            D.formData.buyLimit = e.GetData(e.Inputs)[0],
                            t.info || (_e.formBuyLimit.price.value = i("buyLimit", "price"), _e.formBuyLimit.amount.value = i("buyLimit", "amount"), Ae(Be, le.limit.buyLimit.amount.max, D.formData.buyLimit.amount)),
                            Oe(),
                            Ze(_e.formBuyLimit.price.value, _e.buyLimitMathPrice),
                            o(_e.getElementById("buy_total"), Ue(D.formData.buyLimit.price, D.formData.buyLimit.amount))
                        }),
                        _.Event.add(_e.formSellLimit, "input",
                        function(e) {
                            D.formData.sellLimit = t.GetData(t.Inputs)[0],
                            e.info || (_e.formSellLimit.price.value = i("sellLimit", "price"), _e.formSellLimit.amount.value = i("sellLimit", "amount"), Ae(Fe, le.limit.sellLimit.amount.max, D.formData.sellLimit.amount)),
                            Ze(_e.formSellLimit.price.value, _e.sellLimitMathPrice),
                            o(_e.getElementById("sell_total"), Ue(D.formData.sellLimit.price, D.formData.sellLimit.amount))
                        }),
                        _.Event.add(_e.formBuyMarket, "input",
                        function(e) {
                            D.formData.buyMarket = n.GetData(n.Inputs)[0],
                            e.info || (_e.formBuyMarket.amount.value = i("buyMarket", "amount"), Ae(Ge, le.limit.buyMarket.amount.max, D.formData.buyMarket.amount))
                        }),
                        _.Event.add(_e.formSellMarket, "input",
                        function(e) {
                            D.formData.sellMarket = a.GetData(a.Inputs)[0],
                            e.info || (_e.formSellMarket.amount.value = i("sellMarket", "amount"), Ae(je, le.limit.sellMarket.amount.max, D.formData.sellMarket.amount))
                        }),
                        Ce.Init(_e.querySelector(".logout_limit_buy"), !0),
                        Pe.Init(_e.querySelector(".logout_limit_sell"), !0),
                        He.Init(_e.querySelector(".logout_market_buy"), !0),
                        Re.Init(_e.querySelector(".logout_market_sell"), !0),
                        Be.Init(_e.formBuyLimit.querySelector(".input_range")),
                        Be.Then("fn_buyLimitRange",
                        function(e, t) {
                            le.range.buyLimit = e,
                            "data" !== t && Ve(_e.formBuyLimit.amount, le.limit.buyLimit.amount.max, e)
                        }),
                        Fe.Init(_e.formSellLimit.querySelector(".input_range")),
                        Fe.Then("fn_sellLimitRange",
                        function(e, t) {
                            le.range.sellLimit = e,
                            "data" !== t && Ve(_e.formSellLimit.amount, le.limit.sellLimit.amount.max, e)
                        }),
                        Ge.Init(_e.formBuyMarket.querySelector(".input_range")),
                        Ge.Then("fn_buyMarketRange",
                        function(e, t) {
                            le.range.buyMarket = e,
                            "data" !== t && Ve(_e.formBuyMarket.amount, le.limit.buyMarket.amount.max, e, ve("volumes"))
                        }),
                        je.Init(_e.formSellMarket.querySelector(".input_range")),
                        je.Then("fn_sellMarketRange",
                        function(e, t) {
                            le.range.sellMarket = e,
                            "data" !== t && Ve(_e.formSellMarket.amount, le.limit.sellMarket.amount.max, e)
                        })
                    }),
                    _e.Ready(function() {
                        for (var e = _e.querySelectorAll(".l_show_btn"), t = (_e.querySelectorAll(".l_show_box"), _e.querySelectorAll(".l_tab_transac")), n = 0, a = e.length; n < a; n++) e[n].index = n,
                        _.Event.add(e[n], "click",
                        function(e) {
                            this.index;
                            var t = this.parentNode;
                            _.dom.hasClass(t, "z_active") ? _.dom.removeClass(t, "z_active") : _.dom.addClass(t, "z_active")
                        });
                        for (n = 0, a = t.length; n < a; n++) t[n].index = n,
                        _.Event.add(t[n], "click",
                        function(e) {
                            var t = _.Event.target(e),
                            n = (0, _.attFather)(t, "data-type"),
                            a = this.index,
                            i = this.querySelectorAll("li"),
                            o = n && "all" == n.attr ? "": n && "buy" == n.attr ? "buy-market,buy-limit": "sell-market,sell-limit";
                            if (n && n.attr) {
                                for (var r = 0,
                                l = i.length; r < l; r++) _.dom.removeClass(i[r], "z_active");
                                _.dom.addClass(n.node, "z_active"),
                                a ? (le.queryHistoryOrderList.types = o, (0, L.QueryHistoryOrderList)({
                                    symbol: le.symbol,
                                    size: le.size,
                                    types: o,
                                    quote: D.quote,
                                    coin: D.coin
                                },
                                "orderHistory")) : (le.queryOrderList.types = o, (0, L.QueryOrderList)({
                                    symbol: le.symbol,
                                    size: le.size,
                                    types: o,
                                    quote: D.quote,
                                    coin: D.coin
                                },
                                "openOrders"))
                            }
                        });
                        _e.getElementById("order_history").style.display = "block",
                        _e.Ready(function() {
                            var e;
                            e = "notice_list",
                            (0, b.notice)({
                                params: {
                                    language: localStorage.lang ? localStorage.lang.toLowerCase() : "en-us"
                                }
                            }).then(function(t) {
                                var n = t.data;
                                if (n.success && n.data) {
                                    D.topNoticeList = n.data.top_notice_list;
                                    for (var a = 0; a < D.topNoticeList.length; a++) D.topNoticeList[a].times = (0, _.time2Date)(D.topNoticeList[a].created); (0, _.RenderView)(e, D.topNoticeList)
                                }
                            }),
                            _e.notice_list = _e.querySelector("#notice_list"),
                            _.Event.add(_e.notice_list, "click",
                            function(e) {
                                var t = (0, _.attFather)(_.Event.target(e), "data-href-id");
                                if (t) {
                                    var n = "/notice_detail/?id=" + t.attr;
                                    window.location.href = n
                                }
                            })
                        });
                        var i = _e.getElementById("coin_detail_in"); (0, b.coinDetail)({
                            params: {
                                currency: D.coin,
                                lang: localStorage.lang || "en-us"
                            }
                        }).then(function(e) {
                            var t = e.data;
                            t.success && t.data && (i.innerHTML = (0, _.TmpL)("coin_detail_tmp", {
                                fullName: t.data.fullName,
                                summary: t.data.summary,
                                publishTime: t.data.publishTime,
                                publishVolume: t.data.publishVolume,
                                circulateVolume: t.data.circulateVolume,
                                crowdfundingPrice: t.data.crowdfundingPrice,
                                whitePaper: t.data.whitePaper,
                                officialWebsite: t.data.officialWebsite,
                                blockQuery: t.data.blockQuery
                            }))
                        })
                    }),
                    _e.Ready(function() {
                        ae || (ae = (0, H.coinSwitch)({
                            key: localStorage.getItem(X)
                        }))
                    }),
                    _e.Ready(function() { (0, B.market_trade_fire)(),
                        (0, G.order_book_fire)(),
                        "exchange" !== TRADE_TYPE || _.cookies.get("HB-PRO-TOKEN") || _.cookies.get("otc_guide") || Te(),
                        [].forEach.call(_e.querySelectorAll(".mod_show_btn"),
                        function(e) {
                            var t = 0;
                            _.Event.add(e, "click",
                            function(e) {
                                var n = _.Event.target(e),
                                a = (0, _.classFather)(n, "mod", !0);
                                t = t || a.offsetHeight,
                                a.style.height = t + "px",
                                _.dom.hasClass(a, "hide") ? _.dom.removeClass(a, "hide") : _.dom.addClass(a, "hide"),
                                setTimeout(function() {
                                    return a.style.height = ""
                                },
                                150)
                            })
                        })
                    }),
                    Ke = {},
                    (0, _.J)(me, Ke),
                    _.Event.add(document, "click",
                    function(e) {
                        var t = _.Event.target(e),
                        n = (0, _.attFather)(t, "action"),
                        a = (0, _.attFather)(t, "stop"),
                        i = (0, _.attFather)(t, "data-currency");
                        a && _.Event.stop(e),
                        n && Ke[n.attr] && Ke[n.attr](n.node, i && i.attr),
                        !n && Ke.showChartMask()
                    }),
                    _.Event.add(document, "click",
                    function(e) {
                        var t = _.Event.target(e).dataset.action,
                        n = location.pathname;
                        t && _.Event.stop(e),
                        "go_login" == t && (location.href = "/login/?backUrl=" + n),
                        "go_register" == t && (location.href = "/register/?backUrl=" + n)
                    }),
                    (0, _.AnimationFactory)(function() {
                        if (ae && Ye && (ae.usdrate = Ye), "margin" == z && _e.marginAccounts) {
                            if (oe++%(0, _.fps2second)(10)) return;
                            var e;
                            Oe(),
                            _e.marginAccounts.coin[0].innerHTML = A.
                        default.marginBalance.trade ? (0, _.Num)(A.
                        default.marginBalance.trade[PAGE_QUOTE], A.
                        default.currencyDataObj[PAGE_QUOTE]["show-precision"]):
                            (0, _.Num)(0, A.
                        default.currencyDataObj[PAGE_QUOTE]["show-precision"]),
                            _e.marginAccounts.coin[1].innerHTML = A.
                        default.marginBalance.trade ? (0, _.Num)(A.
                        default.marginBalance.trade[PAGE_COIN], A.
                        default.currencyDataObj[PAGE_COIN]["show-precision"]):
                            (0, _.Num)(0, A.
                        default.currencyDataObj[PAGE_COIN]["show-precision"]),
                            e = !A.
                        default.marginBalance["fl-price"] || 1 * A.
                        default.marginBalance.loan[PAGE_COIN] == 0 && 1 * A.
                        default.marginBalance.loan[PAGE_QUOTE] == 0 ? _e.marginAccounts.coin[2].dataset.text: 1 * A.
                        default.marginBalance["fl-price"] == 0 ? 0 : (0, _.Num)(A.
                        default.marginBalance["fl-price"], le.precision.price),
                            _e.marginAccounts.coin[2].innerHTML = e,
                            A.
                        default.marginBalance["risk-rate"] ? A.
                        default.marginFlState[A.
                        default.marginBalance.state] ? (_e.marginAccounts.percent.style.display = "none", _e.marginAccounts.fire.style.display = "block") : (_e.marginAccounts.percent.style.display = "", _e.marginAccounts.fire.style.display = "none", A.
                        default.marginBalance["risk-rate"] >= 1.1 ? _e.marginAccounts.percent.style.width = (A.
                        default.marginBalance["risk-rate"] - 1.1) / .9 * 100 + "%": _e.marginAccounts.percent.style.width = 0, _e.marginAccounts.riskVal.innerHTML = A.
                        default.marginBalance["risk-rate"] >= 2 ? _e.marginAccounts.riskVal.dataset.text: (0, _.Num)(100 * A.
                        default.marginBalance["risk-rate"], 0) + "%") : (_e.marginAccounts.percent.style.display = "", _e.marginAccounts.fire.style.display = "none", _e.marginAccounts.percent.style.width = "100%", _e.marginAccounts.riskVal.innerHTML = _e.marginAccounts.riskVal.dataset.text)
                        }
                    }),
                    Oe(),
                    _e.Ready(function() {
                        var e = document.querySelector("#exchange_image"),
                        t = e.querySelectorAll("img"); [].forEach.call(t,
                        function(e) {
                            return e.src = e.dataset.src
                        }),
                        "exchange" === z && (e.style.display = "block")
                    }),
                    (0, w.Publish)(x.ACTIONS.__ready, {
                        needTicket: !1
                    });
                case 96:
                case "end":
                    return e.stop()
                }
            },
            e, this)
        })),
        function() {
            return i.apply(this, arguments)
        });
        n("Ic2Y"),
        n("yAsf"),
        n("46Hv"),
        n("a87q"),
        n("xwFI");
        var v = n("YtCS"),
        _ = n("f8yD"),
        y = n("KbPw"),
        b = n("RxF2"),
        h = n("OZWX"),
        k = V(h),
        w = n("4AVY"),
        L = n("MtvX"),
        S = n("++vu"),
        E = n("aVmh"),
        T = n("uP4w"),
        x = n("wB0j"),
        I = (V(n("mtWM")), n("cnkX")),
        O = n("jDvB"),
        M = V(n("GwTv")),
        N = V(n("tr5V")),
        A = V(n("n4zI")),
        D = (V(n("5hcz")), V(n("5nIp"))),
        q = n("zcHd"),
        C = V(n("AZ/z")),
        P = V(n("ESbV")),
        H = n("g0O3"),
        R = n("3uwR"),
        B = (V(n("/j7V")), n("op9/")),
        F = V(n("SAd4")),
        G = n("3Op6"),
        j = V(n("NUe0")),
        U = n("bI2Y");
        function V(e) {
            return e && e.__esModule ? e: {
            default:
                e
            }
        }
        var z = window.PAGE_NAME || "exchange",
        Y = {
            checked: 1
        };
        function Q(e, t) {
            var n = t || 0,
            a = [1e3, 3e3, 1e4];
            a[n] && setTimeout(function() {
                e(),
                Q(e, ++n)
            },
            a[n])
        }
        window.zEmbed = 1;
        var W, J = {
            margin: {
                cookies_hash: "HBP_MARGIN_SYMBOLS_HASH",
                cookies_filter: "HBP_MARGIN_SYMBOLS_FILTER"
            },
            exchange: {
                cookies_hash: "HBP_SYMBOLS_HASH",
                cookies_filter: "HBP_SYMBOLS_FILTER"
            }
        },
        K = {
            innovation: "NEW_ZONE",
            profession: "PRO_ZONE",
            bifurcation: "FORK_ZONE",
            ht: "HT"
        },
        Z = J[z].cookies_hash,
        X = J[z].cookies_filter,
        $ = {
            rate: "---"
        },
        ee = {
            ethbtc: 6,
            etcbtc: 6,
            ltcbtc: 6,
            bccbtc: 6
        },
        te = (S.operator.handsup(v.API_ENV.ws), new D.
    default),
        ne = void 0,
        ae = void 0,
        ie = document.title,
        oe = 0,
        re = localStorage.getItem("exchangeRate"),
        le = re ? re.split("/") : "cny",
        se = (0, m.
    default)(le, 1)[0],
        ce = "none" === se,
        ue = void 0;
        function de() { (0, b.marginBalance)().then(function(e) {
                var t = e.data,
                n = 2;
                "ok" === t.status && (A.
            default.marginBalanceTotal = {},
                t.data.forEach(function(e) {
                    e.symbol === PAGE_COIN + PAGE_QUOTE && (A.
                default.marginBalance = function(e) {
                        var t = v.loanTemplate;
                        e ? (t["fl-price"] = e["fl-price"], t["account-id"] = e.id, t["risk-rate"] = e["risk-rate"] >= 2 ? 2 : e["risk-rate"], t.state = e.state, e.list.forEach(function(e) {
                            t[e.type][e.currency] = e.balance
                        })) : [PAGE_COIN, PAGE_QUOTE].forEach(function(e) {
                            t.trade[e] = 0,
                            t.frozen[e] = 0,
                            t.loan[e] = 0,
                            t.interest[e] = 0,
                            t["loan-available"][e] = 0,
                            t["transfer-out-available"][e] = 0
                        });
                        return t
                    } (e), n = 1 * A.
                default.marginBalance["risk-rate"] || 2),
                    e && e.list.forEach(function(e) {
                        A.
                    default.marginBalanceTotal[e.currency] = A.
                    default.marginBalanceTotal[e.currency] || 0,
                        ["trade", "loan", "frozen", "interest"].forEach(function(t) {
                            e.type == t && (A.
                        default.marginBalanceTotal[e.currency] += 1 * e.balance)
                        })
                    })
                }), oe = 0, n < 1.1 && (n = 1.1), n > 2 && (n = 2), n = 3 + 7 * (1 - (2 - n) / .9), setTimeout(de, 1e3 * n))
            })
        }
        function pe() {
            for (var e = navigator.userAgent,
            t = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod", "rv:1.2.3.4", "windows mobile", "midp"), n = !0, a = 0; a < t.length; a++) if (e.indexOf(t[a]) > 0) {
                n = !1;
                break
            }
            return n
        }
        function me() {
            this.deposit = function(e) {
                location.href = e.dataset.path + "?action=deposit&coin=" + e.dataset.coin
            },
            this.activeChart = function(e) {
                pe() && (document.querySelector("#chartMask").style.display = "none")
            },
            this.showChartMask = function() {
                pe() && (document.querySelector("#chartMask").style.display = "block")
            },
            this.locationgo = function(e) {
                var t = e.dataset.path;
                location.href = t + "?symbol=" + PAGE_COIN + PAGE_QUOTE
            },
            this.marginTransfer = function(e, t) { (0, T.open_dialog_transfer)({
                    quote: PAGE_QUOTE,
                    base: PAGE_COIN,
                    currency: t || PAGE_COIN,
                    type: "in",
                    success: function() {
                        Q(de),
                        y.UserAccount.Get([])
                    }
                })
            }
        }
        function fe(e) {
            var t = v.RATE_CURRENCY_INFO_LIST.filter(function(e) {
                return e.abbr === se
            }),
            n = (0, m.
        default)(t, 1)[0].min,
            a = void 0 === n ? .01 : n;
            return e > a ? a.toString().includes(".") ? a.toString().split(".")[1].length: 0 : e.toString().match(/[^\.0]/) ? e.toString().match(/[^\.0]/).index + 1 : void 0
        }
        function ge() {
            var e = document.querySelectorAll("[lazyfill]"); [].forEach.call(e, ve)
        }
        function ve(e) {
            var t = e.getAttribute("lazyfill"),
            n = {
                base: PAGE_COIN,
                quote: PAGE_QUOTE
            };
            "attr" == t ? e.setAttribute(e.dataset.attr, (0, _.TmpL)(e.dataset.template || t, n)) : e.innerHTML = (0, _.TmpL)(e.dataset.template || t, n)
        } (0, w.Subscribe)("__userIsLogin",
        function(e) {
            Y.checked = 0;
            e.info && (y.UserAccount.Get([]), "margin" === z && de(),
            function e() {
                setTimeout(function() {
                    y.UserAccount.Get([]),
                    e()
                },
                2e4)
            } (), f())
        }),
        (0, w.Subscribe)("__ucGetUserInfo", (W = (0, p.
    default)(d.
    default.mark(function e(t) {
            var n, a, i, o, r, l, s, c, u, p, m, f, g, v, h = t.info;
            return d.
        default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                case 0:
                    if (r = function(e) {
                        if (e) {
                            var t = [183];
                            return e.filter(function(e) {
                                return t.includes(1 * e)
                            }).length
                        }
                    },
                    n = PAGE_COIN + PAGE_QUOTE, a = A.
                default.symbolDataObj[n]["symbol-partition"], i = K[a], o = "ht" === PAGE_COIN && K.ht, "margin" !== z) {
                        e.next = 27;
                        break
                    }
                    return de(),
                    e.next = 6,
                    (0, b.ucGetTicket)();
                case 6:
                    if (l = e.sent, !(s = l.data).success) {
                        e.next = 25;
                        break
                    }
                    return e.next = 11,
                    (0, b.HBUC)({
                        data: {
                            method: "login",
                            ticket: s.data.ticket
                        }
                    });
                case 11:
                    return c = e.sent,
                    "ok" === (u = c.data).status && _.cookies.set({
                        name: "HB-OLD-TOKEN",
                        value: u.data.token,
                        domain: (0, y.GetHost)(),
                        path: "/"
                    }),
                    e.next = 16,
                    (0, b.proUserAuth)({
                        headers: {
                            "HB-OLD-TOKEN": u.data.token
                        },
                        data: {
                            method: "get_auth_pro_status"
                        }
                    });
                case 16:
                    return p = e.sent,
                    m = p.data,
                    e.next = 20,
                    (0, b.ucGetCountryId)();
                case 20:
                    f = e.sent,
                    g = f.data,
                    v = void 0,
                    g.success && (v = g.data.country_id),
                    r(h.data.country_id) ? (0, T.open_dialog_common)({
                        lang: {},
                        title: "提示",
                        block: "disable_margin",
                        btn: 0
                    }) : 1 * m.data != 2 && v && r([v]) ? (0, T.open_dialog_common)({
                        lang: {},
                        title: "提示",
                        block: "disable_margin_ip",
                        btn: 1,
                        hiddenClose: !0,
                        success: function() {
                            location.href = "/user_center/uc_auth/"
                        }
                    }) : (0, P.
                default)("MARGIN");
                case 25:
                    e.next = 28;
                    break;
                case 27:
                    i ? (0, P.
                default)(i, o) : o && (0, P.
                default)(o);
                case 28:
                case "end":
                    return e.stop()
                }
            },
            e, void 0)
        })),
        function(e) {
            return W.apply(this, arguments)
        })),
        (0, w.Subscribe)("__changeTheme",
        function(e) {
            var t = e.info;
            tvWidget.setTheme(t)
        });
        var _e = new I.DomState;
        g()
    },
    GVeD: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = d(n("Xxa5")),
        i = d(n("exGp")),
        o = n("YtCS"),
        r = n("f8yD"),
        l = n("RxF2"),
        s = d(n("n4zI")),
        c = d(n("TlqS")),
        u = d(n("NUe0"));
        function d(e) {
            return e && e.__esModule ? e: {
            default:
                e
            }
        }
        var p, m = (0, r.Lang)();
        window.lang = m;
        var f = {
            pro: {},
            huobi: {}
        };
        o.HUOBI_MARKET_CURRENCY.forEach(function(e) {
            f.huobi[e] = "1"
        }),
        t.
    default = function(e) {
            var t, n, o, d = (t = (0, i.
        default)(a.
        default.mark(function e() {
                return a.
            default.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                    case 0:
                        return e.next = 2,
                        u.
                    default.currencyinfo();
                    case 2:
                        s.
                    default.currencyData.forEach(function(e) {
                            f.pro[e.name] = "1"
                        });
                    case 3:
                    case "end":
                        return e.stop()
                    }
                },
                e, this)
            })),
            function() {
                return t.apply(this, arguments)
            }),
            g = e,
            v = {};
            function _(e, t) {
                for (var n in t) e[n] = t[n];
                return e
            }
            function y() {
                this.stop = function() {
                    return "stop"
                }
            }
            return {
                open: function() {
                    c.
                default.construct({
                        lang:
                        n.lang,
                        currency: n.currency,
                        title: n.title,
                        page: {
                            title: n.title
                        },
                        hiddenClose: !0
                    }),
                    c.
                default.open().callback(function(e) {}),
                    function() {
                        var e = {
                            withdraw_big: {
                                "0001": ["verify", "prokyc"],
                                "0010": ["verify", "prokyc"],
                                "0011": ["verify", "prokyc"],
                                "0100": ["verify", "prokyc"],
                                "0101": ["verify", "prokyc"],
                                "0110": ["verify", "prokyc"],
                                "0111": ["verify", "prokyc"],
                                1000 : ["verify", "prokyc"],
                                1001 : ["verify", "prokyc"],
                                1010 : ["verify", "prokyc"],
                                1011 : ["verify", "prokyc"],
                                1100 : ["verify", "prokyc"],
                                1101 : ["verify", "prokyc"],
                                1110 : ["verify", "prokyc"],
                                1111 : ["verify", "prokyc"]
                            },
                            vote: {
                                "0001": ["votekyc"],
                                "0010": ["votekyc"],
                                "0011": ["votekyc"],
                                "0100": ["votekyc"],
                                "0101": ["votekyc"],
                                "0110": ["votekyc"],
                                "0111": ["votekyc"],
                                1000 : ["votekyc"],
                                1001 : ["votekyc"],
                                1010 : ["votekyc"],
                                1011 : ["votekyc"],
                                1100 : ["votekyc"],
                                1101 : ["votekyc"],
                                1110 : ["votekyc"],
                                1111 : ["votekyc"]
                            }
                        },
                        t = 0;
                        if (!e[n.action] && window.UI || window.skipTaskHall) return t = 2,
                        a("pass");
                        function a(a) {
                            if (! (o || t < 2)) {
                                var i = a ||
                                function(e, t) {
                                    var n = {
                                        verify: {
                                            index: 0,
                                            title: m.getLang("至少开启2项双重身份验证"),
                                            keys: "verify",
                                            status: 0,
                                            actionUrl: localStorage.root + "user_center/uc_info/",
                                            actionName: m.getLang("立即开启")
                                        },
                                        votekyc: {
                                            index: 0,
                                            title: m.getLang("身份认证"),
                                            keys: "pro_status",
                                            status: 0,
                                            actionUrl: "//www.huobipro.com/user_center/uc_auth/",
                                            actionName: m.getLang("立即认证")
                                        },
                                        prokyc: {
                                            index: 0,
                                            title: m.getLang("身份认证"),
                                            keys: "pro_status",
                                            status: 0,
                                            actionUrl: localStorage.root + "user_center/uc_auth/",
                                            actionName: m.getLang("立即认证")
                                        }
                                    },
                                    a = [],
                                    i = (1 * v.pro_status == 2 ? 1 : 0).toString() + (1 * v.setting.verify_phone).toString() + (1 * v.setting.verify_email).toString() + (1 * v.setting.verify_ga).toString(),
                                    o = {},
                                    l = 1;
                                    return (0, r.J)(y, o),
                                    "transfer" === e ? 1 * (1 * v.c1_status == 2 || 1 * v.u_status == 2 ? 1 : 0).toString() ? "pass": [{
                                        index: 0,
                                        title: m.getLang("实名认证"),
                                        keys: "c1_status",
                                        status: 0,
                                        actionUrl: "https://" + window.HOSTS.huobi + "/account/auth.php?a=real_name_auth&auth_level=C1",
                                        actionName: m.getLang("立即认证")
                                    }] : t[e] ? "string" == typeof t[e][i] && o[t[e][i]] && o[t[e][i]]() ? "actions": (t[e][i].forEach(function(e) {
                                        a.push(n[e])
                                    }), a.forEach(function(e) {
                                        var t = [e.actionName, m.getLang("待审核"), m.getLang("已完成"), m.getLang("审核未通过")],
                                        n = "number" == typeof v[e.keys] ? v[e.keys] : function(e) {
                                            if ("verify" === e) return v.setting.bigman > 1 ? 2 : 0
                                        } (e.keys);
                                        e.status = 2 == n ? 1 : 0,
                                        e.index = n,
                                        e.actionName = t[n],
                                        l = l && e.status
                                    }), a.length && !l ? a: "pass") : "pass"
                                } (n.action, e);
                                window.UI = window.UI || v,
                                !p && window.UI && (p = setTimeout(function() {
                                    delete window.UI,
                                    p = null
                                },
                                1 * $_GET("refresh_time") || 18e5)),
                                "actions" != i && ("pass" == i ? n.next && n.next(n, c.
                            default.close):
                                (c.
                            default.close(),
                                function(e) {
                                    n.task = e,
                                    g.construct(n),
                                    g.open()
                                } (i)), n.callback && n.callback(i, n, c.
                            default.close, g))
                            }
                        } (function e() { (0, l.proUserAuth)({
                                data: {
                                    method: "get_auth_info"
                                }
                            }).then(function(n) {
                                var i, o = n.data;
                                "ok" === o.status ? (v = _(v, _(_(_(o.data.auth_info, o.data.force_info), o.data.user_info), s.
                            default.userInfo)), t += 1, a()) : 555 === o["err-code"] && (i = e, (0, l.ucGetTicket)().then(function(e) {
                                    var t = e.data;
                                    t.success && (0, l.HBUC)({
                                        data: {
                                            method: "login",
                                            ticket: t.data.ticket
                                        }
                                    }).then(function(e) {
                                        var t = e.data;
                                        "ok" == t.status && (r.cookies.set({
                                            name: "HB-OLD-TOKEN",
                                            value: t.data.token,
                                            domain: GetHost(),
                                            path: "/"
                                        }), i && i())
                                    })
                                }))
                            })
                        })(),
                        (0, l.ucGetStrategy)().then(function(e) {
                            var n = e.data,
                            i = 0;
                            if (n.success) {
                                for (var o in n.data.setting) n.data.setting[o] && ++i;
                                n.data.setting.bigman = i,
                                v = _(v, n.data),
                                t += 1,
                                a()
                            }
                        })
                    } ()
                },
                close: function() {},
                construct: function(e) {
                    n = e,
                    m._keys(e.lang),
                    d()
                }
            }
        }
    },
    GwTv: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = n("f8yD");
        t.
    default = function(e) {
            var t = this,
            n = e || {},
            i = n.one;
            n.eventType = n.eventType || "click",
            t.op = n,
            t.Init = function(e) {
                e && (t.Box = e, t.childrens = [], [].slice.apply(e.childNodes).forEach(function(e) {
                    1 === e.nodeType && t.childrens.push(e)
                }), t.hd = t.childrens[0], t.cur = 0, t.tab = t.hd.getElementsByTagName("li"),
                function(e) {
                    var n, o = e.length;
                    if (! (o < 1)) for (var r = 0; r < o; r++) e[r].index = r,
                    n = e[r],
                    a.Event.add(n, t.op.eventType,
                    function(e) {
                        var n = e.target,
                        o = (0, a.tarFather)(n, "li"),
                        r = o.index;
                        r === t.cur && i || (t.ShowBox(r), t.Then && t.Then(r))
                    })
                } (t.tab))
            },
            t.ShowBox = function(e) {
                t.HideBox(),
                t.cur = 1 * e,
                t.tab[e].className = "cur",
                t.childrens[t.cur + 1].style.display = "block"
            },
            t.HideBox = function() {
                t.tab[t.cur].className = "",
                t.childrens[t.cur + 1].style.display = "none"
            }
        }
    },
    ILHy: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        n("7qVe");
        var a = s(n("hHLf")),
        i = s(n("GVeD")),
        o = n("gLaJ"),
        r = n("zcHd"),
        l = n("f8yD");
        function s(e) {
            return e && e.__esModule ? e: {
            default:
                e
            }
        }
        var c = (0, l.Lang)(),
        u = (0, l.SplitTemplate)(a.
    default),
        d = void 0,
        p = void 0;
        new r.Toast;
        t.
    default = (0, i.
    default)(function() {
            var e = {};
            function t(t) {
                var n = l.Event.target(t),
                a = (0, l.attFather)(n, "action"); (0, l.attFather)(n, "stop") && l.Event.stop(t),
                a && e[a.attr] && e[a.attr](a.node, n, d.dialog)
            }
            return (0, l.J)(function() {},
            e),
            {
                open: function() {
                    return d.Open(),
                    d
                },
                construct: function(e) {
                    c._keys(e.lang);
                    var n = {
                        lang: c.getLang,
                        currency: e.currency,
                        page: {
                            title: e.title
                        },
                        btn: !1
                    };
                    d = d || new o.Dialog({
                        html: (0, l.TmpL)((0, o.dialogMix)(u.html).html, n)
                    }),
                    p && (d.dialog.innerHTML = (0, l.TmpL)((0, o.dialogMix)(u.html).fc, n)),
                    document.querySelector("[block='task_list']").innerHTML = (0, l.TmpL)(u.block.task_list, {
                        lang: c.getLang,
                        task: e.task
                    }),
                    d.callback(function() {}),
                    !p && l.Event.add(d.dialog, "click", t),
                    p = 1
                },
                updateData: function() {},
                callUpdate: function() {},
                myDialog: function() {
                    return d
                }
            }
        } ())
    },
    "LX/w": function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        n("20md");
        var a = c(n("rU/t")),
        i = n("gLaJ"),
        o = n("f8yD"),
        r = n("RxF2"),
        l = n("zcHd"),
        s = c(n("5nIp"));
        n("4AVY");
        function c(e) {
            return e && e.__esModule ? e: {
            default:
                e
            }
        }
        var u = new s.
    default,
        d = void 0,
        p = {},
        m = {},
        f = void 0,
        g = void 0,
        v = void 0,
        _ = new l.Toast,
        y = (0, o.Lang)(),
        b = (0, o.SplitTemplate)(a.
    default),
        h = void 0,
        k = void 0,
        w = void 0;
        t.
    default = function() {
            var e, t, n, a, l, s, c, L, S = {
                ver: 0
            },
            E = 0,
            T = {
                className: ["tio_in", "tio_out"],
                money: [p, m],
                title: ["转入本金", "转出本金"],
                fn: [r.marginTI, r.marginTO],
                tips: ["hb_icon_tip hide", "hb_icon_tip"]
            };
            function x(e) {
                var t = o.Event.target(e),
                n = (0, o.attFather)(t, "action"); (0, o.attFather)(t, "stop") && o.Event.stop(e),
                n && S[n.attr] && S[n.attr](n.node)
            }
            function I() {
                S.ver = 1 * new Date
            }
            function O() {
                var i = 1 * f;
                T[h.base] = 0,
                T[h.quote] = 1,
                S.ver !== E && (E = S.ver, s.innerHTML = g, e.className = T.className[i], L.className = T.tips[i], t.innerHTML = y.getLang(T.title[i]), n.innerHTML = (0, o.Num)(T.money[i][g], STORE.currencyDataObj[g]["show-precision"]) + " " + g, l.value = "", S.oldTab && (S.oldTab.className = ""), a[T[g]].className = "cur", S.oldTab = a[T[g]])
            }
            function M(e) {
                var t = 1 * f;
                if (!c) if (u.Hide(), "submit" == e.type) {
                    if (!l.value) return u.Show(l, y.getLang("请先输入数量"));
                    c = 1,
                    T.fn[t]({
                        data: {
                            amount: l.value,
                            currency: g,
                            symbol: h.base + h.quote
                        }
                    }).then(function(e) {
                        var t = e.data;
                        return c = 0,
                        "ok" === t.status ? (l.value = "", d.Close(), h.success && h.success(e), _.Show(y.getLang("操作成功"))) : _.Error(t["err-msg"])
                    })
                } else "open" == e.type ? o.Event.add(document, "mousewheel", N) : "close" == e.type && o.Event.remove(document, "mousewheel", N)
            }
            function N(e) {
                o.Event.stop(e)
            }
            return (0, o.J)(function() {
                this.changeDirection = function() {
                    f = !f,
                    I()
                },
                this.changeFilter = function(e) {
                    g = e.dataset.filter,
                    I()
                },
                this.allIn = function(e) {
                    var t = 1 * f;
                    l.value = (0, o.Num)(T.money[t][g], STORE.currencyDataObj[g]["show-precision"])
                }
            },
            S),
            {
                open: function e(t) {
                    v ? (t && t(), d.Open()) : setTimeout(function() {
                        e(t)
                    },
                    100)
                },
                title: function(e, t) {
                    var n = e.type ? "in" == e.type ? 0 : 1 : 0,
                    a = [y.getLang("转入本金"), y.getLang("转出本金")];
                    return y._keys(t),
                    a[n]
                },
                construct: function(_) {
                    c = 0,
                    h = _,
                    f = _.type ? "in" == _.type ? 0 : 1 : 0,
                    g = _.currency ? _.currency: h.base,
                    y._keys(_.lang),
                    v = null,
                    k = {
                        cash: m,
                        wallet: p,
                        base: _.base,
                        quote: _.quote,
                        lang: y.getLang,
                        currency: _.currency,
                        page: {
                            title: _.title
                        },
                        btn: {
                            cancel: y.getLang("取消"),
                            submit: y.getLang("确定")
                        }
                    },
                    d = d || new i.Dialog({
                        html: (0, o.TmpL)((0, i.dialogMix)(b.html).html, k)
                    }),
                    (0, r.marginBalance)({
                        params: {
                            symbol: h.base + h.quote
                        }
                    }).then(function(r) {
                        var c = r.data;
                        "ok" === c.status &&
                        function(r) {
                            r ? r.list.forEach(function(e) {
                                m[e.currency] = "transfer-out-available" === e.type ? e.balance: m[e.currency]
                            }) : (m[h.quote] = 0, m[h.base] = 0),
                            p[h.base] = STORE.balance.trade[h.base],
                            p[h.quote] = STORE.balance.trade[h.quote],
                            v = 1,
                            w && (d.dialog.innerHTML = (0, o.TmpL)((0, i.dialogMix)(b.html).fc, k)),
                            e = d.dialog.querySelector('[flag="dir"]'),
                            L = d.dialog.querySelector('[flag="tips"]'),
                            n = d.dialog.querySelector('[flag="ava"]'),
                            s = d.dialog.querySelector('[flag="inputFlag"]'),
                            a = (0, o.nodes2array)(d.dialog.querySelector('[flag="filter"]').querySelectorAll("span")),
                            t = d.dialog.querySelector("b"),
                            (l = d.dialog.querySelector("input")).getAttribute("bindEvent") || (l.setAttribute("bindEvent", "bindEvent"), o.Event.add(l, "blur",
                            function() {
                                u.Hide()
                            }), o.Event.add(l, "focus",
                            function() {
                                u.Hide()
                            }), o.Event.add(l, "input",
                            function() {
                                u.Hide(),
                                l.value = (0, o.FixValue)(l.value, STORE.currencyDataObj[g]["show-precision"])
                            })),
                            I()
                        } (c.data[0])
                    }),
                    !w && o.Event.add(d.dialog, "click", x),
                    !w && (0, o.AnimationFactory)(O),
                    w = 1,
                    d.callback(M)
                }
            }
        } ()
    },
    LXuJ: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = p(n("hiCB"));
        n("SXXo");
        var i = p(n("OENi")),
        o = n("gLaJ"),
        r = n("f8yD"),
        l = n("4AVY"),
        s = n("RxF2"),
        c = n("KbPw"),
        u = n("h/lH"),
        d = n("zcHd");
        function p(e) {
            return e && e.__esModule ? e: {
            default:
                e
            }
        }
        var m = void 0,
        f = (0, r.Lang)(),
        g = new d.Toast,
        v = (0, r.SplitTemplate)(i.
    default),
        _ = void 0,
        y = void 0,
        b = {
            "en-us": "/notice_detail/?id=647",
            "zh-cn": "/zh-cn/notice_detail/?id=648"
        };
        t.
    default = function() {
            var e = void 0,
            t = void 0,
            n = {},
            i = 1,
            d = {
                currency: {},
                scoin: []
            },
            p = void 0,
            h = void 0,
            k = void 0;
            function w() {
                if (!e || null === d.currency.amount) return setTimeout(w, 200);
                h[0].innerHTML = (0, r.Num)(d.min, e.currency_obj[d.currency.coin]["show-precision"]),
                h[1].innerHTML = (0, r.Num)(d.currency.amount, e.currency_obj[d.currency.coin]["show-precision"])
            }
            function L(e) {
                var t = r.Event.target(e),
                a = (0, r.attFather)(t, "action"); (0, r.attFather)(t, "stop") && r.Event.stop(e),
                a && n[a.attr] && n[a.attr](a.node, t, m.dialog)
            }
            function S() {
                var t = {
                    currency: e.currency,
                    scoin: e.scoin,
                    act: i,
                    amount: 1 * p[0].value || 0
                },
                n = (0, u.getData)(p),
                a = t.amount,
                o = t.currency.toUpperCase(),
                r = t.scoin.map(function(e) {
                    return a + " " + e.toUpperCase()
                }).join(" + ");
                a ? i ? (n.dom.pro_dia_from.value = a + " " + o, n.dom.pro_dia_to.value = r) : (n.dom.pro_dia_from.value = r, n.dom.pro_dia_to.value = a + " " + o) : (n.dom.pro_dia_from.value = "", n.dom.pro_dia_to.value = "")
            }
            function E(t) {
                if (!y && "submit" == t.type) {
                    var n = (0, u.getData)(p),
                    a = i ? s.splitOut: s.splitIn;
                    if (!n.data.pro_dia_amount) return n.dom.pro_dia_amount.error(f.getLang("请先输入数量"));
                    y = 1,
                    a({
                        data: {
                            amount: n.data.pro_dia_amount,
                            currency: e.currency
                        }
                    }).then(function(e) {
                        return y = 0,
                        "ok" === e.data.status ? (p[0].value = "", m.Close(), setTimeout(function() {
                            getPageCallback("updateFinanceList") && getPageCallback("updateFinanceList")()
                        },
                        500), g.Show(f.getLang("分叉转币成功"))) : g.Error(e.data["err-msg"])
                    })
                }
            }
            return (0, r.J)(function() {
                this.switch_dir = function(e, t, n) {
                    var a = [k[0].className, k[1].className];
                    k[0].className = a[1],
                    k[1].className = a[0],
                    i = !i,
                    p[0].value = ""
                },
                this.allIn = function(t, n, a) {
                    var o = (0, r.Num)(i ? d.currency.amount: d.min, e.currency_obj[d.currency.coin]["show-precision"]);
                    1 * o && (p[0].value = (0, r.Num)(i ? d.currency.amount: d.min, e.currency_obj[d.currency.coin]["show-precision"]))
                }
            },
            n),
            (0, l.Subscribe)("__getUserBalance",
            function(e) {
                var t = e.info,
                n = a.
            default;
                t && (t = t.trade, d.currency.amount = 1 * t[d.currency.coin], d.scoin.forEach(function(e) {
                    n = Math.min(n, 1 * t[e.coin]),
                    e.amount = 1 * t[e.coin]
                }), d.min = n, w())
            }),
            {
                open: function(e) {
                    var t; (t = document.querySelector(".dia_ticket")) && (t.parentElement.style.overflow = "visible"),
                    e && e(),
                    m.Open()
                },
                title: function(e, t) {
                    return f._keys(t),
                    f.getLang("分叉币转换_title")
                },
                construct: function(n) {
                    e = n,
                    d = {
                        currency: {},
                        scoin: []
                    },
                    y = 0,
                    f._keys(n.lang),
                    d.currency = {
                        coin: n.currency,
                        amount: null
                    },
                    n.scoin && n.scoin.forEach(function(e) {
                        d.scoin.push({
                            coin: e,
                            amount: null
                        })
                    });
                    var a = localStorage.getItem("lang") || "en-us",
                    l = b["zh-cn" === a || "en-us" === a ? a: "en-us"],
                    s = {
                        currency: n.currency,
                        scoin: n.scoin,
                        act: i,
                        amount: 0,
                        lang: f.getLang,
                        page: {
                            title: n.title,
                            titleExt: '<a class="help_link" href="' + l + '" target="_blank">' + f.getLang("了解更多？") + "</a>"
                        },
                        btn: {
                            cancel: f.getLang("取消"),
                            submit: f.getLang("转换")
                        }
                    };
                    _ = n.currencys || _,
                    m = m || new o.Dialog({
                        html: (0, r.TmpL)((0, o.dialogMix)(v.html).html, s)
                    }),
                    t && (m.dialog.innerHTML = (0, r.TmpL)((0, o.dialogMix)(v.html).fc, s)),
                    k = m.dialog.querySelectorAll("dl"),
                    h = m.dialog.querySelectorAll("em"),
                    (p = (0, r.nodes2array)(m.dialog.querySelectorAll("input")).concat((0, r.nodes2array)(m.dialog.querySelectorAll("button")))).forEach(function(e) { (0, r.J)(u.errorAction, e)
                    });
                    var g = (0, u.getData)(p),
                    w = s.amount,
                    T = s.currency.toUpperCase(),
                    x = s.scoin.map(function(e) {
                        return w + " " + e.toUpperCase()
                    }).join(" + ");
                    w && (i ? (g.dom.pro_dia_from.value = w + " " + T, g.dom.pro_dia_to.value = x) : (g.dom.pro_dia_from.value = x, g.dom.pro_dia_to.value = w + " " + T)),
                    !t && r.Event.add(m.dialog, "click", L),
                    !t && (0, r.AnimationFactory)(S),
                    t = 1,
                    m.callback(E),
                    c.UserAccount.Get(_)
                }
            }
        } ()
    },
    LssR: function(e, t) {
        e.exports = "<dl class=\"select_lang\" tabindex=\"0\">\n    <dt><span><%=__data['mgtLang'][__data['userLang']]%></span></dt>\n    <dd>\n        <%\n        for(var i in __data['mgtLang']){\n        %>\n        <p data-lang=\"<%= i %>\">\n            <%=__data['mgtLang'][i]%>\n        </p>\n        <%\n        }\n        %>\n    </dd>\n</dl>"
    },
    M32D: function(e, t) {
        e.exports = '<%\n    var lang = __data.lang ||new Function,\n        btn = __data.btn ||{},\n        page = __data.page||{};\n%>\n<div class="dialog" growing-ignore="true">\n    <div class="dia_tit">\n        <div><b><%=lang(page.title)%><%= page.titleExt ? lang(page.titleExt) : ""%></b><span class="close" id="dia_close">×</span>\n        </div>\n        <p  data="dia_title" class="dia_tit_more"><%= page.titleMore ? lang(page.titleMore) : ""%></p>\n    </div>\n    <div class="dia_content">block_dia_content</div>\n\n    <% if(btn && typeof btn == "object"){ %>\n        <div class="dia_submit">\n            <span class="error_notice"></span>\n            <% if(btn.cancel) { %>\n                <button class="btn_cancel" pro_name="btn_cancel">\n                    <%=lang(btn.cancel)%>\n                </button>\n            <% }%>\n            <% if(btn.submit) { %>\n                <button class="btn btn_submit btn-primary" pro_name="btn_submit">\n                    <%=lang(btn.submit)%>\n                </button>\n            <% }%>\n        </div>\n        <% }else if(typeof btn == "string") {%>\n            <%=btn%>\n                <% }%>\n\n</div>\n<div class="dialog_extra"></div>\n'
    },
    MX1G: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = d(n("Dd8w"));
        n("EF3m");
        var i = n("gLaJ"),
        o = n("f8yD"),
        r = n("h/lH"),
        l = n("RxF2"),
        s = (n("YtCS"), d(n("7al1"))),
        c = d(n("inzq")),
        u = n("zcHd");
        function d(e) {
            return e && e.__esModule ? e: {
            default:
                e
            }
        }
        var p = (0, o.Lang)(),
        m = (0, o.SplitTemplate)(c.
    default),
        f = void 0,
        g = void 0,
        v = {
            btc: "/index.php?a=btc_",
            ltc: "/index.php?a=ltc_"
        },
        _ = new u.Toast,
        y = void 0,
        b = void 0,
        h = new s.
    default({
            tryVoice:
            3,
            countTime: 60,
            api: l.ucGetSMSCode
        }),
        k = new s.
    default({
            countTime:
            60,
            api: l.ucGetEmailCode
        });
        t.
    default = function() {
            var e = {},
            t = void 0,
            n = void 0,
            s = void 0,
            c = void 0,
            u = void 0;
            function d(e) {
                return f.Close(e),
                f
            }
            function w(t) {
                var n = o.Event.target(t),
                a = (0, o.attFather)(n, "action"); (0, o.attFather)(n, "stop") && o.Event.stop(t),
                a && e[a.attr] && e[a.attr](a.node, n, f.dialog)
            }
            function L(e) {
                var i = {};
                if (!b) {
                    if ("submit" == e.type || "enter" == e.type) {
                        if (y = (0, r.getData)(n), !s && y.dom.sms_code) return y.dom.sms_code.error(p.getLang("请先获取短信验证码"));
                        if (!y.data.sms_code && y.dom.sms_code) return y.dom.sms_code.error(p.getLang("短信验证码没有填写"));
                        if (!c && y.dom.email_code) return y.dom.email_code.error(p.getLang("请先获取邮箱验证码"));
                        if (!y.data.email_code && y.dom.email_code) return y.dom.email_code.error(p.getLang("请输入邮箱验证码"));
                        if (!y.data.ga_code && y.dom.ga_code) return y.dom.ga_code.error(p.getLang("谷歌验证码没有填写"));
                        if (!y.data.auth_code && y.dom.auth_code) return y.dom.auth_code.error(p.getLang("验证码没有填写"));
                        y.data.sms_code && (i.sms_code = y.data.sms_code),
                        y.data.ga_code && (i.ga_code = y.data.ga_code),
                        y.data.email_code && (i.email_code = y.data.email_code),
                        y.data.auth_code && (i.auth_code = y.data.auth_code),
                        b = 1,
                        "verify" === t.action ? (0, l.ucSecurityVerify)({
                            data: (0, a.
                        default)({
                                use_type:
                                t.use_type
                            },
                            i)
                        }).then(function(e) {
                            var n = e.data;
                            n.success ? (t.success && t.success(n.data, f, i), d()) : (b = 0, _.Error(n.message))
                        }) : t.success && t.success((0, a.
                    default)({
                            use_type:
                            t.use_type || "VERIFY_SETTING_POLICY"
                        },
                        i), f,
                        function(e) {
                            b = 0,
                            !e && d()
                        })
                    }
                    "close" == e.type && (h.Reset(), k.Reset(), t.dialogCloseAfter && t.dialogCloseAfter())
                }
            }
            return (0, o.J)(function() {
                this.close = d,
                this.btn_submit = function() {
                    u && u(f)
                },
                this.getSms = function(e) {
                    var n = !!e.dataset.voice,
                    a = {
                        use_type: t.use_type || "VERIFY_SETTING_POLICY",
                        voice: n
                    };
                    "LOGIN" === t.use_type && (a.token = t.data.token),
                    h.Send(a)
                },
                this.getEmail = function(e) {
                    var n = {
                        use_type: t.use_type || "VERIFY_SETTING_POLICY"
                    };
                    "LOGIN" === t.use_type && (n.token = t.data.token),
                    k.Send(n)
                },
                k.Then = function(e) {
                    var t = e.data;
                    t.success ? (c = 1, y && y.dom.email_code.clear()) : _.Error(t.message)
                },
                h.Then = function(e) {
                    var t = e.data;
                    t.success ? (s = 1, y && y.dom.sms_code.clear()) : _.Error(t.message)
                }
            },
            e),
            {
                title: function(e, t) {
                    return p._keys(t),
                    p.getLang("安全验证")
                },
                open: function(e, t) {
                    return u = t,
                    e && e(f.dialog),
                    f.Open(),
                    f
                },
                close: d,
                construct: function(e) {
                    var a = e.block || "loading";
                    t = e,
                    p._keys(e.lang),
                    y = null,
                    b = 0;
                    var l = {
                        lang: p.getLang,
                        item: t.item,
                        data: t.data,
                        currency: e.currency,
                        page: {
                            title: p.getLang(e.title),
                            titleMore: "disable" == t.action ? p.getLang({
                                PHONE: "关闭手机验证后24小时内禁止提币。",
                                EMAIL: "关闭邮箱验证后24小时内禁止提币。",
                                GA: "关闭谷歌验证器验证后24小时内禁止提币。"
                            } [t.itemkey]) : ""
                        },
                        huobifinance: v[e.currency] ? "https://" + window.HOSTS.huobi + "/" + a.replace("gohuobi", "") + v[e.currency] + a.replace("gohuobi", "") : "https://" + window.HOSTS.huobi + "/finance/innovate/",
                        btn: !!e.btn && (1 == e.btn ? {
                            submit: p.getLang("确定")
                        }: {
                            cancel: p.getLang("取消"),
                            submit: p.getLang("确定")
                        })
                    };
                    return f = f || new i.Dialog({
                        html: (0, o.TmpL)((0, i.dialogMix)(m.html).html, l)
                    }),
                    g && (f.dialog.innerHTML = (0, o.TmpL)((0, i.dialogMix)(m.html).fc, l)),
                    f.dialog.querySelector("#dia_close").style.display = t.hiddenClose ? "none": "",
                    f.dialog.querySelector('[block="content"]').innerHTML = (0, o.TmpL)(m.block[a], t.content || l),
                    !g && !t.stopEvent && o.Event.add(f.dialog, "click", w),
                    f.callback(L),
                    g = 1,
                    (n = (0, o.nodes2array)(f.dialog.querySelectorAll("input")).concat((0, o.nodes2array)(f.dialog.querySelectorAll("button")))).forEach(function(e) {
                        "pro_dia_address_amount" === e.getAttribute("pro_name") && (o.Event.add(e, "keydown",
                        function() {
                            f.dialog.querySelector('[amout="out_amount"]').innerHTML = Num(1 * e.value ? 1 * e.value: 0, STORE.currencyDataObj[t.currency]["show-precision"])
                        }), o.Event.add(e, "keyup",
                        function() {
                            f.dialog.querySelector('[amout="out_amount"]').innerHTML = Num(1 * e.value ? 1 * e.value: 0, STORE.currencyDataObj[t.currency]["show-precision"])
                        })),
                        (0, o.J)(r.errorAction, e)
                    }),
                    h.btn = f.dialog.querySelector('[act="sms_btn_wrap"]'),
                    h.btnText = ['<a href="" action="getSms" stop="1">' + p.getLang("点击获取") + "</a>", "<span>%s" + p.getLang("秒后重试") + "</span>", '<a href="" action="getSms" stop="1">' + p.getLang("重新获取") + "</a>", '<a href="" action="getSms" stop="1">' + p.getLang("重新获取") + "</a> " + p.getLang("或者试试") + ' <a href="" action="getSms" stop="1" data-voice="1">' + p.getLang("语音验证码") + "</a>"],
                    k.btn = f.dialog.querySelector('[act="email_btn_wrap"]'),
                    k.btnText = ['<a href="" action="getEmail" stop="1">' + p.getLang("点击获取") + "</a>", "<span>%s" + p.getLang("秒后重试") + "</span>", '<a href="" action="getEmail" stop="1">' + p.getLang("重新获取") + "</a>", '<a href="" action="getEmail" stop="1">' + p.getLang("重新获取") + "</a>"],
                    t.fired && (k.fire(), h.fire()),
                    setTimeout(function() {
                        f.dialog.querySelector("[pro_name=auth_code]") && f.dialog.querySelector("[pro_name=auth_code]").focus()
                    },
                    100),
                    f
                }
            }
        } ()
    },
    MboR: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = u(n("d7EF"));
        n("p/ij");
        var i = n("YtCS"),
        o = n("gLaJ"),
        r = n("f8yD"),
        l = u(n("2lGR")),
        s = u(n("jkOj")),
        c = n("3uwR");
        function u(e) {
            return e && e.__esModule ? e: {
            default:
                e
            }
        }
        var d = (0, r.SplitTemplate)(l.
    default),
        p = i.RATE_CURRENCY_INFO_LIST,
        m = (0, r.Lang)(),
        f = w("theme") || "hb-night",
        g = w("exchangeRate") || "",
        v = w("lang"),
        _ = new s.
    default({
            lang:
            {
                msgNull:
                "",
                msgError: ""
            }
        }),
        y = g.split("/"),
        b = (0, a.
    default)(y, 2),
        h = b[0],
        k = b[1];
        function w(e) {
            var t = void 0;
            try {
                t = localStorage.getItem(e)
            } catch(e) {
                t = ""
            }
            return t
        }
        function L(e, t) {
            var n = p.reduce(function(e, t) {
                return t.lang === v && e.unshift(t.abbr),
                e
            },
            ["usd"]),
            i = (0, a.
        default)(n, 1)[0];
            localStorage.setItem("exchangeRate", (t || i) + "/" + e),
            h = t || i
        }
        m._keys(window.LANG.dialog),
        g && 1 * k != 0 || L(0);
        var S = {
            lang: m.getLang,
            block: "setting",
            page: {
                title: m.getLang("设置")
            },
            btn: {
                submit: "确定"
            }
        },
        E = new o.Dialog({
            html: (0, r.TmpL)((0, o.dialogMix)(d.block.setting).html, S)
        }),
        T = p.map(function(e) {
            return {
                key: e.symbol + " " + e.abbr.toUpperCase(),
                value: e.abbr,
                info: localStorage.lang.includes("zh") ? m.getLang(e.name) : ""
            }
        });
        _.Loading({
            wrap: E.dialog.querySelector("#exchange_rate_select"),
            name: "exchange"
        }),
        _.Update({
            data: T
        }),
        function e() {
            if (!h) return setTimeout(function() {
                return e()
            },
            100);
            _.Change(h)
        } (),
        [].forEach.call(E.dialog.querySelectorAll("[name=theme]"),
        function(e) {
            e.value === f && (e.checked = "checked")
        }),
        E.Submit = function() {
            var e = (0, r.getData)(E.dialog.querySelectorAll("input")),
            t = (0, a.
        default)(e, 1)[0],
            n = w("theme") || "hb-night";
            t.theme !== n && (0, c.toggle)(),
            t.exchange !== h && (L(1, t.exchange), location.reload()),
            E.Close()
        },
        E.dialog.classList.add("dia_setting"),
        t.
    default = E
    },
    MtvX: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.getListData = t.QueryResultsList = t.QueryHistoryOrderList = t.QueryOrderList = t.setBuyMarketPrecision = void 0;
        var a = p(n("BO1k")),
        i = p(n("gRE1")),
        o = p(n("mvHQ"));
        n("xwFI");
        var r = n("f8yD"),
        l = n("RxF2"),
        s = n("aVmh"),
        c = n("cnkX"),
        u = n("zcHd"),
        d = p(n("L6bb"));
        function p(e) {
            return e && e.__esModule ? e: {
            default:
                e
            }
        }
        function m() {
            var e;
            return "margin" === TRADE_TYPE ? e = STORE.marginBalance["account-id"] : STORE.account.forEach(function(t) {
                "spot" === t.type && (e = t.id)
            }),
            e
        }
        var f = location.pathname.indexOf("transac") > -1,
        g = new c.DomState,
        v = new u.Toast,
        _ = window.PAGE_QUOTE || "",
        y = window.PAGE_COIN || "",
        b = {
            openOrders: {
                page: 0,
                md5: "",
                screen: "",
                states: "submitted,partial-filled",
                type: "openOrders",
                id: "open_orders_body",
                list: "open_orders_list"
            },
            orderHistory: {
                page: 0,
                md5: "",
                screen: "",
                states: "partial-canceled,filled,canceled",
                type: "orderHistory",
                id: "order_history_body",
                list: "order_history_list"
            },
            tradeHistory: {
                page: 0,
                md5: "",
                screen: "",
                states: "",
                type: "tradeHistory",
                id: "trade_history_body",
                list: "trade_history_list"
            }
        },
        h = {},
        k = function(e) {
            return (0, d.
        default)(e + "hello, moto")
        },
        w = function(e, t) {
            h.symbol = e.symbol || "",
            h.size = e.size || 11,
            h.from = e.from || "",
            h.direct = e.direct || "",
            h.quote = e.quote || "",
            h.coin = e.coin || "",
            b[t].screen = e.types || "";
            var n = {
                symbol: h.symbol,
                size: h.size,
                states: b[t].states,
                from: h.from,
                direct: h.direct,
                types: b[t].screen,
                quote: h.quote,
                coin: h.coin
            };
            for (var a in f && (n["start-date"] = (0, r.time2Date)( + new Date - 15552e6, "y-m-d"), n["end-date"] = (0, r.time2Date)( + new Date, "y-m-d")), n)"" == n[a] && delete n[a];
            return n
        },
        L = function(e) {
            return e.getBoundingClientRect().top + (document.body.scrollTop || document.documentElement.scrollTop)
        },
        S = function(e, t) {
            var n = e.data,
            l = n.data,
            c = {},
            u = h.size,
            d = [],
            p = (0, o.
        default)(l),
            m = k(p),
            v = function(e) {
                if (g.getElementById(b[t].id)) {
                    var n = g.getElementById(b[t].id),
                    a = n.querySelector(".l_transac_list"),
                    i = n.querySelector(".l_paging"),
                    o = i && i.querySelector("ul"),
                    r = n.querySelector(".J_list_prompt_search"),
                    l = n.querySelector(".J_list_prompt");
                    if (n.parentNode.querySelector(".loading").style.display = "none", h.search && (a.style.display = "none", o && (o.style.display = "none")), r && (r.style.display = "none"), l && (l.style.display = "none"), 0 == e.length) return void(h.search ? r.style.display = "block": l.style.display = "block");
                    a.style.display = "block",
                    o && (o.style.display = "block")
                }
            };
            if (b[t].md5 != m) if ("ok" === n.status) {
                var _ = function(e) {
                    var t = !0,
                    n = !1,
                    i = void 0;
                    try {
                        for (var o, r = (0, a.
                    default)(STORE.quoteList); ! (t = (o = r.next()).done); t = !0) {
                            var l = o.value;
                            if (e.endsWith(l)) return e.replace(l, "/" + l).toUpperCase()
                        }
                    } catch(e) {
                        n = !0,
                        i = e
                    } finally {
                        try { ! t && r.
                            return && r.
                            return ()
                        } finally {
                            if (n) throw i
                        }
                    }
                    return e.toUpperCase()
                },
                y = l.length < u ? l.length: l.length - 1,
                w = l.length && l[0].id,
                L = l.length && l.length >= u && l[y].id;
                STORE.quoteList = (0, i.
            default)(STORE.symbolDataObj).reduce(function(e, t) {
                    var n = t["quote-currency"];
                    return ! e.includes(n) && e.push(n),
                    e
                },
                []);
                for (var S = 0; S < y; S++) {
                    var E = l[S].symbol,
                    T = top.window.SYMBOLDATA.accuracy[E],
                    x = T ? 1 * T.fee: 8,
                    I = T ? 1 * T.amount: 8,
                    O = T ? 1 * T.price: 8,
                    M = T ? 1 * T.total: 8,
                    N = {
                        id: l[S].id,
                        data: (0, r.time2Date)(l[S]["created-at"]),
                        pairs: top.window.SYMBOLDATA[E] || _(E),
                        source: l[S].source,
                        tradeType: l[S].source.indexOf("margin") >= 0 || l[S].source.indexOf("fl") >= 0 ? "margin": "spot",
                        type: l[S].type.indexOf("buy") >= 0 ? {
                            class: "up",
                            value: "BUY"
                        }: {
                            class: "down",
                            value: "SELL"
                        },
                        price: (0, r.Num)(l[S].price, O),
                        market: 0
                    };
                    "openOrders" != t && "orderHistory" != t || (N.amount = (0, r.Num)(l[S].amount, I), N.total = (0, r.Num)((0, s.mul)(l[S].price, l[S].amount), M), N.executed = (0, r.Num)(l[S]["field-amount"], I), N.unexecuted = (0, r.Num)((0, s.sub)(l[S].amount, l[S]["field-amount"]), I)),
                    "openOrders" == t && ("buy-market" == l[S].type && (N.price = "市价"), "buy-market" == l[S].type && (N.amount = "---"), "buy-market" == l[S].type && (N.market = 1), "buy-market" == l[S].type && (N.total = (0, r.Num)(l[S].amount, b.buyMarketPrecision)), "buy-market" == l[S].type && (N.unexecuted = (0, r.Num)((0, s.sub)(l[S].amount, l[S]["field-amount"]), b.buyMarketPrecision)), "sell-market" == l[S].type && (N.price = "市价"), "sell-market" == l[S].type && (N.total = "---"), "sell-market" == l[S].type && (N.market = 1)),
                    "orderHistory" == t && (N.unexecuted = (0, r.Num)(l[S]["field-amount"], I), N.averageprice = (0, r.Num)((0, s.div)((0, r.Num)(l[S]["field-cash-amount"], 15), (0, r.Num)(l[S]["field-amount"], 15)), O), N.status = l[S].state, "buy-market" != l[S].type && "sell-market" != l[S].type || (N.price = "市价"), "buy-market" == l[S].type && (N.amount = (0, r.Num)(l[S].amount, O))),
                    "tradeHistory" == t && (N.amount = (0, r.Num)(l[S]["filled-amount"], I), N.total = (0, r.Num)((0, s.mul)(l[S].price, l[S]["filled-amount"]), M), N.fee = (0, r.Num)(l[S]["filled-fees"], x), N.points = (0, r.Num)(l[S]["filled-points"], 8), "buy-market" == l[S].type && (N.amount = (0, r.Num)(l[S]["filled-amount"], O))),
                    d.push(N)
                }
                h.direct ? "next" == h.direct ? b[t].page++:(b[t].page--, b[t].page <= 0 && (b[t].page = 0)) : b[t].page = 0,
                b[t].page,
                b[t].md5 = k(p),
                c = {
                    prev: w,
                    next: L,
                    active: b[t].page,
                    data: d,
                    quote: h.quote,
                    coin: h.coin,
                    seeMore: !f
                },
                document.getElementById(b[t].id).innerHTML = (0, r.TmpL)(b[t].list, c),
                v(d)
            } else v([]);
            else v(l)
        },
        E = function e(t) {
            var n = b.openOrders.type,
            a = w(t, n);
            if ("margin" === TRADE_TYPE && !STORE.marginBalance["account-id"] || "exchange" === TRADE_TYPE && !STORE.account.length) return setTimeout(function() {
                e(t)
            },
            200);
            "transac" !== window.PAGE_NAME && (a["account-id"] = m()),
            (0, l.queryOrdersList)({
                params: a
            }).then(function(e) {
                S(e, n)
            })
        },
        T = function e(t) {
            var n = b.orderHistory.type,
            a = w(t, n);
            if ("margin" === TRADE_TYPE && !STORE.marginBalance["account-id"] || "exchange" === TRADE_TYPE && !STORE.account.length) return setTimeout(function() {
                e(t)
            },
            200);
            "transac" !== window.PAGE_NAME && (a["account-id"] = m()),
            (0, l.queryOrdersList)({
                params: a
            }).then(function(e) {
                S(e, n)
            })
        },
        x = function e(t) {
            var n = b.tradeHistory.type,
            a = w(t, n);
            if ("margin" === TRADE_TYPE && !STORE.marginBalance["account-id"] || "exchange" === TRADE_TYPE && !STORE.account.length) return setTimeout(function() {
                e(t)
            },
            200);
            "transac" !== window.PAGE_NAME && (a["account-id"] = m()),
            (0, l.queryResultsList)({
                params: a
            }).then(function(e) {
                S(e, n)
            })
        },
        I = function(e, t) {
            var n = (0, r.attFather)(e, "data-page-id"),
            a = (0, r.attFather)(e, "data-page-type"),
            i = this.querySelector(".loading"),
            o = {
                symbol: h.symbol,
                size: h.size,
                types: b[t].screen,
                from: n && n.attr,
                direct: a && a.attr,
                quote: _,
                coin: y
            };
            n && n.attr && (i.style.display = "block", "openOrders" == t && E(o), "orderHistory" == t && T(o), "tradeHistory" == t && x(o),
            function(e) {
                var t = "openOrders" == e ? "open_orders": "order_history",
                n = g.querySelector("." + t);
                n && (document.documentElement.scrollTop = L(n), document.body.scrollTop = L(n))
            } (t))
        };
        g.Ready(function() {
            top.window.PAGECONFIG = b,
            g.getElementById("open_orders") && r.Event.add(g.getElementById("open_orders"), "click",
            function(e) {
                var t, n = r.Event.target(e),
                a = (0, r.attFather)(n, "data-id"),
                i = a && a.attr;
                i && (t = i, (0, l.cancelOrder)({
                    path: {
                        "order-id": t
                    }
                }).then(function(e) {
                    var t = e.data,
                    n = null;
                    if ("ok" === t.status) {
                        var a = (0, r.attFather)(g.getElementById("open_orders_body").querySelectorAll(".btn_cancel")[0], "data-id"),
                        i = a && a.attr;
                        v.Show(window.LANG.dialog["撤单申请成功"], 1500),
                        clearTimeout(n),
                        n = setTimeout(function() {
                            clearTimeout(n),
                            E({
                                symbol: h.symbol,
                                size: h.size,
                                types: b.openOrders.screen,
                                from: i,
                                quote: _,
                                coin: y
                            })
                        },
                        2e3)
                    } else v.Error(t["err-msg"], 3e3)
                })),
                I.call(this, n, b.openOrders.type)
            }),
            g.getElementById("order_history") && r.Event.add(g.getElementById("order_history"), "click",
            function(e) {
                var t = r.Event.target(e),
                n = (0, r.attFather)(t, "data-drop-down"),
                a = (0, r.attFather)(t, "data-drop-pair"),
                i = (0, r.tarFather)(t, "div"),
                o = i.querySelector(".drop_down_body"),
                c = (g.getElementById("order_history").querySelectorAll(".l_tr"), void 0);
                n && n.attr && (c = n.node.querySelector("span"), !r.dom.hasClass(i, "z_active") && (c.style.display = "block"),
                function(e, t, n) {
                    var a = e.attr,
                    i = t.attr; (0, l.queryResultsDetail)({
                        path: {
                            "order-id": a
                        }
                    }).then(function(e) {
                        var t = e.data,
                        a = t.data,
                        o = [];
                        if ("ok" === t.status) {
                            for (var l = 0,
                            c = a.length; l < c; l++) {
                                var u = a[l].symbol,
                                d = top.window.SYMBOLDATA.accuracy[u],
                                p = d ? 1 * d.fee: 8,
                                m = d ? 1 * d.amount: 8,
                                f = d ? 1 * d.price: 8,
                                g = d ? 1 * d.total: 8,
                                _ = {
                                    id: a[l].id,
                                    data: (0, r.time2Date)(a[l]["created-at"]),
                                    price: (0, r.Num)(a[l].price, f),
                                    amount: (0, r.Num)(a[l]["filled-amount"], m),
                                    total: (0, r.Num)((0, s.mul)(a[l].price, a[l]["filled-amount"]), g),
                                    fee: (0, r.Num)(a[l]["filled-fees"], p),
                                    points: (0, r.Num)(a[l]["filled-points"], 8),
                                    feetype: i ? a[l].type.indexOf("buy") >= 0 ? i.split("/")[0] : i.split("/")[1] : ""
                                };
                                o.push(_)
                            }
                            "function" == typeof n && n(o)
                        } else v.Error(t["err-msg"], 3e3)
                    })
                } (n, a,
                function(t) {
                    for (var n = "",
                    a = 0,
                    l = t.length; a < l; a++) {
                        var s = "";
                        1 * t[a].fee && (s += t[a].fee + " " + t[a].feetype),
                        1 * t[a].points && (s += '<span class="pts">' + t[a].points + " pts</span>"),
                        n += '<div class="drop_down_tr_hover"><ul class="drop_down_tr"><li>' + t[a].data + "</li><li>" + t[a].price + "</li><li>" + t[a].amount + "</li><li>" + t[a].total + "</li><li>" + s + "</li></ul></div>"
                    }
                    o.innerHTML = n,
                    c.style.display = "none",
                    r.dom.hasClass(i, "z_active") ? r.dom.removeClass(i, "z_active") : r.dom.addClass(i, "z_active"),
                    function(e, t) {
                        var n = r.Event.target(e),
                        a = (0, r.attFather)(n, "data-drop-down"),
                        i = (0, r.tarFather)(n, "div"),
                        o = (g.getElementById(t).querySelectorAll(".l_drop_down_box"), i.querySelector(".l_drop_down_box")),
                        l = i.querySelector(".l_drop_down_list").offsetHeight;
                        a && (o.offsetHeight ? o.style.height = "0px": (o.style.height = l + "px", o.querySelector(".drop_down_scroll").scrollTop = 0))
                    } (e, "order_history")
                })),
                I.call(this, t, b.orderHistory.type)
            }),
            g.getElementById("trade_history") && r.Event.add(g.getElementById("trade_history"), "click",
            function(e) {
                var t = r.Event.target(e);
                I.call(this, t, b.tradeHistory.type)
            })
        }),
        t.setBuyMarketPrecision = function(e) {
            b.buyMarketPrecision = e
        },
        t.QueryOrderList = E,
        t.QueryHistoryOrderList = T,
        t.QueryResultsList = x,
        t.getListData = function(e) {
            E(e),
            T(e),
            x(e),
            h = e
        }
    },
    NlBv: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = d(n("mvHQ"));
        n("qXlb");
        var i = n("f8yD"),
        o = n("gLaJ"),
        r = n("RxF2"),
        l = n("h/lH"),
        s = (n("YtCS"), d(n("mtWM")), d(n("7al1"))),
        c = d(n("TG+V")),
        u = n("zcHd");
        function d(e) {
            return e && e.__esModule ? e: {
            default:
                e
            }
        }
        var p = new s.
    default({
            tryVoice:
            3,
            countTime: 60,
            api: r.ucGetSMSCode
        }),
        m = new s.
    default({
            countTime:
            60,
            api: r.ucGetEmailCode
        }),
        f = (0, i.Lang)(),
        g = (0, i.SplitTemplate)(c.
    default),
        v = void 0,
        _ = void 0,
        y = new u.Toast;
        t.
    default = function() {
            var e = void 0,
            t = {},
            n = void 0,
            s = void 0,
            c = void 0,
            u = void 0;
            function d(t) {
                var i = {};
                if (!u) {
                    if ("submit" == t.type) {
                        if (! (c = (0, l.getData)(s)).data.pro_dia_address_address && c.dom.pro_dia_address_address) return c.dom.pro_dia_address_address.error(e.currency.toUpperCase() + " " + f.getLang("提币地址没有填写"));
                        if (!c.data.pro_dia_address_alias && c.dom.pro_dia_address_alias) return c.dom.pro_dia_address_alias.error(f.getLang("名称没有填写"));
                        if (!c.data.sms_code && c.dom.sms_code) return c.dom.sms_code.error(f.getLang("短信验证码没有填写"));
                        if (!n && c.dom.email_code) return c.dom.email_code.error(f.getLang("请先获取邮箱验证码"));
                        if (!c.data.email_code && c.dom.email_code) return c.dom.email_code.error(f.getLang("请输入邮箱验证码"));
                        if (!c.data.ga_code && c.dom.ga_code) return c.dom.ga_code.error(f.getLang("谷歌验证码没有填写"));
                        c.data.sms_code && (i.smsCode = c.data.sms_code),
                        c.data.ga_code && (i.gaCode = c.data.ga_code),
                        c.data.email_code && (i.emailCode = c.data.email_code),
                        e.no_verify ? delete r.PRO.defaults.headers.common.authData: r.PRO.defaults.headers.common.authData = encodeURIComponent((0, a.
                    default)(i)),
                        u = 1,
                        "add_address" == e.action ? (0, r.addWithdrawAddress_v2)({
                            data: {
                                address: c.data.pro_dia_address_address,
                                tag: e.addr_tag || null,
                                alias: c.data.pro_dia_address_alias,
                                currency: e.currency,
                                level: "default"
                            }
                        }).then(function(t) {
                            var n = t.data;
                            u = 0,
                            "ok" === n.status ? (v.Close(), e.goback && e.goback()) : y.Error(t.data["err-msg"])
                        }) : e.goback && e.goback(c,
                        function() {
                            u = 0
                        },
                        v.Close)
                    }
                    "close" == t.type && (p.Reset(), m.Reset())
                }
            }
            function b(e) {
                var n = i.Event.target(e),
                a = (0, i.attFather)(n, "action"); (0, i.attFather)(n, "stop") && i.Event.stop(e),
                a && t[a.attr] && t[a.attr](a.node, n, v.dialog)
            }
            return (0, i.J)(function() {
                this.getSms = function(e) {
                    e.dataset.voice,
                    p.btn = v.dialog.querySelector('[act="sms_btn_wrap"]'),
                    p.btnText = ['<a href="" action="getSms" stop="1">' + f.getLang("点击获取") + "</a>", "<span>%s" + f.getLang("秒后重试") + "</span>", '<a href="" action="getSms" stop="1">' + f.getLang("重新获取") + "</a>", '<a href="" action="getSms" stop="1">' + f.getLang("重新获取") + "</a> " + f.getLang("或者试试") + ' <a href="" action="getSms" stop="1" data-voice="1">' + f.getLang("语音验证码") + "</a>"],
                    p.Send({
                        use_type: "VERIFY_SETTING_POLICY"
                    })
                },
                this.getEmail = function(e) {
                    m.btn = v.dialog.querySelector('[act="email_btn_wrap"]'),
                    m.btnText = ['<a href="" action="getEmail" stop="1">' + f.getLang("点击获取") + "</a>", "<span>%s" + f.getLang("秒后重试") + "</span>", '<a href="" action="getEmail" stop="1">' + f.getLang("重新获取") + "</a>", '<a href="" action="getEmail" stop="1">' + f.getLang("重新获取") + "</a>"],
                    m.Send({
                        use_type: "VERIFY_SETTING_POLICY"
                    })
                },
                m.Then = function(e) {
                    var t = e.data;
                    t.success ? (n = 1, c && c.dom.email_code.clear()) : y.Error(t.message)
                },
                p.Then = function(e) {
                    var t = e.data;
                    t.success ? c && c.dom.sms_code.clear() : y.Error(t.message)
                }
            },
            t),
            {
                open: function(e) {
                    return e && e(),
                    v.Open(),
                    v
                },
                title: function(e, t, n) {
                    return f._keys(t),
                    {
                        del: f.getLang("删除安全地址")
                    } [n] || f.getLang("添加提币地址")
                },
                construct: function(t) {
                    e = t,
                    f._keys(t.lang),
                    u = 0;
                    var n = {
                        lang: f.getLang,
                        currency: t.currency,
                        action_type: t.action,
                        page: {
                            title: t.title
                        },
                        resetPwd: "https://" + window.HOSTS.huobi + "/p/user/securityCenter/resetAssetPwd",
                        btn: {
                            submit: f.getLang("确定")
                        },
                        UI: window.UI,
                        no_verify: t.no_verify,
                        addr_tag: t.addr_tag,
                        address: t.no_verify && t.address
                    };
                    v = v || new o.Dialog({
                        html: (0, i.TmpL)((0, o.dialogMix)(g.html).html, n)
                    }),
                    c = null,
                    _ && (v.dialog.innerHTML = (0, i.TmpL)((0, o.dialogMix)(g.html).fc, n)),
                    (s = (0, i.nodes2array)(v.dialog.querySelectorAll("input")).concat((0, i.nodes2array)(v.dialog.querySelectorAll("button")))).forEach(function(e) { (0, i.J)(l.errorAction, e)
                    }),
                    !_ && i.Event.add(v.dialog, "click", b),
                    !_ && v.callback(d),
                    _ = 1,
                    (c = (0, l.getData)(s)).dom.pro_dia_address_address.disabled = !0,
                    c.dom.pro_dia_address_address.value = n.no_verify && n.address ? n.address: ""
                },
                updateData: function() {},
                callUpdate: function() {}
            }
        } ()
    },
    OENi: function(e, t) {
        e.exports = '<div class="dia_ticket">\n    <div class="dia_ticket_head">\n        <dl class="<%if(act){%>dia_ticket_to<%}else{%>dia_ticket_from<%}%>">\n            <dt class="upper"><%=scoin.join("+")%></dt>\n            <dd><%=lang("可转换")%><em>---</em><span class="huobi_pro_info"><div class="dia_tips"><div><%=lang("1 BT1 + 1 BT2 = 1 BTC，因此BT1、BT2可用余额中的较小值为最大可转换数额")%></div><i>█</i></div>\n        </span></dd>\n        </dl>\n        <dl class="<%if(!act){%>dia_ticket_to<%}else{%>dia_ticket_from<%}%>">\n            <dt class="upper"><%= currency %></dt>\n            <dd><%=lang("可转换")%><em>---</em></dd>\n        </dl>\n        <b action="switch_dir"><i class="hb_icon_split_coin"></i><em><%=lang("点击切换")%></em></b>\n    </div>\n    <div class="dia_ticket_data">\n        <div class="dia_input">\n            <div class="input_top">\n                <b><%=lang("转换数量")%></b>\n                <p class="pro_warning"><%=lang("分叉币无需手续费，支持实时到账。")%></p>\n            </div>\n            <div class="input_middle">\n                <input class="input_text" type="text" pro_name="pro_dia_amount" maxlength="20">\n                <span class="input_text_right tio_all_in">|<b action="allIn"><%=lang("全部转换")%></b></span>\n            </div>\n            <p class="input_bottom align_left">\n            </p>\n        </div>\n    </div>\n    <div class="dia_ticket_ouput">\n        <div class="dia_input">\n            <div class="input_top">\n                <b>\n                    <%=lang("将消耗")%>\n                </b>\n                <p class="pro_warning"></p>\n            </div>\n            <div class="input_middle">\n                <input class="input_text" disabled type="text" pro_name="pro_dia_from">\n            </div>\n        </div>\n        <div class="dia_input">\n            <div class="input_top">\n                <b>\n                    <%=lang("将生成")%>\n                </b>\n                <p class="pro_warning"></p>\n            </div>\n            <div class="input_middle">\n                <input class="input_text" disabled type="text" pro_name="pro_dia_to">\n            </div>\n        </div>\n        \x3c!-- <dl>\n            <dt><%=lang("将消耗")%></dt>\n            <dd><%=lang("将生成")%></dd>\n        </dl> --\x3e\n        \x3c!-- <dl block="result" class="upper"></dl> --\x3e\n    </div>\n</div>\n<block name="result">\n    <% if(!act){%>\n    <dt>\n        <% for(var i = 0; i < scoin.length; i ++){%>\n            <%if(i){%><b>+</b><%}%><em><%=amount%></em><%=scoin[i]%>\n        <% } %>\n    </dt>\n    <dd><em><%=amount%></em><%= currency %></dd>\n    <% } else {%>\n    <dt><em><%=amount%></em><%= currency %></dt>\n    <dd>\n        <% for(var i = 0; i < scoin.length; i ++){%>\n            <%if(i){%><b>+</b><%}%><em><%=amount%></em><%=scoin[i]%>\n        <% } %>\n    </dd>\n    <% }%>\n</block>'
    },
    RmBv: function(e, t) {},
    SAd4: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = c(n("Dd8w")),
        i = c(n("d7EF"));
        n("yDQQ");
        var o = n("gLaJ"),
        r = n("f8yD"),
        l = n("aVmh"),
        s = (n("YtCS"), c(n("04Xc")));
        function c(e) {
            return e && e.__esModule ? e: {
            default:
                e
            }
        }
        var u = (0, r.SplitTemplate)(s.
    default),
        d = (0, r.Lang)(),
        p = window.PAGE_COIN,
        m = window.PAGE_QUOTE;
        d._keys(window.LANG.dialog);
        var f = {
            lang: d.getLang,
            block: "order_confirm",
            page: {
                title: d.getLang("买入")
            },
            btn: {
                submit: "确定",
                cancel: "取消"
            },
            type: "limit",
            price: 0,
            amount: 0,
            total: 0,
            avgAmount: 0,
            base: p,
            quote: m
        },
        g = new o.Dialog({
            html: (0, r.TmpL)((0, o.dialogMix)(u.block.order_confirm_buy).html, f)
        });
        g.callback(function(e) {
            var t = e.type,
            n = e.arg;
            if ("open" === t) {
                var s = (0, i.
            default)(n, 3),
                c = s[0],
                v = s[1],
                _ = s[2],
                y = c.price,
                b = c.amount,
                h = c.type,
                k = v.symbol,
                w = void 0 === k ? {}: k,
                L = v.asks,
                S = void 0 === L ? [] : L,
                E = v.bids,
                T = void 0 === E ? [] : E,
                x = v.floatLength,
                I = void 0 === x ? 8 : x,
                O = v.amountFloatLength,
                M = void 0 === O ? 8 : O,
                N = (0, i.
            default)(w, 2),
                A = N[0],
                D = void 0 === A ? p: A,
                q = N[1],
                C = void 0 === q ? m: q,
                P = STORE.symbolDataObj[D + C]["trade-total-precision"],
                H = h.split("-"),
                R = (0, i.
            default)(H, 2),
                B = R[0],
                F = (R[1], ("buy" === B ? S: T).reduce(function(e, t) {
                    return [e[0] += t[0] * t[1], e[1] + t[1]]
                },
                [0, 0])),
                G = (0, i.
            default)(F, 2),
                j = G[0],
                U = G[1],
                V = (0, l.div)(j, U),
                z = (0, r.Num)((0, l.div)(b, V), M),
                Y = (0, r.Num)((0, l.mul)(y || V, b), P),
                Q = (0, a.
            default)(f, c, {
                    direct: B,
                    symbol: w,
                    avgAmount: z,
                    total: Y,
                    Num: r.Num,
                    pp: I,
                    ap: M,
                    tp: P,
                    legalPrice: _,
                    base: D,
                    quote: C
                });
                f.page.title = "buy" === B ? d.getLang("买入") + " " + D.toUpperCase() : d.getLang("卖出") + " " + D.toUpperCase(),
                f.amount = "buy-market" === h ? (0, r.Num)(b, P) : (0, r.Num)(b, M);
                var W = (0, r.TmpL)((0, o.dialogMix)(u.block["order_confirm_" + B]).html, Q);
                g.Render(W)
            }
        }),
        g.dialog.classList.add("dia_order_confirm"),
        t.
    default = g
    },
    SXXo: function(e, t) {},
    "TG+V": function(e, t) {
        e.exports = '<div class="dia_add_address">\n    <div class="dia_input">\n        <div class="input_top">\n            <b><i class="upper"><%=currency%></i> <%=lang("地址")%></b>\n            <p class="pro_warning"></p>\n        </div>\n        <div class="input_middle">\n            <input class="input_text" type="text" pro_name="pro_dia_address_address">\n        </div>\n    </div>\n    <% if (addr_tag){ %>\n    <div class="dia_input">\n        <div class="input_top">\n            <b><%=lang("标签")%></b>\n            <p class="pro_warning"></p>\n        </div>\n        <div class="input_middle">\n            <input class="input_text" type="text" pro_name="pro_dia_address_tag" disabled value="<%=addr_tag%>">\n        </div>\n    </div>\n    <% } %>\n    <div class="dia_input">\n        <div class="input_top">\n            <b><%=lang("备注")%></b>\n            <p class="pro_warning"></p>\n        </div>\n        <div class="input_middle">\n            <input class="input_text" type="text" pro_name="pro_dia_address_alias">\n        </div>\n    </div>\n    <% if (!no_verify) { %>\n    <% if(UI.setting.verify_phone){ %>\n    <div class="dia_input">\n        <div class="input_top">\n            <b><%=lang("短信验证码")%></b>\n            <p class="pro_warning"></p>\n        </div>\n        <div class="input_middle">\n            <input class="input_text" type="text" pro_name="sms_code" maxlength="6">\n            <span class="input_text_right sms_verify" act="sms_btn_wrap">\n            <a href="" action="getSms" stop="1"><%=lang("点击获取")%></a>\n        </span>\n        </div>\n        <p class="input_bottom">\n            <%=lang("手机号")%> <b class="color_master"><%=UI.phone%></b>\n        </p>\n    </div>\n    <% } %>\n    <% if(UI.setting.verify_email){ %>\n    <div class="dia_input">\n        <div class="input_top">\n            <b><%=lang("邮箱验证码")%></b>\n            <p class="pro_warning"></p>\n        </div>\n        <div class="input_middle">\n            <input class="input_text" type="text" pro_name="email_code" verify="1" maxlength="6">\n            <span class="input_text_right sms_verify" act="email_btn_wrap">\n            <a href="" action="getEmail" stop="1"><%=lang("点击获取")%></a>\n        </span>\n        </div>\n        <p class="input_bottom">\n            <%=lang("邮箱")%> <b class="color_master"><%=UI.email%></b>\n        </p>\n    </div>\n    <% } %>\n    <% if(UI.setting.verify_ga){ %>\n    <div class="dia_input">\n        <div class="input_top">\n            <b><%=lang("谷歌验证码")%></b>\n            <p class="pro_warning"></p>\n        </div>\n        <div class="input_middle">\n            <input class="input_text" type="text" pro_name="ga_code">\n        </span>\n        </div>\n    </div>\n    <% } %>\n    <% } %>\n</div>\n'
    },
    TVPb: function(e, t) {
        e.exports = "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiICB3aWR0aD0iMjAwcHgiIGhlaWdodD0iMjAwcHgiICB2aWV3Qm94PSIwIDAgMjAwIDIwMCIKIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoubGVmdHtmaWxsOnVybCgjbGVmdCk7fQoucmlnaHR7ZmlsbDp1cmwoI3JpZ2h0KTt9Ci50b3B7ZmlsbDojN0E5OEY3O30KQGtleWZyYW1lcyBsb2FkewowJXt0cmFuc2Zvcm06cm90YXRlKDApfQoxMDAle3RyYW5zZm9ybTpyb3RhdGUoLTM2MGRlZyl9Cn0KI2xvYWR7YW5pbWF0aW9uOmxvYWQgMXMgIGxpbmVhciBpbmZpbml0ZTsgdHJhbnNmb3JtLW9yaWdpbjpjZW50ZXIgY2VudGVyOyB9Cjwvc3R5bGU+CjxnIGlkPSJsb2FkIj4KPGxpbmVhckdyYWRpZW50IGlkPSJyaWdodCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSIxNTAiIHkxPSIyMCIgeDI9IjE1MCIgeTI9IjE4MCI+CjxzdG9wICBvZmZzZXQ9IjAiIHN0eWxlPSJzdG9wLWNvbG9yOiM3QTk4RjciLz4KPHN0b3AgIG9mZnNldD0iMSIgc3R5bGU9InN0b3AtY29sb3I6IzdBOThGNztzdG9wLW9wYWNpdHk6MC41Ii8+PCEtLeapmeWIsOa1heapmea4kOWPmC0tPgo8L2xpbmVhckdyYWRpZW50Pgo8cGF0aCBjbGFzcz0icmlnaHQiIGQ9Ik0xMDAsMHYyMGM0NC4xLDAsODAsMzUuOSw4MCw4MGMwLDQ0LjEtMzUuOSw4MC04MCw4MHYyMGM1NS4yLDAsMTAwLTQ0LjgsMTAwLTEwMFMxNTUuMiwwLDEwMCwweiIvPjwhLS3lj7PljYrlnIbnjq8tLT4KPGxpbmVhckdyYWRpZW50IGlkPSJsZWZ0IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjUwIiB5MT0iMCIgeDI9IjUwIiB5Mj0iMTgwIj4KPHN0b3AgIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6IzdBOThGNztzdG9wLW9wYWNpdHk6MCIvPgo8c3RvcCAgb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojN0E5OEY3O3N0b3Atb3BhY2l0eTowLjUiLz48IS0t5rWF5qmZ5Yiw55m96Imy5riQ5Y+YLS0+CjwvbGluZWFyR3JhZGllbnQ+CjxwYXRoIGNsYXNzPSJsZWZ0IiBkPSJNMjAsMTAwYzAtNDQuMSwzNS45LTgwLDgwLTgwVjBDNDQuOCwwLDAsNDQuOCwwLDEwMHM0NC44LDEwMCwxMDAsMTAwdi0yMEM1NS45LDE4MCwyMCwxNDQuMSwyMCwxMDB6Ii8+PCEtLeW3puWNiuWchueOry0tPgo8Y2lyY2xlIGNsYXNzPSJ0b3AiIGN4PSIxMDAiIGN5PSIxMCIgcj0iMTAiLz4KPC9nPgo8L3N2Zz4K"
    },
    TlqS: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        n("9VC0");
        var a = n("f8yD"),
        i = n("gLaJ"),
        o = n("h/lH"),
        r = n("RxF2"),
        l = (n("YtCS"), u(n("7al1"))),
        s = u(n("a1i+")),
        c = n("zcHd");
        function u(e) {
            return e && e.__esModule ? e: {
            default:
                e
            }
        }
        var d = (0, a.Lang)(),
        p = (0, a.SplitTemplate)(s.
    default),
        m = void 0,
        f = void 0,
        g = {
            btc: "/index.php?a=btc_",
            ltc: "/index.php?a=ltc_"
        },
        v = new c.Toast,
        _ = void 0,
        y = void 0,
        b = void 0,
        h = new l.
    default({
            tryVoice:
            3,
            countTime: 60,
            api: r.ucGetSMSCode
        }),
        k = new l.
    default({
            countTime:
            60,
            api: r.ucGetEmailCode
        });
        t.
    default = function() {
            var e = {},
            t = void 0,
            n = void 0,
            r = void 0,
            l = void 0,
            s = void 0,
            c = void 0;
            function u(e) {
                return m && m.Close(e),
                m
            }
            function w(t) {
                var n = a.Event.target(t),
                i = (0, a.attFather)(n, "action"); (0, a.attFather)(n, "stop") && a.Event.stop(t),
                i && e[i.attr] && e[i.attr](i.node, n, m.dialog)
            }
            function L() {
                c && (c.parentNode.parentNode.querySelector("button").disabled = !c.checked)
            }
            function S(e) {
                var a = {};
                if (!b) {
                    if ("submit" == e.type) {
                        if (_ = (0, o.getData)(n), !r && _.dom.sms_code) return _.dom.sms_code.error(d.getLang("请先获取短信验证码"));
                        if (!_.data.sms_code && _.dom.sms_code) return _.dom.sms_code.error(d.getLang("短信验证码没有填写"));
                        if (!l && _.dom.email_code) return _.dom.email_code.error(d.getLang("请先获取邮箱验证码"));
                        if (!_.data.email_code && _.dom.email_code) return _.dom.email_code.error(d.getLang("请输入邮箱验证码"));
                        if (!_.data.ga_code && _.dom.ga_code) return _.dom.ga_code.error(d.getLang("谷歌验证码没有填写"));
                        _.data.sms_code && (a.sms_code = _.data.sms_code),
                        _.data.ga_code && (a.ga_code = _.data.ga_code),
                        _.data.email_code && (a.email_code = _.data.email_code),
                        b = 1,
                        t.success && t.success(a, m,
                        function(e) {
                            b = 0,
                            e || (r = 0, l = 0, u())
                        })
                    }
                    "close" == e.type && (h.Reset(), k.Reset())
                }
            }
            function E() {
                var e = "width=520,height=500,top=" + (window.screenTop + (window.outerHeight - 500 - 51) / 2) + ",left=" + (window.screenLeft + (window.outerWidth - 520) / 2);
                window.open("http: //huobi.udesk.cn/im_client?cur_url=" + encodeURIComponent(location.href) + "&pre_url=" + encodeURIComponent(document.referrer), "udesk_im", e)
            }
            return (0, a.J)(function() {
                this.udesk = E,
                this.close = u,
                this.btn_submit = function(e) {
                    s && s(m, e, t)
                },
                this.getSms = function(e) {
                    var t = !!e.dataset.voice;
                    h.btn = m.dialog.querySelector('[act="sms_btn_wrap"]'),
                    h.btnText = ['<a href="" action="getSms" stop="1">' + d.getLang("点击获取") + "</a>", "<span>%s" + d.getLang("秒后重试") + "</span>", '<a href="" action="getSms" stop="1">' + d.getLang("重新获取") + "</a>", '<a href="" action="getSms" stop="1">' + d.getLang("重新获取") + "</a> " + d.getLang("或者试试") + ' <a href="" action="getSms" stop="1" data-voice="1">' + d.getLang("语音验证码") + "</a>"],
                    h.Send({
                        use_type: "VERIFY_SETTING_POLICY",
                        voice: t
                    })
                },
                this.getEmail = function(e) {
                    k.btn = m.dialog.querySelector('[act="email_btn_wrap"]'),
                    k.btnText = ['<a href="" action="getEmail" stop="1">' + d.getLang("点击获取") + "</a>", "<span>%s" + d.getLang("秒后重试") + "</span>", '<a href="" action="getEmail" stop="1">' + d.getLang("重新获取") + "</a>", '<a href="" action="getEmail" stop="1">' + d.getLang("重新获取") + "</a>"],
                    k.Send({
                        use_type: "VERIFY_SETTING_POLICY"
                    })
                },
                k.Then = function(e) {
                    var t = e.data;
                    t.success ? (l = 1, _ && _.dom.email_code.clear()) : v.Error(t.message)
                },
                h.Then = function(e) {
                    var t = e.data;
                    t.success ? (r = 1, _ && _.dom.sms_code.clear()) : v.Error(t.message)
                }
            },
            e),
            {
                open: function(e, t) {
                    return s = t,
                    e && e(m.dialog),
                    m.Open(),
                    m
                },
                close: u,
                construct: function(e) {
                    var r = e.block || "loading";
                    t = e,
                    d._keys(e.lang),
                    _ = null,
                    b = 0;
                    var l = {
                        lang: d.getLang,
                        item: t.item,
                        currency: e.currency,
                        page: {
                            title: d.getLang(e.title),
                            titleMore: "disable" == t.action ? d.getLang({
                                PHONE: "关闭手机验证后24小时内禁止提币。",
                                EMAIL: "关闭邮箱验证后24小时内禁止提币。",
                                GA: "关闭谷歌验证器验证后24小时内禁止提币。"
                            } [t.itemkey]) : ""
                        },
                        huobifinance: g[e.currency] ? "https://" + window.HOSTS.huobi + "/" + r.replace("gohuobi", "") + g[e.currency] + r.replace("gohuobi", "") : "https://" + window.HOSTS.huobi + "/finance/innovate/",
                        btn: !!e.btn && (1 == e.btn ? {
                            submit: d.getLang("确定")
                        }: {
                            cancel: d.getLang("取消"),
                            submit: d.getLang("确定")
                        }),
                        option: e
                    };
                    return m = m || new i.Dialog({
                        html: (0, a.TmpL)((0, i.dialogMix)(p.html).html, l)
                    }),
                    f && (m.dialog.innerHTML = (0, a.TmpL)((0, i.dialogMix)(p.html).fc, l)),
                    m.dialog.querySelector("#dia_close").style.display = t.hiddenClose ? "none": "",
                    m.dialog.querySelector(".dia_submit").style.display = t.hiddenFoot ? "none": "",
                    m.dialog.querySelector('[block="content"]').innerHTML = (0, a.TmpL)(p.block[r], t.content || l),
                    !f && !t.stopEvent && a.Event.add(m.dialog, "click", w),
                    m.callback(S),
                    f = 1,
                    (n = (0, a.nodes2array)(m.dialog.querySelectorAll("input")).concat((0, a.nodes2array)(m.dialog.querySelectorAll("button")))).forEach(function(e) {
                        "pro_dia_address_amount" === e.getAttribute("pro_name") && (a.Event.add(e, "keydown",
                        function() {
                            m.dialog.querySelector('[amout="out_amount"]').innerHTML = Num(1 * e.value ? 1 * e.value: 0, STORE.currencyDataObj[t.currency]["show-precision"])
                        }), a.Event.add(e, "keyup",
                        function() {
                            m.dialog.querySelector('[amout="out_amount"]').innerHTML = Num(1 * e.value ? 1 * e.value: 0, STORE.currencyDataObj[t.currency]["show-precision"])
                        })),
                        (0, a.J)(o.errorAction, e)
                    }),
                    c = m.dialog.querySelector("#agreeAgt"),
                    !y && (0, a.AnimationFactory)(L),
                    m
                }
            }
        } ()
    },
    UQGx: function(e, t) {},
    Xxxe: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.
    default = function() {
            var e, t, n, a, i, o, r, l, s, c, u, d = {};
            function p(e, t, n) { (document.addEventListener ?
                function(a, i, o) {
                    e.addEventListener(t, n, !1)
                }: function(a, i, o) {
                    e.attachEvent("on" + t, n)
                })(e, t, n)
            }
            function m(e) {
                return {
                    x: e.pageX || e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft),
                    y: e.pageY || e.clientY + (document.documentElement.scrollTop || document.body.scrollTop)
                }
            }
            function f(e, t) {
                if (e < 0 && (e = 0), e > 100 && (e = 100), u !== e) for (var n in u = e,
                _(e), d)"function" == typeof d[n] && d[n](e, t)
            }
            function g(e, t) {
                f(e, t || "data")
            }
            function v(e) {
                f(100 * e / s, "event")
            }
            function _(t, n) {
                n && w(),
                e.style.left = t * s / 100 - (c ? 0 : a / 2) + "px",
                e.x = ~~ (t * s / 100)
            }
            function y(t) {
                i = 1,
                r = m(t).x,
                l = e.x,
                w()
            }
            function b(e) {
                h(e, 1),
                i = 0
            }
            function h(e, t) {
                i && (function(e) {
                    e && e.stopPropagation ? (e.stopPropagation(), e.preventDefault()) : (window.event.cancelBubble = !0, window.event.returnValue = !1)
                } (e), o && !t || (o = 1, setTimeout(function() {
                    o = 0
                },
                20), v(l + m(e).x - r)))
            }
            function k(e) {
                var n = m(e).x,
                i = function(e, t) {
                    var n, a, i, o = e,
                    r = 0,
                    l = 0;
                    if (e.nodeName) {
                        for (; o && ("body" == o.nodeName.toLowerCase() && (a = 1), i = o.currentStyle ? o.currentStyle: document.defaultView.getComputedStyle(o), r += o.offsetLeft + (parseInt(i.borderLeftWidth) ? parseInt(i.borderLeftWidth) : 0) - (a ? 0 : o.scrollLeft), l += o.offsetTop + (parseInt(i.borderTopWidth) ? parseInt(i.borderTopWidth) : 0) - (a ? 0 : o.scrollTop), n = o.offsetParent ? o.offsetParent: o, !(t & t === (o = o.offsetParent))););
                        return {
                            x: r,
                            y: l,
                            element: o,
                            forefather: t || n
                        }
                    }
                } (t).x;
                w(),
                v(n - i - (c ? a: 0) / 2)
            }
            function w() {
                a = e.offsetWidth,
                s = t.offsetWidth - (c ? a: 0)
            }
            return {
                bindCallback: function(e, t) {
                    d[e] = t
                },
                unbindCallback: function(e) {
                    delete d[e]
                },
                redrag: g,
                init: function(i, o) {
                    n = "string" == typeof i ? document.querySelector("#" + i.replace("#", "")) : i,
                    e = document.createElement("i"),
                    t = document.createElement("i"),
                    e.className = "drag_bar",
                    t.className = "drag_track",
                    n.appendChild(e),
                    n.appendChild(t),
                    c = o,
                    a = e.offsetWidth,
                    s = t.offsetWidth - (c ? a: 0),
                    p(e, "mousedown", y),
                    p(t, "click", k),
                    p(document, "mousemove", h),
                    p(document, "mouseup", b),
                    g(0)
                },
                setInit: w,
                resetPos: _
            }
        }
    },
    "a1i+": function(e, t, n) {
        e.exports = '<div block="content"></div>\n<block name="loading">\n    <div class="dia_loading" style="text-align: center"><img class="dia_wd_address_loading" style="width:32px;" src="' + n("TVPb") + '"/></div>\n</block>\n<block name="wegwit2x">\n    <div class="arg_content">\n        <div class="dia_top_mask" style="display:none"></div>\n        <div class="dia_bottom_mask"></div>\n        <div class="dia_cont"><%=lang(\'P_dialog_segwit2x_agreement\')%></div>\n    </div>\n    <div class="dia_arg_btn btn_segwit2x">\n        <button class="btn btn_submit btn-primary" action="btn_submit"><%=lang("我已阅读并同意上述协议")%></button>\n    </div>\n</block>\n<block name="agreement_margin">\n    <div class="arg_content">\n        <div class="dia_top_mask" style="display:none"></div>\n        <div class="dia_bottom_mask"></div>\n        <div class="dia_cont"><%=lang(\'P_dialog_agreement_margin\')%></div>\n    </div>\n    <div class="dia_arg_btn btn_margin" style="margin-top: 20px">\n        <button class="btn btn_submit btn-primary" action="btn_submit"><%=lang("我已阅读并同意上述协议")%></button>\n    </div>\n</block>\n\n<block name="agreement">\n    <div class="arg_content">\n        <div class="dia_top_mask" style="display:none"></div>\n        <div class="dia_bottom_mask"></div>\n        <div class="dia_cont"><%= lang(option.dia_content) %></div>\n    </div>\n    <%if(option.dia_checkbox){%>\n    <div class="dia_arg_btn dia_global_btn" style="padding-top: 10px">\n        <label>\n            <input type="checkbox" name="agree" checked="checked"> <%=lang(option.dia_checkbox)%>\n        </label>\n    </div>\n    <%}%>\n    <div class="dia_arg_btn btn_margin" style="margin-top: 20px">\n        <button class="btn btn_submit btn-primary" action="btn_submit"><%=lang(option.dia_button)%></button>\n    </div>\n</block>\n\n<block name="fireGlobal">\n    <div class="arg_content dia_global_content">\n        <div class="dia_top_mask" style="display:none"></div>\n        <div class="dia_bottom_mask"></div>\n        <div class="dia_cont dia_global">\n<p><%=lang("尊敬的用户您好：")%></p>\n<p><%=lang("欢迎您选择火币全球专业站（www.huobi.pro）（以下简称“专业站”）。为了您使用方便，您在火币网（www.huobi.com）的账户信息可以通过开通操作后在专业站使用，但前提是您必须同意下列条件，如您不同意下列任一条件，请您停止下一步操作并立即退出本页面：")%></p>\n<p><%=lang("1. 同意火币全球专业站的《用户协议》（包括但不限于正文、《隐私条款》、《了解你的客户和反洗钱政策》等）的内容，请您务必仔细阅读并了解相关内容，详见链接")%>(<a href=\'<%=location.protocol%>//<%=location.hostname%><%=lang("ROOT")%>about/agreement\' target="_blank"><%=location.protocol%>//<%=location.hostname%><%=lang("ROOT")%>about/agreement</a>);</p>\n<p><%=lang("2. 如您点击“开通”，即视为: 您已经仔细阅读并完全理解且同意了《用户协议》等内容，并同意受到《用户协议》的约束和管辖；且您已经授权专业站访问您在火币网的账户信息，包括但不限于注册信息、认证信息等。")%></p>\n        </div>\n    </div>\n    <div class="dia_arg_btn dia_global_btn">\n        <p><input type="checkbox" chekced="" id="agreeAgt" name="" style="margin-right:10px;"><label for="agreeAgt"><%=lang("开通后表明您已同意以上授权说明及")%><a href=\'<%=location.protocol%>//<%=location.hostname%><%=lang("ROOT")%>about/agreement\' target="_blank" class="main_link"><%=lang("《用户协议》")%></a></label></p>\n        <button class="btn btn_submit btn-primary" action="btn_submit"><%=lang("开通火币全球专业站")%></button>\n    </div>\n</block>\n\n<block name="content">\n    <%=content%>\n</block>\n<block name="verify_setting">\n        <% if((option.action !== "enable" && UI.setting.verify_phone) || item === "PHONE"){ %>\n            <div class="dia_input">\n                <div class="input_top">\n                    <b>\n                        <%=lang("手机号")%>\n                    </b>\n                    <p class="pro_warning"></p>\n                </div>\n                <div class="input_middle">\n                    <input class="input_text" type="text" disabled value="<%=UI.phone%>">\n                </div>\n            </div>\n            <div class="dia_input">\n                <div class="input_top">\n                    <b>\n                        <%=lang("短信验证码")%>\n                    </b>\n                    <p class="pro_warning"></p>\n                </div>\n                <div class="input_middle">\n                    <input class="input_text" type="text" pro_name="sms_code" maxlength="6">\n                    <span class="input_text_right sms_verify" act="sms_btn_wrap">\n                        <a href="" action="getSms" stop="1">\n                            <%=lang("点击获取")%>\n                        </a>\n                    </span>\n                </div>\n            </div>\n        <% } %>\n        <% if((option.action !== "enable" && UI.setting.verify_email) || item === "EMAIL"){ %>\n            <div class="dia_input">\n                <div class="input_top">\n                    <b>\n                        <%=lang("邮箱")%>\n                    </b>\n                    <p class="pro_warning"></p>\n                </div>\n                <div class="input_middle">\n                    <input class="input_text" type="text" disabled value="<%=UI.email%>">\n                </div>\n            </div>\n            <div class="dia_input">\n                <div class="input_top">\n                    <b>\n                        <%=lang("邮箱验证码")%>\n                    </b>\n                    <p class="pro_warning"></p>\n                </div>\n                <div class="input_middle">\n                    <input class="input_text" type="text" pro_name="email_code" verify="1" maxlength="6">\n                    <span class="input_text_right sms_verify" act="email_btn_wrap">\n                        <a href="" action="getEmail" stop="1">\n                            <%=lang("点击获取")%>\n                        </a>\n                    </span>\n                </div>\n            </div>\n        <% } %>\n        <% if((option.action !== "enable" && UI.setting.verify_ga) || item === "GA"){ %>\n        <div class="dia_input">\n            <div class="input_top">\n                <b><%=lang("谷歌验证码")%></b>\n                <p class="pro_warning"></p>\n            </div>\n            <div class="input_middle">\n                <input class="input_text" type="text" pro_name="ga_code">\n            </span>\n            </div>\n        </div>\n        <% } %>\n</block>\n<block name="disable_margin">\n    <p><%=lang("您所在的国家或地区暂不支持杠杆功能")%></p>\n</block>\n<block name="disable_margin_ip">\n    <p><%=lang("您的IP登录归属地不支持杠杆功能")%></p>\n    <p><%=lang("如果您不是该归属地国籍，请先进行实名认证")%></p>\n</block>\n<block name="disable_vote">\n    <p><%=lang("您所在的国家或地区暂不支持此功能")%></p>\n</block>\n<block name="disable_points_ip">\n    <p><%=lang("您的IP登录归属地不支持点卡购买功能")%></p>\n    <p><%=lang("如果您不是该归属地国籍，请先进行实名认证")%></p>\n</block>'
    },
    a87q: function(e, t) {},
    aVmh: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.div = t.mul = t.sub = t.add = t.m = void 0,
        t._div = f;
        var a = n("f8yD"),
        i = function(e) {
            var t = {};
            return function() {
                var n = Array.prototype.slice.call(arguments).toString();
                return n in t ? t[n] : t[n] = e.apply(this, arguments)
            }
        },
        o = i(function(e, t) {
            return e.length < t ? o("0" + e, t) : e
        }),
        r = i(function(e, t) {
            return e.length < t ? r(e + "0", t) : e
        }),
        l = i(function(e) {
            return "0" === e.substr(0, 1) && "0." !== e.substr(0, 2) ? l(e.substr(1)) : e
        }),
        s = i(function(e) {
            return e.match(/[\.]$/) ? s(e.replace(/[\.]$/, "")) : e
        }),
        c = function(e, t) {
            var n = !1,
            i = (0, a.scientific2float)(e),
            l = (0, a.scientific2float)(t),
            s = i.substr(0, 1).match(/^\D/) ? 1 : 0,
            c = l.substr(0, 1).match(/^\D/) ? 1 : 0,
            u = s ? i.substr(1).split(".") : i.split("."),
            d = c ? l.substr(1).split(".") : l.split("."),
            p = Math.max(u[0].length, d[0].length),
            m = Math.max(u[1] ? u[1].length: 0, d[1] ? d[1].length: 0),
            f = o(u[0], p),
            g = o(d[0], p);
            u[1] = u[1] ? u[1] : "",
            d[1] = d[1] ? d[1] : "";
            var v = u[1] || d[1] ? r(u[1], m) : "",
            _ = u[1] || d[1] ? r(d[1], m) : "";
            u = ("0" + f + v).split(""),
            d = ("0" + g + _).split("");
            for (var y = u.length + 1; ! n && y--;) {
                var b = u.length - y;
                if (u[b] - d[b] > 0) break;
                n = u[b] - d[b] < 0
            }
            return n ? {
                intMax: p,
                floatMax: m,
                needSwap: n,
                arrA: d.reverse(),
                arrB: u.reverse(),
                symbol: parseInt(c + "" + s, 2)
            }: {
                intMax: p,
                floatMax: m,
                needSwap: n,
                arrA: u.reverse(),
                arrB: d.reverse(),
                symbol: parseInt(s + "" + c, 2)
            }
        },
        u = function(e, t) {
            switch (t) {
            case 0:
                if ("add" == e) return 0;
                if ("sub" == e) return 0;
                break;
            case 1:
            case 2:
                if ("add" == e) return 1;
                if ("sub" == e) return 0;
                break;
            case 3:
                if ("add" == e) return 0;
                if ("sub" == e) return 0
            }
        },
        d = function(e, t, n) {
            e = (0, a.scientific2float)(e),
            t = (0, a.scientific2float)(t);
            n = n || c(e, t);
            if (u("add", n.symbol)) return p(e, t, n);
            var i = [0];
            return n.arrA.forEach(function(e, t) {
                i[t] += 1 * e + 1 * n.arrB[t],
                i[t] > 9 ? (i[t] -= 10, i[t + 1] = 1) : i[t + 1] = 0
            }),
            i.splice(n.floatMax, 0, "."),
            "." === (i = s(l(i.reverse().toString().replace(/,/g, "")))).replace(/0/g, "") ? "0": (!n.needSwap && 2 == n.symbol || 3 == n.symbol ? "-": "") + i
        },
        p = function(e, t, n) {
            n = n || c(e, t);
            if (u("sub", n.symbol)) return d(e, t, n);
            var a = [0];
            return n.arrA.forEach(function(e, t) {
                a[t] += 1 * e - 1 * n.arrB[t],
                a[t] < 0 ? (a[t] += 10, a[t + 1] = -1) : a[t + 1] = 0
            }),
            a.splice(n.floatMax, 0, "."),
            "." === (a = s(l(a.reverse().toString().replace(/,/g, "")))).replace(/0/g, "") ? "0": (n.symbol > 1 ? "-": "") + a
        },
        m = function(e, t) {
            var n = n || c(e, t),
            a = [0];
            return n.arrB.forEach(function(e, t) {
                n.arrA.forEach(function(n, i) {
                    a[i + t] += n * e;
                    var o = Math.floor(a[i + t] / 10);
                    a[i + t] %= 10,
                    a[i + t + 1] = a[i + t + 1] ? a[i + t + 1] + o: o
                })
            }),
            a.splice(2 * n.floatMax, 0, "."),
            a = s(l(a.reverse().toString().replace(/,/g, ""))),
            (2 == n.symbol || 1 == n.symbol ? "-": "") + a
        };
        function f(e, t) {
            var n = 0,
            i = 0,
            o = (0, a.scientific2float)(e),
            r = (0, a.scientific2float)(t);
            if (! (1 * r)) return "0";~o.indexOf(".") && (o = o.replace(/0+$/, "")),
            ~r.indexOf(".") && (r = r.replace(/0+$/, ""));
            try {
                n = o.toString().split(".")[1].length
            } catch(e) {
                console.log(e)
            }
            try {
                i = r.toString().split(".")[1].length
            } catch(e) {
                console.log(e)
            }
            return Number(o.toString().replace(".", "")) / Number(r.toString().replace(".", "")) * Math.pow(10, i - n)
        }
        t.m = function() {
            function e() {
                var e = [].slice.apply(arguments),
                t = this,
                n = e.shift();
                return function() {
                    return n = t.apply(this, [n, e.shift()]),
                    e.length ? arguments.callee.apply(this, arguments) : n
                } ()
            }
            return {
                add: function() {
                    return e.apply(d, arguments)
                },
                sub: function() {
                    return e.apply(p, arguments)
                },
                mul: function() {
                    return e.apply(m, arguments)
                }
            }
        } (),
        t.add = d,
        t.sub = p,
        t.mul = m,
        t.div = f
    },
    cnkX: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.Entity = t.DomState = void 0;
        var a, i = n("pFYg"),
        o = (a = i) && a.__esModule ? a: {
        default:
            a
        };
        function r() {
            var e = document;
            return e.dom = document,
            e.__queue = e.__queue || [],
            e.ExeQueue = function() {
                var t = e.__queue.shift();
                t && t(),
                e.__queue.length && e.ExeQueue()
            },
            e.Ready = this.Ready = function(t) {
                e.isInteractive || e.isComplete ? t && t() : e.__queue.push(t)
            },
            e
        }
        document.onreadystatechange = function() {
            switch (document.readyState) {
            case "loading":
                document.loading && document.loading();
                break;
            case "interactive":
                document.isInteractive = !0,
                document.Interactive && document.Interactive(),
                document.ExeQueue && document.ExeQueue();
                break;
            case "complete":
                document.isComplete = !0,
                document.complete && document.complete(),
                document.isInteractive || document.ExeQueue && document.ExeQueue()
            }
        },
        t.DomState = r,
        t.Entity = function(e, t, n) {
            var a = document.createElement("div"),
            i = void 0,
            l = void 0;
            return a.innerHTML = e,
            (l = a.firstElementChild || a.children[0] || a).wrap = a,
            r.call(this),
            t && this.Ready(function() { (i = "object" === (void 0 === t ? "undefined": (0, o.
            default)(t)) ? t: document[t] || document.getElementById(t)) && (n && (i.innerHTML = ""), l = i.appendChild(l))
            }),
            l
        }
    },
    dFMP: function(e, t) {},
    dtkG: function(e, t) {
        e.exports = '<div class="range" tabindex="0">\n    <div class="progress"></div>\n    <div class="path"></div>\n</div>'
    },
    egCj: function(e, t) {
        e.exports = '<div class="vip_content" block="content">\n    <div class="dia_input">\n        <div class="input_top vote_title clearfix">\n            <i><%= lang("投票数") %></i><em id="limit_vote" data-value=\'<%= lang("每人最多投{0}票") %>\'></em>\n        </div>\n        <div class="input_middle vote_amount">\n            <span action="sub">-</span><input type="text" name="" value=""><span action="add">+</span>\n        </div>\n    </div>\n    <div class="dia_input">\n        <div class="input_top"><%= lang("应付") %></div>\n        <div class="input_middle">\n            <p class="total_amount" block="amount">---</p>\n            <p><%= lang("可用") %> <i block="tradeht">---</i> HT <a target="_blank" href="//www.huobipro.com/ht/intro_get/"><%= lang("获取HT") %></a> </p>\n        </div>\n    </div>\n    <div class="dia_input">\n        <div class="input_top">\n            <%= lang("验证") %>\n        </div>\n        <div class="input_middle">\n            <div class="ali_captcha" id="ali_captcha"></div>\n        </div>\n    </div>\n</div>'
    },
    ek93: function(e, t) {},
    f8yD: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.IsPC = t.$getChild = t.$setStyle = t.$getStyleNum = t.$getStyle = t.$getSize = t.trimArraySpace = t.FixValue = t.VerifyPoint = t.objectType = t.R = t.getOffset = t.ChangeUrl = t.classFather = t.isEmptyObject = t.getBrowserLanguage = t.Hump = t.scientific2float = t.StrReplaceKey = t.$_GET = t.getData = t.cookies = t.RenderView = t.Inner = t.dom = t.attFather = t.tarFather = t.Extend = t.Clone = t.DomClass = t.IsDom = t.TmpL = t.DomAfter = t.Trim = t.Event = t.GetLocationKey = t.ToUt = t.time2Date = t.ToTime = t.Num = t.GetEle = t.Lang = t.SplitTemplate = t.J = t.AnimationFactory = t.nodes2array = t.hbmd5 = t.fps2second = void 0;
        var a = r(n("mvHQ")),
        i = r(n("pFYg")),
        o = r(n("L6bb"));
        function r(e) {
            return e && e.__esModule ? e: {
            default:
                e
            }
        }
        function l(e) {
            if (void 0 != e) {
                var t = "string" == typeof e ? e.toLowerCase().replace(/\s/g, "") : e.toString().toLowerCase().replace(/\s/g, ""),
                n = "000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
                a = void 0,
                i = void 0,
                o = void 0,
                r = void 0,
                l = void 0;
                return /e[+-]/.test(t) ? (i = /\+/.test(t), o = t.split("e"), a = /\-/.test(o[0].toString()) ? "-0.": "0.", o[0] = o[0].replace("-", ""), r = o[0].split(".")[1] ? o[0].split(".")[1].length: 0, l = o[1].split(i ? "+": "-")[1], o = o[0].replace(".", ""), i ? o + n.substring(0, l - r) : a + n.substring(0, l - 1) + o) : t + ""
            }
        }
        var s = function() {
            function e(e, t, n) {
                return (0 === n ? "0": "") + t.substring(0, e + 1 + n)
            }
            return {
                floor: e,
                ceil: function(t, n, a) {
                    var i = e(t, n, a);
                    return 1 * i == 1 * n ? i: (1 * i + 7 / Math.pow(10, 1 * t + 1)).toFixed(t)
                },
                rounding: function(e, t, n) {
                    return (1 * t).toFixed(e)
                }
            }
        } ();
        function c(e) {
            return e > 9 ? e: "0" + e
        }
        var u = {
            add: document.addEventListener ?
            function(e, t, n) {
                "mousewheel" === t && void 0 !== document.mozFullScreen && (t = "DOMMouseScroll"),
                e.addEventListener(t, n, !1)
            }: function(e, t, n) {
                e.attachEvent("on" + t, n)
            },
            remove: document.removeEventListener ?
            function(e, t, n) {
                e.removeEventListener(t, n, !1)
            }: function(e, t, n) {
                e.detachEvent("on" + t, n)
            },
            target: function(e) {
                return e.target ? e.target: window.event.srcElement
            },
            delta: function(e) {
                var t = e || window.event;
                return t.wheelDelta / -120 || t.detail / 3
            },
            stop: function(e) {
                e && e.stopPropagation ? (e.stopPropagation(), e.preventDefault()) : (window.event.cancelBubble = !0, window.event.returnValue = !1)
            },
            mouse: function(e) {
                return {
                    x: e.pageX || e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft),
                    y: e.pageY || e.clientY + (document.documentElement.scrollTop || document.body.scrollTop)
                }
            },
            trigger: function(e, t, n) {
                var a = document.createEvent("HTMLEvents");
                a.initEvent(t, !0, !1),
                a.info = n,
                e.dispatchEvent(a)
            },
            on: function(e, t, n) {
                var a = e[this.myEvent._nEid] || (e[this.myEvent._nEid] = this.myEvent._guid++);
                if (this.myEvent._cache[a] || (this.myEvent._cache[a] = {
                    elem: e,
                    listener: this.myEvent._create(a),
                    events: {}
                }), t && !this.myEvent._cache[a].events[t] && (this.myEvent._cache[a].events[t] = [], this.add(e, t, this.myEvent._cache[a].listener)), !n) return this.myEvent._cache[a];
                n[this.myEvent._nFid] || (n[this.myEvent._nFid] = this.myEvent._fid++),
                this.myEvent._cache[a].events[t].push(n)
            },
            off: function(e, t, n) {
                var a = void 0,
                i = void 0,
                o = void 0,
                r = e[this.myEvent._nEid],
                l = this.myEvent._cache[r];
                if (l) if (a = l.events, n) {
                    if (! (o = a[t])) return;
                    for (i = 0; i < o.length; i++) o[i][this.myEvent._nFid] === n[this.myEvent._nFid] && o.splice(i--, 1);
                    if (0 === o.length) return this.off(e, t)
                } else if (t) delete a[t],
                this.remove(e, t, l.listener);
                else {
                    for (i in a) this.remove(e, i, l.listener);
                    delete this.myEvent._cache[r]
                }
            },
            myEvent: {
                _fid: 1,
                _guid: 1,
                _nEid: "{$huobi-eid}" + (new Date).getTime(),
                _nFid: "{$huobi-fid}" + (new Date).getTime(),
                _create: function(e) {
                    return function(t) {
                        for (var n = 0,
                        a = ((t = u.fix(t || window.event)) || (t = document.event)).type, i = u.myEvent._cache[e].elem, o = arguments, r = u.myEvent._cache[e].events[a]; n < r.length; n++) null === r[n].apply(i, o) && t.preventDefault()
                    }
                },
                _cache: {}
            },
            fix: function(e) {
                if (document.addEventListener) return e;
                var t = void 0,
                n = {};
                for (t in e) n[t] = e[t];
                return n
            }
        };
        var d, p, m = (d = document.documentElement.classList, p = {
            hasClass: function(e, t) {
                return d ? e.classList.contains(t) : new RegExp("(^|\\s)" + t + "(\\s|$)").test(e.className)
            },
            addClass: function(e, t) {
                d ? e.classList.add(t) : p.hasClass(e, t) || (e.className = e.className + " " + t)
            },
            removeClass: function(e, t) {
                d ? e.classList.remove(t) : p.hasClass(e, t) && (e.className = e.className.replace(new RegExp("(^|\\s)*" + t + "(\\s|$)*", "g"), ""))
            },
            getPosition: function(e, t) {
                var n, a, i, o = e,
                r = 0,
                l = 0;
                if (e.nodeName) {
                    for (; o && ("body" == o.nodeName.toLowerCase() && (a = 1), i = o.currentStyle ? o.currentStyle: document.defaultView.getComputedStyle(o), r += o.offsetLeft + (parseInt(i.borderLeftWidth) ? parseInt(i.borderLeftWidth) : 0) - (a ? 0 : o.scrollLeft), l += o.offsetTop + (parseInt(i.borderTopWidth) ? parseInt(i.borderTopWidth) : 0) - (a ? 0 : o.scrollTop), n = o.offsetParent ? o.offsetParent: o, !(t & t === (o = o.offsetParent))););
                    return {
                        x: r,
                        y: l,
                        element: o,
                        forefather: t || n
                    }
                }
            }
        }),
        f = {};
        var g = {};
        var _ = {};
        var y = function() {
            function e(e) {
                var t = document.cookie.match("(?:^|;)\\s*" + e + "=([^;]*)");
                return t ? decodeURIComponent(t[1]) : null
            }
            function t(e) {
                var t = e.name + "=" + encodeURIComponent(e.value);
                if (e.domain && (t += "; domain=" + e.domain), e.path && (t += "; path=" + e.path), e.time) {
                    var n = new Date;
                    n.setTime(n.getTime() + 1e3 * e.time),
                    t += "; expires=" + n.toGMTString()
                }
                document.cookie = t
            }
            return {
                get: e,
                set: t,
                del: function(n, a) {
                    e(n);
                    var i = a || {};
                    i.name = n,
                    i.value = "",
                    i.time = -1,
                    t(i)
                }
            }
        } ();
        function b(e, t) {
            var n = new RegExp("(^|&)" + e + "=([" + (t ? "\\w": "^") + "&]*)(&|$)"),
            a = window.location.search.substr(1).match(n);
            return null != a ? decodeURI(a[2]) : null
        }
        function h(e, t) {
            if ("object" === (void 0 === t ? "undefined": (0, i.
        default)(t))) for (var n in t) {
                for (var a = n.split("-"), o = 1; o < a.length; o++) a[o] = a[o].replace(a[o].charAt(0), a[o].charAt(0).toUpperCase());
                var r = a.join("");
                e.style[r] = t[n]
            } else "string" == typeof t && (e.style.cssText = t)
        }
        function k(e, t) {
            return e.currentStyle ? e.currentStyle[t] : getComputedStyle(e, !1)[t]
        }
        function w(e, t) {
            return parseInt(this.$getStyle(e, t).replace(/px|pt|em/gi, ""))
        }
        function L(e, t) {
            return new RegExp("^(([0-9]{1}\\d*)|([0]{1}))(\\.(\\d){0," + (t || 4) + "})?$").test(e)
        }
        window.$_GET = b;
        var S = void 0;
        t.fps2second = function(e, t) {
            var n = 1e3 / (t || 60),
            a = 1e3 * e;
            return Math.ceil(a / n)
        },
        t.hbmd5 = function(e) {
            return (0, o.
        default)(e + "hello, moto")
        },
        t.nodes2array = function(e) {
            return [].slice.apply(e)
        },
        t.AnimationFactory = function(e) {
            var t = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ||
            function(e) {
                window.setTimeout(e, 1e3 / 60)
            };
            t(function n() {
                e(),
                t(n)
            })
        },
        t.J = function() {
            var e = [].slice.apply(arguments);
            if (! (e.length < 2)) return e.shift().apply(e.shift(), e)
        },
        t.SplitTemplate = function(e) {
            for (var t, n = e.replace(/<block[\s]*name=["'\w\d-_]+>([\S\s\t]*?)<\/block>/g, ""), a = e.match(/<block[\s]*name=["'\w\d-_]+>([\S\s\t]*?)<\/block>/g) || [], i = {},
            o = a.length; o--;)(t = /<block[\s]*name=(["'\w\d-_]+)>([\S\s\t]*?)<\/block>/.exec(a[o])) && (i[t[1].replace(/['"]/g, "")] = t[2]);
            return {
                html: n,
                block: i,
                blockLength: a.length
            }
        },
        t.Lang = function() {
            var e = {};
            return {
                getLang: function(t) {
                    return e[t] || t
                },
                _keys: function(t) {
                    e = t || {}
                },
                lib: function() {
                    return e
                }
            }
        },
        t.GetEle = function(e) {
            return "string" != typeof e ? e: /^\#[a-zA-Z]/.test(e) ? (t = e.replace("#", ""), document.getElementById(t)) : void / ^\. [a - zA - Z] / .test(e);
            var t
        }, t.Num = function(e, t, n, a) {
            var i = void 0;
            if (null != e) {
                if (!~Object.prototype.toString.call(e).indexOf("number") && e != 1 * e) return e;
                var o = l(e),
                r = o.indexOf("."),
                c = 0,
                u = 0;
                if (isNaN(parseFloat(o))) u = 0;
                else if (isNaN(o)) u = parseFloat(o);
                else if (void 0 !== t) if (i = (t = ("" + t).split(":"))[1] || "floor", t = 1 * (t = t[0]) || 0, r >= 0) {
                    if ((c = o.substring(r + 1, o.length).length) < t) {
                        for (var d = 0; d < t - c; d++) o += "0";
                        u = 0 === r ? "0" + o: o
                    } else u = s[i] ? s[i](t, o, r) : s.floor(t, o, r);
                    t <= 0 && (u = parseInt(e, 10))
                } else if (t > 0) {
                    o += ".";
                    for (var p = 0; p < t; p++) o += "0";
                    u = o
                } else t <= 0 && (u = o);
                else u = Number(o);
                return u = n ?
                function(e, t, n) {
                    for (var a = e.split("."), i = "", o = 0, r = a[0].length; r--;) i = o % t || !o ? a[0].charAt(r) + i: a[0].charAt(r) + n + i,
                    o++;
                    return a[1] ? i + "." + a[1] : i
                } (u, n, a || ",") : u
            }
        },
        t.ToTime = function(e, t) {
            var n = new Date(1e3 * e),
            a = t || "YYYY-MM-DD";
            return Date.prototype.Format = function(e) {
                var t = {
                    "M+": this.getMonth() + 1,
                    "D+": this.getDate(),
                    "h+": this.getHours(),
                    "m+": this.getMinutes(),
                    "s+": this.getSeconds(),
                    "q+": Math.floor((this.getMonth() + 3) / 3),
                    "S+": this.getMilliseconds()
                };
                for (var n in /(Y+)/.test(e) && (e = e.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))), t) new RegExp("(" + n + ")").test(e) && (e = e.replace(RegExp.$1, 1 === RegExp.$1.length ? t[n] : ("00" + t[n]).substr(("" + t[n]).length)));
                return e
            },
            n.Format(a)
        },
        t.time2Date = function(e, t, n) {
            var a = 1 * (e = (e + "").split(":"))[0] < Math.pow(10, 11) && !e[1] ? new Date(1e3 * e[0]) : new Date(1 * e[0]),
            i = a.getFullYear(),
            o = c(a.getMonth() + 1),
            r = c(a.getDate()),
            l = c(n ? a.getUTCHours() : a.getHours()),
            s = c(a.getMinutes()),
            u = c(a.getSeconds());
            return t ? t.toLowerCase().replace("y", i).replace("m", o).replace("d", r).replace("h", l).replace("i", s).replace("s", u) : i + "-" + o + "-" + r + " " + l + ":" + s + ":" + u
        },
        t.ToUt = function(e) {
            return new Date(e).getTime() / 1e3
        },
        t.GetLocationKey = function(e) {
            var t = void 0;
            if (!window.getSearchParameters) {
                t = location.search.replace("?", "").split("&"),
                window.getSearchParameters = {};
                for (var n, a = 0,
                i = t.length; a < i; a++) n = t[a].split("="),
                getSearchParameters[n[0]] = decodeURIComponent(n[1])
            }
            return getSearchParameters[e]
        },
        t.Event = u,
        t.Trim = function(e) {
            return e.replace(/^\s+/, "").replace(/\s+$/, "")
        },
        t.DomAfter = function(e, t) {
            var n = t.parentNode;
            n.lastChild === t ? n.appendChild(e) : n.insertBefore(e, t.nextSibling)
        },
        t.TmpL = function e(t, n) {
            var a = g[t] || (/\W/.test(t) ? new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);},__data = obj;with(obj){p.push('" + t.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');") : e(document.getElementById(t).innerHTML));
            return g[t] = a,
            n ? a(n) : a
        },
        t.IsDom = function(e) {
            return "object" === ("undefined" == typeof HTMLElement ? "undefined": (0, i.
        default)(HTMLElement)) ? e instanceof HTMLElement: e && "object" === (void 0 === e ? "undefined": (0, i.
        default)(e)) && 1 === e.nodeType && "string" == typeof e.nodeName
        },
        t.DomClass = function() {
            var e = document.documentElement.classList,
            t = {
                hasClass: function(t, n) {
                    return e ? t.classList.contains(n) : new RegExp("(^|\\s)" + n + "(\\s|$)").test(t.className)
                },
                addClass: function(n, a) {
                    e ? n.classList.add(a) : t.hasClass(n, a) || (n.className = n.className + " " + a)
                },
                removeClass: function(n, a) {
                    e ? n.classList.remove(a) : t.hasClass(n, a) && (n.className = n.className.replace(new RegExp("(^|\\s)*" + a + "(\\s|$)*", "g"), ""))
                }
            };
            return t
        },
        t.Clone = function e(t) {
            if ("object" !== (void 0 === t ? "undefined": (0, i.
        default)(t))) return t;
            if (null === t) return t;
            var n = new Object;
            for (var a in t) t.hasOwnProperty(a) && (n[a] = e(t[a]));
            return n
        },
        t.Extend = function e(t) {
            t = t || {};
            for (var n = 1; n < arguments.length; n++) {
                var a = arguments[n];
                if (a) for (var o in a) a.hasOwnProperty(o) && ("object" === (0, i.
            default)(a[o]) ? t[o] = e(t[o], a[o]) : t[o] = a[o])
            }
            return t
        },
        t.tarFather = function e(t, n) {
            return t && n && t.parentNode ? t.nodeName.toLowerCase() === n.toLowerCase() ? t: e(t.parentNode, n) : null
        },
        t.attFather = function e(t, n, a) {
            return t && n && t.parentNode ? (a ? null !== t.getAttribute(n) : t.getAttribute(n)) ? (i = t, o = t.getAttribute(n), (r = {
                attr: o
            }).node = i, r) : e(t.parentNode, n) : null;
            var i, o, r
        }, t.dom = m,
        t.Inner = function(e, t) {
            if ("string" == typeof e) {
                f[e] = f[e] || document.querySelectorAll(e) || [];
                for (var n = 0; n < f[e].length; n++) f[e][n] && (f[e][n].innerHTML = t)
            } else e.innerHTML = t
        },
        t.RenderView = function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            n = arguments[2],
            i = document.getElementById(e);
            if (i) { (!_[e] || n && n !== _[e].str) && (n = n || i.querySelector("script").innerHTML, _[e] = {
                    str: n,
                    tmpl: function(e) {
                        if (e) return new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);},__data = obj;with(obj){p.push('" + e.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');");
                        console.error("Empty template string")
                    } (n),
                    last_data: "{}"
                });
                var o = (0, a.
            default)(t);
                o !== _[e].last_data && (i.innerHTML = _[e].tmpl(t), _[e].last_data = o)
            } else console.error("Unfound element id:", e)
        },
        t.cookies = y,
        t.getData = function(e) {
            for (var t, n, a, i = {},
            o = {},
            r = [], l = e.length; l--;) t = e[l],
            n = e[l].getAttribute("name"),
            a = t.type,
            n && ("text" === a || "password" === a || "hidden" === a || a.indexOf("select") > -1 || "textarea" === a ? (i[n] = t.value, o[n] = t) : "checkbox" === a ? (i[n] = i[n] || [], o[n] = o[n] || [], o[n].push(t), !0 === t.checked && i[n].push(t.value)) : "radio" === a && (o[n] = t, !0 === t.checked && (i[n] = t.value)), r.unshift({
                name: n,
                value: i[n],
                type: a
            }));
            return [i, o, r]
        },
        t.$_GET = b,
        t.StrReplaceKey = function() {
            var e = [].slice.apply(arguments);
            return e.length ? e.shift().replace(/\{([^\}]+)\}/gi,
            function(t) {
                return t = t.replace(/[\{\}]/g, "").split("||"),
                void 0 !== e[t[0].replace(/\s/g, "")] ? e[t[0].replace(/\s/g, "")] : (t[1] ? t[1] : t[0]).replace(/(^\s+)|(\s+$)/g, "")
            }) : ""
        },
        t.scientific2float = l,
        t.Hump = function(e, t) {
            var n = e.split(t),
            a = n[0];
            return n.forEach(function(e, t) {
                t && (a += e.replace(/^\w/,
                function(e) {
                    return e.toUpperCase()
                }))
            }),
            a
        },
        t.getBrowserLanguage = function() {
            return (navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language || navigator.userLanguage).toLowerCase()
        },
        t.isEmptyObject = function(e) {
            var t = void 0;
            for (t in e) return ! 1;
            return ! 0
        },
        t.classFather = function e(t, n, a) {
            if (!t || !n || !t.parentNode) return null;
            if (a) {
                if (t.className.split(" ").includes(n)) return t
            } else if (t.className.indexOf(n) > -1) return t;
            return e(t.parentNode, n, a)
        },
        t.ChangeUrl = function(e, t, n) {
            var a = "",
            i = "",
            o = "",
            r = [],
            l = "0";
            if ( - 1 == e.indexOf("?")) return e + "?" + t + "=" + n;
            if ( - 1 != (a = e.substr(e.indexOf("?") + 1)).indexOf("&")) {
                for (var s in r = a.split("&")) r[s].split("=")[0] == t ? (o = n, l = "1") : o = r[s].split("=")[1],
                i = i + r[s].split("=")[0] + "=" + o + "&";
                i = i.substr(0, i.length - 1),
                "0" == l && i == a && (i = i + "&" + t + "=" + n)
            } else - 1 != a.indexOf("=") ? ((r = a.split("="))[0] == t ? (o = n, l = "1") : o = r[1], i = r[0] + "=" + o, "0" == l && i == a && (i = i + "&" + t + "=" + n)) : i = t + "=" + n;
            return e.substr(0, e.indexOf("?")) + "?" + i
        },
        t.getOffset = function(e) {
            var t = e.getBoundingClientRect(),
            n = document.documentElement.clientTop,
            a = document.documentElement.clientLeft;
            return {
                top: t.top - n + (window.pageYOffset || e.scrollTop) - (e.clientTop || 0),
                left: t.left - a + (window.pageXOffset || e.scrollLeft) - (e.clientLeft || 0)
            }
        },
        t.R = function(e) {
            var t = decodeURIComponent(e) || "";
            return "/" + (t = (t = (t = t.replace("http://", "")).replace("https://", "")).replace(/^\/+/, ""))
        },
        t.objectType = function(e) {
            return toString.apply(v)
        },
        t.VerifyPoint = L,
        t.FixValue = function(e, t, n) {
            var a = n ? window[n] : S;
            return isNaN( + e) ? void 0 === a && (a = "") : ("" === e || L(e, t)) && (a = e),
            S = a,
            n && (window[n] = a),
            void 0 === a ? "": a
        },
        t.trimArraySpace = function(e) {
            for (var t = 0; t < e.length; t++)"" !== e[t] && void 0 !== e[t] || (e.splice(t, 1), t -= 1);
            return e
        },
        t.$getSize = function(e) {
            if ("none" !== k(e, "display")) return {
                width: e.offsetWidth || w(e, "width"),
                height: e.offsetHeight || w(e, "height")
            };
            var t = {
                display: "block",
                position: "absolute",
                visibility: "hidden"
            },
            n = {};
            for (var a in t) n[a] = k(e, a);
            h(e, t);
            var i = e.clientWidth || e.outerWidth,
            o = e.clientHeight || w(e, "height");
            return h(e, n),
            {
                width: i,
                height: o
            }
        },
        t.$getStyle = k,
        t.$getStyleNum = w,
        t.$setStyle = h,
        t.$getChild = function(e, t) {
            if (e) {
                for (var n = e.childNodes,
                a = 0; a < n.length; a++)"#text" != n[a].nodeName || /\s/.test(n.nodeValue) || e.removeChild(n[a]);
                return void 0 != t ? n.item(t) : n
            }
        },
        t.IsPC = function() {
            for (var e = navigator.userAgent,
            t = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod", "rv:1.2.3.4", "windows mobile", "midp"], n = !0, a = 0; a < t.length; a++) if (e.indexOf(t[a]) >= 0) {
                n = !1;
                break
            }
            return n
        }
    },
    fnlE: function(e, t) {
        e.exports = '<div class="pagination">\n    <button data-direction="prev"><%=lang[\'prev\']%></button>\n    <button data-direction="next"><%=lang[\'next\']%></button>\n</div>'
    },
    g0O3: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.coinSwitch = void 0;
        var a = v(n("Xxa5")),
        i = v(n("exGp")),
        o = v(n("mvHQ")),
        r = v(n("d7EF")),
        l = n("YtCS"),
        s = n("f8yD"),
        c = n("4AVY"),
        u = n("++vu"),
        d = n("aVmh"),
        p = n("RxF2"),
        m = n("wB0j"),
        f = v(n("n4zI")),
        g = n("zcHd");
        function v(e) {
            return e && e.__esModule ? e: {
            default:
                e
            }
        }
        var _ = u.operator.handsup(l.API_ENV.ws),
        y = new g.Toast,
        b = {
            margin: {
                ready: "marginReady",
                data: "marginData",
                obj: "marginDataObj",
                arr: "marginDataArr",
                cookies_filter: "HBP_MARGIN_SYMBOLS_FILTER"
            },
            exchange: {
                ready: "symbolReady",
                data: "symbolData",
                obj: "symbolDataObj",
                arr: "symbolDataArr",
                cookies_filter: "HBP_SYMBOLS_FILTER"
            }
        } [(window.TRADE_TYPE || "exchange").toLowerCase()],
        h = b.cookies_filter,
        k = localStorage.getItem("exchangeRate"),
        w = k ? k.split("/") : "usd",
        L = (0, r.
    default)(w, 1)[0],
        S = "none" === L;
        function E() {
            var e = this;
            function t(t, n) {
                var a = (0, s.tarFather)(t, "dl");
                delete e[n][t.dataset.symbol],
                "marked" == e.filterKey && (a.parentNode.removeChild(a), e.coin_list_dom.querySelector("dl") || e.render()),
                t.dataset.marked = 0
            }
            function n(t, n) {
                e[n][t.dataset.symbol] = "marked",
                t.dataset.marked = 1
            }
            e.usersort = function(t) {
                t.dataset.sortKey;
                e.sort = e.sortKey == t.dataset.sortKey ? !e.sort: 1,
                e.sortKey = t.dataset.sortKey,
                e.sortNode = t.querySelector("i"),
                e.render()
            },
            e.changeEyes = function() {
                e.eyeStatus = 1 * !e.eyeStatus,
                localStorage.setItem("eye_status", e.eyeStatus),
                e.renderBalance()
            },
            e.clear_key = function() {
                e.search_keyword.value = ""
            },
            e.switch_quote = function(t) {
                e.priceQuote = "btc" == e.priceQuote ? "cny": "btc",
                e.setPriceQuote(),
                e.render()
            },
            e.userfilter = function(t) {
                e.filterKey = t.dataset.filterKey,
                localStorage.setItem(h, e.filterKey),
                e.setFilter(),
                e.render()
            },
            e.showmarked = function(t) {
                e.filterKey = "marked",
                localStorage.setItem(h, e.filterKey),
                e.setFilter(),
                e.render()
            },
            e.gourl = function(e) {
                location.href = localStorage.root + e.dataset.symbolPath + "/" + window.TRADE_TYPE.toLowerCase() + "/"
            },
            e.mark = function(a) {
                var i = 1 * a.dataset.marked ? p.ucCancelCoinStar: p.ucAddCoinStar,
                r = 1 * a.dataset.marked ? t: n;
                a.className = "hb_icon_marked breathe",
                e.isLogin ? i({
                    data: {
                        trading_pair: a.dataset.symbol,
                        website: "PRO"
                    }
                }).then(function(e) {
                    e.data.success ? r(a, "coinList") : y.Show(e.data.message, 3e3),
                    a.className = 1 * a.dataset.marked ? "hb_icon_marked": "hb_icon_unmarked"
                }) : (r(a, "localData"), a.className = 1 * a.dataset.marked ? "hb_icon_marked": "hb_icon_unmarked", localStorage.setItem("mark_symbol", (0, o.
            default)(e.localData)))
            }
        }
        function T() {
            var e, t = this;
            function n(e) {
                return (1 * e).toString()
            }
            t.setPriceQuote = function() {
                localStorage.setItem("priceQuote", t.priceQuote),
                t.switchQuote.querySelector("b").innerHTML = L,
                S && (t.switchQuote.style.display = S ? "none": "block", t.search_wrap_dom.classList.add("full_width")),
                t.switchQuote.className = "cny" === t.priceQuote ? t.switchQuote.className.replace(/\sswitch_wrap_cur/g, "") + " switch_wrap_cur": t.switchQuote.className.replace(/\sswitch_wrap_cur/g, ""),
                t.new_price_dom.innerHTML = t.new_price_dom.dataset.text + ("cny" === t.priceQuote ? S ? "": "(" + L.toUpperCase() + ")": ""),
                t.render()
            },
            t.filter = function(e) {
                var n = [],
                a = [],
                i = [],
                o = [],
                r = t.coinList || t.localData,
                l = {
                    price: "cny" === t.priceQuote ? "cnyClose": "close",
                    rate: "rate"
                };
                if (t.resetSort(), !t.inited && ("marked" === t.filterKey && !r[(PAGE_COIN + PAGE_QUOTE).toLowerCase()] || "marked" !== t.filterKey && t.filterKey !== PAGE_QUOTE.toLowerCase()) && (t.filterKey = PAGE_QUOTE.toLowerCase(), t.setFilter()), e.forEach(function(e) {
                    f.
                default[b.obj][e.symbol] && ("marked" != t.filterKey ? e["quote-currency"] === t.filterKey && (n.push(e), a.push(e["base-currency"] + e["quote-currency"])) : r[e.symbol] && (n.push(e), a.push(e["base-currency"] + e["quote-currency"])))
                }), "mgt" == t.sortKey) {
                    for (var s = 0,
                    c = t.symbolDataArr.length; s < c; s++) for (var u = 0,
                    d = n.length; u < d; u++) n[u].symbol === t.symbolDataArr[s] && o.push(n[u]);
                    n = o
                } else "coin" == t.sortKey ? (a.sort(), t.sort && a.reverse(), a.forEach(function(e) {
                    n.forEach(function(t) {
                        e == t["base-currency"] + t["quote-currency"] && i.push(t)
                    })
                }), n = i) : (a = [], i = [], n.forEach(function(e) {
                    t.ticker[e.symbol] && void 0 !== t.ticker[e.symbol][l[t.sortKey]] ? i.push(e) : a.push(e)
                }), t.orderBy[t.sortKey] && i.sort(t.orderBy[t.sortKey]), n = i.concat(a));
                return n
            },
            t.render = function() {
                if (t.isLogin && !t.coinList) return setTimeout(t.render, 200);
                t.coin_list_dom.innerHTML = (0, s.TmpL)(t.coin_list_html, {
                    symbol: t.symbolData,
                    option: t,
                    markArr: t.coinList || t.localData
                }),
                setTimeout(function() {
                    t.coin_list_dom.querySelector(".cur") && t.coin_list_dom.querySelector(".cur").offsetTop > t.coin_list_dom.clientHeight && (t.coin_list_dom.scrollTop = t.coin_list_dom.querySelector(".cur").offsetTop)
                },
                200),
                t.updateHtml(),
                t.inited = 1
            },
            t.resetSort = function() {
                for (var e = t.sort_dom.length; e--;) t.sort_dom[e].querySelector("i").className = "";
                t.sortNode && (t.sortNode.className = t.sort ? "desc": "asc")
            },
            t.setFilter = function() {
                for (var e = t.filter_dom.length; e--;) t.filter_dom[e].className = t.filter_dom[e].dataset.filterKey == t.filterKey ? "cur": "";
                t.filter_dom_mark.className = "marked" === t.filterKey ? "cur": "",
                t.sortKey = "mgt",
                t.sortNode = null
            },
            t.orderBy = function() {
                function e(e, n) {
                    return t.ticker[n] && t.ticker[n][e] ? t.ticker[n][e] : 0
                }
                return {
                    price: function(n, a) {
                        var i = "cny" === t.priceQuote ? "cnyClose": "close";
                        return t.sort ? e(i, a.symbol) - e(i, n.symbol) : e(i, n.symbol) - e(i, a.symbol)
                    },
                    rate: function(n, a) {
                        return t.sort ? e("rate", a.symbol) - e("rate", n.symbol) : e("rate", n.symbol) - e("rate", a.symbol)
                    }
                }
            } (),
            t.getUcData = function() {
                if (!t.isLogin) return setTimeout(t.getUcData, 200);
                t.isLogin && (0, p.ucListCoinStar)({
                    params: {
                        website: "PRO"
                    }
                }).then(function(e) {
                    t.coinList = {},
                    e.data.data.forEach(function(e) {
                        t.coinList[e] = "marked"
                    })
                })
            },
            t.updateHtml = function() {
                e && clearTimeout(e),
                e = setTimeout(t.updateHtmlFn, 50)
            },
            t.updateHtmlFn = function() {
                var e = [].slice.apply(t.coin_list_dom.querySelectorAll("dl")),
                a = [].slice.apply(t.coin_list_dom.querySelectorAll(".market_category")),
                i = [];
                i[10] = "color-buy",
                i[1] = "color-sell",
                e.forEach(function(e) {
                    t.ticker[e.dataset.symbol] && ("cny" == t.priceQuote ? e.querySelector("span[price]").innerHTML = t.ticker[e.dataset.symbol].cnyClose ? t.ticker[e.dataset.symbol].cnyClose: "---": e.querySelector("span[price]").innerHTML = t.ticker[e.dataset.symbol].close ? (0, s.Num)(t.ticker[e.dataset.symbol].close, f.
                default.symbolDataObj[e.dataset.symbol]["trade-price-precision"]):
                    "---", e.querySelector("span[rate]").innerHTML = t.ticker[e.dataset.symbol].showRate || "---", t.ticker[e.dataset.symbol].showRate && (e.querySelector("span[rate]").className = i[1 * (n(t.ticker[e.dataset.symbol].rate > 0) + n(t.ticker[e.dataset.symbol].rate < 0))]))
                }),
                a.forEach(function(e) {
                    var n = "partition" + e.dataset.partition;
                    t.info && t.info[n] && (e.querySelector("i").style.visibility = "visible")
                })
            }
        }
        var x, I;
        function O(e) {
            var t = this;
            function n(e) {
                for (var t, n = f.
            default.symbolData,
                a = 0,
                i = n.length; a < i; a++) if (n[a]["base-currency"] === e && "btc" === n[a]["quote-currency"] || n[a]["quote-currency"] === e && "btc" === n[a]["base-currency"]) {
                    t = n[a];
                    break
                }
                if (!t) for (a = 0, i = n.length; a < i; a++) if (n[a]["base-currency"] === e && "usdt" === n[a]["quote-currency"] || n[a]["quote-currency"] === e && "usdt" === n[a]["base-currency"]) {
                    t = n[a];
                    break
                }
                if (!t) for (a = 0, i = n.length; a < i; a++) if (n[a]["base-currency"] === e || n[a]["quote-currency"] === e) {
                    t = n[a];
                    break
                }
                return t
            }
            t.renderBalance = function() {
                if (I) {
                    var e, a = {},
                    i = 1;
                    if (!f.
                default.currencyReady || !f.
                default.symbolReady || "exchange" == window.TRADE_TYPE && !t.balance || "margin" == window.TRADE_TYPE && !f.
                default.marginBalanceTotal || !t.ticker) return x && clearTimeout(x),
                    x = setTimeout(t.renderBalance, 300);
                    if (t.balance) {
                        for (var o in "margin" == window.TRADE_TYPE && (t.balance = f.
                    default.marginBalanceTotal), t.balance)"btc" !== o && f.
                    default.symbolData.forEach(function(e) {
                            e["base-currency"] !== o && e["quote-currency"] !== o || (a[o] = n(o))
                        });
                        for (var r in a.bt2 && delete a.bt2,
                        a.bt1 && delete a.bt1,
                        a) i = i && t.ticker[a[r].symbol] && t.ticker[a[r].symbol].close; (e = i &&
                        function(e) {
                            var n = 0,
                            a = {};
                            for (var i in e) o(e[i], t.ticker[e[i].symbol], i);
                            for (var i in e) n += 1 * r(e[i], t.ticker[e[i].symbol], i);
                            function o(e, t, n) {
                                "btc" === e["base-currency"] ? a[n] = 1 / t.close: "btc" === e["quote-currency"] && (a[n] = t.close)
                            }
                            function r(e, n, i) {
                                return "btc" !== e["base-currency"] && "btc" !== e["quote-currency"] ? e["base-currency"] === i ? t.balance[i] * n.close * a[e["quote-currency"]] || 0 : e["quote-currency"] === i && t.balance[i] * (1 / n.close) * a[e["base-currency"]] || 0 : t.balance[i] * a[i] || 0
                            }
                            return n
                        } (a)) || 0 === e ? e += 1 * t.balance.btc ? 1 * t.balance.btc: 0 : e = "---",
                        t.total_dom.innerHTML = t.eyeStatus ? (0, s.Num)(e, 1 * f.
                    default.currencyDataObj.btc["show-precision"]):
                        "*****",
                        t.total_eyes.className = t.eyeStatus ? "eyes hb_icon_visible": "eyes hb_icon_invisible",
                        t.usdrate && t.ticker.btcusdt && "---" != e && (t.total_about_dom.innerHTML = " ≈ " + (t.eyeStatus ? (0, s.Num)(t.usdrate * (0, s.Num)(e, 1 * f.
                    default.currencyDataObj.btc["show-precision"]) * t.ticker.btcusdt.close, N((0, d.mul)(t.ticker.btcusdt.close, t.usdrate))) : "*****") + " " + L)
                    }
                }
            }
        }
        function M() {
            var e, t = (e = (0, i.
        default)(a.
        default.mark(function e() {
                var i, r;
                return a.
            default.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                    case 0:
                        return n.info || (n.info = {}),
                        e.next = 3,
                        (0, p.singlePage)({
                            path: {
                                id: ""
                            },
                            params: {
                                lang: localStorage.lang || "",
                                pageType: 2
                            }
                        });
                    case 3:
                        i = e.sent,
                        (r = i.data).success ? o(r.data) : setTimeout(t, 5e3);
                    case 6:
                    case "end":
                        return e.stop()
                    }
                },
                e, this)
            })),
            function() {
                return e.apply(this, arguments)
            }),
            n = this;
            function o(e) {
                e.filter(function(e) {
                    return e.pageIdentifier.toLowerCase().match("partition")
                }).forEach(function(e) {
                    n.info[e.pageIdentifier.toLowerCase()] = {
                        title: e.title,
                        content: e.summary
                    }
                }),
                n.updateHtml()
            }
            function r(e) {
                e.subbed || (0, c.Publish)(m.ACTIONS.__allSymbolTicker, e)
            }
            function l(e) {
                e.subbed || (0, c.Publish)(m.ACTIONS.__allSymbolDayKline, e)
            } (0, c.Subscribe)("__allSymbolTicker",
            function(e) {
                var t = e.info.ch.split(".")[1];
                n.ticker[t] = n.ticker[t] ? n.ticker[t] : {},
                n.ticker[t].close = e.info.tick.close,
                function e(t, a) {
                    var i = f.
                default.symbolDataObj[a];
                    var o = n.usdrate;
                    var r;
                    if (!i) return;
                    if (!o) return setTimeout(function() {
                        return e(t, a)
                    },
                    300);
                    if ("usdt" === i["quote-currency"]) r = o;
                    else if (f.
                default.symbolDataObj[i["quote-currency"] + "usdt"]) {
                        if (!n.ticker[i["quote-currency"] + "usdt"] || !n.ticker[i["quote-currency"] + "usdt"].close) return setTimeout(function() {
                            return e(t, a)
                        },
                        300);
                        r = o * n.ticker[i["quote-currency"] + "usdt"].close
                    } else n.ticker[a].cnyClose = "---";
                    if (!t || !r) return setTimeout(function() {
                        return e(t, a)
                    },
                    300);
                    $_GET.debuger && console.log(t, r);
                    n.ticker[a].cnyClose = (0, s.Num)((0, d.mul)(t, r), N((0, d.mul)(t, r)));
                    n.updateHtml();
                    n.renderBalance()
                } (e.info.tick.close, t),
                n.updateHtml(),
                n.renderBalance()
            }),
            (0, c.Subscribe)("__allSymbolDayKline",
            function(e) {
                var t = e.info,
                a = t.ch.split(".")[1],
                i = (t.tick.close - t.tick.open) / t.tick.open * 100,
                o = 1 * (0, s.Num)(i, 2) ? (0, s.Num)(i, 2) : (0, s.Num)(0, 2),
                r = (1 * o > 0 ? "+": "") + o + "%";
                n.ticker[a] = n.ticker[a] ? n.ticker[a] : {},
                n.ticker[a].showRate = r,
                n.ticker[a].rate = 1 * o,
                n.updateHtml()
            }),
            (0, c.Subscribe)("__getUserBalance",
            function(e) {
                var t = e.info;
                for (var a in n.balance = {},
                t.total) 1 * t.total[a] && (n.balance[a] = t.total[a]);
                n.renderBalance()
            }),
            function e() {
                n.info || (n.info = {}),
                (0, p.singlePage)({
                    path: {
                        id: ""
                    },
                    params: {
                        lang: localStorage.lang || "",
                        pageType: 1
                    }
                }).then(function(t) {
                    t.data.success ? (t.data.data.forEach(function(e) {
                        n.info[e.pageIdentifier] = {
                            title: e.title,
                            content: e.summary
                        }
                    }), n.updateHtml()) : setTimeout(e, 5e3)
                })
            } (),
            t(),
            _.plugin((0, u.api)().sub().overview(),
            function(e) {
                e.ch && "market.overview" === e.ch &&
                function(e) {
                    e.forEach(function(e) {
                        var t = {
                            info: {
                                tick: e,
                                ch: "overview." + e.symbol
                            }
                        };
                        PAGE_COIN + PAGE_QUOTE != e.symbol && ((0, c.Publish)(m.ACTIONS.__allSymbolTicker, t.info), (0, c.Publish)(m.ACTIONS.__allSymbolDayKline, t.info))
                    })
                } (e.data)
            }),
            _.plugin((0, u.api)({
                symbol: PAGE_COIN + PAGE_QUOTE
            }).sub().ticker(), r),
            _.plugin((0, u.api)({
                symbol: PAGE_COIN + PAGE_QUOTE,
                period: "1day"
            }).sub().kline(), l)
        }
        function N(e) {
            var t = l.RATE_CURRENCY_INFO_LIST.filter(function(e) {
                return e.abbr === L
            }),
            n = (0, r.
        default)(t, 1)[0].min,
            a = void 0 === n ? .01 : n;
            return e > a ? a.toString().includes(".") ? a.toString().split(".")[1].length: 0 : e.toString().match(/[^\.0]/) ? e.toString().match(/[^\.0]/).index + 1 : void 0
        } (0, c.Subscribe)("__userIsLogin",
        function(e) {
            I = e.info
        }),
        t.coinSwitch = function(e) {
            var t = e || {},
            n = {
                wrap: document.querySelector("#drawer"),
                filterKey: t.key || localStorage.getItem(h) || "usdt",
                sortKey: "mgt",
                ticker: {},
                isLogin: !!s.cookies.get("HB-PRO-TOKEN"),
                keys: "init",
                inited: 0,
                eyeStatus: localStorage.getItem("eye_status") || 1,
                priceQuote: localStorage.getItem("priceQuote") || "btc"
            };
            function a() {
                n.isLogin = !!s.cookies.get("HB-PRO-TOKEN"),
                setTimeout(a, 1e3)
            }
            function i() {
                var e, t, a, i;
                n.search_keyword.value ? (n.clear_key_dom.style.display = "inline-block", n.search_sign_dom.style.display = "none") : (n.clear_key_dom.style.display = "none", n.search_sign_dom.style.display = ""),
                n.keys !== n.search_keyword.value && (n.symbolDataObj = {},
                n.symbolDataArr = [], n.symbolData = (e = f.
            default.symbolData, t = n.search_keyword.value, a = [], i = t || "", e.forEach(function(e) {~e["base-currency"].toLowerCase().indexOf(i.toLowerCase()) && a.push(e)
                }), a), n.symbolData.forEach(function(e) {
                    e.delist || (n.symbolDataArr.push(e.symbol), n.symbolDataObj[e.symbol.toLowerCase()] = e)
                }), n.keys = n.search_keyword.value, n.render())
            }
            return (0, s.J)(O, n),
            (0, s.J)(T, n),
            (0, s.J)(function() {
                var e = this;
                e.getUcData(),
                e.localData = JSON.parse(localStorage.getItem("mark_symbol") || "{}"),
                e.coin_list_dom = e.wrap.querySelector(".coin_list"),
                e.coin_list_html = e.coin_list_dom.querySelector("script").innerHTML,
                e.filter_dom = e.wrap.querySelectorAll('span[action="userfilter"]'),
                e.filter_dom_mark = e.wrap.querySelector('b[action="showmarked"]'),
                e.sort_dom = e.wrap.querySelectorAll('span[action="usersort"]'),
                e.total_dom = document.querySelector("#total_balance").querySelector("b"),
                e.total_eyes = document.querySelector("#total_eyes"),
                e.total_about_dom = document.querySelector("#total_balance").querySelector("span"),
                e.search_keyword = e.wrap.querySelector("#search_keyword"),
                e.switchQuote = e.wrap.querySelector('div[action="switch_quote"]'),
                e.search_wrap_dom = e.wrap.querySelector(".search_wrap"),
                e.new_price_dom = e.wrap.querySelector("#new_price"),
                e.clear_key_dom = e.wrap.querySelector('[action="clear_key"]'),
                e.search_sign_dom = e.wrap.querySelector('[flag="search_sign"]'),
                e.symbolData = f.
            default.symbolData,
                e.symbolDataArr = f.
            default.symbolDataArr,
                e.symbolDataObj = f.
            default.symbolDataObj,
                (0, s.J)(E, e),
                e.eyeStatus = 1 * e.eyeStatus,
                e.setFilter(),
                e.render(),
                e.setPriceQuote(),
                s.Event.add(e.total_eyes, "click", e.changeEyes),
                s.Event.add(e.wrap, "click",
                function(t) {
                    var n = s.Event.target(t),
                    a = (0, s.attFather)(n, "action"),
                    i = (0, s.attFather)(n, "stop"),
                    o = (0, s.attFather)(n, "stop_prop");
                    i && s.Event.stop(t),
                    o && (t && t.stopPropagation ? t.stopPropagation() : window.event.cancelBubble = !0),
                    a && e[a.attr] && e[a.attr](a.node)
                }),
                a(),
                (0, s.AnimationFactory)(i)
            },
            n),
            (0, s.J)(M, n),
            n
        }
    },
    gLaJ: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.dialogMix = t.Dialog = void 0;
        var a, i = n("cnkX"),
        o = n("f8yD"),
        r = n("M32D"),
        l = (a = r) && a.__esModule ? a: {
        default:
            a
        };
        t.Dialog = function(e) {
            var t = arguments,
            n = this,
            a = e || {};
            function r(e) {
                n.cbList.forEach(function(t) {
                    "function" == typeof t && t(e)
                })
            }
            return n.cbList = [],
            n.html = a.html || "",
            n.state = "close",
            n.Open = function() {
                n.dialog.style.display = "block",
                n.state = "open";
                var e = {
                    type: "open",
                    arg: [].slice.apply(arguments)
                };
                r(e),
                n.Then && n.Then(e)
            },
            n.Close = function(e) {
                n.dialog.style.display = "none",
                n.state = "close";
                var t = {
                    type: "close",
                    driver: e ? "inhuman": "unhuman",
                    arg: [].slice.apply(arguments)
                };
                r(t),
                n.Then && n.Then(t)
            },
            n.Submit = function() {
                var e = {
                    type: "submit"
                };
                r(e),
                n.Then && n.Then(e)
            },
            n.Render = function(e) {
                n.dialog && (n.dialog.innerHTML = e)
            },
            n.callback = function(e) {
                n.cbList.push(e)
            },
            n.dialog = new i.Entity(n.html, "body"),
            n.dialog.style.display = "none",
            n.closeBtn = n.dialog.querySelector(".close"),
            o.Event.add(n.dialog, "click",
            function(e) {
                var t = o.Event.target(e); (t.className.toString().indexOf("close") > -1 || t.className.toString().indexOf("cancel") > -1) && n.Close(1),
                t.className.toString().indexOf("btn_submit") > -1 && n.Submit()
            }),
            o.Event.add(document, "keyup",
            function(e) {
                if ("open" === n.state) {
                    if (13 === e.keyCode) {
                        var a = {
                            type: "enter",
                            arg: [].slice.apply(t)
                        };
                        r(a),
                        n.Then && n.Then(a)
                    }
                    27 === e.keyCode && n.Close()
                }
            }),
            n
        },
        t.dialogMix = function(e) {
            var t = l.
        default.split("block_dia_content");
            return {
                fc:
                t[0] + e + t[1],
                html: '<div class="dialog_wrap">' + t[0] + e + t[1] + "</div>"
            }
        }
    },
    hHLf: function(e, t) {
        e.exports = '<div class="lead_dialog">\n    <p><%=lang("请您先完成如下操作")%>：</p>\n    <ul block="task_list"></ul>\n</div>\n<block name="task_list">\n    <%for(var i = 0,l = task.length; i < l; i++){%>\n\n        <li class="<%=task[i].index ? \'complete\' : \'\'%>">\n            <i class="<%=task[i].status ? \'hb_icon_toast_success\' : \'hb_icon_toast_failed\'%>"></i>\n            <span><%=task[i].title%></span>\n            <a href="<%=task[i].actionUrl%>" target="_blank" <%if(task[i].index){%>stop="1"<%}%>><%= lang(task[i].status ? "已完成" : task[i].actionName)%></a>\n        </li>\n        <%}%>\n</block>'
    },
    inzq: function(e, t, n) {
        e.exports = '<div block="content"></div>\n<block name="loading">\n    <div class="dia_loading" style="text-align: center"><img class="dia_wd_address_loading" src="' + n("TVPb") + '"/></div>\n</block>\n<block name="content">\n    <%=content%>\n</block>\n\n<block name="login_verify_setting">\n        <% if(item === "PHONE"){%>\n            <div class="dia_input">\n                <div class="input_top">\n                    <b>\n                        <%=lang("手机号")%>\n                    </b>\n                    <p class="pro_warning"></p>\n                </div>\n                <div class="input_middle">\n                    <input class="input_text" type="text" disabled value="<%=data.phone%>">\n                </div>\n            </div>\n            <div class="dia_input">\n                <div class="input_top">\n                    <b>\n                        <%=lang("短信验证码")%>\n                    </b>\n                    <p class="pro_warning"></p>\n                </div>\n                <div class="input_middle">\n                    <input class="input_text" type="text" pro_name="auth_code" maxlength="6" >\n                    <span class="input_text_right sms_verify" act="sms_btn_wrap">\n                        <a href="" action="getSms" stop="1">\n                            <%=lang("点击获取")%>\n                        </a>\n                    </span>\n                </div>\n            </div>\n        <%} %>\n        <% if(item === "EMAIL"){ %>\n            <div class="dia_input">\n                <div class="input_top">\n                    <b>\n                        <%=lang("邮箱")%>\n                    </b>\n                    <p class="pro_warning"></p>\n                </div>\n                <div class="input_middle">\n                    <input class="input_text" type="text" disabled value="<%=data.email%>">\n                </div>\n            </div>\n            <div class="dia_input">\n                <div class="input_top">\n                    <b>\n                        <%=lang("邮箱验证码")%>\n                    </b>\n                    <p class="pro_warning"></p>\n                </div>\n                <div class="input_middle">\n                    <input class="input_text" type="text" pro_name="auth_code" verify="1" maxlength="6">\n                    <span class="input_text_right sms_verify" act="email_btn_wrap">\n                        <a href="" action="getEmail" stop="1">\n                            <%=lang("点击获取")%>\n                        </a>\n                    </span>\n                </div>\n            </div>\n        <%\n\n        } %>\n        <% if(item === "GA"){ %>\n        <div class="dia_input">\n            <div class="input_top">\n                <b><%=lang("谷歌验证码")%></b>\n                <p class="pro_warning"></p>\n            </div>\n            <div class="input_middle">\n                <input class="input_text" type="text" pro_name="auth_code">\n            </span>\n            </div>\n        </div>\n        <% } %>\n</block>\n\n<block name="verify_setting">\n    <% if(UI.setting.verify_phone || item === "PHONE"){ %>\n        <div class="dia_input">\n            <div class="input_top">\n                <b>\n                    <%=lang("手机号")%>\n                </b>\n                <p class="pro_warning"></p>\n            </div>\n            <div class="input_middle">\n                <input class="input_text" type="text" disabled value="<%=UI.phone%>">\n            </div>\n        </div>\n        <div class="dia_input">\n            <div class="input_top">\n                <b>\n                    <%=lang("短信验证码")%>\n                </b>\n                <p class="pro_warning"></p>\n            </div>\n            <div class="input_middle">\n                <input class="input_text" type="text" pro_name="sms_code" maxlength="6">\n                <span class="input_text_right sms_verify" act="sms_btn_wrap">\n                    <a href="" action="getSms" stop="1">\n                        <%=lang("点击获取")%>\n                    </a>\n                </span>\n            </div>\n        </div>\n    <% } %>\n    <% if(UI.setting.verify_email || item === "EMAIL"){ %>\n        <div class="dia_input">\n            <div class="input_top">\n                <b>\n                    <%=lang("邮箱")%>\n                </b>\n                <p class="pro_warning"></p>\n            </div>\n            <div class="input_middle">\n                <input class="input_text" type="text" disabled value="<%=UI.email%>">\n            </div>\n        </div>\n        <div class="dia_input">\n            <div class="input_top">\n                <b>\n                    <%=lang("邮箱验证码")%>\n                </b>\n                <p class="pro_warning"></p>\n            </div>\n            <div class="input_middle">\n                <input class="input_text" type="text" pro_name="email_code" verify="1" maxlength="6">\n                <span class="input_text_right sms_verify" act="email_btn_wrap">\n                    <a href="" action="getEmail" stop="1">\n                        <%=lang("点击获取")%>\n                    </a>\n                </span>\n            </div>\n        </div>\n    <% } %>\n    <% if(UI.setting.verify_ga || item === "GA"){ %>\n    <div class="dia_input">\n        <div class="input_top">\n            <b><%=lang("谷歌验证码")%></b>\n            <p class="pro_warning"></p>\n        </div>\n        <div class="input_middle">\n            <input class="input_text" type="text" pro_name="ga_code" maxlength="6">\n        </span>\n        </div>\n    </div>\n    <% } %>\n</block>'
    },
    jDvB: function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }),
        exports.FormValidator = void 0;
        var _typeof2 = __webpack_require__("pFYg"),
        _typeof3 = _interopRequireDefault(_typeof2);
        function _interopRequireDefault(e) {
            return e && e.__esModule ? e: {
            default:
                e
            }
        }
        function GetData(e) {
            for (var t = {},
            n = {},
            a = [], i = void 0, o = void 0, r = void 0, l = e.length; l--;) i = e[l],
            o = e[l].getAttribute("name"),
            r = i.type,
            o && ("text" === r || "password" === r || "hidden" === r || r.indexOf("select") > -1 || "textarea" === r || "file" === r ? (t[o] = Trim(i.value), n[o] = i) : "checkbox" === r ? (t[o] = t[o] || [], n[o] = n[o] || [], n[o].push(i), !0 === i.checked && t[o].push(i.value)) : "radio" === r && (n[o] = i, !0 === i.checked && (t[o] = i.value)), a.unshift({
                name: o,
                value: t[o],
                type: r
            }));
            return [t, n, a]
        }
        function Trim(e) {
            return e.replace(/^\s+/, "").replace(/\s+$/, "")
        }
        function FilterEmpty(e) {
            for (var t in e) ! e[t] && delete e[t];
            return e
        }
        function IsHidden(e) {
            return null === e.offsetParent
        }
        var isDOM = "object" === ("undefined" == typeof HTMLElement ? "undefined": (0, _typeof3.
    default)(HTMLElement)) ?
        function(e) {
            return e instanceof HTMLElement
        }: function(e) {
            return e && "object" === (void 0 === e ? "undefined": (0, _typeof3.
        default)(e)) && 1 === e.nodeType && "string" == typeof e.nodeName
        };
        function FormValidator(option) {
            var _this = this,
            _op = option || {};
            function Mode(dataType) {
                var _modes = {
                    regExp: {
                        code: 2,
                        reg: /\/.+\//g
                    },
                    extend: {
                        code: 3,
                        reg: /^(.+?){(\d+),(\d+)}$/
                    },
                    and: {
                        code: 4,
                        reg: /^(.+?)\&\&(.+?)$/
                    },
                    or: {
                        code: 5,
                        reg: /^(.+?)\|\|(.+?)$/
                    }
                },
                _mode = {};
                if (!dataType) return ! 1;
                function matchOption(e) {
                    return _this.RegList[e]
                }
                function matchMode(e, t) {
                    var n = e.match(t);
                    return n.shift(),
                    n
                }
                return _mode = matchOption(dataType) ? {
                    code: 1,
                    reg: [dataType]
                }: _modes.regExp.reg.test(dataType) ? {
                    code: _modes.regExp.code,
                    reg: [eval(dataType)]
                }: _modes.extend.reg.test(dataType) ? {
                    code: _modes.extend.code,
                    reg: matchMode(dataType, _modes.extend.reg)
                }: _modes.or.reg.test(dataType) ? {
                    code: _modes.or.code,
                    reg: matchMode(dataType, _modes.or.reg)
                }: _modes.and.reg.test(dataType) ? {
                    code: _modes.and.code,
                    reg: matchMode(dataType, _modes.and.reg)
                }: {
                    code: 0
                },
                _mode
            }
            return _op.ignoreHidden = void 0 === _op.ignoreHidden || _op.ignoreHidden,
            _this.option = _op,
            _this.Form = _op.form,
            _this.MsgTip = _op.formTip,
            _this.RegList = {
                "*": /[\w\W]+/,
                p: /^[0-9]{5,11}$/,
                pwd: /(?!\d+$)[\w\W]{8,20}$/,
                passport: /^(?!_\-)(?!.*?_$)([a-zA-Z0-9\s\,\'.]){5,20}$/,
                pinyin: /[A-Za-z]$/,
                e: /^[\.a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                compare: function(e, t) {
                    var n = t.compare;
                    return e ? e === _this.FormDataCommon[n] ? 0 : 2 : 1
                }
            },
            _this.Trim = Trim,
            _this.GetData = GetData,
            _this.Inputs = _this.Form.querySelectorAll("input,select,textarea"),
            _this.GetFormData = function() {
                _this.Inputs = _this.option.dynamicNode ? _this.Form.querySelectorAll("input,select,textarea") : _this.Inputs,
                _this._formData = _this.GetData(_this.Inputs),
                _this.FormData = _this._formData[2],
                _this.FormDataCommon = _this._formData[0]
            },
            _this.GetFormInput = function() {
                _this.FormInput = _this._formData[1],
                _this.FormButton = _this.Form.querySelector('[type="submit"]')
            },
            _this.GetInputInfo = function() {
                var e = {},
                t = {},
                n = {},
                a = void 0;
                for (var i in _this.FormInput) _this.FormInput.hasOwnProperty(i) && (a = isDOM(_this.FormInput[i]) ? _this.FormInput[i] : _this.FormInput[i][0], n[i] = {
                    dataType: a.getAttribute("data-datatype"),
                    msg: {
                        nullMsg: a.getAttribute("data-msg-null"),
                        errorMsg: a.getAttribute("data-msg-error")
                    },
                    dataNumMin: a.getAttribute("data-num-min"),
                    dataNumMax: a.getAttribute("data-num-max"),
                    compare: a.getAttribute("data-compare"),
                    ele: a,
                    form: _this.Form,
                    mode: Mode(a.getAttribute("data-datatype"))
                },
                e[i] = n[i].dataType, t[i] = n[i].msg);
                _this.MsgList = t,
                _this.TypeList = e,
                _this.InputInfo = n
            },
            _this.qualified = !0,
            _this.Auth = function() {
                var e = void 0,
                t = void 0,
                n = void 0,
                a = void 0,
                i = void 0,
                o = void 0;
                function r(e) {
                    return _this.RegList[e]
                }
                function l(e, t, n, i, o) {
                    return "function" === (void 0 === e ? "undefined": (0, _typeof3.
                default)(e)) ? e(a, n, i) : t && _this.Trim(t) && _this.RegList["*"].test(t) ? e.test(t) ? 0 : 2 : 1
                }
                function s(e, t, n) {
                    return e && _this.Trim(e) && _this.RegList["*"].test(e) ? e.length >= t && e.length <= n ? 0 : 2 : 1
                }
                for (var c = 0,
                u = _this.FormData.length,
                d = u; c < u; c++) {
                    if (d--, n = _this.FormData[c].name, t = _this.FormInput[n], a = "object" === (0, _typeof3.
                default)(_this.FormData[c].value) ? _this.FormData[c].value[0] : _this.FormData[c].value, i = _this.AuthNow && _this.AuthNow(n), _this.AuthInput = t, o = i ? {
                        code: 9,
                        reg: i
                    }: _this.InputInfo[n].mode) switch (o.code) {
                    case 1:
                        e = l(r(o.reg[0]), a, _this.InputInfo[n], _this);
                        break;
                    case 2:
                        e = l(o.reg[0], a, _this.InputInfo[n], _this);
                        break;
                    case 3:
                        e = 0 === s(a, o.reg[1], o.reg[2]) ? l(r(o.reg[0]), a, _this.InputInfo[n], _this) : s(a, o.reg[1], o.reg[2]);
                        break;
                    case 4:
                        for (var p = 0; p < o.reg.length; p++) {
                            var m = l(r(o.reg[p]), a, _this.InputInfo[n], _this);
                            if (m > 0) {
                                e = m;
                                break
                            }
                            e = 0
                        }
                        break;
                    case 5:
                        for (var f = 0; f < o.reg.length && 0 !== (e = l(r(o.reg[f]), a, _this.InputInfo[n], _this)); f++);
                        break;
                    case 9:
                        e = l(o.reg, a, _this.InputInfo[n], _this);
                        break;
                    default:
                        console.warn("未匹配到校验规则", _this.InputInfo[n])
                    }
                    if (_op.ignoreHidden && IsHidden(t) && (e = 0), e) {
                        _this.qualified = !1,
                        _this.MsgShow(t, n, e);
                        break
                    }
                    d || (_this.qualified = !0)
                }
                _this.qualified && _this.SubmitForm()
            },
            _this.MsgShow = function(e, t, n) {
                var a = _this.MsgList[t];
                switch (n) {
                case 1:
                    _this.Msg = a.nullMsg;
                    break;
                case 2:
                    _this.Msg = a.errorMsg
                }
                _this.Then && _this.Then(_this.Form, {
                    type: "showMsg",
                    resultCode: n,
                    msgList: a,
                    msgNow: _this.Msg,
                    authInput: _this.AuthInput,
                    ele: _this.FormInput[t],
                    inputs: _this.FormInput,
                    button: _this.FormButton
                },
                _this),
                _this.MsgTip && (_this.MsgTip.innerHTML = _this.Msg)
            },
            _this.SubmitForm = function() {
                _this.qualified && _this.Then && _this.Then(_this.Form, {
                    type: "submit",
                    formDataSerialize: _this.FormData,
                    formData: _this.option.filterEmpty ? FilterEmpty(_this.FormDataCommon) : _this.FormDataCommon,
                    authInput: _this.AuthInput,
                    resultCode: 0,
                    inputs: _this.FormInput,
                    button: _this.FormButton
                },
                _this)
            },
            _this.Form.addEventListener("submit",
            function(e) {
                _this.GetFormData(),
                _this.GetFormInput(),
                _this.GetInputInfo(),
                _this.Auth(),
                e.stopPropagation(),
                e.preventDefault()
            }),
            _this
        }
        exports.FormValidator = FormValidator
    },
    jkOj: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a, i = n("scaR"),
        o = (a = i) && a.__esModule ? a: {
        default:
            a
        },
        r = n("cnkX"),
        l = n("f8yD");
        function s() {
            for (var e = navigator.userAgent,
            t = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod", "rv:1.2.3.4", "windows mobile", "midp"], n = !0, a = 0; a < t.length; a++) if (e.indexOf(t[a]) > 0) {
                n = !1;
                break
            }
            return n
        }
        n("ydDO"),
        t.
    default = function(e) {
            var t = this,
            n = e || {},
            a = 0;
            return t.Loading = function(e) {
                var n = e || {};
                t.wrap = n.wrap,
                t.name = n.name,
                n.data = null,
                t.Update(n)
            },
            t.Update = function(e) {
                var i = e || {};
                i.config = n,
                i.lang = n.lang || {},
                i.name = i.name || t.name,
                i.wrap = i.wrap || t.wrap;
                var c = new r.Entity((0, l.TmpL)(o.
            default, i), i.wrap, !0);
                if (t.eleLabel = c.querySelector(".select_label"), t.elemOutput = c.querySelector(".select_output"), t.elemOption = c.querySelector(".select_option"), t.elemInput = c.querySelector("input"), t.isFocus = !1, t.class = c.className, i.data) {
                    t.data = i.data;
                    for (var u = 0,
                    d = t.data.length; u < d; u++) if ("label" !== t.data[u].type) {
                        a = u;
                        break
                    }
                    l.Event.add(c, "touchStart", f),
                    l.Event.add(c, "click", f),
                    s() && l.Event.add(c, "blur",
                    function(e) {
                        setTimeout(m, 100)
                    }),
                    t.Reset()
                }
                function p() {
                    t.isFocus ? m() : (c.className = t.class + " active", t.elemOption.style.display = "block", t.isFocus = !0)
                }
                function m() {
                    c.className = t.class,
                    t.elemOption.style.display = "none",
                    t.isFocus = !1
                }
                function f(e) {
                    e.preventDefault();
                    var n = l.Event.target(e),
                    a = (0, l.attFather)(n, "data-option"),
                    i = (0, l.attFather)(n, "data-output"),
                    o = (0, l.attFather)(n, "data-option-type"),
                    r = void 0,
                    s = void 0;
                    if (i && p(), a) {
                        if (o && "label" === o.attr) return;
                        r = JSON.parse(a.attr),
                        s = t.data.filter(function(e) {
                            return e.value == r.value
                        }),
                        t.Output(s[0]),
                        m()
                    }
                }
            },
            t.Reset = function() {
                t.Output(t.data[a])
            },
            t.Output = function(e) {
                t.elemInput.value = e.value,
                t.elemOutput.innerHTML = e[n.showChecked || "key"],
                t.Then && t.Then(e),
                l.Event.trigger(t.elemInput, "input"),
                l.Event.trigger(t.elemInput, "change"),
                s() && (t.elemInput.blur(), l.Event.trigger(t.elemInput, "blur"))
            },
            t.Change = function(e) {
                if (t.data.length) {
                    var n = t.data.filter(function(t, n, a) {
                        return t.value === e
                    });
                    t.Output(n[0])
                }
            },
            t
        }
    },
    "kH/+": function(e, t) {},
    kaZT: function(e, t) {},
    lRbw: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = p(n("Xxa5")),
        i = p(n("exGp"));
        n("kaZT");
        var o = p(n("z2ds")),
        r = n("gLaJ"),
        l = n("f8yD"),
        s = (n("aVmh"), n("zcHd")),
        c = (p(n("5nIp")), n("RxF2")),
        u = n("Fe3k"),
        d = p(n("3qqy"));
        function p(e) {
            return e && e.__esModule ? e: {
            default:
                e
            }
        }
        var m = new u.GetUserAccount,
        f = (0, l.Lang)(),
        g = {
            level: 0,
            monthIndex: 0
        },
        v = (0, l.SplitTemplate)(o.
    default),
        _ = new s.Toast,
        y = void 0,
        b = void 0,
        h = void 0,
        k = void 0,
        w = void 0,
        L = void 0,
        S = void 0,
        E = void 0,
        T = void 0;
        t.
    default = function() {
            var e, t, n = (e = (0, i.
        default)(a.
        default.mark(function e() {
                var t, n;
                return a.
            default.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                    case 0:
                        if (e.t0 = g.data, e.t0) {
                            e.next = 5;
                            break
                        }
                        return e.next = 4,
                        (0, c.getVipLevels)();
                    case 4:
                        e.t0 = e.sent;
                    case 5:
                        t = e.t0,
                        n = t.data,
                        g.data = {
                            data: n
                        },
                        "vip" === b.block ? (y.dialog.querySelector('[block="level"]').innerHTML = (0, l.TmpL)(v.block.level, {
                            lang: f.getLang,
                            Num: l.Num,
                            data: n.data,
                            level: g.level,
                            targetLevel: g.targetLevel || 1 * g.level + 1
                        }), u()) : "prolongVip" === b.block ? (u(), y.dialog.querySelector('[block="level"]').innerHTML = "VIP " + window.STORE.userInfo.vip_level) : "upgradeVip" === b.block && (y.dialog.querySelector('[block="upgradeLevel"]').innerHTML = (0, l.TmpL)(v.block.upgradeLevel, {
                            lang: f.getLang,
                            data: n.data,
                            Num: l.Num,
                            level: window.STORE.userInfo.vip_level - 1,
                            startLevel: 1 * window.STORE.userInfo.vip_level,
                            targetLevel: g.targetLevel || 1 * window.STORE.userInfo.vip_level
                        }), p(), x());
                    case 9:
                    case "end":
                        return e.stop()
                    }
                },
                e, this)
            })),
            function() {
                return e.apply(this, arguments)
            }),
            o = (t = (0, i.
        default)(a.
        default.mark(function e() {
                return a.
            default.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                    case 0:
                        if (e.t0 = S, e.t0) {
                            e.next = 5;
                            break
                        }
                        return e.next = 4,
                        (0, d.
                    default)();
                    case 4:
                        e.t0 = e.sent;
                    case 5:
                        S = e.t0;
                    case 6:
                    case "end":
                        return e.stop()
                    }
                },
                e, this)
            })),
            function() {
                return t.apply(this, arguments)
            }),
            s = {};
            function u() {
                var e;
                g.month = g.data.data.data[g.level],
                y.dialog.querySelector('[block="validity_days"]').innerHTML = (0, l.TmpL)(v.block.validity_days, {
                    data: g.month["price-plans"],
                    Num: l.Num,
                    monthIndex: g.monthIndex,
                    lang: f.getLang
                }),
                e = null,
                g.month["price-plans"].forEach(function(t) {
                    1 == t["number-of-month"] && (e = t)
                }),
                e && g.month["price-plans"][g.monthIndex]["number-of-month"] == e["number-of-month"] && (e = null),
                y.dialog.querySelector('[block="amount"]').innerHTML = g.month["price-plans"][g.monthIndex].price + ' <em class="uppercase">' + g.month["charge-currency"] + "</em>" + (e ? '<span class="line-through">' + (0, l.Num)(e.price * g.month["price-plans"][g.monthIndex]["number-of-month"]) + '<em class="uppercase">' + g.month["charge-currency"] + "</em></span>": ""),
                p()
            }
            function p() {
                window.spotBalance && y.dialog && y.dialog.querySelector('[block="tradeht"]') && (y.dialog.querySelector('[block="tradeht"]').innerHTML = (0, l.Num)(window.spotBalance, 8))
            }
            function x() {
                g.fee && y.dialog && y.dialog.querySelector('[block="tradeht"]') && (y.dialog.querySelector('[block="amount"]').innerHTML = (0, l.Num)(g.fee[1 * g.targetLevel + 1].amount, 8))
            }
            function I(e) {
                var t = l.Event.target(e),
                n = (0, l.attFather)(t, "action"); (0, l.attFather)(t, "stop") && l.Event.stop(e),
                n && s[n.attr] && s[n.attr](n.node)
            }
            function O(e) {
                if ("close" === e.type && M(), !w && "submit" === e.type) {
                    if (!E) return _.Error(LANG.dialog["请先拖动滑块验证"], 2e3);
                    if (T) return _.Error(LANG.dialog["请完成您的选择"], 2e3);
                    "vip" === b.block && (w = 1, b.success({
                        aLiData: E,
                        level: g.data.data.data[g.level],
                        validity: g.data.data.data[g.level]["price-plans"][g.monthIndex]
                    },
                    M)),
                    "prolongVip" === b.block && (w = 1, b.success({
                        aLiData: E,
                        validity: g.data.data.data[g.level]["price-plans"][g.monthIndex]
                    },
                    M)),
                    "upgradeVip" === b.block && (w = 1, b.success({
                        aLiData: E,
                        level: 1 * g.targetLevel + 1
                    },
                    M))
                }
            }
            function M(e) {
                var t;
                e && (y && y.Close(t), window.spotBalance = null, L = null),
                S.Reload(),
                E = null,
                T = null,
                w = 0
            }
            function N(e, t) {
                return e && f._keys(e),
                f.getLang({
                    vip: "开通VIP",
                    prolongVip: "VIP续费",
                    upgradeVip: "VIP升级"
                } [t])
            }
            return (0, l.J)(function() {
                this.showAllLevel = function(e) {
                    e.parentNode.parentNode.className = "vip_type vip_all_level",
                    T = 1
                },
                this.showAllOtherLevel = function(e) {
                    e.parentNode.parentNode.className = "vip_type vip_all_other_level",
                    y.dialog.querySelector('[block="level_title"]').className = "input_top level_target_only",
                    T = 1
                },
                this.selectLevel = function(e) {
                    "vip" === b.block ? g.level = e.dataset.level: g.targetLevel = e.dataset.level,
                    g.monthIndex = 0,
                    y.dialog.querySelector('[block="level_title"]') && (y.dialog.querySelector('[block="level_title"]').className = "input_top level_target"),
                    n(),
                    T = null
                },
                this.selectMonth = function(e) {
                    g.monthIndex = e.dataset.monthIndex,
                    u()
                }
            },
            s),
            m.Then = function(e) {
                e.list.forEach(function(e) {
                    "ht" === e.currency && "trade" === e.type && (window.spotBalance = e.balance)
                }),
                p()
            },
            o(),
            {
                open: function e(t) {
                    S ? (window.spotBalance || L || (L = 1, m.Get("spot")), t && t(), y.dialog.querySelector('[block="content"]').innerHTML = (0, l.TmpL)(v.block[b.block], h), "vip" === b.block ? (y.dialog.querySelector('[block="level"]').innerHTML = v.block.loading, y.dialog.querySelector('[block="validity_days"]').innerHTML = v.block.loading) : "prolongVip" === b.block ? (y.dialog.querySelector('[block="validity_days"]').innerHTML = v.block.loading, y.dialog.querySelector('p[data="dia_title"]').innerHTML = (0, l.TmpL)(v.block.dia_title_vip_more, {
                        Num: l.Num,
                        lang: f.getLang
                    })) : "upgradeVip" === b.block && (y.dialog.querySelector('[block="upgradeLevel"]').innerHTML = v.block.loading, y.dialog.querySelector('p[data="dia_title"]').innerHTML = (0, l.TmpL)(v.block.dia_title_vip_levelup, {
                        Num: l.Num,
                        lang: f.getLang
                    })), n(), y.Open(), S.inited ? S.Reload() : S.Init({
                        renderTo: "#ali_captcha",
                        appkey: "FFFF0000000001796AA8",
                        scene: "activity",
                        callback: function(e) {
                            E = e
                        }
                    })) : setTimeout(function() {
                        e(t)
                    },
                    100)
                },
                title: N,
                construct: function(e) {
                    w = 0,
                    b = e,
                    f._keys(e.lang),
                    g = {
                        level: b.data.level || 0,
                        monthIndex: b.data.monthIndex || 0,
                        targetLevel: b.data.targetLevel || 0
                    },
                    h = {
                        Num: l.Num,
                        lang: f.getLang,
                        data: e.data,
                        page: {
                            title: e.title
                        },
                        btn: {
                            submit: f.getLang("确定")
                        }
                    },
                    y = y || new r.Dialog({
                        html: (0, l.TmpL)((0, r.dialogMix)(v.html).html, h)
                    }),
                    !k && l.Event.add(y.dialog, "click", I),
                    k = 1,
                    y.dialog.querySelector("b").innerHTML = N(null, b.block),
                    y.callback(O),
                    "upgradeVip" === b.block && (0, c.upgradeFee)({
                        data: {
                            source: "sys"
                        }
                    }).then(function(e) {
                        var t = e.data;
                        "ok" === t.status ? (g.fee = [], t.data.forEach(function(e) {
                            g.fee[e.level] = e
                        }), x()) : myToast.Error(t["err-msg"], 2e3)
                    })
                }
            }
        } ()
    },
    lUQ8: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        n("kaZT");
        var a = l(n("xkox")),
        i = n("gLaJ"),
        o = n("f8yD"),
        r = (n("aVmh"), n("RxF2"), n("zcHd"));
        l(n("5nIp"));
        function l(e) {
            return e && e.__esModule ? e: {
            default:
                e
            }
        }
        var s = (0, o.Lang)(),
        c = (0, o.SplitTemplate)(a.
    default),
        u = (new r.Toast, void 0),
        d = void 0,
        p = void 0,
        m = void 0,
        f = void 0;
        t.
    default = function() {
            var e = {};
            function t(t) {
                var n = o.Event.target(t),
                a = (0, o.attFather)(n, "action"); (0, o.attFather)(n, "stop") && o.Event.stop(t),
                a && e[a.attr] && e[a.attr]()
            }
            function n(e) {
                f || "submit" === e.type && d.success && (f = 1, d.success(function() {
                    var e;
                    u && u.Close(e),
                    f = 0
                }))
            }
            return (0, o.J)(function() {},
            e),
            {
                open: function(e) {
                    e && e(),
                    u.Open()
                },
                title: function(e, t) {
                    return s._keys(e),
                    s.getLang({
                        transfer_out: "点卡转让确认",
                        transfer_in: "点卡接收确认"
                    } [t])
                },
                construct: function(e) {
                    f = 0,
                    d = e,
                    s._keys(e.lang),
                    p = {
                        Num: o.Num,
                        lang: s.getLang,
                        data: e.data,
                        page: {
                            title: e.title
                        },
                        btn: {
                            submit: s.getLang("确定")
                        }
                    },
                    u = u || new i.Dialog({
                        html: (0, o.TmpL)((0, i.dialogMix)(c.html).html, p)
                    }),
                    !m && o.Event.add(u.dialog, "click", t),
                    m = 1,
                    u.callback(n),
                    u.dialog.querySelector('[block="content"]').innerHTML = (0, o.TmpL)(c.block[d.block], p),
                    ("transfer_in" == d.block || "transfer_out" == d.block) && (u.dialog.querySelector('p[data="dia_title"]').innerHTML = (0, o.TmpL)(c.block.dia_title, {
                        lang: s.getLang
                    }))
                }
            }
        } ()
    },
    "op9/": function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.market_trade_fire = void 0;
        var a = c(n("Dd8w")),
        i = c(n("n4zI")),
        o = (c(n("NUe0")), c(n("AZ/z")), n("YtCS")),
        r = n("f8yD"),
        l = n("cnkX"),
        s = n("++vu");
        function c(e) {
            return e && e.__esModule ? e: {
            default:
                e
            }
        }
        var u = s.operator.handsup(o.API_ENV.ws),
        d = (new l.DomState, void 0),
        p = void 0,
        m = void 0;
        function f(e) {
            var t = i.
        default.symbolDataObj[d]["trade-price-precision"],
            n = i.
        default.symbolDataObj[d]["trade-amount-precision"];
            return e.map(function(e) {
                return (0, a.
            default)({},
                e, {
                    time: (0, r.time2Date)(e.ts, "h:i:s"),
                    type: "sell" === e.direction ? "down": "up",
                    price: (0, r.Num)(e.price, t),
                    amount: (0, r.Num)(e.amount, n)
                })
            })
        }
        function g(e) {
            m = f(e.data),
            _(),
            p = (0, s.api)({
                symbol: d
            }).sub().trade(),
            u.plugin(p, v)
        }
        function v(e) {
            if (!e.subbed) {
                var t = e.tick.data.length,
                n = m.slice(0, t).map(function(e) {
                    return e.id
                }),
                a = e.tick.data.reduce(function(e, t) {
                    return e.concat(n.includes(t.id) ? [] : t)
                },
                []);
                m = f(a).concat(m).slice(0, 100)
            }
            _()
        }
        function _() { (0, r.RenderView)("market_trades_list", {
                list: m
            })
        }
        t.market_trade_fire = function() {
            d = PAGE_COIN + PAGE_QUOTE,
            p = (0, s.api)({
                symbol: d
            }).req().trade(),
            m = [],
            u.plugin(p, g)
        }
    },
    "p/ij": function(e, t) {},
    p8wR: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.JSONP = void 0;
        var a, i = n("pFYg"),
        o = (a = i) && a.__esModule ? a: {
        default:
            a
        };
        t.JSONP = function(e, t, n, a) {
            e = e || "",
            t = t || {},
            n = n || "",
            a = a ||
            function() {};
            if ("object" == (void 0 === t ? "undefined": (0, o.
        default)(t))) {
                for (var i = "",
                r = function(e) {
                    var t = [];
                    for (var n in e) e.hasOwnProperty(n) && t.push(n);
                    return t
                } (t), l = 0; l < r.length; l++) i += encodeURIComponent(r[l]) + "=" + encodeURIComponent(t[r[l]]),
                l != r.length - 1 && (i += "&");
                i && (e += (e.indexOf("?") > -1 ? "&": "?") + i)
            } else "function" == typeof t && (a = n = t);
            "function" == typeof n && (a = n, n = "callback"),
            Date.now || (Date.now = function() {
                return (new Date).getTime()
            });
            var s = Date.now(),
            c = "jsonp" + Math.round(s + 1000001 * Math.random());
            window[c] = function(e) {
                a(e);
                try {
                    delete window[c]
                } catch(e) {
                    window[c] = void 0
                }
            },
            -1 === e.indexOf("?") ? e += "?": e += "&";
            var u = document.createElement("script");
            u.setAttribute("src", e + n + "=" + c),
            document.getElementsByTagName("head")[0].appendChild(u)
        }
    },
    qBGu: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = u(n("Xxa5")),
        i = u(n("exGp"));
        n("kaZT");
        var o = u(n("/6YX")),
        r = n("gLaJ"),
        l = n("f8yD"),
        s = (n("aVmh"), n("RxF2"), n("zcHd")),
        c = (u(n("5nIp")), u(n("3qqy")));
        function u(e) {
            return e && e.__esModule ? e: {
            default:
                e
            }
        }
        var d = (0, l.Lang)(),
        p = (0, l.SplitTemplate)(o.
    default),
        m = new s.Toast,
        f = void 0,
        g = void 0,
        v = void 0,
        _ = void 0,
        y = void 0,
        b = void 0,
        h = void 0,
        k = void 0,
        w = void 0;
        t.
    default = function() {
            var e, t = (e = (0, i.
        default)(a.
        default.mark(function e() {
                return a.
            default.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                    case 0:
                        if (e.t0 = h, e.t0) {
                            e.next = 5;
                            break
                        }
                        return e.next = 4,
                        (0, c.
                    default)();
                    case 4:
                        e.t0 = e.sent;
                    case 5:
                        h = e.t0;
                    case 6:
                    case "end":
                        return e.stop()
                    }
                },
                e, this)
            })),
            function() {
                return e.apply(this, arguments)
            }),
            n = {};
            function o(e) {
                var t = l.Event.target(e),
                a = (0, l.attFather)(t, "action"); (0, l.attFather)(t, "stop") && l.Event.stop(e),
                a && n[a.attr] && n[a.attr]()
            }
            function s(e) {
                if (!f && !b && "submit" === e.type) return k ? void(v.success && (b = 1, v.success(k,
                function() {
                    var e;
                    g && g.Close(e),
                    b = 0,
                    k = null
                }))) : m.Error(LANG.dialog["请先拖动滑块验证"], 2e3)
            }
            return (0, l.J)(function() {},
            n),
            t(),
            {
                open: function e(t) {
                    g.dialog.querySelector('button[pro_name="btn_submit"]').disabled = !1,
                    f = 0,
                    h ? (t && t(), g.Open(), h.inited ? h.Reload(v.data.token) : h.Init({
                        renderTo: "#ali_captcha",
                        appkey: "FFFF0000000001796AA8",
                        token: v.data.token,
                        scene: "activity",
                        callback: function(e) {
                            k = e
                        }
                    })) : setTimeout(function() {
                        e(t)
                    },
                    100)
                },
                title: function(e) {
                    return d._keys(e),
                    d.getLang("购买点卡支付确认")
                },
                construct: function(e) {
                    b = 0,
                    v = e,
                    d._keys(e.lang),
                    _ = {
                        lang: d.getLang,
                        data: e.data,
                        page: {
                            title: e.title
                        },
                        btn: {
                            submit: d.getLang("确定")
                        }
                    },
                    g = g || new r.Dialog({
                        html: (0, l.TmpL)((0, r.dialogMix)(p.html).html, _)
                    }),
                    !y && l.Event.add(g.dialog, "click", o),
                    y = 1,
                    g.callback(s),
                    g.dialog.querySelector('[block="content"]').innerHTML = (0, l.TmpL)(p.block.content, _),
                    function e(t) {
                        if (t < 0) return f = 1,
                        void(g.dialog.querySelector('button[pro_name="btn_submit"]').disabled = !0);
                        w && clearTimeout(w),
                        w = null,
                        w = setTimeout(function() {
                            e(t - 1)
                        },
                        1e3),
                        g.dialog.querySelector('p[data="dia_title"]').innerHTML = (0, l.TmpL)(p.block.dia_title, {
                            n: t,
                            lang: d.getLang
                        })
                    } (180)
                }
            }
        } ()
    },
    qXlb: function(e, t) {},
    "rU/t": function(e, t) {
        e.exports = '<div class="transfer_content">\n    <dl class="tio_form_view">\n        <dt><%=lang("从")%><i class="hb_icon_split_coin" action="changeDirection"></i><%=lang("到")%></dt>\n        <dd flag="dir">\n            <div class="account1"><%=lang("交易账户")%></div>\n            <div class="account2"><span class="uppercase"><%=base%>/<%=quote%></span><%=lang("杠杆账户")%></div>\n        </dd>\n    </dl>\n    <div class="dia_input">\n        <div class="input_top">\n            <b><%=lang("币种")%></b>\n        </div>\n        <div class="input_middle input_margin_select uppercase" flag="filter">\n            <span action="changeFilter" data-filter="<%=base%>"><%=base%><i></i></span><span action="changeFilter" data-filter="<%=quote%>"><%=quote%><i></i></span>\n        </div>\n\n    </div>\n    <div class="dia_input">\n        <div class="input_top">\n            <b><%=lang("数量")%></b>\n            <p class="avail_able">\n                <%=lang("可转")%> <i flag="ava" class="uppercase">---</i>\n                <i class="hb_icon_tip" flag="tips">\n                    <em><%=lang("杠杆账户的风险率高于200%部分的资金可转出")%></em>\n                </i>\n            </p>\n        </div>\n        <div class="input_middle">\n            <input class="input_text" type="text" pro_name="pro_dia_amount" maxlength="20">\n            <span class="input_text_right tio_all_in"><em class="uppercase" flag="inputFlag"><%=currency%></em> <s></s><b action="allIn"><%=lang("全部")%></b></span>\n        </div>\n\n    </div>\n</div>'
    },
    scaR: function(e, t) {
        e.exports = '<div class="input_select size_full <%=!data?\'select_loading\':\'\'%>" tabindex="0">\n    <div class="select_label">\n        <input type="text" name="<%= name||\'select\' %>" data-datatype="*" data-msg-null="<%=lang[\'msgNull\']||\'null\'%>" data-msg-error="<%=lang[\'msgError\']||\'error\'%>" disabled="disabled" />\n        <span class="select_output" data-output="output"></span>\n        \n    </div>\n    <div class="select_option">\n        <%\n        var _li;\n        if(data){\n        for(var i=0; i < data.length;i++){\n            _li = data[i]||{};\n            if(!_li.key){\n                continue;\n            }\n        %>\n        <p class="<%=_li.type%>" data-option=\'{"key":"<%=_li.key%>","value":"<%=_li.value%>","info":"<%=_li.info%>"}\' data-option-type="<%=_li.type%>">\n            <span class="key"><%=_li[\'key\']%></span>\n            <%if(!config.hideInfo){%>\n            <span class="info"><%=_li[\'info\']%></span>\n            <%}%>\n        </p>\n        <%\n        }}\n        %>\n    </div>\n</div>'
    },
    tr5V: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        l(n("RmBv"));
        var a = l(n("Xxxe")),
        i = l(n("dtkG")),
        o = n("cnkX"),
        r = n("f8yD");
        function l(e) {
            return e && e.__esModule ? e: {
            default:
                e
            }
        }
        t.
    default = function(e) {
            var t = e || {},
            n = new o.Entity(i.
        default),
            l = !0,
            s = (0, a.
        default)(),
            c = t.point || 5,
            u = n.querySelector(".progress"),
            d = [];
            return s.bindCallback("fn1",
            function(e, t) {
                var a = e / (100 / (c - 1));
                a = a > c - 1 ? c - 1 : a,
                u.style.width = e + "%",
                s.num = e,
                1 * e ? r.dom.addClass(n, "focus") : r.dom.removeClass(n, "focus"),
                d.forEach(function(e, t) {
                    d[t].className = t <= a ? "point cur": "point"
                })
            }),
            l || r.dom.addClass(n, "overflew"),
            t.class && r.dom.addClass(n, t.class),
            function() {
                for (var e = void 0,
                t = void 0,
                a = 0; a < c; a++)(e = document.createElement("i")).className = "point",
                t = 100 / (c - 1) * a,
                l && a === c - 1 ? e.style.right = 0 : (e.style.left = t + "%", e.style.transform = "translateX(" + -t + "%)"),
                e.setAttribute("data-point", t),
                d.push(e),
                n.appendChild(e)
            } (),
            {
                Drag: s,
                Init: function(e, t) {
                    e && (e.appendChild(n), t || (s.init(n, 1), r.Event.add(window, "resize",
                    function(e) {
                        s.resetPos(s.num, !0)
                    }), r.Event.add(n, "click",
                    function(e) {
                        var t = r.Event.target(e),
                        n = (0, r.attFather)(t, "data-point");
                        n && s.redrag(n.attr, "point_event")
                    }), r.Event.add(n, "keyup",
                    function(e) {
                        switch (e.which) {
                        case 37:
                            s.num--,
                            s.redrag(s.num, "keyup");
                            break;
                        case 39:
                            s.num++,
                            s.redrag(s.num, "keyup");
                            break;
                        default:
                            return
                        }
                    })))
                },
                Then: s.bindCallback
            }
        }
    },
    tvIj: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        n("dFMP");
        var a = c(n("vw3a")),
        i = n("gLaJ"),
        o = n("f8yD"),
        r = n("aVmh"),
        l = n("RxF2"),
        s = n("zcHd");
        function c(e) {
            return e && e.__esModule ? e: {
            default:
                e
            }
        }
        var u = new(c(n("5nIp")).
    default),
        d = new s.Toast,
        p = void 0,
        m = (0, o.Lang)(),
        f = (0, o.SplitTemplate)(a.
    default),
        g = void 0,
        v = void 0,
        _ = void 0,
        y = void 0,
        b = void 0,
        h = void 0,
        k = {};
        t.
    default = function() {
            var e = {};
            function t(t) {
                var n = o.Event.target(t),
                a = (0, o.attFather)(n, "action"); (0, o.attFather)(n, "stop") && o.Event.stop(t),
                a && e[a.attr] && e[a.attr]()
            }
            function n(e) {
                if (!h) if (u.Hide(), "submit" == e.type) {
                    if (!b.value) return u.Show(b, m.getLang("请先输入数量"));
                    h = 1,
                    (0, l.repayMargin)({
                        path: {
                            "order-id": g.order.id
                        },
                        data: {
                            amount: b.value
                        }
                    }).then(function(e) {
                        var t = e.data;
                        return h = 0,
                        "ok" === t.status ? (b.value = "", p.Close(), g.success && g.success(e), d.Show(m.getLang("操作成功"))) : d.Error(t["err-msg"])
                    })
                } else "open" == e.type ? o.Event.add(document, "mousewheel", a) : "close" == e.type && o.Event.remove(document, "mousewheel", a)
            }
            function a(e) {
                o.Event.stop(e)
            }
            return (0, o.J)(function() {
                this.allIn = function() {
                    var e = Math.min(1 * k[g.order.currency], (0, r.add)(1 * g.order["loan-balance"], 1 * g.order["interest-balance"]));
                    b.value = (0, o.Num)(e, "8"),
                    o.Event.trigger(b, "input")
                }
            },
            e),
            {
                open: function e(t) {
                    y ? (t && t(), p.Open()) : setTimeout(function() {
                        e(t)
                    },
                    100)
                },
                title: function(e, t) {
                    return m._keys(t),
                    m.getLang("归还借贷")
                },
                construct: function(e) {
                    h = 0,
                    e.order = JSON.parse(e.order),
                    g = e,
                    m._keys(e.lang),
                    v = {
                        cash: k,
                        lang: m.getLang,
                        add: r.add,
                        order: e.order,
                        symbols: STORE.symbolDataObj[e.order.symbol]["symbol-name"],
                        page: {
                            title: e.title
                        },
                        btn: {
                            cancel: m.getLang("取消"),
                            submit: m.getLang("确定")
                        }
                    },
                    p = p || new i.Dialog({
                        html: (0, o.TmpL)((0, i.dialogMix)(f.html).html, v)
                    }),
                    (0, l.marginBalance)({
                        params: {
                            symbol: g.order.symbol
                        }
                    }).then(function(e) {
                        var t = e.data;
                        "ok" === t.status &&
                        function(e) {
                            e ? e.list.forEach(function(e) {
                                k[e.currency] = "trade" === e.type ? e.balance: k[e.currency]
                            }) : (k[g.quote] = 0, k[g.base] = 0),
                            y = 1,
                            p.dialog.innerHTML = (0, o.TmpL)((0, i.dialogMix)(f.html).fc, v),
                            b = p.dialog.querySelector('input[flag="amt"]'),
                            o.Event.add(b, "input",
                            function() {
                                b.value = (0, o.FixValue)(b.value, 8)
                            })
                        } (t.data[0])
                    }),
                    !_ && o.Event.add(p.dialog, "click", t),
                    _ = 1,
                    p.callback(n)
                }
            }
        } ()
    },
    vw3a: function(e, t) {
        e.exports = '<div class="repay_content">\n    <div class="dia_input">\n        <div class="input_top">\n           <%=lang("杠杆账户")%>\n        </div>\n        <div class="input_middle">\n            <input class="input_text font_16 uppercase" type="text" disabled="disabled" value="<%=symbols%>">\n        </div>\n    </div>\n    <div class="dia_input">\n        <div class="input_top">\n            <%=lang("应还数量")%>\n        </div>\n        <div class="input_middle">\n            <p class="font_24"><%=Num(add(order["loan-balance"]*1 , order["interest-balance"]*1),"8")%> <em class="uppercase"><%=order.currency%></em></p>\n        </div>\n    </div>\n    <div class="dia_input">\n        <div class="left_amount">\n            <div class="input_top">\n                <%=lang("借贷数量")%>\n                <em class="uppercase"><%=Num(order["loan-balance"],"8")%> <%=order.currency%></em>\n            </div>\n        </div>\n        <div class="left_amount">\n            <div class="input_top">\n                <%=lang("利息")%>\n                <em class="uppercase"><%=Num(order["interest-balance"],"8")%> <%=order.currency%></em>\n            </div>\n        </div>\n    </div>\n    <div class="dia_input">\n        <div class="input_top">\n            <b><%=lang("归还数量")%></b>\n            <p class="avail_able">\n                <%=lang("可用")%> <%=Num(cash[order.currency],STORE.currencyDataObj[order.currency]["show-precision"])%> <em class="uppercase"><%=order.currency%></em>\n            </p>\n        </div>\n        <div class="input_middle">\n            <input flag="amt" class="input_text" type="text">\n            <span class="input_text_right tio_all_in"><em class="uppercase"><%=order.currency%></em> <s></s><b action="allIn"><%=lang("全部")%></b></span>\n        </div>\n    </div>\n</div>'
    },
    "wI/V": function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.
    default = function(e) {
            var t = this,
            n = e || {};
            return n.countTime = n.countTime || 60,
            t.option = n,
            t.countTime = n.countTime,
            t.count = n.countTime,
            t.RemainTime = function() {
                t.ClearRemainTime(),
                t.count--,
                t.Callback && t.Callback(t.count),
                t.count <= 0 ? t.Reset() : t.SetRemainTime = setTimeout(t.RemainTime, 1e3)
            },
            t.Reset = function() {
                t.count = n.countTime,
                t.ClearRemainTime(),
                t.Callback && t.Callback( - 1)
            },
            t.ClearRemainTime = function() {
                clearTimeout(t.SetRemainTime),
                t.SetRemainTime = null
            },
            t
        }
    },
    xkox: function(e, t) {
        e.exports = '<div class="credits_confirm">\n    <div block="content"></div>\n</div>\n<block name="transfer_out">\n\n    <div class="dia_input credit_detail">\n        <div class="detail_in">\n            <div class="input_top">\n                <%= lang(\'对方UID\') %>\n                <em><%=data["face-uid"]%></em>\n            </div>\n        </div>\n        <div class="detail_in">\n            <div class="input_top">\n                <%= lang(\'对方账号\') %>\n                <em><%=data["face-account"]%></em>\n            </div>\n        </div>\n        <div class="detail_in">\n            <div class="input_top">\n                <%= lang(\'转让点数\') %>\n                <em><%=Num(data["points"],8)%> <%= lang(\'点\') %></em>\n            </div>\n        </div>\n    </div>\n\n    <div class="dia_input">\n        <div class="input_top">\n            <%= lang(\'转让总价\') %>\n        </div>\n        <div class="input_middle">\n            <p class="total_amount"><%=Num(data["price"],STORE.currencyDataObj.usdt["show-precision"])%> <em class="uppercase">USDT</em><br/><b style="padding-left:0;"><%= lang(\'折合每点价格\') %>：<%=Num(data["price"]/data["points"],STORE.currencyDataObj.usdt["show-precision"])%> USDT/<%= lang(\'点\') %></b></p>\n        </div>\n    </div>\n</block>\n\n<block name="big_price">\n    <p>\n        <%= lang(\'转让单价过高\') %>：<%=Num(data.price,STORE.currencyDataObj.usdt["show-precision"])%> USDT/<%= lang(\'点\') %> <br>\n        <%= lang(\'确定以此价格转让？\') %>\n    </p>\n</block>\n\n<block name="dia_title">\n    <p class="title_tips"><%= lang(\'请仔细核对对方UID及对方账号，以免转错。\') %></p>\n</block>\n\n<block name="transfer_in">\n        <div class="dia_input">\n        <div class="input_top">\n            <%= lang(\'转让总价\') %>\n        </div>\n        <div class="input_middle">\n            <p class="total_amount"><%=Num(data["total-amount"],STORE.currencyDataObj.usdt["show-precision"])%> <em class="uppercase"><%=data.currency%></em><br/><b style="padding-left:0;"><%= lang(\'折合每点价格\') %>：<%=Num(data["total-amount"]/data["total-points"],STORE.currencyDataObj.usdt["show-precision"])%> USDT/ <%= lang(\'点\') %></b></p>\n        </div>\n    </div>\n    <div class="dia_input credit_detail">\n        <div class="detail_in">\n            <div class="input_top">\n                <%= lang(\'对方UID\') %>\n                <em><%=data.uid%></em>\n            </div>\n        </div>\n        <div class="detail_in">\n            <div class="input_top">\n                <%= lang(\'对方账号\') %>\n                <em><%=data.account || data.phone || data.email%></em>\n            </div>\n        </div>\n        <div class="detail_in">\n            <div class="input_top">\n                <%= lang(\'转让点数\') %>\n                <em><%=Num(data["total-points"],8)%>  <%= lang(\'点\') %></em>\n            </div>\n        </div>\n    </div>\n\n    <div class="dia_input">\n        <div class="input_top">\n            <%= lang(\'应付\') %>\n        </div>\n        <div class="input_middle">\n            <p class="total_amount"><%=Num(data["total-amount"],STORE.currencyDataObj.usdt["show-precision"])%> <em class="uppercase">USDT</em></p>\n            <p class="price_tips"> <%= lang(\'可用\') %> <%=Num(data["usdt-trade"],STORE.currencyDataObj.usdt["show-precision"])%> <em class="uppercase">USDT</em></p>\n        </div>\n    </div>\n</block>'
    },
    yAsf: function(e, t) {},
    yDQQ: function(e, t) {},
    ydDO: function(e, t) {},
    yjPH: function(e, t) {
        e.exports = '<div class="component_tips">\n    <i class="icon"></i>\n    <div class="msg"></div>\n</div>'
    },
    z2ds: function(e, t, n) {
        e.exports = '<div class="vip_content" block="content"></div>\n<block name="vip">\n    <div class="dia_input pb0_dia_input">\n        <div class="input_top">\n            <%= lang("开通等级") %>\n        </div>\n        <div class="input_middle" block="level"></div>\n    </div>\n    <div class="dia_input">\n        <div class="input_top">\n            <%= lang("开通时长") %>\n        </div>\n        <div class="input_middle vip_long" block="validity_days">\n        </div>\n    </div>\n    <div class="dia_input">\n        <div class="input_top"><%= lang("应付") %></div>\n        <div class="input_middle">\n            <p class="total_amount" block="amount">---</p>\n            <p><%= lang("可用") %> <i block="tradeht">---</i> HT <a target="_blank" href="<%=localStorage.root%>ht/intro_get/"><%= lang("获取HT") %></a> </p>\n        </div>\n    </div>\n    <div class="dia_input">\n        <div class="input_top">\n            <%= lang("验证") %>\n        </div>\n        <div class="input_middle">\n            <div class="ali_captcha" id="ali_captcha"></div>\n        </div>\n    </div>\n</block>\n<block name="level">\n    <ul class="vip_type">\n        <li class="cur">\n            <span><%=lang(data[level || 0]["level-display-name"])%></span>\n            <em><%= lang("交易手续费率") %> <%=lang(\n                (localStorage.lang == "zh-cn" || localStorage.lang == "zh-hk") ? \n                    data[level || 0]["fee-discount-rate"]*10 : \n                    (100-Num(data[level || 0]["fee-discount-rate"]*100,0))\n                )%><%= lang("折") %></em>\n        </li>\n        <%for(var i = 0, l = data.length; i < l; i++){%>\n        <li <%if(level == i){%>class="cur"<%}%> action="selectLevel" data-level="<%=i%>">\n            <span><%=lang(data[i]["level-display-name"])%></span>\n            <em><%= lang("交易手续费率") %><%=lang(\n                (localStorage.lang == "zh-cn" || localStorage.lang == "zh-hk") ? \n                    data[i]["fee-discount-rate"]*10 : \n                    (100-Num(data[i]["fee-discount-rate"]*100,0))+\'% \'\n                )%><%= lang("折") %></em>\n        </li>\n        <% } %>\n        <li class="select_other"><a href="" action="showAllLevel" stop="stop"><%= lang("选择其他等级") %></a></li>\n    </ul>\n</block>\n<block name="validity_days">\n    <%for(var i = 0, l = data.length; i < l; i++){%>\n    <label <%if(i == monthIndex){%>class="cur"<%}%>>\n    <span action="selectMonth" data-month-index="<%=i%>"><%=data[i]["number-of-month"]%> <%= lang(\'个月\') + (+data[i]["number-of-month"] > 1 ? (\n            localStorage.lang == "en-us" ?  "s" : ""\n        ) : \'\') %></span>\n    </label>\n    <% } %>\n</block>\n<block name="loading">\n    <div style="text-align: center;height:50px;line-height:50px;"><img class="dia_wd_address_loading" style="width:32px;" src="' + n("TVPb") + '"/></div>\n</block>\n<block name="prolongVip">\n    <div class="dia_input pb0_dia_input">\n        <div class="input_top">\n            <%= lang("当前等级") %>\n        </div>\n        <div class="input_middle">\n            <p class="total_amount" block="level">---</p>\n        </div>\n    </div>\n    <div class="dia_input">\n        <div class="input_top">\n            <%= lang("续费时长") %>\n        </div>\n        <div class="input_middle vip_long" block="validity_days"></div>\n    </div>\n\n\n    <div class="dia_input">\n        <div class="input_top">\n            <%= lang("应付") %>\n        </div>\n        <div class="input_middle">\n            <p class="total_amount" block="amount">---</p>\n            <p><%= lang("可用") %> <i block="tradeht">---</i> HT <a target="_blank" href="<%=localStorage.root%>ht/intro_get/"><%= lang("获取HT") %></a> </p>\n        </div>\n    </div>\n    <div class="dia_input">\n        <div class="input_top">\n            <%= lang("验证") %>\n        </div>\n        <div class="input_middle">\n            <div class="ali_captcha" id="ali_captcha"></div>\n        </div>\n    </div>\n</block>\n\n<block name="dia_title_vip_more">\n    <p class="title_tips"><%= lang("续费后VIP等级不变，到期日自动延长") %></p>\n</block>\n\n<block name="dia_title_vip_levelup">\n    <p class="title_tips"><%= lang("升级后会员到期日不变，升级立即生效") %></p>\n</block>\n\n\n<block name="upgradeLevel">\n    <ul class="vip_type vip_type2">\n        <li class="cur">\n            <span><%=lang(data[level || 0]["level-display-name"])%></span>\n            <em><%= lang("交易手续费率") %><%=lang(\n                (localStorage.lang == "zh-cn" || localStorage.lang == "zh-hk") ? \n                    data[level || 0]["fee-discount-rate"]*10 : \n                    (100-Num(data[level || 0]["fee-discount-rate"]*100,0))+\'% \'\n                )%><%= lang("折") %></em>\n        </li>\n        <li class="replace_to"></li>\n        <li class="cur">\n            <span><%=lang(data[targetLevel || 0]["level-display-name"])%></span>\n            <em><%= lang("交易手续费率") %><%=lang(\n                (localStorage.lang == "zh-cn" || localStorage.lang == "zh-hk") ? \n                    data[targetLevel || 0]["fee-discount-rate"]*10 : \n                    (100-Num(data[targetLevel || 0]["fee-discount-rate"]*100,0))+\'% \'\n                )%><%= lang("折") %></em>\n        </li>\n        <%\n            for(var i = startLevel, l = data.length; i < l; i++){\n        %>\n        <li <%if(targetLevel == i){%>class="cur"<%}%> action="selectLevel" data-level="<%=i%>">\n            <span><%=lang(data[i]["level-display-name"])%></span>\n            <em><%= lang("交易手续费率") %><%=lang(\n                (localStorage.lang == "zh-cn" || localStorage.lang == "zh-hk") ? \n                    data[i]["fee-discount-rate"]*10 : \n                    (100-Num(data[i]["fee-discount-rate"]*100,0))+\'% \'\n                )%><%= lang("折") %></em>\n        </li>\n        <% } \n            if(l - startLevel > 1){%>\n        <li class="select_other"><a href="" action="showAllOtherLevel" stop="stop"><%= lang("选择其他等级") %></a></li>\n        <%}else{%>\n        <li></li>\n        <%}%>\n    </ul>\n</block>\n\n<block name="upgradeVip">\n\n    <div class="dia_input pb0_dia_input">\n        <div class="input_top level_target" block="level_title">\n            <em><%= lang("当前等级") %></em><%= lang("升级至") %>\n        </div>\n        <div class="input_middle" block="upgradeLevel"></div>\n    </div>\n\n\n    <div class="dia_input">\n        <div class="input_top price_tips">\n            <%= lang("需支付") %> <i class="hb_icon_tip"><em><%= lang("由于VIP等级价格不同，升级需补齐差价") %></em></i>\n        </div>\n        <div class="input_middle">\n            <p class="total_amount" block="amount">---</p>\n            <p><%= lang("可用") %> <i block="tradeht">---</i> HT <a target="_blank" href="<%=localStorage.root%>ht/intro_get/"><%= lang("获取HT") %></a> </p>\n        </div>\n    </div>\n    <div class="dia_input">\n        <div class="input_top">\n            <%= lang("验证") %>\n        </div>\n        <div class="input_middle">\n            <div class="ali_captcha" id="ali_captcha"></div>\n        </div>\n    </div>\n</block>'
    },
    zcHd: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.Toast = void 0,
        n("kH/+"),
        t.Toast = function() {
            var e = this;
            e.isInit = !1,
            e.Show = function(t, n, a) {
                e.isInit || e.CreateBox(),
                e.contentIn.innerHTML = t,
                e.AutoHide(n);
                var i = a || "ok";
                e.contentIcon.className = "ok" === i ? "hb_icon_toast_success": "hb_icon_toast_failed"
            },
            e.Error = function(t, n) {
                e.Show(t, n, "error")
            },
            e.Hide = function() {
                e.toastBox && (e.toastBox.remove ? e.toastBox.remove() : e.toastBox.parentNode.removeChild(e.toastBox), e.isInit = !1)
            },
            e.CreateBox = function() {
                var t = document.body;
                e.toastBox = document.createElement("div"),
                e.toastContent = document.createElement("div"),
                e.contentIn = document.createElement("p"),
                e.contentIcon = document.createElement("i"),
                e.toastBox.className = "com_toast",
                e.toastContent.className = "toast_content",
                e.toastContent.appendChild(e.contentIcon),
                e.toastContent.appendChild(e.contentIn),
                e.toastBox.appendChild(e.toastContent),
                t.appendChild(e.toastBox),
                e.InitEvent(),
                e.isInit = !0
            },
            e.AutoHide = function(t) {
                e.autoHide && clearTimeout(e.autoHide),
                e.autoHide = setTimeout(function() {
                    e.Hide()
                },
                t || 5e3)
            },
            e.InitEvent = function() {
                e.toastBox.onclick = function(t) {
                    "toast_close" === t.target.className && e.Hide()
                }
            }
        }
    }
},
[13]);