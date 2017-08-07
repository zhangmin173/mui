/**
 * 选项卡
 *
 * @Author: jaymz
 * @Date: 2017/7/10
 */
(function ($) {
    var opts;
    $.fn.tab = function (option) {

        if (typeof option == "string") {
            return $.fn.tab.methods[option](this);
        }
        var def = {
            data: [], // 数据来源 支持数组函数或字符串
            isLoad: [], //是否已经加载
            thisID: '', //当前对象的ID
            cardId: 'j-card', //容器ID
            itemId: [], //内容ID
            nowId: 0, //当前ID
            showItemNum: 4, //默认显示的个数
            onInitSuccess: function (opt) { //初始化完成后执行

            },
        }
        opts = $.extend(def, option);
        opts.thisID = $(this).attr("id");

        // 计算li宽度
        var vw = $(this).width(),
            ulObj = $(this).find('ul'),
            liObj = ulObj.find('li'),
            cardObj = $('#'+opts.cardId).children('div'),
            liNum = liObj.length,
            liW = 0;

        if (liNum <= opts.showItemNum) {
            liW = vw/liNum;
        } else {
            liW = vw/opts.showItemNum;
        }
        liObj.width(liW);
        ulObj.width(liW*liNum);

        // 初始化
        liObj.each(function() {
            var index = $(this).index();
            opts.isLoad[index] = false;
        })
        cardObj.each(function() {
            var index = $(this).index();
            opts.itemId[index] = opts.thisID+'-'+index;
            $(this).attr('id', opts.itemId[index]);
        })

        // 绑定事件
        liObj.on('click',function() {
            var index = $(this).index();
            liObj.removeClass('cur');
            $(this).addClass('cur');
            $('#'+opts.itemId[opts.nowId]).hide();
            $('#'+opts.itemId[index]).show();
            opts.nowId = index;
            $("#" + opts.thisID).tab('load');
        })
        $("#" + opts.thisID).tab('load');
    }
    $.fn.tab.methods = {
        load: function (jq) {
            if (opts.isLoad[opts.nowId]) { return;}
            if (typeof opts.data[opts.nowId]=='string') {
               $("#" + opts.itemId[opts.nowId]).append(opts.data[opts.nowId]);
            } else if($.isFunction(opts.data[opts.nowId])) {
                opts.data[opts.nowId](opts.itemId[opts.nowId]);
            } else {
                throw new Error('data format error');
            }

            opts.isLoad[opts.nowId] = true;
        },
        refresh: function() {
            opts.isLoad[opts.nowId] = false;
            $("#" + opts.thisID).tab('load');
        }
    }
})(jQuery);
