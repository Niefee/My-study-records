# Module

ES6 模块的设计思想，是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。
ES6 模块不是对象，而是通过`export`命令显式指定输出的代码，再通过`import`命令输入。

## 严格模式

ES6模块默认使用严格模式，不管是否有`use strict`。

严格模式特点：

 - 变量必须声明后再使用
 - 函数的参数不能有同名属性，否则报错
 - 不能使用`with`语句
 - 不能对只读属性赋值，否则报错
 - 不能使用前缀0表示八进制数，否则报错
 - 不能删除不可删除的属性，否则报错
 - 不能删除变量`delete prop`，会报错，只能删除属性`delete global[prop]`
 - `eval`不会在它的外层作用域引入变量
 - `eval`和`arguments`不能被重新赋值
 - arguments不会自动反映函数参数的变化
 - 不能使用`arguments.callee`
 - 不能使用`arguments.caller`
 - 禁止this指向全局对象，实际会指向`undefined`
 - 不能使用`fn.caller`和`fn.arguments`获取函数调用的堆栈
 - 增加了保留字（比如`protected`、`static`和`interface`）

## export 命令

```js
export var firstName = 'Michael';

var year = 1958;
export {year};
```
`export`命令不可以在块级作用域内使用。

`export`命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。
不可以直接输出值。
```js

// 报错
export 1;

// 报错
var m = 1;
export m;
```

`export`的接口与对应的值是动态绑定的，取到的是模块内部实时的值。
```js
export var foo = 'bar';
setTimeout(() => foo = 'baz', 500);
```

## import 命令

使用`import`模块加载`export`定义的对外接口。

`import`导入模块与`export`对外接口的名称必须相同。

```js
// main.js
import {firstName, lastName, year} from './profile';

function setName(element) {
  element.textContent = firstName + ' ' + lastName;
}
```
`import`的特点：

1. `import`命令有提升效果，提升到头部首先执行。
2. `import`是静态执行，不能使用表达式或者变量。
3. `import`同一个模块多次，也只会执行一次。


整体加载：

```js
import * as circle from './circle';

console.log('圆面积：' + circle.area(4));
console.log('圆周长：' + circle.circumference(14));
```
会一起加载模块当中的两个方法。

## 默认模块加载

```js
// 第一组
export default function crc32() { // 输出
  // ...
}

import crc32 from 'crc32'; // 输入

// 第二组
export function crc32() { // 输出
  // ...
};

import {crc32} from 'crc32'; // 输入
```
一个模块只能有一个默认输出,`export default`命令只能使用一次。
`export default`本质是将该命令后面的值，赋给`default`变量。

>参考：
> http://es6.ruanyifeng.com/#docs/module

## 使用备注

`import`与`export`命令在Nodejs环境中不支持，建议使用`traceur`运行ES6代码文件。

安装：
```bash
#本地安装，
npm install traceur -D
#然后调用二进制文件
node_modules/.bin/traceur a.js


# 也可以全局安装
npm install traceur -g
# 调用命令

traceur a.js
```

## 脚本异步加载

`script`标签如果有`defer`或`async`属性，脚本就会异步加载。

区别：
 - defer：整个页面正常渲染结束，才会执行
 - async：一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染。

多个`defer`脚本会按顺序加载，`async`不能包证按顺序加载。

## ES6 模块与 CommonJS 模块的差异

区别：
 - CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
 - CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。

ES6`import`的模块原始值变了，import加载的值也会跟着变。

```js
// lib.js
export let counter = 3;
export function incCounter() {
  counter++;
}

// main.js
import { counter, incCounter } from './lib';
console.log(counter); // 3
incCounter();
console.log(counter); // 4
```
模块变量是一个“符号链接”，只读，赋值会报错。
```js
// lib.js
export let obj = {};

// main.js
import { obj } from './lib';

obj.prop = 123; // OK
obj = {}; // TypeError
```


CommonJS模块如果是原始类型的值，不会影响输出值，但可以写成函数，会等到变动后的结果。

```js
// lib.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  get counter() {
    return counter
  },
  incCounter: incCounter,
};

// main.js
var mod = require('./lib');

console.log(mod.counter);  // 3
mod.incCounter();
console.log(mod.counter); // 4
```
