/**
 * 弹窗提示框.
 *
 * @Author: jaymz
 * @Date: 2017/7/10
 */
;(function ($) {
    $.pop = function(options,a,b,c) {
        var dom_hd = '<div class="m-pop">'+
                            '<div class="m-pop-overlay"></div>'+
                            '<div class="m-pop-box">'+
                                '<div class="pop-hd">'+
                                    '<span class="pop-title">信息</span>'+
                                    '<span class="pop-close">&times;</span>'+
                                '</div>'+
                                '<div class="pop-bd"></div>',
            dom_ft =        '</div>'+
                        '</div>',
            dom_all = '',
        defaultParams = {
            title: '',
            msg: '',
            btns: []
        };
        var opts = $.extend({},defaultParams,options); //合并参数

        dom_all += dom_hd;
        if (opts.btns.length) {
            dom_all += '<div class="pop-btns">';
        }
        for (var i = 0; i < opts.btns.length; i++) {
            dom_all += '<button class="pop-btn">'+opts.btns[i]+'</button>';
        }
        if (opts.btns.length) {
            dom_all += '</div>';
        }
        dom_all += dom_ft;
        
        var $temp = $(dom_all);

        if (opts.title) {
            $temp.find('.pop-title').html(opts.title);
        }
        if (opts.msg) {
            $temp.find('.pop-bd').html(opts.msg);
        }

        $temp.find('.pop-close').on('click', function(event) {
            $temp.remove();
        });

        var btns = $temp.find('.pop-btn');

        btns.eq(0).on('click', function(event) {
            a();
            $temp.remove();
        });
        btns.eq(1).on('click', function(event) {
            b();
            $temp.remove();
        });
        btns.eq(2).on('click', function(event) {
            c();
            $temp.remove();
        });

        $temp.appendTo('body');   
    }

    $.tip = function(msg,type) {
        var template = '<div class="m-tip" style="display:none;">'+msg+'<span class="tip-close">&times;</span></div>';

        var $temp = $(template); //创建popup对象
        if (type !== 'undefined') {
             $temp.addClass('success');
        }
        //插入文档前判断是否存在pop，存在则移除
        if ($('.m-tip').size()) {
            $('.m-tip').remove();
        }
        $temp.appendTo('body').slideToggle().delay(1000).slideToggle();
    }

    $.show = function(tempId) {
        var template = '<div class="m-pop">'+
                            '<div class="m-pop-overlay"></div>'+
                            '<div class="m-pop-box">'+
                                '<span class="pop-show-close js-pop-close">&times;</span>'+
                                '<div class="pop-bd js-pop-msg"></div>'+
                            '</div>'+
                        '</div>';
        var $temp = $(template), //创建popup对象
            $msg = $temp.find('.js-pop-msg'), //pop对象容器
            $close = $temp.find('.js-pop-close'), //关闭
            $html = $('#'+tempId).html();
        $msg.html($html);
        //插入文档前判断是否存在pop，存在则移除
        if ($('.m-pop').size()) {
            $('.m-pop').remove();
        }
        $temp.appendTo('body').fadeIn();

        $close.on('click',function() {
            $temp.fadeOut();
        })
    }

    $.popClose = function() {
        $('.m-pop').fadeOut();
    }
})(window.jQuery);