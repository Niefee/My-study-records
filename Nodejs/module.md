
<!-- toc orderedList:0 depthFrom:1 depthTo:6 -->

* [module](#module)
    * [模块简介](#模块简介)

<!-- tocstop -->

# module
## 模块简介


 * 1.首先按照加载的模块的文件名称进行查找
 * 2.如果没有找到，则会在模块文件名称后加上.js的后缀，进行查找
 * 3.如果还没有找到，则会在文件名称后加上.json的后缀，进行查找
 * 4.如果还没有，则会在文件名称后加上.node的后缀，进行查找


>文件名称 -> .js -> .json -> .node

所有的exports收集到的属性和方法，都赋值给了`module.exports`。当然，这有个前提，就是`module.exports`本身不具备**相同**属性和方法。如果，`module.exports`已经具备一些属性和方法，那么exports收集来的**相同**信息将被忽略。

Nodejs加载模块

```js
//导出函数
exports.a = function() {
    console.log();
};

//导出变量
exports.b=10;

```

* 在模块中定义的变量，其作用域范围是当前模块，外部不能够直接的访问
* 如果我们想一个模块能够访问另外一个模块中定义的变量，可以：
    * 1.把变量作为global对象的一个属性，但是这样的做法是推荐
    * 2.使用模块对象 module

```js
//使用`global`定义的是全局模块，
global.a = 200;
```

`exports`是`module.exports`的引用。

可以使用`exports.xxx`或者`module.exports.xxx`写入变量或者函数方法等。

不能有`module.exports=xxx`，这样`module.exports`与`exports`的关系就会断开。


`exports`错误引用
```js
//bar.js
console.log( module.exports === exports );
var bar = function(){
    console.log(‘it is bar’);
};
console.log( module.exports === exports );
exports = bar;
console.log( module.exports === exports );
//output
//true
//true
//false


//use-bar.js
var bar = require(‘./bar.js’);
bar();  //这个会报错：TypeError: object is not a function

```
