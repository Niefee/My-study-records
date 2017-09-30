
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [http模块](#http模块)
	* [简单的http服务器](#简单的http服务器)
	* [content-type与MIME类型](#content-type与mime类型)

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

## content-type与MIME类型

MIME，即：Multipurpose Internet Mail Extensions，多用途互联网邮件扩展类型。

服务端利用`content-type`设置传输传输文件的`MIME`类型，浏览器经常使用`MIME`类型来决定执行何种默认行为。

```text
text/html ： HTML格式
text/plain ：纯文本格式
image/jpeg ：jpg图片格式
image/png：png图片格式

// 以application开头的媒体格式类型：

application/msword  ： Word文档格式
application/octet-stream ： 二进制流数据（如常见的文件下载）
application/x-www-form-urlencoded ： <form encType="">中默认的encType，form表单数据被编码为key/value格式发送到服务器（表单默认的提交数据的格式）

multipart/form-data ： 需要在表单中进行文件上传时，就需要使用该格式。属于细分领域的文件类型的种类
```

**通用结构**

```
type/subtype
// 由类型与子类型两个字符串中间用“/”分隔而组成。
```

类型	| 描述	|	典型示例
-----|----------|------------
 text |  表明文件是普通文本，理论上是可读的语言 |  text/plain(通用), text/html, text/css, text/javascript
 image |  表明是某种图像。不包括视频，但是动态图（比如动态gif）也使用image类型 |  mage/gif, image/png, image/jpeg, image/bmp, image/webp
 audio | 表明是某种音频文件  |  	audio/midi, audio/mpeg, audio/webm, audio/ogg, audio/wav
 video | 表明是某种视频文件  |  video/webm, video/ogg
 application | 表明是某种二进制数据  |  application/octet-stream(通用), application/pkcs12, application/vnd.mspowerpoint, application/xhtml+xml, application/xml,  application/pdf

 >https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types
