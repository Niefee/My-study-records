##概述

**CommonJS**规范中，每个模块可以是一个文件，一个文件也可以就是一个函数。
所以每个模块就是一个单独的作用域。

```js
// example.js
var x = 5;
var addX = function(value) {
  return value + x;
};
```

    global.warning = true;

**global**对象可以在多个文件分享，但不建议使用。

**CommonJS**规定，每个文件的对外接口是**module.exports**对象。

```js
var x = 5;
var addX = function(value) {
  return value + x;
};
module.exports.x = x;
module.exports.addX = addX;
```

在另一个文件，可以利用`require`对象加载这个文件，

```js
var example = require('./example.js');

console.log(example.x); // 5
console.log(example.addX(1)); // 6
```

**CommonJS**的特点：

 - 所有模块都运行在模块作用域，不会污染全局作用域。
 - 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就会被缓存，以后再加载都是读取缓存。
 - 模块加载的顺序，按照其在代码中出现的顺序。


**CommonJS**规范加载模块是同步的，也就是说，只有加载完成，才能执行后面的操作。

##基本用法

内置的`require`命令用于加载模块文件。

`require`命令的基本功能是，读入并执行一个`JavaScript`文件，然后返回该模块的exports对象。

如果模块输出的是一个函数，那就不能定义在`exports`对象上面，而要定义在`module.exports`变量上面。

```js
module.exports = function () {
  console.log("hello world")
}
//如何module.exports还有其他子对象，将会给覆盖，不建议这样使用。


//另一个文件
require('./example2.js')()
```


>http://javascript.ruanyifeng.com/nodejs/module.html  





