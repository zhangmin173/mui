(function (win,$) {

    function Demo(options) {
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
            startLoad: function() {

            },
            onLoadSuccess: function (data) { //数据加载成功触发

            },
            onBeforeLoad: function () {//数据加载前触发

            }
        }
        this.opts = $.extend({},def,options); //合并参数
        // 为了更方便访问opts内的参数
        this.url = this.opts.url;
        this.model = this.opts.model;
        // 可执行方法对象
        this.fun = [];
        // 初始化
        this.init();
    };

    Demo.prototype = {
        // 初始化
        init: function() {
            var self = this;

            self.fun[0].uploadSuccess[0].call();
            $(window).scroll(function () {
                var totalheight = Math.ceil($(window).height()) + Math.ceil($(window).scrollTop());
                if ($(document).height() <= totalheight) {
                    if (self.opts.isOver == false) {
                        self.fun[0].uploadSuccess[0].call();
                    } else {

                    }

                }
            });

            console.log(self.fun);
        },
        on: function(name, callback) {
            var self = this;

            if ( !callback ) {
                return self;
            }
            self.fun[0] = {};
            self.fun[0][name] = [callback];

            console.log(self.fun[0].uploadSuccess[0])
            // self.fun[0].uploadSuccess[0].call();
            return self;
        },
    }

    // 暴露接口
    if (typeof module != 'undefined' && module.exports) {
        module.exports = Demo;
    } else if (typeof define == 'function' && define.amd) {
        define(function() {
            return Demo;
        });
    } else {
        window.Demo = Demo;
    }

})(window,jQuery);