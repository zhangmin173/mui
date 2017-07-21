function NoteDetail() {
    if (!(this instanceof NoteDetail)) {
        return new NoteDetail();
    }
    this.init();
}

NoteDetail.prototype = {
    init: function() {
        var _this = this;

        // 公共部分
        $.h5Show({
            navShow: true,
            menuShow: false,
            footerLinkShow: true,
            toTop: false,
        })

        _this.render();
    },
    render: function() {
        var _this = this;

        $(".owl-carousel").owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            autoplayTimeout: 3000,
            //autoHeight: true
        });

    },
    handle: function(res) {
        var _this = this;

    }
};

$(function() {
    new NoteDetail();
});
