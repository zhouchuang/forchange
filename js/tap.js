/*
 *  传入 dom和回调函数即可
 *  fn返回一个this参数，指向当前触发的dom对象
 */
function Touchevent(dom, fn) {
	this.dom = dom;
	this.touchObj = {
		pageX: 0,
		pageY: 0,
		clientX: 0,
		clientY: 0,
		distanceX: 0,
		distanceY: 0,
		time: 0
	};
	this.operate(fn);
}
Touchevent.prototype.operate = function(fn) {
	var _this = this,
		touchObj = _this.touchObj; //缓存touchObj
	this.dom.addEventListener('touchstart', function(e) {
		var touches = e.touches[0];
		//赋值手指初始位置
		touchObj.pageX = touches.pageX;
		touchObj.pageY = touches.pageY;
		touchObj.clientX = touches.clientX;
		touchObj.clientY = touches.clientY;
		touchObj.time = +new Date();
	}, false);
	this.dom.addEventListener('touchmove', function(e) {
		var touches = e.touches[0];
		//计算手指移动位置
		touchObj.distanceX = touches.pageX - touchObj.pageX;
		touchObj.distanceY = touches.pageY - touchObj.pageY;
	}, false);
	this.dom.addEventListener('touchend', function(e) {
		var touches = e.touches[0];
		var time = +new Date() - touchObj.time;
		//当手指触摸时间＜150和位移小于2px则为tap事件
		if (time < 150 && Math.abs(touchObj.distanceX) < 2 && Math.abs(touchObj.distanceY) < 2) {
			console.log('tap啦啦啦啦啦～～～');
			touchObj.distanceX = 0;
			touchObj.distanceY = 0;
			//返回个参数 指向被触发的dom
			fn.call(null, this);
		} else {
			console.log('我被移动了，不是tap了');
			touchObj.distanceX = 0;
			touchObj.distanceY = 0;
		}
	}, false);
}