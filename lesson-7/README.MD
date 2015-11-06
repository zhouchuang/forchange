# Lesson-7

===

新增 html,append,before,after,remove

```javascript
html: function (value) {
    if (value === undefined) {
        return this[0].innerHTML;
    } else {
        for (var i = 0; i < this.length; i++) {
            this[i].innerHTML = value;
        }
    }
    return this;
}
```

`html()`方法我就用了这种很愚蠢的方法实现了!比起之前的data,attr,css什么的简单多了,大家可以自己继续完善.

接着是我们的重头戏,3个文档插入.我找到了一个原生js叼叼的方法

`insertAdjacentHTML` 来让我们去看下MDN是怎么解释的


### 概述
> insertAdjacentHTML() 将指定的文本解析为 HTML 或 XML，然后将结果节点插入到 DOM 树中的指定位置处。该方法不会重新解析调用该方法的元素，因此不会影响到元素内已存在的元素节点。从而可以避免额外的解析操作，比直接使用 innerHTML 方法要快。

### 语法
`element.insertAdjacentHTML(position, text);`
`position` 是相对于 `element` 元素的位置，并且只能是以下的字符串之一：

`beforebegin`
在 `element` 元素的前面。
`afterbegin`
在 `element` 元素的第一个子节点前面。
`beforeend`
在 `element` 元素的最后一个子节点后面。
`afterend`
在 `element` 元素的后面。
`text` 是字符串，会被解析成 `HTML` 或 `XML`，并插入到 DOM 树中。

### 兼容性

| Chrome        | Firefox   |  IE  |  Opera  | Safari |
| --------   | -----:  | :----:  |
| 1.0     | 8.0  |   4.0    | 7.0 | 4.0|

简直神器有木有?!

所以我们写一个这样的方法吧!

```javascript
function domAppend(elm, type, str) {  //实现append、after、before操作
    elm.insertAdjacentHTML(type, str);
}
```

然后只需要传对应参数就好了!如此简单

```javascript
append: function (str) {
    for (var i = 0; i < this.length; i++) {
        domAppend(this[i], 'beforeend', str);
    }
    return this;
},
before: function (str) {
    for (var i = 0; i < this.length; i++) {
        domAppend(this[i], 'beforeBegin', str);
    }
    return this;
},
after: function (str) {
    for (var i = 0; i < this.length; i++) {
        domAppend(this[i], 'afterEnd', str);
    }
    return this;
}
```

接着是remove方法,在这我只做删除自身节点,就没继续拓展了.大家可以自行完善

```javascript
remove: function () { //只能删除自身
    for (var i = 0; i < this.length; i++) {
        this[i].parentNode.removeChild(this[i]);
    }
    return this;
}
```

您给予的star,就是给代码赋予灵魂.




