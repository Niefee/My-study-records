
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [http模块](#http模块)
	* [简单的http服务器](#简单的http服务器)

<!-- /code_chunk_output -->


# http模块

## 简单的http服务器

```js
//加载一个http模块
var http = require('http');
//通过http模块下的createServer创建并返回一个web服务器对象
var server = http.createServer();

server.on('error', function(err){
    console.log(err);
});

server.on('listening', function() {
    console.log('listening...');
})

server.on('request', function(req, res) {
    console.log('有客户端请求了');

    res.writeHead(200, 'ok', {
        'content-type' : 'text/html;charset=utf-8'
    });

    res.write('<h1>hello</h1>');
    res.end();
    //跟上面那个可以合并成res.write('<h1>hello</h1>');

})

server.listen(8080, 'localhost');
//console.log(server.address());
```


 - `var http=require('http')`;

 - `var server=http.createServer([requestListener])`
     + 创建并返回一个HTTP服务器对象
     + requestListener：监听到客户端连接的回调函数

 - `server.listen([port,[hostname],[backlog],[callback]])`
     + 监听客户端连接请求，只有当调用listen方法以后，服务器才开始工作
     + port：监听的端口
     + hostname：主机名（IP/域名）
     + backlog：连接等待队列的最大长度
     + callback：调用listen方法并成功开启监听以后，会触发一个listen事件，callback将作为该事件的执行函数。

 - `error`事件：当服务开启失败的时候触发的事件
     - 参数`err`具体的错误对象。

 - `listening事件`：当server调用listen方法并成功开始监听以后触发的事件。

 - `request事件`：当有客户端发送请求道该主机和端口的请求的时候触发
     + 参数request：http.IncomingMessage的一个实例，通过他我们可以获取到这次请求的一些信息，比如信息，数据等。
     + 参数response：http:http.ServerResponse的一个实例，通过他我们可以向该请求的客户端输出返回的响应。

## content-type

MIME，即：Multipurpose Internet Mail Extensions，多用途互联网邮件扩展类型。

MIME和Content-Type是文件类型设置和解析的标准。

不同的文件类型，使用不同的程序打开，服务端利用`content-type`告知客户端返回文件的`MIME`类型以及解析程序。

```text
text/html ： HTML格式
text/plain ：纯文本格式
text/xml ：  XML格式
image/gif ：gif图片格式
image/jpeg ：jpg图片格式
image/png：png图片格式

// 以application开头的媒体格式类型：

application/xhtml+xml ：XHTML格式
application/xml     ： XML数据格式
application/atom+xml  ：Atom XML聚合格式
application/json    ： JSON数据格式
application/pdf       ：pdf格式
application/msword  ： Word文档格式
application/octet-stream ： 二进制流数据（如常见的文件下载）
application/x-www-form-urlencoded ： <form encType="">中默认的encType，form表单数据被编码为key/value格式发送到服务器（表单默认的提交数据的格式）

multipart/form-data ： 需要在表单中进行文件上传时，就需要使用该格式
```

>https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types
