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
				maxW = 640,
				fontSize = 20;
			console.log(docW);
			if (docW >= minW && docW <= maxW) {
				fontSize *= docW/minW;
			} else if (docW < minW) {
				fontSize = 20;
			} else {
				fontSize *= maxW/minW
			}
			$('html').css('fontSize', fontSize);
		},
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
		loading: function() {
			var loading = '<div class="loading loading-circle"><span></span><span></span><span></span></div>';

			if ($('.loading').size()) {
				console.log('加载完成');
				$('.loading').remove();
			} else {
				console.log('正在加载');
				$('body').append(loading);
			}
		}
	});
	$.init();
});