/**
 * 无限加载
 * @author  张敏
 * @time 2017-08-12
 */
;(function($,window) {
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
            onLoadBefore: function (e) {//数据加载前
                $.loading();
            },
            onLoadSuccess: function (e,d) { //数据加载成功
                if (d.data.length <= 0) {
                    e.isOver = true;
                }
            },
            onLoadFail: function (e,d) { //数据加载失败
                if (e.opts.errorData) {
                    e.$element.append(e.opts.errorData);
                }
            },
            onLoadComplete: function (e,d) { //数据加载完成
                $.loading();
            },
            onLoadOver: function(e) {

            },
            onRender: function(e,d) {
                var html = template(e.opts.model,d);
                e.$element.append(html);
            }
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
                console.log('onLoadBefore: 数据加载前');
                console.log(_this);
            }
            _this.opts.onLoadBefore(_this);

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
                _this._onLoadSuccess(res);
                _this.opts.onLoadSuccess(_this,res);
                if (_this.isOver == false) {
                    _this.opts.pageIndex++;
                    _this.opts.onRender(_this,res);
                } else {
                    _this._onNoDataRender(res);
                }
                _this.isLoading = false;
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
                    } else if (_this.isOver) {
                        if (_this.opts.debug) {
                            console.log('onLoadOver: 已经结束');
                        }
                        _this.opts.onLoadOver(_this);
                    }
                }
            });
        },
        _onLoadSuccess: function(d) {
            var _this = this;

            _this.total = d.total;
            if (_this.opts.pageIndex > 1) {
                _this.isOneShow = false;
            }
        },
        _onNoDataRender: function(d) {
            var _this = this;

            if (_this.isOneShow && _this.opts.initNoData) {
                _this.$element.append(_this.opts.initNoData);
            } else if (_this.isOneShow == false && _this.opts.noData) {
                _this.$element.append(_this.opts.noData);
            }
        },
        reLoad: function() {
            var _this = this;

            _this.$element.html('');
            $('body').scrollTop(0);
            _this.opts.pageIndex = 1;
            _this.isLoading = false;
            _this.isOneShow = true;
            _this.isOver = false;
            _this.total = 0;
           _this._init();
        }
    }

    if ( typeof module != 'undefined' && module.exports ) {
        module.exports = MobileLoad;
    } else if ( typeof define == 'function' && define.amd ) {
            define( function () { return MobileLoad; } );
    } else {
        window.MobileLoad = MobileLoad;
    }

    $.fn.MobileLoad = function(options) {
        var mobileLoad = new MobileLoad(this,options);
        return mobileLoad;
    }
})(jQuery,window);