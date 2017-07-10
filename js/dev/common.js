if (typeof jQuery == "undefined") {
    throw new Error("丢失jQuery库文件");
}
+function($) {
    //微信接口总配置
    var jsApiList = ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'onVoicePlayEnd', 'uploadVoice', 'downloadVoice', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'translateVoice', 'getNetworkType', 'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu', 'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'closeWindow', 'scanQRCode', 'chooseWXPay', 'openProductSpecificView', 'addCard', 'chooseCard', 'openCard'];

    // if (_global && _global.jsapi_config) {
    //     var debug = false;
    //     wx.config({
    //         debug: debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //         appId: _global.jsapi_config.appId, // 必填，公众号的唯一标识
    //         timestamp: _global.jsapi_config.timestamp, // 必填，生成签名的时间戳
    //         nonceStr: _global.jsapi_config.nonceStr, // 必填，生成签名的随机串
    //         signature: _global.jsapi_config.signature, // 必填，签名，见附录1
    //         jsApiList: jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    //     });
    // }

    $.extend({
        init: function() {
            this.rem();
        },
        getUrlPara: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        },
        wxPay: function(para, success, fail) {
            wx.chooseWXPay({
                timestamp: para.timeStamp, // 支付签名时间戳
                nonceStr: para.nonceStr, // 支付签名随机串
                package: para.package, // 订单详情扩展字符串，详见附录5
                signType: para.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                paySign: para.paySign, // 支付签名，详见附录5
                success: function() {
                    success();
                },
                fail: function() {
                    fail();
                },
                cancel: function() {
                    fail();
                },
                complete: function() {

                }
            });
        },
        h5Show: function(options) {
            var opts = $.extend({}, {
                navShow: false,
                menuShow: false,
                footerLinkShow: false,
            }, options);

            if (opts.navShow) {
                $('#js-nav').show();
            } else {
                $('#js-nav').hide();
            }
            if (opts.menuShow) {
                $('#js-menu').show();
            } else {
                $('#js-menu').hide();
            }
            if (opts.footerLinkShow) {
                $('#js-footerLink').show();
            } else {
                $('#js-footerLink').hide();
            }
        },
        wxShare: function(data) {
            data = $.extend({
                title: '', // 分享标题
                desc: '', // 分享描述
                link: '', // 分享链接
                imgUrl: '', // 分享图标
                type: 'link', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                trigger: function() {},
                complete: function() {},
                success: function() {

                },
                fail: function() {}
            }, data);
            //调微信分享接口
            wx.ready(function() {
                var BaseData = {
                        title: data.title, // 分享标题
                        link: data.link, // 分享链接
                        imgUrl: data.imgUrl, // 分享图标
                        trigger: data.trigger,
                        complete: data.complete,
                        success: data.success,
                        fail: data.fail
                    }
                    //分享给朋友
                wx.onMenuShareAppMessage(
                    $.extend(BaseData, {
                        desc: data.desc,
                        type: data.type,
                        dataUrl: data.dataUrl
                    })
                );
                //分享给朋友圈
                wx.onMenuShareTimeline(
                    BaseData
                );
                //分享到QQ
                wx.onMenuShareQQ(
                    $.extend(BaseData, {
                        desc: data.desc
                    })
                );
                //分享到腾讯微博
                wx.onMenuShareWeibo(
                    $.extend(BaseData, {
                        desc: data.desc
                    })
                );
            });
        },
        random: function(min,max) {
            return Math.round(Math.random()*(max-min)+min);
        },
        fetch: function(callback) {
            console.log(_global);
            (typeof callback === 'function') ? callback(_global): null;
        },
        // ajax请求
        mAjax: function(url, data, call) {
            datas = $.extend({
                app_key: _global.app_key,
                access_token: _global.access_token,
                site_id: _global.site_info.id,
                }, data);
            console.log(datas);
            $.ajax({
                type: 'post',
                url: url,
                dataType: 'json',
                data: datas
            }).done(function(res) {
                call(res);
            }).fail(function() {
                alert('url:' + 接口报错);
            });
        },
        // 跨域请求
        jsonP: function(url, data, call) {
            datas = $.extend({
                app_key: _global.app_key,
                access_token: _global.access_token,
                site_id: _global.site_info.id,
                }, data);
            $.ajax({
                type: 'post',
                url: _global.url.api + url,
                dataType: 'json',
                data: datas
            }).done(function(res) {
                call(res);
            }).fail(function() {
                alert('url:' + 接口报错);
            });
        },
        // 模板引擎
        render: function(temp,data,call) {
            laytpl(temp).render(data, function (render) {
                call(render);
            });
        },
        rem: function() {
            this.resize(function() {
                var vw = $(window).width();
                var fs = 10;
                if (vw > 540) {
                    vw = 540;
                }
                fs *= (vw/320);
                $('html').css('font-size', fs + 'px');
            });
        },
        log: function(msg) {
            console.log(msg);
        },
        // 常用正则
        regCheck: {
            def: function(reg, str) {
                return reg.test(str);
            },
            userName: function(str) {
                var reg = /^[_A-Za-z0-9]{6,16}$/;
                return reg.test(str);
            },
            psw: function(str) {
                var reg = /^[\w~!@#$%^&*()_+{}:"<>?\-=[\];\',.\/A-Za-z0-9]{6,16}$/;
                return reg.test(str);
            },
            email: function(str) {
                var reg = /^([a-zA-Z0-9]|[._])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
                return reg.test(str);
            },
            telNum: function(str) {
                var reg = /^((0\d{2,3}-\d{7,8})|(1[3|5|4|7|8][0-9]\d{8}))$/;
                return reg.test(str);
            },
            mobile: function(str) {
                var reg = /^(1[3|4|5|7|8][0-9]\d{8})$/;
                return reg.test(str);
            },
            verify: function(str) {
                var reg = /^\d{6}$/;
                return reg.test(str);
            },
            CN: function(str) {
                var reg = /^[\u4E00-\u9FA5]+$/;
                return reg.test(str);
            },
            carsh: function(str) {
                return /^\d*\.?\d+$/.test(str);
            }
        },
        // 浏览器尺寸改变函数
        resize: function(fn) {
            fn();
            $(window).on('resize', function() {
                fn();
            });
        },
        // 格式化字段
        format: {
            mobile: function(phoneNum) {
                return phoneNum.substring(0, 3) + "****" + phoneNum.substring(7);
            }
        },
        // 回到顶部
        toTop: function(options) {
            var opts = $.extend({}, {
                pdBottom: '10px',
            }, options);

            $('body').append(opts.str);
            var obj = $('#toTop');
            obj.hide();
            $(window).on('scroll', function() {
                if ($(window).scrollTop() >= 200) {
                    obj.fadeIn();
                } else {
                    obj.stop(true).fadeOut();
                }
            });
            obj.css({ bottom: opts.pdBottom });
            obj.on('click', function() {
                $('html, body').animate({
                    scrollTop: 0
                }, 500);
                return false;
            });
        },
    });

    $.fn.extend({
        // 普通滚动加载
        mobilePageLoad: function(options) {
            var defaults = {
                    url: '',//数据源
                    tempId: '', //模板Id
                    obj: '', //容器对象
                    pageSize: 10, //分页大小
                    pageIndex: 1, //当前页码
                    isOne: true, ///是否加载
                    total: 0, //数据总数
                    initNoData: '暂无相关信息', //首次加载无数据
                    noData: '没有更多信息',// 最后加载无数据
                    queryParams: function () {//额外查询参数
                        return {}
                    },
                    obj: '',//当前对象
                    onLoadSuccess: function (data) { //数据加载成功触发

                    },
                    onBeforeLoad: function (data) {//数据加载前触发

                    }
                },
                opts = $.extend({}, defaults, options);
            opts.obj = $(this);

            $(window).scroll(function () {
                var totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
                if ($(document).height() <= totalheight) {
                    if (opts.total > opts.pageIndex * opts.pageSize) {
                        opts.pageIndex++;
                        load();
                    }  else {
                        if (opts.isOne == true) {
                            opts.obj.append(opts.noData);
                            opts.isOne = false;
                        } else {

                        }
                    }
                }
            });
            load();

            function load() {
                var data = opts.queryParams();
                data.offset = (opts.pageIndex-1)*opts.pageSize; //当前页码
                data.limit = opts.pageSize; //分页大小
                $.mAjax(opts.url, data, function (res) {
                    console.log(res);

                    opts.onBeforeLoad(res); //加载前
                    try {
                        opts.total = res.total;
                        if (res.total == 0) { //无数据情况
                            opts.obj.html(opts.initNoData);
                        } else {
                            $.render($('#'+opts.tempId).html(),res.data,function(s) {
                                opts.obj.append(s);
                            })
                        }

                    } catch (e) {
                        opts.obj.html(opts.initNoData);
                    }
                    opts.onLoadSuccess(res); //加载后
                })
            }
        },
        // 瀑布流滚动加载
        waterfall: function(options) {
            var defaults = {
                    url: '',//数据源
                    tempId: '', //模板Id
                    tipId: 'js-nodata', // 无内容容器
                    obj: '', //容器对象
                    pageSize: 10, //分页大小
                    pageIndex: 1, //当前页码
                    isOne: true, ///是否加载
                    total: 0, //数据总数
                    initNoData: '暂无相关信息', //首次加载无数据
                    noData: '已经没有了',// 最后加载无数据
                    imgLoad: true, // 是否启动图片加载判断
                    imgClass: 'js-load-img', // 图片class标志
                    itemClass: 'js-load', // 瀑布流布局的class标志
                    gutter: 10, // 瀑布流间距
                    colNum: 2, //瀑布流列数
                    colWidth: 0, //瀑布流每列的宽度
                    colLeft: [], //瀑布流每列的left值
                    colHeight: [], //瀑布流每列的高度
                    queryParams: function () { //额外查询参数
                        return {}
                    },
                    onLoadSuccess: function (data) { //数据加载后触发

                    },
                    onBeforeLoad: function (data) { //数据加载前触发

                    }
                },
                opts = $.extend({}, defaults, options);
            opts.obj = $(this);
            opts.colWidth = ($(this).width() - (opts.colNum-1)*opts.gutter)/opts.colNum;
            for (var i = 0; i < opts.colNum; i++) {
                opts.colLeft[i] = i*(opts.colWidth+opts.gutter);
                opts.colHeight[i] = 0;
            }

            $(window).scroll(function () {
                var totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
                if ($(document).height() <= totalheight) {
                    if (opts.total > opts.pageIndex * opts.pageSize) {
                        opts.pageIndex++;
                        load();
                    }  else {
                        if (opts.isOne == true) {
                            $('#'+opts.tipId).append(opts.noData);
                            opts.isOne = false;
                        } else {

                        }
                    }
                }
            });
            load();
            // 加载数据
            function load() {
                var data = opts.queryParams();
                data.offset = (opts.pageIndex-1)*opts.pageSize; //当前页码
                data.limit = opts.pageSize; //分页大小
                console.log(data);
                $.mAjax(opts.url, data, function (res) {
                    console.log(res);

                    opts.onBeforeLoad(res); //加载前
                    try {
                        opts.total = res.total;
                        if (res.total == 0) { //无数据情况
                            opts.obj.html(opts.initNoData);
                        } else {
                            $.render($('#'+opts.tempId).html(),res.data,function(s) {
                                opts.obj.append(s);
                            })
                            fall();
                        }

                    } catch (e) {
                        opts.obj.html(opts.initNoData);
                    }
                    opts.onLoadSuccess(res); //加载后
                })
            }

            // 动态布局
            function fall() {
                var itemObj = opts.obj.find('.'+opts.itemClass),
                    imgObj = itemObj.find('.'+opts.imgClass),
                    imgNum = imgObj.length;
                itemObj.css('width', opts.colWidth + 'px');

                imgObj.load(function() {
                    $(this).parent('.'+opts.itemClass).removeClass(opts.itemClass);
                    imgNum--;
                    if (imgNum == 0) {
                        itemObj.each(function() {
                            var d = getMin(),
                                l = opts.colLeft[d.index],
                                t = d.min + opts.gutter,
                                h = $(this).height() + opts.gutter;
                            $(this).css({
                                left: l+'px',
                                top: t+'px'
                            });
                            opts.colHeight[d.index] += h;
                        });
                        setParentHeight();
                    }
                })
            }
            // 设置父级高度
            function setParentHeight() {
                opts.obj.height(Math.max.apply(null, opts.colHeight)+opts.gutter*2);
            }
            // 获取最小高度的列
            function getMin() {
                var value = Math.min.apply(null, opts.colHeight),
                    index = 0;
                for (var i = 0; i < opts.colHeight.length; i++) {
                    if (opts.colHeight[i] == value) {
                        index = i;
                        break;
                    }
                }
                return { min: value,index: index };
            }
        },
        // 图片滚动加载
        lazyLoad: function() {
            var here = this;
            var winHeight = parseFloat($(window).height());

            function showImg() {
                $(here).each(function() {
                    var imgH = $(this).height(),
                        topVal = $(this).get(0).getBoundingClientRect().top;
                        console.log($(this).index() + ':');
                        console.log($(this).get(0).getBoundingClientRect());
                    if (topVal < 200 && $(this).hasClass('lazy')) {
                        var _here = this;
                        var _img = new Image();
                        _img.src = $(_here).data('src');
                        $(_here).attr('data-src', 0);
                        $(_here).removeClass('lazy');
                        _img.onload = function() {
                            $(_here).hide().attr('src', _img.src).show();
                        }
                    }
                });
            }
            showImg();
            $(window).on('scroll', function() {
                showImg();
            });
        },
        // 选项卡
        tabCard: function(options) {
            var defaults = {
                    tabObj: '',
                    cardObj: '',
                    thisId: '',
                    url: [],
                    onLoadSuccess: function (data) { //数据加载后触发

                    },
                },
                opts = $.extend({}, defaults, options);
            opts.tabObj = $(this).find('.js-tab');
            opts.cardObj = $(this).find('.js-card');
            opts.thisId = $(this).attr('id');
            //初始化
            init();
            function init() {
                var tabCount = opts.tabObj.find('li').length, //选项卡按钮数量
                    tabWidth = opts.tabObj.width(), // 选项卡按钮总宽度
                    liWidth = 0; //选项卡按钮单个宽度
                console.log(tabWidth);
                // 配置宽度
                if (tabCount < 5) {
                    liWidth = parseInt(tabWidth / tabCount);
                } else {
                    liWidth = parseInt(tabWidth / 5);
                    opts.tabObj.find('ul').width(liWidth * tabCount);
                }

                opts.tabObj.find('li').width(liWidth);
                opts.tabObj.find('li').eq(0).addClass('active');
                opts.cardObj.find('.m-card').each(function(index, el) {
                    $(this).attr('id',opts.thisId + '-'+index);
                });
                $('#' + opts.thisId +'-0').addClass('active loaded');
                $('#' + opts.thisId +'-0').waterfall({
                    tempId: 'TempId',
                    url: opts.url[0],
                    onLoadSuccess: function (data) {
                        opts.onLoadSuccess(data);
                    },
                })
            }
            //切换
            switchCard();
            function switchCard() {
                opts.tabObj.find('li').on('click',function() {
                    $(this).addClass('active').siblings('li').removeClass('active');
                    var index = $(this).index();
                    opts.cardObj.find('.m-card').removeClass('active');
                    $('#' + opts.thisId +'-' +index).addClass('active');
                    opts.cardObj.animate({scrollTop:0}, '200');
                    renderCard(opts.thisId +'-' +index,index);
                });

            }
            // 数据渲染
            function renderCard(id,index) {
                var obj = $('#'+id);
                if (obj && obj.hasClass('loaded')) { return;}
                $('#'+id).addClass('loaded');
                $('#'+id).waterfall({
                    tempId: 'TempId',
                    url: opts.url[index],
                    onLoadSuccess: function (data) {
                        opts.onLoadSuccess(data);
                    },
                })
            }
        },
    });
    $.init();
}(jQuery);
