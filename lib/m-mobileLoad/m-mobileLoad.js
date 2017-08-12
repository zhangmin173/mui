/**
 * 无限加载
 * @author  张敏
 * @time 2017-08-12
 */
(function($) {
    var $window = $(window),
        pluginName = 'MobileLoad',
        defaults = {
            debug: false,
            url: '',
            model: '',
            initNoData: '',
            noData: '',
            errorData: '',
            pageIndex: 1,
            pageSize: 10,
            queryParams: function () {//额外查询参数
                return {}
            },
            onBeforeLoad: function (e) {//数据加载前
                $.loading();
            },
            onLoadSuccess: function (e,d) { //数据加载成功
                e.total = d.total;
                if (e.opts.pageIndex > 1) {
                    e.isOneShow = false;
                }
                if (d.data.length) {
                    var html = template('tpl-note',d);
                    e.$element.append(html);
                    e.opts.pageIndex++;
                } else {
                    e.isOver = true;
                    if (e.isOneShow) {
                        e.$element.append(e.opts.initNoData);
                    } else {
                        e.$element.append(e.opts.noData);
                    }
                }
                e.isLoading = false;
            },
            onLoadFail: function (e,d) { //数据加载失败
                e.$element.append(e.opts.errorData);
            }, 
            onLoadComplete: function (e,d) { //数据加载完成
                $.loading();
            },
        };

    function MobileLoad(element, options) {
        this.$element = $(element);
        this.opts = $.extend(true, {}, defaults, options);
        this.isLoading = false;
        this.isOneShow = true;
        this.isOver = false;
        this.total = 0;
        this.querys = this.opts.queryParams();
        this.querys.pageSize = this.opts.pageSize;
        this.querys.limit = this.opts.pageSize;

        this._init();
    }

    MobileLoad.prototype = {
        constructor: MobileLoad,

        _init: function () {
            var _this = this;

            _this._doLoad();

            _this._doScroll();
        },
        _doLoad: function() {
            var _this = this;
            _this.isLoading = true;

            _this.querys.pageIndex = _this.opts.pageIndex;
            _this.querys.offset = (_this.opts.pageIndex-1)*_this.opts.pageSize;

            if (_this.opts.debug) {
                console.log('开始加载第--' + _this.opts.pageIndex + '--页');
                console.log('onBeforeLoad: 数据加载前');
                console.log(_this);
            }
            _this.opts.onBeforeLoad(_this);

            $.ajax({
                url: _this.opts.url,
                type: 'post',
                dataType: 'json',
                data: _this.querys,
            })
            .done(function(res) {
                if (_this.opts.debug) {
                    console.log('onLoadSuccess: 数据加载成功');
                    console.log(res);
                }
                _this.opts.onLoadSuccess(_this,res);
            })
            .fail(function(res) {
                if (_this.opts.debug) {
                    console.log('onLoadFail: 数据加载失败');
                }
                _this.opts.onLoadFail(_this,res);
            })
            .always(function(res) {
                if (_this.opts.debug) {
                    console.log('onLoadComplete: 数据加载完成');
                }
                _this.opts.onLoadComplete(_this,res);
            });
            
        },
        _doScroll: function() {
            var _this = this;

            $(window).scroll(function () {
                var totalheight = Math.ceil($(window).height()) + Math.ceil($(window).scrollTop());
                if ($(document).height() <= totalheight) {
                    if (_this.isOver == false && _this.isLoading == false) {
                        if (_this.opts.debug) {
                            console.log('滚动加载触发');
                        }
                        _this._doLoad();
                    } else {

                    }
                }
            });
        }
    }

    $.fn[pluginName] = function (options) {
        this.each(function() {
            if(!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new MobileLoad(this, options));
            }
        });

        return this;
    }
})(jQuery);