function Index() {
    if (!(this instanceof Index)) {
        return new Index();
    }
    this.init();
}

Index.prototype = {
	initNoData: '',
	noData: '',
    init: function() {
        var _this = this;
        _this.initNoData = $('#tpl-initNoData').html();
        _this.noData = $('#tpl-noData').html();
        // 公共部分
        $.h5Show({
			navShow: true,
            menuShow: true,
            footerLinkShow: true,
            toTop: false,
		})
        
        _this.render();

    },
    render: function() {
        var _this = this;

        $('#js-note').MFall({
    		url: '/ugc/data/note.json',
    		model: 'tpl-note',
    		page: false,
    		initNoData: _this.initNoData,
    		noData: _this.noData,
    		onBeforeLoad: function() {
    			$.loadShow();
    		},
    		onSuccessFall: function() {
    			$.loadOver();
    		}
    	})
    },
    handle: function() {
        var _this = this;

    }
};

$(function() {
    new Index();
});
