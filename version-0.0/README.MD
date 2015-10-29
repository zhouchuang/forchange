
# Version-0.0

===

首先第一个版本,我们要先了解搭建一个库或者是一个给别人使用的小插件应该用一种什么样的格式.

首先我们需要创建一个闭包

```javascript
(function()){
    //code..
}();
```

然后将我们所需要的代码和逻辑都写在里面避免全局变量的泛滥.

接着我们来看看我们第一版里的代码.
 
```javascript
(function(window,document) {
    var w = window,
        doc = document;
    var Kodo = function(selector) {
        return new Kodo.prototype.init(selector);
    }
    Kodo.prototype = {
        constructor : Kodo,
        length : 0,
        splice: [].splice,
        selector : '',
        init : function(selector) {//dom选择的一些判断

        }
    }
    Kodo.prototype.init.prototype = Kodo.prototype;

    Kodo.ajax = function() { //直接挂载方法  可k.ajax调用
        console.log(this);
    }

    window.f = Kodo;
})(window,document);
```

我创建了一个闭包,传入了window,document并且在内部将他们缓存起来.

接着

```javascript
var kodo = function(selector) {
    return new Kodo.prototype.init(selector);
}
```
如果有看过jQuery源码的童鞋对这个真是在了解不过了.每次用kodo调用的时候,将直接 返回一个kodo的实例.达到无new调用的效果

```javascript
Kodo.prototype = {
    constructor : Kodo,
    length : 0,
    splice: [].splice,
    selector : '',
    init : function(selector) {//dom选择的一些判断

    }
}
Kodo.prototype.init.prototype = Kodo.prototype;
```

接着重点就在于如何去构造Kodo的prototype的原型了.在这上面的属性也就相当于是jQuery的实例方法和属性.所以每次$()后都能链式调用.

由于我们是return new Kodo.prototype.init,那自然,我们需要手动的把init的prototype指向Kodo的prototype

同时我们在原型上具有splice属性后,我们的对象就会变为了一个类数组对象,神奇吧!

```javascript
Kodo.ajax = function() { //直接挂载方法  可f.ajax调用
    console.log(this);
}
```

由于javascript中一切皆对象,所以我们能在我们的Kodo上直接用.XXX来赋予新的属性和方法,这样的方法也被称之为静态方法.

```javascript
window.f = Kodo;
```

最后我们在window上对外暴露一个接口,我们就可以愉快的用 f.ajax 或者是 f("#id")即可调用.




虽然我很low,但是你看都看完了难道还不给star?!


