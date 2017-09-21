
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [timer](#timer)
	* [预定定时器](#预定定时器)
		* [setImmediate(callback[, ...args])](#setimmediatecallback-args)
		* [setInterval(callback, delay[, ...args])](#setintervalcallback-delay-args)
		* [setTimeout(callback, delay[, ...args])](#settimeoutcallback-delay-args)
	* [取消定时器](#取消定时器)
		* [clearImmediate(immediate)](#clearimmediateimmediate)
		* [clearInterval(timeout)](#clearintervaltimeout)
		* [clearTimeout(timeout)](#cleartimeouttimeout)

<!-- /code_chunk_output -->

# timer

## 预定定时器

### setImmediate(callback[, ...args])

- callback `<Function>` : 当定时器到点时要调用的函数。
- delay `<number>` : 调用 callback 之前要等待的毫秒数。
- ...args `<any>` : 当调用 callback 时要传入的可选参数。

### setInterval(callback, delay[, ...args])

参数如上，使用同javascript语法。

### setTimeout(callback, delay[, ...args])

参数如上，使用同javascript语法。

## 取消定时器

### clearImmediate(immediate)

 - immediate `<Immediate>` 一个 setImmediate() 返回的 Immediate 对象。

### clearInterval(timeout)

参数如上，使用同javascript语法。

### clearTimeout(timeout)

参数如上，使用同javascript语法。

## Event loop

所以，浏览器会维护一个任务队列(`task queue`)，任务队列是先进先出的，也就是说，先进入任务队列的会先执行。当主线程任务执行完毕，就会查看任务队列中有没有新任务，如果有，则把第一个任务放到主线程中执行，以此循环往复，这个过程也就是`Event loops`。

浏览器不止一个任务队列，且优先级不同。基本分为如下两种：

 - `macro-task`: script（整体代码）, setTimeout, setInterval, setImmediate, I/O, UI rendering
 - `micro-task`: process.nextTick, 原生Promise, Object.observe, MutationObserver

主线程执行完所有任务，会先查看并执行`micro-task`队列,然后到`macro-task`。执行完`macro-task`队列任务，又会去检查`micro-task`队列，以此循环。

定时器回调函数是在延迟`delay`后，被添加到`macro-task`队列后执行。

> https://segmentfault.com/a/1190000007936922
> https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/

`process.nextTick`方法可以在当前"执行栈"的尾部----下一次`Event Loop`（主线程读取"任务队列"）之前----触发回调函数。
`setImmediate`方法则是在当前"任务队列"的尾部添加事件。
