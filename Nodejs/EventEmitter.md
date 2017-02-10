
<!-- toc orderedList:0 depthFrom:1 depthTo:6 -->

* [EventEmitter](#eventemitter)
    * [EventEmitter 的属性介绍](#eventemitter-的属性介绍)
        * [方法](#方法)

<!-- tocstop -->

# EventEmitter

events 模块只提供了一个对象： `events.EventEmitter`。EventEmitter 的核心就是事件触发与事件监听器功能的封装。

EventEmitter 提供了多个属性，如 `on` 和 `emit`。`on` 函数用于绑定事件函数，`emit` 属性用于触发一个事件。

```js
//引入events模块
var events = require('events');
//创建eventEmitter
var emitter = new events.EventEmitter();

//绑定事件及事件的处理程序
emitter.on('someEvent', function(arg1, arg2) {
    console.log('listener1', arg1, arg2);
});
emitter.on('someEvent', function(arg1, arg2) {
    console.log('listener2', arg1, arg2);
});

//出发事件
emitter.emit('someEvent', 'arg1 参数', 'arg2 参数');

//打印
//listener1 arg1 参数 arg2 参数
//listener2 arg1 参数 arg2 参数
```

##  EventEmitter 的属性介绍

### 方法

 - addListener(event, listener)/on(event, listener)

为指定事件添加一个监听器到监听器数组的尾部。

```js
//引入events模块
var events = require('events');
//创建eventEmitter
var emitter = new events.EventEmitter();

//绑定事件及事件的处理程序
function onfn(arg1, arg2){
    console.log('listener>>>>', arg1, arg2);
}
function lsfn(arg1, arg2){
    console.log('someEvent 监听器>>>>',arg1, arg2);
}

emitter.on('someEvent', onfn);
emitter.on('someEvent',onfn);
emitter.addListener('someEvent',lsfn);
emitter.addListener('someEvent',lsfn);

var eventListeners = events.listenerCount(emitter,'someEvent');
console.log(eventListeners + " 个监听器监听连接事件。");

//出发事件
emitter.emit('someEvent', 'arg1 参数', 'arg2 参数');

emitter.removeListener('someEvent',lsfn)
emitter.removeListener('someEvent',onfn)

var eventListeners = events.listenerCount(emitter,'someEvent');
console.log(eventListeners + " 个监听器监听连接事件。");

emitter.emit('someEvent', 'arg1 参数', 'arg2 参数');
```

`on()`与`addListener()`效果相同。

```js
//来源自nodejs源码
EventEmitter.prototype.on = EventEmitter.prototype.addListener;
```

 - once(event,listener)

为指定事件注册一个单次监听器，即 监听器最多只会触发一次，触发后立刻解除该监听器。

 - removeListener(event, listener)

移除指定事件的某个监听器，监听器 必须是该事件已经注册过的监听器。

 - removeAllListeners([event])

移除所有事件的所有监听器， 如果指定事件，则移除指定事件的所有监听器。

 - 	setMaxListeners(n)

默认情况下， EventEmitters 如果你添加的监听器超过 10 个就会输出警告信息。 setMaxListeners 函数用于提高监听器的默认限制的数量。

 - 	listeners(event)

返回指定事件的监听器数组。

 - 	emit(event, [arg1], [arg2], [...])

按参数的顺序执行每个监听器，如果事件有注册监听返回 true，否则返回 false。


>[菜鸟教程](http://www.runoob.com/nodejs/nodejs-event.html)
