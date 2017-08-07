/**
 * 评论插件.
 *
 * @Author: jaymz
 * @Date: 2017/7/24
 */
;(function ($) {
    $.comment = function(options) {
        var template = '<div class="m-comment">'+
                            '<div class="m-comment-overlay"></div>'+
                            '<div class="m-comment-box">'+
                                '<div class="m-comment-hd">'+
                                    '<a class="m-comment-btn m-comment-quxiao" href="javascript:;">取消</a>'+
                                    '<a class="m-comment-btn m-comment-sub" href="javascript:;">发送</a>'+
                                    '<span class="m-comment-title"></span>'+
                                '</div>'+
                                '<div class="m-comment-bd">'+
                                    '<textarea class="m-comment-text" rows="5" placeholder=""></textarea>'+
                                '</div>'+
                            '</div>'+
                        '</div>',
        defaultParams = {
            title: '评论',
            text: '点赞都是套路',
            cancel: null,
            sub: null //
        };
        var opts = $.extend({},defaultParams,options), //合并参数
            $temp = $(template); //创建pop对象
            $title = $temp.find('.m-comment-title'), //标题
            $text = $temp.find('.m-comment-text'), //文本
            $quxiao = $temp.find('.m-comment-quxiao'),
            $sub = $temp.find('.m-comment-sub');

        //title和msg
        if (opts.title) {
            $title.text(opts.title);
        }
        if (opts.text) {
            $text.attr('placeholder', opts.text);
        }        
        //取消按钮
        $quxiao.on('click', function(event) {
            if (typeof opts.cancel == "function") {
                opts.cancel($text);
            }
            $('.m-comment').fadeOut();
        });
        //发送按钮
        $sub.on('click', function(event) {
            if (typeof opts.sub == "function") {
                opts.sub($text);
            }
            $('.m-comment').fadeOut();
        });

        //插入文档前判断是否存在，存在则移除
        if ($('.m-comment').size()) {
            $('.m-comment').remove();
        }
        $temp.appendTo('body').fadeIn();
    }

})(window.jQuery);