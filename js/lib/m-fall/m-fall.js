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
            url: '',//服务器地址
            model: '',//模型
            page: false, //分页形式
            pageSize: 10,//分页大小
            pageIndex: 1,//当前页码
            total: 0, // 数据量
            isOver: false, // 是否已经结束
            isOneShow: true,///是否第一次执行
            initNoData: '',//第一次没有数据的时候
            noData: '',//没有数据时显示的内容
            queryParams: function () {//额外查询参数
                return {}
            },
            onLoadSuccess: function (data) { //数据加载成功触发

            },
            onBeforeLoad: function () {//数据加载前触发

            },
            itemClass: 'fall-box', // 每一个容器class
            imgClass: 'fall-img', // 每一个容器内图片class
            gutter: 10, // 瀑布流间距
            colNum: 2, //瀑布流列数
            colWidth: 0, //瀑布流每列的宽度
            colLeft: [], //瀑布流每列的left值
            colHeight: [], //瀑布流每列的高度
            onSuccessFall: function() {

            }
        };
        opts = $.extend(def, options);

        var self = $(this);

        $(window).scroll(function () {
            var totalheight = Math.ceil($(window).height()) + Math.ceil($(window).scrollTop());
            if ($(document).height() <= totalheight) {
                if (opts.isOver == false) {
                    self.MFall('load');
                } else {

                }

            }
        });

        self.MFall('init');
        
        return self;
    }
    $.fn.MFall.methods = {
        init: function (_this) {
            opts.colWidth = (_this.width() - (opts.colNum-1)*opts.gutter)/opts.colNum;
            for (var i = 0; i < opts.colNum; i++) {
                opts.colLeft[i] = i*(opts.colWidth+opts.gutter);
                opts.colHeight[i] = 0;
            }

            _this.MFall('load');
        },
        load: function(_this) {

            var data = opts.queryParams();
            if (opts.page) {
                data.pageIndex = opts.pageIndex;
                data.pageSize = opts.pageSize;
            } else {
                data.offset = (opts.pageIndex-1)*opts.pageSize;
                data.limit = opts.pageSize;
            }

            opts.onBeforeLoad();

            $.ajax({
                url: opts.url,
                type: 'get',
                dataType: 'json',
                data: data
            })
            .done(function(res) {
                console.log(res);

                if (res.total) {
                   opts.total = res.total; 
                }

                if (opts.pageIndex == 2) {
                    opts.isOneShow = false;
                }

                if (opts.page) {
                    if (opts.total >= opts.pageIndex*opts.pageSize) {
                        opts.pageIndex ++;
                        
                        var html = template(opts.model,res);
                        _this.append(html);
                        _this.MFall('fall');

                        opts.onLoadSuccess(res);
                    } else {
                        opts.isOver = true;
                        if (opts.isOneShow) {
                            _this.append(opts.initNoData);
                        } else {
                            _this.append(opts.noData);
                        }
                    }
                } else {
                    if (res.data && res.data.length) {
                        opts.pageIndex ++;
                        
                        var html = template(opts.model,res);
                        _this.append(html);
                        _this.MFall('fall');
                        
                        opts.onLoadSuccess(res);
                    } else {
                        opts.isOver = true;
                        if (opts.isOneShow) {
                            _this.append(opts.initNoData);
                        } else {
                            _this.append(opts.noData);
                        }
                    }
                }
                
            })
            .fail(function() {
                console.log("error");
            })

        },
        fall: function(_this) {

            var itemObj = _this.find('.'+opts.itemClass),
                imgObj = itemObj.find('.'+opts.imgClass),
                imgNum = imgObj.length;
                itemObj.css('width', opts.colWidth + 'px');

            imgObj.load(function() {
                imgNum--;
                console.log(imgNum);
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
                    _this.find('.'+opts.itemClass).removeClass(opts.itemClass);
                    setParentHeight();
                    opts.onSuccessFall();
                }
            })

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
        },
        reLoad: function (_this) {
            opts.pageIndex = 1;
            opts.isOver = false;
            opts.isOneShow = true;
            _this.html("");
            _this.MFall('init');
        }
    }
})(jQuery);
