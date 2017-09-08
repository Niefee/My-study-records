
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [Stream](#stream)
	* [简介](#简介)
	* [从流中读取](#从流中读取)
	* [写入流](#写入流)
		* [cork()与uncork()](#cork与uncork)
	* [管道流](#管道流)
		* [unpipe()](#unpipe)
	* [链式流](#链式流)

<!-- /code_chunk_output -->


# Stream
## 简介

Stream 有四种流类型：

 - Readable - 可读操作。

 - Writable - 可写操作。

 - Duplex - 可读可写操作.

 - Transform - 操作被写入数据，然后读出结果。

所有的 Stream 对象都是 EventEmitter 的实例。常用的事件有：

 - data - 当有数据可读时触发。

 - end - 没有更多的数据可读时触发。

 - error - 在接收和写入过程中发生错误时触发。

 - finish - 所有数据已被写入到底层系统时触发。


## 从流中读取

```js
var fs = require("fs");
var data = '';

// 创建可读流
var readerStream = fs.createReadStream('input.txt');

// 设置编码为 utf8。
readerStream.setEncoding('UTF8');

// 处理流事件 --> data, end, and error
readerStream.on('data', function(chunk) {
   data += chunk;
});

readerStream.on('error', function(err){
   console.log(err.stack);
});

//'readable' 事件将在流中有数据可供读取时触发
//当到达流数据尾部时， 'readable' 事件也会触发。触发顺序在 'end' 事件之前。
readerStream.on('readable', () => {
  // 有一些数据可读了
});

readerStream.on('end',function(){
    console.log(data);
});

console.log("程序执行完毕");
```

 ### readable.pause()与readable.resume()

**readable.pause()**:暂停读取流操作

**readable.resume()**:继续读取流操作

```js
// 新建一个readable数据流
var readable = getReadableStreamSomehow();
readable.on('data', function(chunk) {
  console.log('读取%d字节的数据', chunk.length);
  readable.pause();
  console.log('接下来的1秒内不读取数据');

  setTimeout(function() {
    console.log('数据恢复读取');
    readable.resume();
  }, 1000);
});
```



## 写入流

```js
var fs = require("fs");
var data = 'hello world';

// 创建一个可以写入的流，写入到文件 output.txt 中
var writerStream = fs.createWriteStream('output.txt');

// 使用 utf8 编码写入数据
writerStream.write(data,'UTF8');

// 标记文件末尾
// 如有callback，在finish前调用
writerStream.end();

// 处理流事件 --> data, end, and error
writerStream.on('finish', function() {
    console.log("写入完成。");
});

writerStream.on('error', function(err){
   console.log(err.stack);
});

console.log("程序执行完毕");
```

### cork()与uncork()

调用`writable.cork()`，写入的数据将会被存放在内存的缓冲区里，只要再调用`writable.uncork()`跟`writable.end() `,被缓冲的数据才会被输出。


## 管道流

```js
// 创建一个可读流
var readerStream = fs.createReadStream('input.txt');

// 创建一个可写流
var writerStream = fs.createWriteStream('output.txt');

// 管道读写操作
// 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
readerStream.pipe(writerStream);
```
**pipe 的过程:**

1. 首先执行 `readbable.pipe(writable)`，将 readable 与 writable 对接上
2. 当 readable 中有数据时，`readable.emit('data')`，将数据写入 writable
3. 如果 `writable.write(chunk)` 返回 false，则进入 pause 模式，等待 drain 事件触发
4. drain 事件全部触发后，再次进入 flow 模式，写入数据
5. 不管数据写入完成或发生中断，最后都会调用 `unpipe()`
6. `unpipe()` 调用 `Readable.prototype.unpipe()`，触发 dest 的 unpipe 事件，清理相关数据

### unpipe()

该方法移除pipe方法指定的数据流目的地，目的地数据会被清空。

```js
readable.pipe(writable);
setTimeout(function() {
    console.log('停止写入file.txt');
    readable.unpipe(writable);
    console.log('手动关闭file.txt的写入数据流');
    writable.end();
}, 1000);

readable.on('unpipe', function(src) {
    //do ...
});
```

## 链式流


```js
// 压缩 input.txt 文件为 input.txt.gz
fs.createReadStream('input.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('input.txt.gz'));


// 解压 input.txt.gz 文件为 input.txt
fs.createReadStream('input.txt.gz')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('input.txt'));
```
