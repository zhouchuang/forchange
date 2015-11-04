# Version-0.2

===

这个版本新增 next(),prev(),parent(),parents()

这4个选择元素的方法还是比较常用的

首先我们需要一个func来过滤我们需要的dom
```javascript
function sibling(cur, dir) {
    while ((cur = cur[dir]) && cur.nodeType !== 1) {}
    return cur;
}
```

上面那段比较简单,就是普通的过滤下元素

```javascript
next : function() {
    return sibling(this[0], "nextSibling");
},
prev : function() {
    return sibling(this[0], "previousSibling");
},
```

看下next方法的源码就知道,我传入Kodo数组对象的0个dom对象,然后取它的下一个同辈元素,直接返回,prev方法同理

```javascript
parent : function() {
    var parent = this[0].parentNode;
    parent && parent.nodeType !== 11 ? parent : null;
    var a = Kodo();
        a[0] = parent;
        a.selector = parent.tagName.toLocaleLowerCase();
        a.length = 1;
    return a;
},
```

这段是取到第一个父元素,由于parent()返回的不是原生的DOM对象,是封装过的数组对象(Kodo),那我们就想办法构造一个新的Kodo对象即可

所以我在里面var了一个 Kodo,然后设置这个Kodo数组对象的selector等配置,然后直接返回这个新的Kodo对象

```javascript
parents : function() {
    var a = Kodo(),
        i = 0;
    while ( (this[0] = this[0][ 'parentNode' ]) && this[0].nodeType !== 9 ) {
      if ( this[0].nodeType === 1 ) {
        a[i] = this[0];
        i++;
      }
    }
    a.length = i;
    return a;
}
```

同理,在jQuery的parents方法中,返回的依旧是jQuery对象.我们依旧用上面的办法,构造一个新对象并且返回就好了!

中间一层while循环,依次过滤出我们需要的dom元素,然后把他们都赋值到我们新var的对象里,最后别忘了设置一下新对象的length属性,返回我们的新对象即可!

看了上面几个方法是不是觉得!其实很多时候我们完全可以自己新创建一个对象,然后配置好它直接返回这个新对象.比如find方法我们也可以用这样的办法:)


