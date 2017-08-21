if ("undefined"==typeof jQuery) throw new Error("丢失jQuery库文件");

// 开启测试
var debug = true;
var _global = { app_key: '123456', access_token: '789789'};

$(function(){
	// 微信接口总配置
    var jsApiList = ['openAddress','onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'onVoicePlayEnd', 'uploadVoice', 'downloadVoice', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'translateVoice', 'getNetworkType', 'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu', 'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'closeWindow', 'scanQRCode', 'chooseWXPay', 'openProductSpecificView', 'addCard', 'chooseCard', 'openCard'];
    if (_global && _global.jsapi_config) {
        wx.config({
            debug: debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: _global.jsapi_config.appId, // 必填，公众号的唯一标识
            timestamp: _global.jsapi_config.timestamp, // 必填，生成签名的时间戳
            nonceStr: _global.jsapi_config.nonceStr, // 必填，生成签名的随机串
            signature: _global.jsapi_config.signature, // 必填，签名，见附录1
            jsApiList: jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
    }
    // 数组增加del方法
    Array.prototype.del=function(index){  
        if(isNaN(index)||index>=this.length){  
            return false;  
        }  
        for(var i=0,n=0;i<this.length;i++){  
            if(this[i]!=this[index]){  
                this[n++]=this[i];  
            }  
        }  
        this.length-=1;  
    };

	$.extend({
		// 页面初始化
		init: function() {
			$.rem();
			// 模板设置
    		template.config('escape', false);
    		// 浏览器信息
    		_global.browser.agent = $.browser.agent();
    		_global.browser.system = $.browser.system();
    		if (debug) {
    			console.log(_global);
				console.log('环境：'+_global.browser.agent+' 系统：'+_global.browser.system+" 屏幕宽度："+_global.browser.width+" 根字体大小："+_global.browser.fontSize);
    		}
		},
		rem: function() {
			var docW = $(window).width(),
				minW = 320,
				baseW = 375,
				maxW = 640,
				fontSize = 20;
			if (docW >= minW && docW <= maxW) {
				fontSize *= docW/baseW;
			} else if (docW < minW) {
				fontSize = 16;
			} else {
				fontSize = 35;
			}
			var browser = {};
			browser.width = docW;
			browser.fontSize = fontSize;
			_global.browser = browser;
			$('html').css('fontSize', fontSize);
		},
        withNav: function(id) {
            $('body').addClass('with-nav-top');
            $(id).headroom({
                "tolerance": 5,
                "offset": 50,
                "classes": {
                    "initial": "nav-animated",
                    "pinned": "nav-slideDown",
                    "unpinned": "nav-slideUp"
                }
            });
        },
		// 控制页面的共有部分
		h5show: function(options) {
			var opts = $.extend({},{
				navShow: true,
				copyShow: true,
				topShow: false,
				menuShow: true,
			},options);
			if (opts.navShow == false) {
				$('#j-nav').hide();
			} else {
				$.withNav('#j-nav');
			}
			if (opts.copyShow == false) {
				$('#j-copy').hide();
			} else {
				if (opts.menuShow) {
                    $('body').addClass('with-menu-copy-bottom');
                } else {
                    $('body').addClass('with-copy-bottom');
                }
			}
			if (opts.menuShow == false) {
				$('#j-menu').hide();
			} else {
                if (opts.copyShow) {
                    $('body').addClass('with-menu-copy-bottom');
                } else {
                    $('body').addClass('with-menu-bottom');
                }
                $('#j-copy').css('paddingBottom', '2.25rem');
			}
			if (opts.topShow == false) {
				$('#j-top').hide();
			} else {
				var obj = $('#j-top');
                obj.hide();
                $(window).on('scroll', function() {
                    if ($(window).scrollTop() >= 200) {
                        obj.fadeIn();
                    } else {
                        obj.stop(true).fadeOut();
                    }
                });
                obj.on('click', function() {
                    $('html, body').animate({
                        scrollTop: 0
                    }, 500);
                    return false;
                });
			}
		},
		// 浏览器判断
		browser: {
            u: window.navigator.userAgent,
            type: function() {
                u = this.u.toLowerCase();
                if (u.indexOf("khtml") > -1 || u.indexOf("konqueror") > -1 || u.indexOf("applewebKit") > -1) {
                    var isChrome = u.indexOf("chrome") > -1;
                    var isSafari = u.indexOf("applewebKit") > -1 && !isChrome;
                }
                if (window.opr && u.indexOf('opr') > -1) {
                    return "Opera";
                } else if (isChrome) {
                    return "Chrome";
                } else if (isSafari) {
                    return "Safari";
                } else if (u.indexOf("firefox") > 0) {
                    return "Firefox";
                } else {
                    return "unknow";
                }
            },
            agent: function() {
                u = this.u.toLowerCase();
                var external = window.external;
                if (/msie/.test(u)) {
                    return "IE";
                } else if (u.indexOf("firefox") > 0) {
                    return "Firefox";
                } else if (u.indexOf('micromessenger') > -1) {
                    return 'weixin';
                } else if (u.indexOf("opr") > 0) {
                    return "Opera";
                } else if (u.indexOf('qqbrowser') > -1) {
                    return 'qq';
                } else if (u.indexOf('se 2.x') > -1) {
                    return 'sogou';
                } else if (u.indexOf('maxthon') > -1) {
                    return 'maxthon';
                } else if (u.indexOf('baiduboxapp') > -1) {
                    return 'baidu';
                } else if (u.indexOf('ucbrowser') > -1) {
                    return 'uc';
                } else if (window.chrome && external && 'LiebaoGetVersion' in external) {
                    return 'liebao';
                } else {
                    return 'unknow';
                }
            },
            //判断访问终端
            system: function() {
                u = this.u;
                if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
                    return 'Android';
                } else if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
                    return 'ios';
                } else {
                    return 'unknow';
                }
            }
        },
		// 加载动画
		loading: function() {
			var loading = '<div class="loading loading-circle"><span></span><span></span><span></span></div>';

			if ($('.loading').size()) {
				$('.loading').remove();
			} else {
				$('body').append(loading);
			}
		},
		// 网页转图片
		html2img: function(id,call) {
			html2canvas($(id),{
                useCORS: true,
                background: '#fff'
            }).then(function(canvas) {
                call(canvas.toDataURL("image/jpeg"));
            });
		},
		// 获取url参数
        getUrlPara: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        },
        // 获取微信地址
        wxAddress: function(success,fail) {
            wx.openAddress({
              success: function (res) {
                success(res);
              },
              cancel: function (res) {
                fail(res);
              },
              fail: function (res) {
                fail(res);
              }
            });
        },
        // 微信支付
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
        // 获取地理坐标
        wxLocation: function(success,fail) {
            wx.getLocation({
                type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    success(res);
                },
                cancel: function (res) {
                    fail(res);
                }
            });
        },
        // 微信分享
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
        mAjax: function(url, data, call,method) {
            var type = 'get';
            if (method) {
                type = method;
            }
            $.loading();
            datas = $.extend({
                app_key: _global.app_key,
                access_token: _global.access_token,
                }, data);
            console.log(datas);
            $.ajax({
                type: type,
                url: _global.url.api + url,
                dataType: 'json',
                data: datas
            }).done(function(res) {
                $.loading();
                call(res);
            }).fail(function(res) {
                console.log(res);
                $.tip('哎呀，服务器离家出走了');
            });
        },
        // 浏览器尺寸改变函数
        resize: function(fn) {
            fn();
            $(window).on('resize', function() {
                fn();
            });
        },
        // 表单数据转json便于提交
        form2Json: function(id) {
            var a = $(id).serializeArray();
            var d = {};
            $.each(a, function() {    
                if (d[this.name]) {    
                    if (!d[this.name].push) {    
                        d[this.name] = [d[this.name]];    
                    }    
                    d[this.name].push(this.value || '');    
                } else {    
                    d[this.name] = this.value || '';    
                }    
            });
            console.log(d);
            return d;
        },
        // 获取下拉框选中值
        getSelectVal: function(id) {
            return $(id + ' option:selected').val();
        },
        // 获取多选的值
        getCheckVal: function(name) {
            var obj = $('input[name="'+name+'"]:checked');
            var d = [];
            obj.each(function() {
                d.push($(this).val());
            });
            return d;
        },
        // 常用正则
        regCheck: {
            def: function(reg, str) {
                return reg.test(str);
            },
            email: function(str) {
                var reg = /^([a-zA-Z0-9]|[._])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
                return reg.test(str);
            },
            mobile: function(str) {
                var reg = /^(1[3|4|5|7|8][0-9]\d{8})$/;
                return reg.test(str);
            },
            CN: function(str) {
                var reg = /^[\u4E00-\u9FA5]+$/;
                return reg.test(str);
            },
            carsh: function(str) {
                return /^\d*\.?\d+$/.test(str);
            },
            num: function(str) {
                return /^\+?[1-9][0-9]*$/.test(str);
            }
        },
        // 格式化字段
        format: {
            mobile: function(phoneNum) {
                return phoneNum.substring(0, 3) + "****" + phoneNum.substring(7);
            }
        },
        // websokect
		webSokect: function() {
	        var wsServer = 'ws://120.27.196.220:8686'; //服务器地址
	        var websocket = new WebSocket(wsServer); //创建WebSocket对象

	        websocket.onopen = function (res) {
		        //与服务端连接建立
	        };
	        websocket.onclose = function (res) {
		        //与服务端连接关闭
	        };
	        websocket.onmessage = function (res) {
		        //收到服务器消息
	        };
	        websocket.onerror = function (res) {
	        	//产生异常
	        };

	        $("#sendmsg").on('click',function(){
	            var str = $("#test").val();
	            websocket.send(str);
	        })
	    }
	});
	$.init();
});