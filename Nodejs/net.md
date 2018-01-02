# net

`net` 模块提供了创建基于流的 TCP 或 IPC 服务器(`net.createServer()`)和客户端`(net.createConnection()`) 的异步网络 API。

## TCP
提供的是面向连接、可靠的字节流服务。当客户和服务器彼此交换数据前，必须先在双方之间建立一个TCP连接，之后才能传输数据。 TCP提供超时重发，丢弃重复数据，检验数据，流量控制等功能，保证数据能从一端传另一端.

## Socket
像TCP/IP、TCP和UDP等协议只有一套，而我们系统多个TCP连接或多个应用程序进程必须通过同一个TCP协议端口传输数据。 为了区别不同的应用程序进程和连接，许多计算机操作系统为应用程序与TCP/IP协议交互提供了称为套接字(Socket)的接口。
套接字就是支持TCP/IP网络通信的基本操作单元，是我们进行TCP/IP进行通信的接口

## 示例

TCP服务器
```js
const net = require('net');
var server = net.createServer((socket) => {
    socket.on('data', (data) => {
        console.log('client send message: ', data.toString());
    });
    socket.write('hello client');
});
server.listen(8888, '127.0.0.1', ()=>{
    console.log(server.address());
});
```

客户端
```js
const net = require('net');
var client = net.connect({port: 8888, host: '127.0.0.1'}, function() {
    client.write('hello server!\r\n');
});
client.on('data', (data) => {
    console.log('server send message: ', data.toString());
    client.end();
});
client.on('end', () => {
    console.log('disconnected form server');
});
```
一次最简单的通讯：

1. TCP服务器端依次调用Socket()、bind()、listen()之后，就会监听指定的socket地址了。
2. TCP客户端依次调用Socket()、connect()之后就向TCP服务器发送了一个连接请求。
3. TCP服务器监听到这个请求之后，就会调用accept()函数去接收请求，这样连接就建立好了。之后就可以开始网络I/O操作了，即类同于普通文件的读写I/O操作。

## 服务器端

 - 'close' 事件

当server关闭的时候触发. 注意,如果有连接存在, 直到所有的连接结束才会触发这个事件

 - 'connection' 事件

当一个新的connection建立的时候触发. socket 是一个 net.Socket的实例对象.

 - 'error' 事件

当错误出现的时候触发。

 - 'listening' 事件

当服务被绑定后调用 [server.listen()](http://nodejs.cn/api/net.html#net_server_listen)。


## 客户端

Socket对象创建TCP客户端。主要包含2个方法和一个事件监听器。

1. write方法，往socket的另一端写入数据；
2. end方法，结束socket;
3. on(‘data’,func)事件监听，数据接收。


 - new net.Socket([options])

创建一个 socket 对象。

 - 'close' 事件

一旦 socket 完全关闭就发出该事件。

 - 'connect' 事件

当一个 socket 连接成功建立的时候触发该事件。

 - 'data' 事件

当接收到数据的时触发该事件。data 参数是一个 Buffer 或 String。数据编码由 socket.setEncoding() 设置。

 - 'end' 事件

当 socket 的另一端发送一个 FIN 包的时候触发，从而结束 socket 的可读端。

 - 'error' 事件

当错误发生时触发。

 - 'lookup' 事件

在找到主机之后创建连接之前触发。不可用于 UNIX socket。

 - 'timeout' 事件

当 socket 超时的时候触发。该事件只是用来通知 socket 已经闲置。用户必须手动关闭。

参考：
1. http://nodejs.cn/api/net.html
2. https://yi-love.github.io/blog/node.js/2017/02/21/node-net.html
3. https://0532.gitbooks.io/nodejs/content/netserver_tcp/README.html
