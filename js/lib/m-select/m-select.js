(function (win,$) {

	function MSelect(level,data,options) {
		var defaultParams = {
            title: '选择标题', // 标题栏
            id: 'js-mselect', // 唯一识别
        };
        this.level = level;
        if (this.level === 1) {
			this.typeBox = 'm-select-one';
		}
		else if (this.level === 2) {
			this.typeBox = 'm-select-two';
		}
		else if (this.level === 3) {
			this.typeBox = 'm-select-three';
		}
        this.data = data;
        this.opts = $.extend({},defaultParams,options); //合并参数

        this.init();
	};

	MSelect.prototype = {
		// 初始化
		init: function() {
			this.scroll = new Array();
			this.initSelect();
			
		},
		// 初始化结构
		initSelect: function() {
			var self = this;
			var dom_hd = '<div class="m-select '+self.typeBox+'" id="'+self.opts.id+'">'+
							'<div class="m-select-box">'+
								'<div class="m-select-hd">'+
									'<a class="m-select-btn m-select-btn-l" href="javascrtp:;">取消</a>'+
									'<a class="m-select-btn m-select-btn-r" href="javascrtp:;">确定</a>'+
									'<span class="m-select-title">请选择</span>'+
								'</div>'+
								'<div class="m-select-bd">';

			var dom_bd = '<div class="m-select-area">'+
							'<ul>'+
							'</ul>'+
						'</div>';
								
			var dom_ft = '</div>'+
							'<div class="m-select-line m-select-line-t"></div>'+
							'<div class="m-select-line m-select-line-b"></div>'+
						'</div>'+
					'</div>';
			var all_html = '';
			all_html += dom_hd;
			for (var i = 0; i < self.level; i++) {
				self.scroll[i] = self.opts.id + '-' + i;
				all_html += '<div class="m-select-area" id="'+self.scroll[i]+'">';
				all_html += '<ul></ul></div>';
			}
			all_html += dom_ft;

			var temp = $(all_html);
			$('body').append(temp);

			self.oneLevelCon = $('#'+self.scroll[0]);
			self.twoLevelCon = $('#'+self.scroll[1]);
			self.threeLevelCon = $('#'+self.scroll[2]);

			self.oneLevelUlCon = self.oneLevelCon.find('ul');
			self.twoLevelUlCon = self.twoLevelCon.find('ul');
			self.threeLevelUlCon = self.threeLevelCon.find('ul');

			self.updateData(self.oneLevelUlCon,0);
			
			self.oneScroll = new IScroll('#'+self.scroll[0],{
				probeType: 3,
				bounce: false
			});

			var liList = self.oneLevelCon.find('li');
			self.oneScroll.on('scrollStart',function() {
				liList.each(function(index, el) {
					if ($(this).hasClass('at')) {
						$(this).removeClass('at');
					}
					if ($(this).hasClass('side1')) {
						$(this).removeClass('side1');
					}
					if ($(this).hasClass('side2')) {
						$(this).removeClass('side2');
					}
				});
			})
			self.oneScroll.on('scrollEnd',function() {
				var pa = Math.abs(this.y / 35);
				var plast = 1;
				var to = 0;
				if (Math.ceil(pa) === Math.round(pa)) {
					to = Math.ceil(pa) * 35;
					plast = Math.ceil(pa) + 3;
				} else {
					to = Math.floor(pa) * 35;
					plast = Math.floor(pa) + 3;
				}
				
				self.oneScroll.scrollTo(0, -to, 0);
				liList.eq(plast).addClass('at');
				liList.eq(plast+1).addClass('side1');
				liList.eq(plast+2).addClass('side2');
				liList.eq(plast-1).addClass('side1');
				liList.eq(plast-2).addClass('side2');

				self.updateData(self.twoLevelUlCon,1);
			})

		},
		updateData: function(obj,pid) {
			var self = this;

			var li = '<li></li><li></li><li></li>';
			for (var i = 0; i < self.data[pid].length; i++) {
				if (i == 0) {
					li += '<li class="at" data-id="'+self.data[pid][i].id+'">'+self.data[pid][i].name+'</li>';
				} else if(i == 1) {
					li += '<li class="side1" data-id="'+self.data[pid][i].id+'">'+self.data[pid][i].name+'</li>';
				} else if(i == 2) {
					li += '<li class="side2" data-id="'+self.data[pid][i].id+'">'+self.data[pid][i].name+'</li>';
				} else {
					li += '<li data-id="'+self.data[pid][i].id+'">'+self.data[pid][i].name+'</li>';
				}
			}
			li += '<li></li><li></li><li></li>';
			obj.html(li);
		}
	}

	// 暴露接口
	if (typeof module != 'undefined' && module.exports) {
		module.exports = MSelect;
	} else if (typeof define == 'function' && define.amd) {
		define(function() {
			return MSelect;
		});
	} else {
		window.MSelect = MSelect;
	}

})(window,jQuery);