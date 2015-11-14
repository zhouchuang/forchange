# Lesson-11

---

新增width,height,extend

事件部分讲完了后,我们最后实现3个方法.

```javascript
width : function(w) {
	if(arguments.length == 1) {
		for (var i = 0; i < this.length; i++) {
			this[i].style.width = w + 'px';
		}
	} else {
		if (this[0].document === doc ) {
			return this[0].innerWidth;
		} else if (this[0].nodeType === 9 ){
			return document.documentElement.clientWidth;
		} else {
			return parseInt(getComputedStyle(this[0],null)['width']);
		}
	}
},
```

关于width(),height()就常用的就2种,一个是取值,一个是赋值.

我们通过判断arguments的个数,是取值还是赋值.

赋值很容易,我们就用最简单的办法,直接设置.

如果是取值,那我们就要做个判断,因为window,和document的取法是不一样的.

还有一种可能性是,当dom元素的display为none的时候,直接取是取不到的.在这我就不做处理了.大家思考一下可以自己尝试.

思路是把dom设置为position:absolute;visible:hidden;然后取,在设置回去.

同理height方法也是如此.我就直接给出代码了

```javascript
height : function(h) {
	if(arguments.length == 1) {
		for (var i = 0; i < this.length; i++) {
			this[i].style.height = h + 'px';
		}
	} else {
		if(this[0].document === doc ) {
			return this[0].innerHeight;
		} else if (this[0].nodeType === 9 ){
			return document.documentElement.clientHeight;
		} else {
			return parseInt(getComputedStyle(this[0],null)['height']);
		}
	}
}
```

两者几乎相同只是改了API,其实完全可以封装为一个方法复用.

---

jQuery之所以那么广受大众所爱,还一个非常重要的就是他的extend方法.如果没有了他,将不会有现在那么多jQuery插件的诞生

在此,我们就实现一个非常简单的浅拷贝.(然而jQuery的extend非常强大)

```javascript
Kodo.prototype.extend = Kodo.extend = function() {
	var options = arguments[0];
	for( var i in options) {
		this[i] = options[i];
	}
};
```

这个方法我们不仅要能拓展工具方法,也要能拓展实例方法.

所以 `Kodo.prototype.extend = Kodo.extend =` 直接这样写了.

里面内容过于简陋就不过多讲解了 :)

至此,我们的轮子基本也就完结了.另外的手势番外篇,本想直接继承在这里面.如果有大众所需,我就继续更下去

您连11节的课程都有耐心看完,何必不顺手点下右上角的star呢? >.<