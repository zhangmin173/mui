/**
 * 分页加载数据
 *
 * @Author: jaymz
 * @Date: 2017/7/10
 */
(function ($) {
    var opts;
    $.fn.scrollLoad = function (option) {

        if (typeof option == "string") {
            return $.fn.scrollLoad.methods[option](this);
        }
        var def = {
            url: '',//服务器地址
            model: '',//模型
            thisID: '',//当前对象的ID
            pageSize: 10,//分页大小
            pageIndex: 1,//当前页码
            total: 0,//数据总数
            isOneShow: true,///是否第一次执行
            initNoData: '暂无相关信息',//第一次没有数据的时候
            noData: '没有查到数据!',//没有数据时显示的内容
            queryParams: function () {//额外查询参数
                return {}
            },
            onLoadSuccess: function (data) { //数据加载成功触发

            },
            onBeforeLoad: function (data) {//数据加载前触发

            }
        }
        opts = $.extend(def, option);
        opts.thisID = $(this).attr("id");
        ///开启分页
        if (opts.pagination) {
            $(window).scroll(function () {
                var totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
                if ($(document).height() <= totalheight) {
                    if (opts.total > opts.pageIndex * opts.pageSize) {
                        opts.pageIndex++;
                        $("#" + opts.thisID).scrollLoad('load');
                    }
                    else {
                        if (opts.isOneShow == true) {
                            $("#" + opts.thisID).append(opts.noData);
                            opts.isOneShow = false;
                        }
                        else {

                        }
                    }
                }
            });
        }
        $(this).scrollLoad('load');
    }
    $.fn.MobilePageLoad.methods = {
        load: function (jq) {
            var data = opts.queryParams();
            data.offset = (opts.pageIndex-1)*opts.pageSize;//当前页码
            data.limit = opts.pageSize;//分页大小
            Post(opts.url, data, function (res) {
                // var res = eval('('+res+')');
                opts.onBeforeLoad(res);
                try {
                    if (res.total == undefined) {
                        laytpl($("#" + opts.model).html()).render(res, function (render) {
                            $(jq).html(render);
                        });
                        return;
                    }
                    opts.total = res.total;
                    if (res.total == 0) {//无数据情况
                        $(jq).html(opts.initNoData);
                    } else {
                        laytpl($("#" + opts.model).html()).render(res, function (render) {
                            $(jq).append(render);
                        });
                    }

                } catch (e) {
                    $(jq).html(opts.initNoData);
                }

                opts.onLoadSuccess(res);
            })
        },
        reLoad: function (jq) {
            opts.pageIndex = 1;
            $(jq).html("");
            $(jq).MobilePageLoad('load');
        }
    }
})(jQuery);
