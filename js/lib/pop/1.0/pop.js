/**
 * 弹窗提示框.
 *
 * @Author: jaymz
 * @Date: 2017/7/10
 */
;(function ($) {
    $.pop = function(options) {
        var template = '<div class="m-pop">'+
                            '<div class="pop-overlay"></div>'+
                            '<div class="pop-body">'+
                                '<div class="pop-title js-pop-title"></div>'+
                                '<div class="pop-msg js-pop-msg"></div>'+
                                '<div class="pop-btns">'+
                                    '<button class="m-btn bg-default outlined js-pop-btnleft"></button>'+
                                    '<button class="m-btn bg-default outlined js-pop-btnmid"></button>'+
                                    '<button class="m-btn bg-primary js-pop-btnright"></button>'+
                                '</div>'+
                            '</div>'+
                        '</div>',
        defaultParams = {
            title: '温馨提醒',
            msg: '',
            btnLeft: false, //定义左侧按钮是否显示
            btnLeftText: '取消', //定义左侧按钮文本内容
            btnLeftFun: null, //定义左侧按钮的事件
            btnMid: false, //定义中间按钮是否显示
            btnMidText: '跳过', //定义中间按钮文本内容
            btnMidFun: null, //定义中间按钮的事件
            btnRight: true, //定义右侧按钮是否显示
            btnRightText: '确认', //定义右侧按钮文本内容
            btnRightFun: null, //定义右侧按钮的事件
            fadetype: 'popupFadeIn' //动画
        };
        var ops = $.extend({},defaultParams,options), //合并参数
            $temp = $(template); //创建pop对象
            $title = $temp.find('.js-pop-title'), //pop对象标题
            $msg = $temp.find('.js-pop-msg'), //pop对象文本
            $btnLeft = $temp.find('.js-pop-btnleft'), //pop对象左侧按钮
            $btnMid = $temp.find('.js-pop-btnmid'), //pop对象中间按钮
            $btnRight = $temp.find('.js-pop-btnright'); //pop对象右侧按钮
        //title和msg
        if (ops.title) {
            $title.text(ops.title);
        }
        if (ops.msg) {
            $msg.text(ops.msg);
        }        
        //左侧按钮
        if (ops.btnLeft) {
            $btnLeft.css('display','inline-block');
            $btnLeft.text(ops.btnLeftText);
            $btnLeft.on('click', function() {
                $temp.fadeOut();
                if (typeof ops.btnLeftFun == "function") {
                    ops.btnLeftFun();
                }
            });    
        }
        //中间按钮
        if (ops.btnMid) {
            $btnMid.css('display','inline-block');
            $btnMid.text(ops.btnMidText);
            $btnMid.on('click', function() {
                $temp.fadeOut();
                if (typeof ops.btnMidFun == "function") {
                    ops.btnMidFun();
                }
            });
        }
        //右侧按钮
        if (ops.btnRight) {
            $btnRight.css('display','inline-block');
            $btnRight.text(ops.btnRightText);
            $btnRight.on('click', function() {
                $temp.fadeOut();
                if (typeof ops.btnRightFun == "function") {
                    ops.btnRightFun();
                }
            });
        }       
        
        //插入文档前判断是否存在pop，存在则移除
        if ($('.m-pop').size()) {
            $('.m-pop').remove();
        }
        $temp.appendTo('body').fadeIn();
    }

    $.tip = function(msg) {
        var template = '<div class="m-pop">'+
                            '<div class="pop-overlay"></div>'+
                            '<div class="pop-body pop-tip">'+
                                '<div class="pop-msg js-pop-msg"></div>'+
                            '</div>'+
                        '</div>';

        var $temp = $(template), //创建popup对象
        $msg = $temp.find('.js-pop-msg'); //pop对象文本

        $msg.text(msg);

        //插入文档前判断是否存在pop，存在则移除
        if ($('.m-pop').size()) {
            $('.m-pop').remove();
        }
        $temp.appendTo('body').fadeIn().delay(1000).fadeOut();
    }

    $.show = function(tempId) {
        var template = '<div class="m-pop">'+
                            '<div class="pop-overlay"></div>'+
                            '<div class="pop-body">'+
                                '<span class="pop-close js-pop-close">X</span>'+
                                '<div class="pop-msg js-pop-msg"></div>'+
                            '</div>'+
                        '</div>';
        var $temp = $(template), //创建popup对象
            $msg = $temp.find('.js-pop-msg'), //pop对象容器
            $close = $temp.find('.js-pop-close'), //关闭
            $html = $('#' + tempId).html();
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