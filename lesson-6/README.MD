# Lesson-6

===

这个版本完善hasClass和css 方法.

新增 attr和data

```javascript
css: function(attr, val) { //链式测试

    for (var i = 0; i < this.length; i++) {
        if(typeof attr == 'string') {
            if (arguments.length == 1) {
                return getComputedStyle(this[0], null)[attr];
            }
            this[i].style[attr] = val;
        } else {
            var _this = this[i];
            f.each(attr,function(attr,val) {
                _this.style.cssText += '' + attr + ':' + val + ';';
            });
        }
    }
    return this;
}
```

在我们上一个版本中,没有对css方法传对象进行解析,在这我们要进行完善.

刚刚好我们现在已经有了each方法!直接用上吧!

在我们的for循环中,要先判断下传入的attr参数是字符串还是对象.

如果是字符串,我们就按照`css('width','100px')`这样的方式处理

如果是对象`css({"width":'100px','height':'200px'})`

```javascript
var _this = this[i];
f.each(attr,function(attr,val) {
    _this.style.cssText += '' + attr + ':' + val + ';';
});
```

首先我们缓存下当前的this,然后用cssText方法,直接拼接进去即可.

接着我们需要完善hasClass方法.这里要着重说明下!目前我搜到的一大堆hasClass方法与jQuery的实现都是不同的

比如有这样的dom结构

```javascript
<div id="pox">
    <ul>
        <li class="a c">pox</li>
        <li class="b">pox</li>
        <li>pox</li><li>pox</li>
        <li>pox</li>
    </ul>
</div>
```

我们如果写$('#pox li').hasClass('b')与$('#pox li').hasClass('a')那都会是什么样的结果呢?

结果是都会返回true.

而现在基本能搜到的完全没有做这方面的判断.所以我们来看看我是如何实现的

```javascript
hasClass : function(cls) {
    var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
    var arr = [];
    for (var i = 0; i < this.length; i++) {
        if (this[i].className.match(reg)) {
            return true;
        }
    }
    return false;
}
```

首先我们需要一个正则匹配,还需要一个数组,进行存储每个元素是否有存在判断的class

然后我们再在那个数组中寻找是否有true?如果有true,则返回true,如果一个true都没有的情况下,才能完全返回false.希望大家在这里要注意以下

最后是我们的attr和data方法
```javascript
attr : function(attr, val) {
    for (var i = 0; i < this.length; i++) {
        if(typeof attr == 'string') {
            if (arguments.length == 1) {
                return this[i].getAttribute(attr);
            }
            this[i].setAttribute(attr,val);
        } else {
            var _this = this[i];
            f.each(attr,function(attr,val) {
                _this.setAttribute(attr,val);
            });
        }
    }
    return this;
},
data : function(attr, val) {
    for (var i = 0; i < this.length; i++) {
        if(typeof attr == 'string') {
            if (arguments.length == 1) {
                return this[i].getAttribute('data-' + attr);
            }
            this[i].setAttribute('data-' + attr,val);
        } else {
            var _this = this[i];
            f.each(attr,function(attr,val) {
                _this.setAttribute('data-' + attr,val);
            });
        }
    }
    return this;
}
```

这两个方法就很简单啦,跟CSS方法类似,先判断第一个参数是否为字符串,如果是字符串就是直接增加一个属性.如果是对象,就each下一个一个set即可.

毛主席说过,只阅不star都是耍流氓! :(
