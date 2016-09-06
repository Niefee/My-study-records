##http请求

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

    //console.log(req);

    //res.write('hello');

    res.setHeader('miaov', 'leo');

    res.writeHead(200, 'miaov', {
        //'content-type' : 'text/plain'

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


 - `listening事件`：当server调用listen方法并成功开始监听以后触发的事件。

 - `error事件`：当有客户端发送请求道该主机和端口的请求的时候触发
     + 参数request：http.IncomingMessage的一个实例，通过他我们可以获取到这次请求的一些信息，比如信息，数据等。
     + 参数response：http:http.ServerResponse的一个实例，通过他我们可以向该请求的客户端输出返回的响应。

##路由绑定

通过`app.get()`或者`app.post()`等方法可以把一个URL路径或N个函数进行绑定。

        app.get('/',function(req,res,next){})

 - req:request对象 -- 保存客户端请求相关的一些数据
 - res：response对象 --服务端输出对象，提供了一些服务端输出相关的一些方法 -http.response
 - next:方法，用于执行下一个和路径匹配的函数
