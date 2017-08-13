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
            ajaxCallback: null
        };

    function WaterFall(element, options) {
        this.$element = $(element);
        this.opts = $.extend(true, {}, defaults, options);
        this.colHeightArray = [];
        this.colLeftArray = [];
        this.colWidth = (this.$element.width() - (this.opts.colNum+1)*this.opts.spaceX)/this.opts.colNum;
        for (var i = 0; i < this.opts.colNum; i++) {
            this.colHeightArray[i] = 0;
            this.colLeftArray[i] = i*(this.colWidth+this.opts.spaceX)+this.opts.spaceX;
        }
        this.refresh = this.prototype._refresh();

        this._init();
    }

    WaterFall.prototype = {
        constructor: WaterFall,

        _init: function () {
            var _this = this;

            _this._positionAll();
        },
        _positionAll: function() {
            var _this = this;

            var $item = _this.$element.find('.' + _this.opts.itemClass),
                minHeight,
                minIndex;

            $item.width(_this.colWidth);
            $item.each(function(index) {
                minHeight = Math.min.apply(null, _this.colHeightArray);
                minIndex = $.inArray(minHeight, _this.colHeightArray);

                $(this).css({
                    position: 'absolute',
                    top: _this.colHeightArray[minIndex],
                    left: _this.colLeftArray[index%2]
                });

                _this.colHeightArray[minIndex] += $(this).outerHeight() + _this.opts.spaceY;

            });

            _this.$element.css("height", Math.max.apply(null, _this.colHeightArray));
            return _this;
        },
        _refresh: function() {
            var _this = this;

            _this._positionAll();
        }
    }

    $.fn[pluginName] = function (options) {
        this.each(function() {
            if(!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new WaterFall(this, options));
            }
        });

        return this;
    }
})(jQuery);