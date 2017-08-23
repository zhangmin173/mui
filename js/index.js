function Index() {
    if (!(this instanceof Index)) {
        return new Index();
    }
    this.init();
}

Index.prototype = {
    w: null,
    init: function() {
        var _this = this;

        $.h5show({
            navShow: true,
            copyShow: true,
            topShow: false,
            menuShow: true,
        })

        _this.render();
    },
    render: function() {
        var _this = this;

        _this.w = $('#j-con').WaterFall();
        $('#j-con').MobileLoad({
            debug: debug,
            type: 'post',
            url: '/tp5/index/index/page',
            model: 'tpl-note',
            initNoData: _this.initNoData,
            noData: _this.noData,
            errorData: '',
            queryParams: function () {
                return { 
                    status: 1
                }
            },
            onRender: function(e,d) {
                var html = template(e.opts.model,d);
                e.$element.append(html);
                e.$element.imagesLoaded().always(function(instance) {
                    _this.w.fall();
                }).progress(function(instance, image) {
                    if (image.isLoaded == false) {
                        image.img.src = '/data/src/error.jpg';
                    }
                });
            }
        })
        _this.handle();

    },
    handle: function() {
        var _this = this;

        $('body').on('click','.note-del',function() {
            var i = $(this).parents('.note').index();
            _this.w.remove(i);
        })
    }
};

$(function() {
    new Index();
});
