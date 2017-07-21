function Index() {
    if (!(this instanceof Index)) {
        return new Index();
    }
    this.init();
}

Index.prototype = {
    init: function() {
        var _this = this;

        // 公共部分
        $.h5Show({
            navShow: true,
            menuShow: true,
            footerLinkShow: true,
            toTop: false,
        })
    },
    render: function(res) {
        var _this = this;

    },
    handle: function(res) {
        var _this = this;

    }
};

$(function() {
    new Index();
});
