# Version-0.4

===

这个版本我们要增加一个用的非常多的方法!

那就是each!

我们知道each不仅能遍历数组,还能遍历对象.

首先我们需要一个对数组进行验证的方法

```javascript
function isArray(obj) {
    return Array.isArray(obj);
}
```

接着就是我们的重头戏

```javascript
Kodo.each = function(obj,callback) {
    var len = obj.length,
        constru = obj.constructor,
        i = 0;

    if(constru === window.f) {
        for (; i < len; i++) {
            var val = callback.call(obj[i],i,obj[i]);
            if(val === false) break;
        }
    } else if (isArray(obj)) {
        for (; i < len; i++) {
            var val = callback.call(obj[i],i,obj[i]);
            if(val === false) break;
        }
    } else {
        for( i in obj ) {
            var val = callback.call(obj[i],i,obj[i]);
            if(val === false) break;
        }
    }

};
```

因为我们还可能遍历Kodo数组对象

如

```javascript
f("div").each(function(index,item) {

})
```

 所以还需要一个判断 是否是Kodo数组对象

```javascript
if(constru === window.f) {
    for (; i < len; i++) {
        var val = callback.call(obj[i],i,obj[i]);
        if(val === false) break;
    }
}
```

在这应该强调下call的用法,还是很多人不知道call何时使用.

在我们的callback里 第一个参数是下标,第二个参数是当前的对象,然后this还要指向他自己

所以 `callback.call(obj[i],i,obj[i]);`  就是这样写 第一个参数是改变this指向,第二个参数是下标,第三个是自己本身

很简单不是吗?

既然你都看到这里了,还不给我一个star?!