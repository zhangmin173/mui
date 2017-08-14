;(function (win,$) {

	function MSelect(level,data,options) {
		var defaultParams = {
			debug: false,
            title: '选择标题', // 标题栏
            id: 'js-mselect', // 唯一识别
            relation: [0,0], // 关联性
            render: function(el) {
	            return '<li data-id="'+el.id+'" data-value="'+el.name+'">'+el.name+'</li>';    
	        }
        };
        this.opts = $.extend({},defaultParams,options); //合并参数
        // 确定几级选择
        this.level = level || 1;
        if (this.level === 1) {
			this.typeBox = 'm-select-one';
		}
		else if (this.level === 2) {
			this.typeBox = 'm-select-two';
		}
		else if (this.level === 3) {
			this.typeBox = 'm-select-three';
		}
		// 数据来源
		this.debug = this.opts.debug;
        this.data = data;
        // 关联
        this.oneTwoRelation = this.opts.relation[0];
		this.twoThreeRelation = this.opts.relation[1];
		// 回调
		this.callback = this.opts.callback;
		// 渲染
		this.render = this.opts.render;
		// 初始化
        this.init();
	};

	MSelect.prototype = {
		// 初始化
		init: function() {
			this.scroll = new Array();
			this.initSelect();

			this.selectOneObj = {};
			this.selectTwoObj = {};
			this.selectThreeObj = {};
			this.setOneLevel(this.opts.oneLevelId, this.opts.twoLevelId, this.opts.threeLevelId);

			this.lockBody();
		},
		// 锁住body不滚动
		lockBody: function() {
			if ($('body').hasClass('m-select-body')) {
				$('body').removeClass('m-select-body');
			} else {
				$('body').addClass('m-select-body');
			}
		},
		// 初始化结构
		initSelect: function() {
			var self = this;

			var dom_hd = '<div class="m-select '+self.typeBox+'" id="'+self.opts.id+'">'+
							'<div class="m-select-box">'+
								'<div class="m-select-hd">'+
									'<a class="m-select-btn m-select-btn-l" href="javascript:;">取消</a>'+
									'<a class="m-select-btn m-select-btn-r" href="javascript:;">确定</a>'+
									'<span class="m-select-title">请选择</span>'+
								'</div>'+
								'<div class="m-select-bd">';

			var dom_ft =        '</div>'+
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

			self.closeBtn = temp.find('.m-select-btn-l');
			self.sureBtn = temp.find('.m-select-btn-r');

			self.oneLevelCon = $('#'+self.scroll[0]);
			self.twoLevelCon = $('#'+self.scroll[1]);
			self.threeLevelCon = $('#'+self.scroll[2]);

			self.oneLevelUlCon = self.oneLevelCon.find('ul');
			self.twoLevelUlCon = self.twoLevelCon.find('ul');
			self.threeLevelUlCon = self.threeLevelCon.find('ul');

			self.oneScroll = new IScroll('#'+self.scroll[0],{
				probeType: 3,
				bounce: false
			});

			self.oneScroll.on('scrollStart',function() {
				self.clearLiStyle(self.oneLevelUlCon.find('li'));
			});
			self.oneScroll.on('scrollEnd',function() {
				var pa = Math.abs(this.y / 35);
				var plast = 1;
				var to = 0;
				if (Math.ceil(pa) === Math.round(pa)) {
					to = Math.ceil(pa) * 35;
					plast = Math.ceil(pa) + 1;
				} else {
					to = Math.floor(pa) * 35;
					plast = Math.floor(pa) + 1;
				}
				self.oneScroll.scrollTo(0, -to, 0);

				var pdom = self.setLiStyle(self.oneLevelUlCon.find('li'),plast);
				self.selectOneObj = self.attrToData(pdom,plast);

				if (self.level > 1 && self.oneTwoRelation === 1) {
					self.setTwoLevel(self.selectOneObj.id, self.selectTwoObj.id, self.selectThreeObj.id);
				}
			});

			if (self.level >= 2) {
				self.twoScroll = new IScroll('#'+self.scroll[1],{
					probeType: 3,
					bounce: false
				});

				self.twoScroll.on('scrollStart',function() {
					self.clearLiStyle(self.twoLevelUlCon.find('li'));
				});
				self.twoScroll.on('scrollEnd',function() {
					var pa = Math.abs(this.y / 35);
					var plast = 1;
					var to = 0;
					if (Math.ceil(pa) === Math.round(pa)) {
						to = Math.ceil(pa) * 35;
						plast = Math.ceil(pa) + 1;
					} else {
						to = Math.floor(pa) * 35;
						plast = Math.floor(pa) + 1;
					}
					self.twoScroll.scrollTo(0, -to, 0);

					var pdom = self.setLiStyle(self.twoLevelUlCon.find('li'),plast);
					self.selectTwoObj = self.attrToData(pdom,plast);

					if (self.level > 2 && self.twoThreeRelation === 1) {
						self.setThreeLevel(self.selectOneObj.id, self.selectTwoObj.id, self.selectThreeObj.id);
					}
				});
			}

			if (self.level >= 3) {
				self.threeScroll = new IScroll('#'+self.scroll[2],{
					probeType: 3,
					bounce: false
				});

				self.threeScroll.on('scrollStart',function() {
					self.clearLiStyle(self.threeLevelUlCon.find('li'));
				});
				self.threeScroll.on('scrollEnd',function() {
					var pa = Math.abs(this.y / 35);
					var plast = 1;
					var to = 0;
					if (Math.ceil(pa) === Math.round(pa)) {
						to = Math.ceil(pa) * 35;
						plast = Math.ceil(pa) + 1;
					} else {
						to = Math.floor(pa) * 35;
						plast = Math.floor(pa) + 1;
					}
					self.threeScroll.scrollTo(0, -to, 0);

					var pdom = self.setLiStyle(self.threeLevelUlCon.find('li'),plast);
					self.selectThreeObj = self.attrToData(pdom,plast);

				});
			}

			self.closeBtn.on('click',function() {
				$('#' + self.opts.id).remove();
				self.lockBody();
			});

			self.sureBtn.on('click',function() {
				$('#' + self.opts.id).remove();
				self.lockBody();
				self.callback(self.selectOneObj,self.selectTwoObj,self.selectThreeObj);
			});

		},
		attrToData: function(dom,index) {
			var obj = {};
			for (var p in dom[0].dataset) {
				obj[p] = dom[0].dataset[p];
			}
			obj['dom'] = dom;
			obj['atindex'] = index;
			return obj;
		},
		clearLiStyle: function(liObj) {
			liObj.each(function(index, el) {
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
		},
		setLiStyle: function(liObj,index) {
			liObj.eq(index+2).addClass('at');
			liObj.eq(index+3).addClass('side1');
			liObj.eq(index+4).addClass('side2');
			liObj.eq(index+1).addClass('side1');
			liObj.eq(index).addClass('side2');
			return liObj.eq(index+2);
		},
		setOneLevel: function(oneLevelId,twoLevelId,threeLevelId) {
			if ($.isArray(this.data[0])) {
				this.renderOneLevel(oneLevelId,twoLevelId,threeLevelId,this.data[0]);
			} else if($.isFunction(this.data[0])) {
				this.data[0](function(res) {
					this.renderOneLevel(oneLevelId,twoLevelId,threeLevelId,res);
				}.bind(this));
			} else {
				throw new Error('data format error');
			}
		},
		renderOneLevel: function(oneLevelId,twoLevelId,threeLevelId,data) {
			var self = this;
			
			if (this.debug) {
				console.log(data);
			}
			var hasAtId = data.some(function(v, i, o) {
				return v.id == oneLevelId;
			});
			if (!hasAtId) {
				oneLevelId = data[0]['id'];
			}

			var plast = 0;
			var html = '';
			html += this.getWhiteItem();
			data.forEach( function(el, i) {
				if (el.id == oneLevelId) {
					plast = i + 1;
				}
				html += self.render(el);
			});
			html += this.getWhiteItem();

			this.oneLevelUlCon.html(html);
			this.oneScroll.refresh();
			this.oneScroll.scrollToElement(':nth-child(' + plast + ')', 0);

			if (this.level >= 2) {
				this.setTwoLevel(oneLevelId, twoLevelId, threeLevelId);
			}

			var pdom = this.setLiStyle(this.oneLevelUlCon.find('li'),plast);
			this.selectOneObj = this.attrToData(pdom,plast);
		},
		setTwoLevel: function(oneLevelId,twoLevelId,threeLevelId) {
			if ($.isArray(this.data[1])) {
				this.renderTwoLevel(oneLevelId,twoLevelId,threeLevelId,this.data[1]);
			} else if($.isFunction(this.data[1])) {
				this.data[1](oneLevelId,function(res) {
					this.renderTwoLevel(oneLevelId,twoLevelId,threeLevelId,res);
				}.bind(this));
			} else {
				throw new Error('data format error');
			}
		},
		renderTwoLevel: function(oneLevelId,twoLevelId,threeLevelId,data) {
			var self = this;

			if (this.debug) {
				console.log(data);
			}
			var hasAtId = data.some(function(v, i, o) {
				return v.id == twoLevelId;
			});
			if (!hasAtId) {
				twoLevelId = data[0]['id'];
			}

			var plast = 0;
			var html = '';
			html += this.getWhiteItem();
			data.forEach( function(el, i) {
				if (el.id == twoLevelId) {
					plast = i + 1;
				}
				html += self.render(el);
			});
			html += this.getWhiteItem();

			this.twoLevelUlCon.html(html);
			this.twoScroll.refresh();
			this.twoScroll.scrollToElement(':nth-child(' + plast + ')', 0);

			if (this.level >= 3) {
				this.setThreeLevel(oneLevelId, twoLevelId, threeLevelId);
			}

			var pdom = this.setLiStyle(this.twoLevelUlCon.find('li'),plast);
			this.selectTwoObj = this.attrToData(pdom,plast);
		},
		setThreeLevel: function(oneLevelId,twoLevelId,threeLevelId) {
			if ($.isArray(this.data[2])) {
				this.renderThreeLevel(oneLevelId,twoLevelId,threeLevelId,this.data[2]);
			} else if($.isFunction(this.data[2])) {
				this.data[2](oneLevelId,twoLevelId,function(res) {
					this.renderThreeLevel(oneLevelId,twoLevelId,threeLevelId,res);
				}.bind(this));
			} else {
				throw new Error('data format error');
			}
		},
		renderThreeLevel: function(oneLevelId,twoLevelId,threeLevelId,data) {
			var self = this;

			if (this.debug) {
				console.log(data);
			}
			var hasAtId = data.some(function(v, i, o) {
				return v.id == threeLevelId;
			});
			if (!hasAtId) {
				threeLevelId = data[0]['id'];
			}

			var plast = 0;
			var html = '';
			html += this.getWhiteItem();
			data.forEach( function(el, i) {
				if (el.id == threeLevelId) {
					plast = i + 1;
				}
				html += self.render(el);
			});
			html += this.getWhiteItem();

			this.threeLevelUlCon.html(html);
			this.threeScroll.refresh();
			this.threeScroll.scrollToElement(':nth-child(' + plast + ')', 0);

			var pdom = this.setLiStyle(this.threeLevelUlCon.find('li'),plast);
			this.selectThreeObj = this.attrToData(pdom,plast);
		},
		getWhiteItem: function() {
			return '<li></li><li></li><li></li>';
		},
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