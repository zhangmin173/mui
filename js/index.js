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
            topShow: true,
            menuShow: true,
        })

        _this.render();
    },
    render: function() {
        var _this = this;


        _this.handle();

    },
    handle: function() {
        var _this = this;

        $('body').on('click','#btn',function() {
            $('#j-main').prepend('<div style="margin-top: 100px;">'+Math.random()+'</div>');
        })
    }
};

$(function() {
    new Index();
});
