/**
 * 无限加载
 * @author  张敏
 * @time 2017-08-12
 */
(function($) {
    var $window = $(window),
        pluginName = 'WaterFall',
        defaults = {
            debug: false,
            itemClass: "waterfall-item",
            spaceX: 10,
            spaceY: 10,
            colNum: 2,
            resizeable: false,
            isFadeIn: true,
            onFallAfter: function() {

            }
        };

    function WaterFall(element, options) {
        this.$element = $(element);
        this.opts = $.extend(true, {}, defaults, options);
        this.colHeightArray = [];
        this.colLeftArray = [];

        this._init();
    }

    WaterFall.prototype = {
        constructor: WaterFall,

        _init: function () {
            var _this = this;

            _this.colWidth = (_this.$element.width() - (_this.opts.colNum+1)*_this.opts.spaceX)/_this.opts.colNum;
            for (var i = 0; i < this.opts.colNum; i++) {
                _this.colHeightArray[i] = 0;
                _this.colLeftArray[i] = i*(_this.colWidth+_this.opts.spaceX)+_this.opts.spaceX;
            }
            this.items = [];
            this.index = 0;
            _this._positionAll();
        },
        _positionAll: function() {
            var _this = this;

            var $item = _this.$element.find('.' + _this.opts.itemClass),
                minHeight,
                minIndex;

            $item.width(_this.colWidth);
            if (_this.opts.debug) {
                console.log('瀑布流开始布局');
            }
            $item.each(function(index) {
                // 封装每个dom
                _this._attrToData($(this),_this.colHeightArray);

                minHeight = Math.min.apply(null, _this.colHeightArray);
                minIndex = $.inArray(minHeight, _this.colHeightArray);

                if (_this.opts.debug) {
                    console.log(_this.colHeightArray);
                }
                $(this).css({
                    position: 'absolute',
                    top: _this.colHeightArray[minIndex],
                    left: _this.colLeftArray[minIndex]
                });

                _this.colHeightArray[minIndex] += $(this).outerHeight() + _this.opts.spaceY;
            });
            if (_this.opts.debug) {
                console.log('onFallAfter: 瀑布流布局结束');
            }
            _this.opts.onFallAfter();
            $item.removeClass(_this.opts.itemClass);

            _this.$element.css("height", Math.max.apply(null, _this.colHeightArray));
        },
        _attrToData: function(dom,colHeight) {
            var _this = this;

            var obj = {},
                ch = [];

            obj.dom = dom;
            for (var i = 0; i < colHeight.length; i++) {
                ch[i] = colHeight[i];
            }
            obj.colHeight = ch;
            _this.items[_this.index] = obj;
            _this.index ++;
        },
        fall: function() {
            var _this = this;

            _this._positionAll();
        },
        reFresh: function() {
            var _this = this;

            
            _this._init();
        },
        remove: function(index) {
            var _this = this;

            if (_this.opts.debug) {
                console.log('删除第--' + index + '--个元素');
            }
            var item = _this.items[index],
                $dom = item.dom;
            $dom.remove();
            _this._reFall(index);
        },
        _reFall: function(index) {
            var _this = this;

            if (_this.opts.debug) {
                console.log('重新布局,从第--' + index + '--个元素开始');
                console.log(_this.items);
            }
            _this.index = 0;

            var items = _this.items,
                item = _this.items[index],
                minHeight,
                minIndex,
                $thisItem;

            _this.items = [];
            _this.colHeightArray = item.colHeight;
            
            for (var i = 0,j = 0,len = items.length-1; i < len; i++) {
                
                if (i < index) {
                    _this._attrToData(items[i].dom,items[i].colHeight);
                } else {
                    j = i + 1;
                    $thisItem = items[j].dom;

                    _this._attrToData($thisItem,_this.colHeightArray);
                    minHeight = Math.min.apply(null, _this.colHeightArray);
                    minIndex = $.inArray(minHeight, _this.colHeightArray);

                    if (_this.opts.debug) {
                        console.log(_this.colHeightArray);
                    }
                    $thisItem.css({
                        top: _this.colHeightArray[minIndex],
                        left: _this.colLeftArray[minIndex]
                    });

                    _this.colHeightArray[minIndex] += $thisItem.outerHeight() + _this.opts.spaceY;                    
                }
            }
            if (_this.opts.debug) {
                console.log('布局结束');
                console.log(_this.items);
            }
            _this.$element.css("height", Math.max.apply(null, _this.colHeightArray));
        }
    }

    if ( typeof module != 'undefined' && module.exports ) {
        module.exports = WaterFall;
    } else if ( typeof define == 'function' && define.amd ) {
            define( function () { return WaterFall; } );
    } else {
        window.WaterFall = WaterFall;
    }

    $.fn.WaterFall = function(options) {
        var waterFall = new WaterFall(this,options);
        return waterFall;
    }
})(jQuery);