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

    $.init();
}(jQuery);
