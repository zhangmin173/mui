function Index() {
    if (!(this instanceof Index)) {
        return new Index();
    }
    this.init();
}

Index.prototype = {
    init: function() {
        var _this = this;

        $.h5show({
            navShow: true,
            menuShow: true,
        })

        _this.render();
    },
    render: function(res) {
        var _this = this;

        var waterfall = $('#j-con').WaterFall({
                debug: true,
            });

        var a = $('#j-con').MobileLoad({
            debug: false,
            url: '/tp5/index/index/page',
            model: 'tpl-note',
            initNoData: '',
            noData: '',
            errorData: '',
            queryParams: function () {
                return { status: 1 }
            },
            onRender: function(e,d) {
                var html = template(e.opts.model,d);
                e.$element.append(html);
                e.$element.imagesLoaded().always(function(instance) {
                    waterfall.fall();
                }).progress(function(instance, image) {
                    if (image.isLoaded == false) {
                        image.img.src = '/mui/src/error.png';
                    }
                });
            }
        })

        $('#j-con').on('click','.note-del',function() {
            // a.reLoad();
            // waterfall.reFresh();
            var index = $(this).parents('.note').index();
            waterfall.remove(index);
        })

        _this.handle();

    },
    handle: function(res) {
        var _this = this;


    },
    uploadInit: function() {
        var _this = this;
        // 上传准备
        var uploader = WebUploader.create({
            auto: true, //开启自动上传
            fileVal: 'image',
            formData: {
                access_token:'',
                app_key: '',
            },
            swf: 'Uploader.swf',
            server: '/upload',
            pick: '#j-picker',
            // 只允许选择图片文件。
            accept: {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/jpg,image/jpeg,image/png'
            },
            method:'post',
        })
        // 开始上传
        uploader.on('startUpload', function(file) {
            //$.loadShow();
        });
        // 结束上传
        uploader.on('uploadFinished', function(file) {
            //$.loadOver();
        });
        // 上传成功
        uploader.on('uploadSuccess', function(file, res) {
            console.log(res);
        });
        // 上传失败
        uploader.on('uploadError', function(file, res) {
            console.log(res);
        });
    },
    scrollObj: null,
    scrollInit: function(id) {
        var _this = this;
        console.log($(window).height() - 350);
        $(id).height($(window).height() - 350-20);

        // _this.scrollObj = new IScroll(id, {
        //     mouseWheel: true,
        // });

        // _this.scrollObj.on('scrollStart',function() {

        // });
        // _this.scrollObj.on('scrollEnd',function() {
        //     if (_this.scrollObj.directionY > 0) {
        //         console.log('向上滚动');
        //     } else {
        //         console.log('向下滚动');
        //     }
        // });
    },
};

$(function() {
    new Index();
});
