;(function($,window){
	var MyFullPage = function(element,options){
		this.$element = element;
		this.defaults = {
			'parent':'scrollContainer',
			'className':'slide',
			'interval':1000,
			'startDomIndex':1
		};
		this.options = $.extend({},this.defaults,options);
		this.domLength = 0;
	};

	var pro = MyFullPage.prototype;

	pro.initFullPage = function(){
		this.setDomInfo();
		this.setDomStyle();
		this.setPageAction();
		this.bindMouseWheel(this.pageAction);
	}
	/*获取需要的节点信息*/
	pro.setDomInfo = function(){
		this.parentNode = this.$element.find('.'+this.options.parent);
		this.slideNodes = this.$element.find('.'+this.options.className);
		this.domLength = this.slideNodes.length;
		this.currentDom = this.options.startDomIndex;
	}	
	/*构造相关样式*/
	pro.setDomStyle = function(){
		var _interval = this.options.interval/1000;
		this.$element.css({
			'position':'fixed',
			'top':0,
			'right':0,
			'bottom':0,
			'left':0,
			'z-index':9999,
			'overflow':'hidden'
		});
		this.parentNode.css({
			'display':'none',
			'transition':'all ease '+_interval+'s'
		});

		this.height = this.$element.height();
		this.slideNodes.css('height',this.height+'px');
		this.parentNode.show();
	}
	/*构造动作器*/
	pro.setPageAction = function(){
		var _this = this;
		this.pageAction = {
			isScrolling:false,
			next:function(){
				if((_this.currentDom + 1)<= _this.domLength){
					_this.currentDom +=1;
					_this.pageAction.move(_this.currentDom);
				}
			},
			pre:function(){
				if(_this.currentDom -1 >0){
					_this.currentDom -=1;
					_this.pageAction.move(_this.currentDom);
				}
			},
			move:function(index){
				_this.pageAction['isScrolling'] = true;
				var di = -(index-1)*(_this.height) + 'px';
				_this.pageAction['start'] = +new Date();
				_this.parentNode.css('transform','translateY('+di+')');
				setTimeout(function(){
					_this.pageAction['isScrolling'] = false;
				},_this.options.interval-0+10);
			}
		}
	};
	/*添加鼠标滚动事件*/
	pro.bindMouseWheel = function(page){
	    var  type = 'mousewheel';
	    var  deltaY = 0;
	 
	    function mouseWheelHandle (event) {
	        if (page.isScrolling) {// 加锁部分
	            return false; 
	        }
	        var e = event.originalEvent || event;
	 
	        deltaY = e.deltaY;
	        if (deltaY > 0) {
	            page.next();
	        } else if (deltaY < 0) {
	            page.pre();
	        }
	    }
	    $(document).on('mousewheel', mouseWheelHandle);		
	}
	/*挂载jquery插件*/
    $.fn.myFullPage = function(options){
    	var myFullPage = new MyFullPage(this,options);
        myFullPage.initFullPage();  
    }  
})(jQuery,window)