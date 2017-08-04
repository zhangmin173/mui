/**
 * 选项卡
 *
 * @Author: jaymz
 * @Date: 2017/7/10
 */
(function ($) {
    var opts;
    $.fn.waterfall = function (option) {

        if (typeof option == "string") {
            return $.fn.waterfall.methods[option](this);
        }
        var def = {
            thisID: '', //当前对象的ID
            itemClass: '', //子容器类名
            gutter: 10, // 瀑布流间距
            colNum: 2, //瀑布流列数
            colWidth: 0, //瀑布流每列的宽度
            colLeft: [], //瀑布流每列的left值
            colHeight: [], //瀑布流每列的高度
        }
        opts = $.extend(def, option);
        opts.thisID = $(this).attr("id");
        
        // 初始化 
        opts.colWidth = ($(this).width() - (opts.colNum-1)*opts.gutter)/opts.colNum;
        for (var i = 0; i < opts.colNum; i++) {
            opts.colLeft[i] = i*(opts.colWidth+opts.gutter);
            opts.colHeight[i] = 0;
        }

        // 布局
        $("#" + opts.thisID).waterfall('fall');
        
    }
    $.fn.waterfall.methods = {
        fall: function (jq) {
            var itemObj = $("#" + opts.thisID).find('.'+opts.itemClass),
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
        }
    }
})(jQuery);
