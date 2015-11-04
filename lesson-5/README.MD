# Lesson-5

===

这个版本新增6个方法,find(),first(),last(),eq(),get(),ajax

先给出代码

```javascript
find : function(selector) {
    if(!selector) return;
    var context = this.selector;
    return new Kodo(context + ' ' + selector);
},
first : function() {
    return new Kodo(this[0])
},
last : function() {
    var num = this.length - 1;
    return new Kodo(this[num]);
},
eq : function(num) {
    var num = num < 0 ? (this.length - 1) : num;
    console.log(num);
    return new Kodo(this[num]);
},
get : function(num) {
    var num = num < 0 ? (this.length - 1) : num;
    console.log(num);
    return this[num];
}
```

我们要仔细分辨下,这4个方法在jQuery中返回的都是什么对象?到底是dom对象还是jQuery对象.

明白了这个后就很容易能写出这4个方法

```javascript
find : function(selector) {
    if(!selector) return;
    var context = this.selector;
    return new Kodo(context + ' ' + selector);
}
```

首先find, 我们知道一般都会这样写 $('div').find('span') 查找div下的span,返回的是span数组对象,而不是原生的dom对象

那么我们就可以换个思路,因为我们能拿到 $('div') 这个selector对吧? 也就是 div

既然又要find('span'),我们的selector就可以写成  ('div span'),之后直接返回新的数组对象不就好了吗??

`var context = this.selector;` 先缓存当前的selector上下文,之后拼接我们find的selector

所以最后return 就变为  `new Kodo(context + ' ' + selector);` 虽然效率不一定高,总是一种解决思路不是吗?

```javascript
first : function() {
    return new Kodo(this[0])
},
last : function() {
    var num = this.length - 1;
    return new Kodo(this[num]);
},
eq : function(num) {
    var num = num < 0 ? (this.length - 1) : num;
    console.log(num);
    return new Kodo(this[num]);
},
get : function(num) {
    var num = num < 0 ? (this.length - 1) : num;
    console.log(num);
    return this[num];
}
```

find方法比较难解决,之后这4个就很容易了,first,last,eq,分别返回的都是封装后的对象,只有get返回的是原生 dom对象.

我们根据之前的思路,直接取数组对象的index,return下新的即可,是不是很简单? :)

之后是ajax部分

之前说过之所以,可以用`$.ajax`直接调用,是因为可以把方法直接挂在在构造函数上,作为静态方法

所以我们只需要写好ajax最后把你想要公开的接口放在Kodo上即可

```javascript
Kodo.get = function(url,sucBack,complete) {
    var options = {
        url : url,
        success : sucBack,
        complete : complete
    };
    ajax(options);
};
Kodo.post = function(url,data,sucback,complete) {
    var options = {
        url : url,
        type : "POST",
        data : data,
        sucback	: sucback,
        complete : complete
    };
    ajax(options);
};
function ajax(options) {
    var defaultOptions = {
        url: false, //ajax 请求地址
        type : "GET",
        data : false,
        success: false, //数据成功返回后的回调方法
        complete: false //ajax完成后的回调方法
    };
    for (i in defaultOptions) {
        if (options[i] === undefined) {
            options[i] = defaultOptions[i];
        }
    }
    var xhr = new XMLHttpRequest();
    var url = options.url;
    xhr.open(options.type, url);
    xhr.onreadystatechange = onStateChange;
    if (options.type === 'POST') {
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }
    xhr.send(options.data ? options.data : null);

    function onStateChange() {
        if (xhr.readyState == 4) {
            var result,
                status = xhr.status;

            if ((status >= 200 && status < 300) || status == 304) {
                result = xhr.responseText;
                if (window.JSON) {
                    result = JSON.parse(result);
                } else {
                    result = eval('(' + result + ')');
                }
                ajaxSuccess(result, xhr)
            } else {
                console.log("ERR", xhr.status);
            }
        }
    }
    function ajaxSuccess(data, xhr) {
        var status = 'success';
        options.success && options.success(data, options, status, xhr)
        ajaxComplete(status)
    }
    function ajaxComplete(status) {
        options.complete && options.complete(status);
    }
}
```

在这我就不细讲ajax的具体过程,我也实现了一个比较简单的ajax,就公开了get和post方法.大家可以实现一个更加复杂好用的ajax替换我这段代码

你说你都耐心的翻到这了? 不给我一个star说的过去么你?

