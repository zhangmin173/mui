if ("undefined"==typeof jQuery) throw new Error("丢失jQuery库文件");

$(function(){
	$.extend({
		// 页面初始化
		init: function() {
			$.rem();
		},
		rem: function() {
			var docW = $(window).width(),
				minW = 320,
				baseW = 375,
				maxW = 640,
				fontSize = 20;
			console.log(docW);
			if (docW >= minW && docW <= maxW) {
				fontSize *= docW/baseW;
			} else if (docW < minW) {
				fontSize = 20;
			} else {
				fontSize *= 35;
			}
			$('html').css('fontSize', fontSize);
		},
		// 控制页面的共有部分
		h5show: function(options) {
			var opts = $.extend({},{
				navShow: true,
				menuShow: true,
				copyShow: true,
			},options);
			if (opts.navShow == false) {
				$('#j-nav').hide();
			} else {
				$('body').addClass('with-nav-top');

				$("#j-nav").headroom({
                    "tolerance": 5,
                    "offset": 50,
                    "classes": {
                        "initial": "nav-animated",
                        "pinned": "nav-slideDown",
                        "unpinned": "nav-slideUp"
                    }
                });
			}
			if (opts.menuShow == false) {
				$('#j-menu').hide();
			} else {
				$('body').addClass('with-menu-bottom');
			}
			if (opts.copyShow == false) {
				$('#j-copy').hide();
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