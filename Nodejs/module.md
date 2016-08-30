##模块简介


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

* 在一个模块中通过var定义的变量，其作用域范围是当前模块，外部不能够直接的访问
* 如果我们想一个模块能够访问另外一个模块中定义的变量，可以：
    * 1.把变量作为global对象的一个属性，但是这样的做法是推荐
    * 2.使用模块对象 module


在模块作用域，还有一个内置的模块对象，`exports`，他其实就是`module.exports`。

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

这是因为`exports`本身就只是`module.exports`的引用，而使用`require`加载模块的时候返回的是`module.exports`，`exports=bar`改变了`exports`的引用，所以最终返回的`module.exports`只是一个空对象，所以会报`TypeError`的错误。
