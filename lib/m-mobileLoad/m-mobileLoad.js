/**
 * 分页加载数据
 *
 * @Author: jaymz
 * @Date: 2017/7/10
 */
(function ($) {
    var opts;
    $.fn.MobileLoad = function (option) {

        if (typeof option == "string") {
            return $.fn.MobileLoad.methods[option](this);
        }
        var def = {
            debug: false, //调试模式
            url: '',//服务器地址
            model: '',//模型
            pageSize: 10,//分页大小
            pageIndex: 1,//当前页码
            total: 0, // 数据量
            isOver: false, // 是否已经结束
            isOneShow: true,///是否第一次执行
            initNoData: '',//第一次没有数据的时候
            noData: '',//没有数据时显示的内容
            query: {}, // 加载数据的参数
            isLoading: false, // 是否开启加载动画
            onLoadStart: function() {
                $.loading();
            },
            onLoadFinish: function() {
                $.loading();
            },
            queryParams: function () {//额外查询参数
                return {}
            },
            onLoad: function(e,opts) {
                if (opts.debug) {
                    console.log('onLoad: 加载数据');
                    console.log(opts.query);
                }
                $.ajax({
                    url: opts.url,
                    data: opts.query,
                    method: 'post',
                    dataType: 'json',
                    success: function(res) {
                        if (opts.debug) {
                           console.log(res);
                        }
                        opts.onLoadSuccess(e,opts,res);
                        opts.render(e,opts,res);
                    },
                    error: function() {
                        opts.onLoadError(e,opts);
                    }
                })
            },
            onBeforeLoad: function(e,opts) {
                if (opts.debug) {
                    console.log('onBeforeLoad: 加载数据前');
                }
                opts.query.offset = (opts.pageIndex-1)*opts.pageSize;
                opts.query.limit = opts.pageSize;
                if (opts.isLoading) {
                    opts.onLoadStart();
                }
            },
            onLoadSuccess: function(e,opts,data) {
                if (opts.debug) {
                    console.log('onLoadSuccess: 加载数据成功');
                }
                opts.total = data.total;
                if (opts.pageIndex == 2) {
                    opts.isOneShow = false;
                }
                if (opts.total > opts.pageIndex*opts.pageSize) {                        
                    opts.pageIndex ++;
                } else {
                    opts.isOver = true;
                }
                if (opts.isLoading) {
                    opts.onLoadFinish();
                }
            },
            onLoadError: function(e,opts) {
                if (opts.debug) {
                    console.log('onLoadError: 加载数据失败');
                }               
            },
            render: function (e,opts,data) { 
                if (opts.debug) {
                    console.log('render: 数据渲染');
                }
                e.append(template(opts.model,data));
                if (opts.isOver) {
                    if (opts.isOneShow) {
                        if (opts.initNoData) {
                            e.append(opts.initNoData);
                        }
                    } else {
                        if (opts.noData) {
                            e.append(opts.noData);
                        }
                    }
                }
            },
            onLoadOver: function(e,opts) {
                if (opts.debug) {
                    console.log('onLoadOver: 没有数据可以加载了');
                }
            }
        }
        opts = $.extend(def, option);

        var self = $(this);

        $(window).scroll(function () {
            var totalheight = Math.ceil($(window).height()) + Math.ceil($(window).scrollTop());
            if ($(document).height() <= totalheight) {
                if (opts.isOver == false) {
                    self.MobileLoad('load');
                } else {
                    opts.onLoadOver(self,opts);
                }

            }
        });
        self.MobileLoad('init');
        return self;
    }
    $.fn.MobileLoad.methods = {
        init: function (_this) {
            
            opts.query = opts.queryParams();
            _this.MobileLoad('load');
        },
        load: function (_this) {

            opts.onBeforeLoad(_this,opts);
            opts.onLoad(_this,opts);
        },
        reLoad: function (_this) {
            opts.pageIndex = 1;
            opts.isOver = false;
            opts.isOneShow = true;
            _this.html("");
            _this.MobileLoad('load');
        }
    }
})(jQuery);
