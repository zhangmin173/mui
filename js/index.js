function Index() {
    if (!(this instanceof Index)) {
        return new Index();
    }
    this.init();
}

Index.prototype = {
    api: 'ws://120.27.196.220:8686', //
    id: null, // 当前线程id
    userListBox: null,
    init: function() {
        var _this = this;

        _this.userListBox = $('#js-sidebar dl');

        _this.render();
        //_this.scrollInit('#j-scroll');
        //_this.msgConInit();
    },
    render: function(res) {
        var _this = this;

        _this.handle();

    },
    handle: function(res) {
        var _this = this;

        $('#j-sidebar').on('click','dt',function() {
            $(this).addClass('active').siblings('dt').removeClass('active');
            $(this).find('.tip').removeClass('active');
            $('#j-sidebar').find('.headimg').removeClass('ani-scale');
            $(this).find('.headimg').addClass('ani-scale');

            if ($(this).hasClass('loaded')) {
                // 没有加载过
                
            } else {
                // 已经加载过
            }
        })
        // var sideBar = new IScroll('#j-sidebar', {
        //  probeType: 3
        // });

        //sideBar.refresh();
        
        _this.uploadInit();
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
    msgConInit: function() {
        var h = $(window).height() - $('.dialog_hd').height()-150;
        console.log(h);
        $('.dialog-bd').height(h);
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
    webSokect: function() {
        var wsServer = 'ws://120.27.196.220:8686'; //服务器地址
        var websocket = new WebSocket(wsServer); //创建WebSocket对象

        console.log(websocket.readyState);//查看websocket当前状态
        websocket.onopen = function (evt) {
        //已经建立连接
        console.log('与服务端连接建立');
        };
        websocket.onclose = function (evt) {
        //已经关闭连接
        console.log('与服务端连接关闭');
        };
        websocket.onmessage = function (evt) {
        //收到服务器消息，使用evt.data提取
        $("#show").append("<p>"+evt.data+"</p>");
        console.log("^_^："+evt.data);
        };
        websocket.onerror = function (evt) {
        //产生异常
        console.log('连接异常');
        }; 

        $("#sendmsg").on('click',function(){
            var str = $("#test").val();
            websocket.send(str);
        })
    }
};

$(function() {
    new Index();
});
