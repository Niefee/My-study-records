# Nodejs简易服务器
```js
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
