##新建服务器


####get请求
```js
//比喻：打开浏览器
var xhr = new XMLHttpRequest();
//比喻：在地址栏输入地址
xhr.open('get','1.txt',true);

/*open方法
	参数
		1.打开方式
		2.地址
		3.是否异步
			异步(true):非阻塞 前面的代码不会影响后面代码的执行
			同步(false):阻塞 前面的代码会影响后面代码的执行*/
//如果URL含有中文，会出现乱码，要使用`encodeURI`编码URL。

//提交
xhr.send();

//等待服务器返回内容
xhr.onreadystatechange = function() {

	if ( xhr.readyState == 4 ) {
		alert( xhr.responseText );
	}

```

`readyState`取值：

 - 0：请求未初始化（还没有调用 open()）。
 - 1：请求已经建立，但是还没有发送（还没有调用 send()）。
 - 2：请求已发送，正在处理中（通常现在可以从响应中获取内容头）。
 - 3：请求在处理中；通常响应中已有部分数据可用了，但是服务器还没有完成响应的生成。
 - 4：响应已完成；您可以获取并使用服务器的响应了。

从发送请求到对后端的返回的数据进行处理的状态值变化。
但如果没有相应的文件，也有错误信息返回，这是状态值也是一样，所有还需要加入`status`：

	status : 服务器状态，http状态码
	status == 200

返回的是字符串，使用`JSON.parse()`把字符串转换为`json`对象。

`JSON.stringify()`可以把一个对象转换成字符串。

使用`JSON.parse()`、`JSON.stringify()`需严格遵守JSON规范，如属性都需用双引号引起来

###post请求

```js
try {
	xhr = new XMLHttpRequest();
} catch (e) {
	xhr = new ActiveXObject('Microsoft.XMLHTTP');
}

xhr.open('post','2.post.php',true);
//post方式，数据放在send()里面作为参数传递
xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
//申明发送的数据类型
//post没有缓存问题
//无需编码
xhr.send('username=刘伟&age=30');
```


###错误处理

try、catch、throw

```js
//var a=12;
try {
    //代码尝试执行这个块中的内容,如果有错误，则会执行catch{}，	并且传入错误信息参数
    console.log(a);
    //自己主动抛出错误，但参数接受的是第一个错误。
    throw new Error('错了错了');
} catch (e) {
    console.log("哈哈哈");
    console.log(e)
}
console.log('结束了。。。')
```
