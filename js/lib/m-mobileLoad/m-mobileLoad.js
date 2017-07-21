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

                }

            }
        });
        self.MobileLoad('init');
        return self;
    }
    $.fn.MobileLoad.methods = {
        init: function (_this) {
            _this.MobileLoad('load');
        },
        load: function (_this) {

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
        reLoad: function (_this) {
            opts.pageIndex = 1;
            opts.isOver = false;
            opts.isOneShow = true;
            _this.html("");
            _this.MobileLoad('load');
        }
    }
})(jQuery);
