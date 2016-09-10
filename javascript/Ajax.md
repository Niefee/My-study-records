##新建服务器



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

//提交
xhr.send();

//等待服务器返回内容
xhr.onreadystatechange = function() {

	if ( xhr.readyState == 4 ) {
		alert( xhr.responseText );
	}

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
