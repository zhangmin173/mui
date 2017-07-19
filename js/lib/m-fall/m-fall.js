/**
 * 瀑布流动态布局
 *
 * @Author: jaymz
 * @Date: 2017/7/10
 */
(function ($) {
    var opts;
    $.fn.MFall = function (options) {

        if (typeof options == "string") {
            return $.fn.MFall.methods[options](this);
        }

        var def = {
            imgLoad: true, // 是否启动图片加载判断
            itemClass: 'fall-box', // 每一个容器class
            imgClass: 'fall-img', // 每一个容器内图片class
            gutter: 10, // 瀑布流间距
            colNum: 2, //瀑布流列数
            colWidth: 0, //瀑布流每列的宽度
            colLeft: [], //瀑布流每列的left值
            colHeight: [], //瀑布流每列的高度
        };
        opts = $.extend(def, options);

        var self = $(this);

        opts.colWidth = (self.width() - (opts.colNum-1)*opts.gutter)/opts.colNum;
        for (var i = 0; i < opts.colNum; i++) {
            opts.colLeft[i] = i*(opts.colWidth+opts.gutter);
            opts.colHeight[i] = 0;
        }

        self.MFall('init');
        
        return self;
    }
    $.fn.MFall.methods = {
        init: function (_this) {
            _this.MFall('load');
        },
        load: function(_this) {

            var itemObj = _this.find('.'+opts.itemClass),
                imgObj = itemObj.find('.'+opts.imgClass),
                imgNum = imgObj.length;
                itemObj.css('width', opts.colWidth + 'px');

            if (opts.imgLoad) {
                imgObj.load(function() {
                    console.log(imgNum);
                    imgNum--;
                    if (imgNum <= 0) {
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
                        console.log(itemObj);
                        _this.find('.'+opts.itemClass).removeClass(opts.itemClass);
                        setParentHeight();
                    }
                })

            } else {
                
            }

            // 设置父级高度
            function setParentHeight() {
                _this.height(Math.max.apply(null, opts.colHeight)+opts.gutter*2);
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
