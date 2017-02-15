##服务器流程

1. 用户通过浏览器发送一个http的请求到指定的主机
2. 服务器接收到该请求，对该请求进行分析和处理
3. 服务器处理完成以后，返回对应的数据到用户机器
4. 浏览器接收服务器返回的数据，并根据接收到的进行分析和处理

客户端  ==》》  服务端

由客户端发送一个http请求到指定的服务端 -> 服务端接收并处理请求 -> 返回数据到客户端


##创建服务器

```js
//hello.js
var http = require('http');
var server = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello, Node!\n');
});
server.listen(1337, '127.0.0.1');
```

    node hello.js //在终端运行这个脚本

如果要添加任意的HTML内容，可以通过`fs`模块读取`index.html`的内容，然后返回：

```js
//hello.js
var http = require('http');
var fs = require('fs');
var server = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    var html = fs.readFileSync(__dirname + '/index.html').toString();
    res.end(html);
});
server.listen(1337, '127.0.0.1');
```
```js
//本地服务器
var http=require('http');
var url=require('url');
var fs=require('fs');
http.createServer(function(req,res){
    var urlObj=url.parse(req.url);
    var pathname=urlObj.pathname;
    var query=urlObj.query;

    if(pathname==='/'){
        readFileAndResponse('index.html',res);
    }else if(pathname === '/ajax'){
        res.end('"msg":"this is is json response"');
    }else{
        readFileAndResponse(pathname,res);
    }
}).listen(8080);

function readFileAndResponse(pathname,response){
    fs.readFile(pathname.substr(1),'utf-8',function(err,data){
        if (err) {
            response.writeHead(404);
            response.end('file not found');
        }else{
            response.end(data);
        }

    });
}

```

`fs`是NodeJS提供的标准库，封装了各类文件处理操作。
`fs.readFileSync`就是将文件内容读取出来，返回一个字符串。
`__dirname`是NodeJS内置的变量，表明当前脚本（也就是hello.js）所在的文件夹位置。

`ajax`请求：


```js
    function ajaxload(){
    var result = document.getElementById('result');
    // 创建一个 AJAX 请求
    var xhr = new XMLHttpRequest();
    // 打开URL：/date
    xhr.open('GET', 'url.xx', true);
    // xhr 状态改变的处理函数
    xhr.onreadystatechange=function(){
    // 状态为4表示响应已就绪；状态码200表示成功的响应
    if (xhr.readyState==4 && xhr.status==200)
      // 显示响应文本
      result.innerHTML=xhr.responseText;
    }
    xhr.send();
    }
```

##路由转换

```js
var http = require('http');
var fs = require('fs');
var server = http.createServer(function (req, res) {
    var html;
    if (req.url === '/account/signin') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        html = fs.readFileSync(__dirname + '/signin.html');
        res.end(html);
    } else if (req.url === '/account/signup') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        html = fs.readFileSync(__dirname + '/signup.html');
        res.end(html);
    } else {
        res.writeHead(404);
        res.end('Resource Not Found');
    }

});
server.listen(1337, '127.0.0.1');
```

可以在首页设置`a`标签链接，对于不同的链接，都会查询服务器，然后服务器都对跳转链接做出反应。


##快速创建服务器

首先需要 全局安装 http-server

    npm install -g http-server

http-server 启动

    http-server -a 127.0.0.1 -p 7070

上面的一句命令启动了一个node.js 的静态服务器. 监听本地 7070 端口.
静态目录就是当前运行 命令所在的目录

如果你的当前项目中存在 `public`文件夹,那么默认静态目录会指定到 `public`
如果没有 `public `文件夹,那么静态目录就是 根目录 `./`


你可以把 `http-server -a 127.0.0.1 -p 7070` 写入到 `package.json `文件中的 scripts 节点

```js
"scripts": {
   "start": "http-server -a 127.0.0.1 -p 7070"
 }
```

>这样就可以通过  npm start 来启动静态服务器
>>详细参数：http://yijiebuyi.com/blog/359ff66c69934c178dfa8baa32427aef.html

###命令行操作

>netstat -anp tcp

查看端口占用情况

>kill -9 XXX

杀死某PID进程

>lsof -i:80

查看某端口占用情况，i参数表示网络链接，:80指明端口号，该命令会同时列出PID，方便kill
