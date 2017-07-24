
<!-- @import "[TOC]" {cmd:"toc", depthFrom:1, depthTo:6, orderedList:false} -->

<!-- code_chunk_output -->

* [window对象](#window对象)
	* [概述](#概述)
	* [窗口](#窗口)
	* [navigator对象](#navigator对象)
	* [BOM对象](#bom对象)
		* [`window`下的全局变量:](#window下的全局变量)

<!-- /code_chunk_output -->

# window对象

##概述

javascript所有对象都在`window`这个**顶层对象**之中。

```js
var a = 1;
window.a // 1
```

>所有未声明就赋值的变量都自动变成window对象的属性。

##窗口

 - window.screenX，window.screenY

返回浏览器窗口左上角相对于当前屏幕左上角（(0, 0)）的水平距离和垂直距离，单位为像素。

 - window.innerHeight，window.innerWidth

返回网页在当前窗口中可见部分的高度和宽度，即“视口”（viewport），单位为像素。

 - window.outerHeight，window.outerWidth

返回浏览器窗口的高度和宽度，包括浏览器菜单和边框，单位为像素。

 - window.pageXOffset属性，window.pageYOffset属性

window.pageXOffset属性返回页面的水平滚动距离，window.pageYOffset属性返回页面的垂直滚动距离，单位都为像素。

 - screen.height、screen.width

`screen.availHeight`和`screen.availWidth`属性返回屏幕可用的高度和宽度，单位为像素。它们的值为屏幕的实际大小减去操作系统某些功能占据的空间，比如系统的任务栏。

`screen.colorDepth`属性返回屏幕的颜色深度，一般为16（表示16-bit）或24（表示24-bit）。

##navigator对象

 - navigator.userAgent属性

返回浏览器的User-Agent字符串，用来标示浏览器的种类。

我目前浏览器信息：

>mozilla/5.0 (windows nt 10.0; wow64) applewebkit/537.36 (khtml, like gecko) chrome/50.0.2661.94 safari/537.36"

>参考：http://javascript.ruanyifeng.com/bom/window.html

浏览器窗体模型:

$(window)：  浏览器显示网页内容的部分

$(document):整个网页文档流

$("body"):就是body

>http://www.cnblogs.com/luhe/archive/2012/11/08/2760619.html


##BOM对象

window 也是 BOM 的一个对象，除去编程意义上的“兜底对象”之外，通过这个对象可以获取窗口位置、确定窗口大小、弹出对话框等等。例如我要关闭当前窗口：

    window.close();

DOM 是为了操作文档出现的 API，document 是其的一个对象；

BOM 是为了操作浏览器出现的 API，window 是其的一个对象。


###`window`下的全局变量:

 - `innerHeight/innerWidth`：浏览器窗口内部高度/宽度；

 - `navigator`：包含有关访问者浏览器的信息；

 - `screen`：访问者屏幕的宽度，以像素计；

 - `setTimeout()/clearTimeout()`：定时器/取消定时；

 - `document.cookie`：现在多数网站使用Cookie来识别用户。

 - `window.location`:对象用于访问当前 URL，或者导航到新的页面。
     + `hostname`：web 主机的域名
     + `pathname`：当前页面的路径和文件名
     + `port`：web 主机的端口
     + `protocol`：所使用的 web 协议（http:// 或 https://）
     + `href`：当前url，对它赋值可以实现重定向
     + `reload()`：这是一个方法，调用后会刷新当前页面

 - `window.history`:提供浏览器历史的操作
     + `history.back()`：与在浏览器点击后退按钮相同
     + `history.forward()`：与在浏览器中点击按钮向前相同








