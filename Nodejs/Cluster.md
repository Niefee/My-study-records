# Cluster

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

* [Cluster](#cluster)
	* [worker对象](#worker对象)

<!-- /code_chunk_output -->

nodejs是单进程单线程，在多核机器上无法充分利用性能。nodejs引入cluster模块，可以提供多进程编程力能。

`cluster`模块通过`cluster.fork()`方法创建多个进程实例，而`cluster.fork()`内部又是通过`child_process.fork()`来创建子进程的。

```js
cluster.fork() --> child_process.for()
```

示例：

```js
var cluster = require('cluster');
var cpuNums = require('os').cpus().length;
var http = require('http');

if(cluster.isMaster){
  for(var i = 0; i < cpuNums; i++){
    cluster.fork();
  }
}else{
  http.createServer(function(req, res){
    res.end('ok');
  }).listen(3000);
}
```

## worker对象

worker对象是`cluster.fork()`的返回值，代表一个worker进程。

属性和方法如下:

 - worker.id

worker.id返回当前worker的独一无二的进程编号。这个编号也是`cluster.workers`中指向当前进程的索引值。

 - worker.process

所有的工作进程都是通过`child_process.fork()`来创建的，这个方法返回的对象被存储为`worker.process`。在工作进程中， process属于全局对象。

 - worker.send(message[, sendHandle][, callback])

发送一个消息给工作进程或主进程，也可以附带发送一个handle。

**主进程**调用这个方法会发送消息给具体的**工作进程**。还有一个等价的方法是`ChildProcess.send()`。

**工作进程**调用这个方法会发送消息给**主进程**。还有一个等价方法是`process.send()`。

```js
const cluster = require('cluster');
const http = require('http');

if (cluster.isMaster) {
    console.log('Master');
    const worker = cluster.fork();
    worker.send('hi, 我是主进程。');
    cluster.on('message', function(worker, message, handle){
        console.log('cluster msg:', message);
    });
} else if (cluster.isWorker) {
    process.on('message', (msg) => {
        console.log('process msg:', msg);
        process.send(msg);
    });
    console.log('Worker');
    process.send('hi, 我是工作进程。');
}
```

输出：
```bash
Master
Worker
cluster msg: hi, 我是工作进程。
process msg: hi, 我是主进程。
cluster msg: hi, 我是主进程。
```