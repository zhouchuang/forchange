# Lesson-10

---

实现on,off的事件委托!

我们能根据之前的思路,利用同样的方法实现一个事件委托.

先来看看流程图

![事件设计流程图](http://7xim8z.com1.z0.glb.clouddn.com/on6-3.png)

然后先看看结果是如何，毕竟流程图看的也不一定能懂。

![事件图](http://7xim8z.com1.z0.glb.clouddn.com/on6-4.png)

最后我们再来看看代码

```javascript
Kodo.deleEvents = []; //事件委托存放的事件
Kodo.deleId = 0; //事件委托的唯一标识

on: function(type, selector, fn) {
	if (typeof selector == 'function') {
		fn = selector; //两个参数的情况
		//事件绑定过程
	} else { 
	    //事件委托过程
		for (var i = 0; i < this.length; i++) {
			if ( !this[i].deleId ) {
				this[i].deleId = ++Kodo.deleId;
                //同样是判断是否有唯一id
                
				Kodo.deleEvents[Kodo.deleId] = {};
				//没有则创建id对象 也就是f.deleEvents[]新开辟一个新对象
				
                Kodo.deleEvents[Kodo.deleId][selector] = {};
                
                //构造 selector对象 
                /*
                *  如 Kodo.deleEvents[1] = 
                *  ｛
                *       "#box li" : {},
                *        "#pox" : {}
                *   ｝
                */
                
                Kodo.deleEvents[Kodo.deleId][selector][type] = [fn];
                //构造我们的事件数组
                /*
                *  如 Kodo.deleEvents["#box li"] = 
                *  [
                *       "click" : [fn1,fn2...],
                *        "touchstart" : [fn1,fn2....]
                *   ]
                */
                delegate(this[i],type,selector);
                //用委托的方式进行绑定
			} else {
			    //如果id存在的情况
				var id = this[i].deleId,
                    position = Kodo.deleEvents[id];//委托元素的事件存储位置
                    
                if(!position[selector]) {
                    //先判断如果selector存储的对象不存在
                    position[selector] = {};
                    //新建selector对象 (与上面的selector构造相同)
                    position[selector][type] = [fn];
                    //构造事件数组对象   (与上面的type构造相同)
                    
                    delegate(this[i],type,selector);
                    //因为是新的selector 所以要再绑定
                } else { 
                    //selector 存储对象存在的情况
                    if ( position[selector][type] ) {
                        //如果事件数组已经有了，则直接push进来
                        position[selector][type].push(fn);
                        
                    } else {
                        //如果事件数组没有，那就构造事件数组
                        position[selector][type] = [fn];
                        
                        //因为是新的绑定的事件，所以要重新绑定
                        delegate(this[i],type,selector);
                    }

                }
			}
		}
	}
},

```

继续再看一遍log的结果，对比刚刚的代码

![事件图](http://7xim8z.com1.z0.glb.clouddn.com/on6-4.png)

连同代码，我在注释里已经非常的详细解释了整个过程，大家结合控制台log的结果，在看看最初的流程图结合的看，我相信有点点耐心就能马上理解了。

绑定过程都会比较复杂，理解了绑定过程后，下面off的实现就很容易了。

off本身是可以传2个参数的，第一个参数为事件type，第二个参数是委托元素selector

```javascript
off: function(type, selector) {
	if (arguments.length == 0) {
		//如果没传参数，清空所有事件
	
	} else if (arguments.length == 1) {
		//指定一个参数，则清空对应的事件
		
	} else {
	    //直接根据dom上存有的deleId，找到对应的deleEvents里的位置
	    //删除委托元素上的type事件数组即可
		for (var i = 0; i < this.length; i++) {
			var id = this[i].deleId;
			delete Kodo.deleEvents[id][selector][type];
		}
	}
}
```
最后看看我们修改过后的 delegate方法

```javascript
function delegate(agent, type, selector) {
	var id = agent.deleId; //先获取被委托元素的deleId
	agent.addEventListener(type, function(e) {
		var target = e.target;
		var ctarget = e.currentTarget;
		var bubble = true;

		while (bubble && target != ctarget) {
			if (filiter(agent, selector, target)) {
				for (var i = 0; i < Kodo.deleEvents[id][selector][type].length; i++) {
					bubble = Kodo.deleEvents[id][selector][type][i].call(target, e);
					//循环事件数组 直接call
				}
			}
			target = target.parentNode;
			return bubble;
		}
	}, false);

	function filiter(agent, selector, target) {
		//过滤函数
	}
}
```

这里修改的就只有二个地方

1.获取被委托元素的deleId，因为我们整个委托机制都与他有关。
2.通过id在deleEvents里查找对应的事件数组，循环执行即可

以上就是整个委托的过程！

```javascript

f("you").on('star','me',function(){
    console.log('success!');
});

```
