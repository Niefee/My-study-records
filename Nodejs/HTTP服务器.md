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

`fs`是NodeJS提供的标准库，封装了各类文件处理操作。
`fs.readFileSync`就是将文件内容读取出来，返回一个字符串。
`__dirname是NodeJS`内置的变量，表明当前脚本（也就是hello.js）所在的文件夹位置。

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


路由转换

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


>$netstat -anp tcp

查看端口占用情况

>kill -9 XXX

杀死某PID进程

>lsof -i:80

查看某端口占用情况，i参数表示网络链接，:80指明端口号，该命令会同时列出PID，方便kill













