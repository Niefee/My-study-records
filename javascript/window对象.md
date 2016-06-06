[TOC]
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

##navigator对象

 - navigator.userAgent属性

返回浏览器的User-Agent字符串，用来标示浏览器的种类。

我目前浏览器信息：

>mozilla/5.0 (windows nt 10.0; wow64) applewebkit/537.36 (khtml, like gecko) chrome/50.0.2661.94 safari/537.36"

>参考：http://javascript.ruanyifeng.com/bom/window.html 