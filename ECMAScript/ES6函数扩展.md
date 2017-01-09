
<!-- toc orderedList:0 depthFrom:1 depthTo:6 -->

- [ES6函数扩展](#es6函数扩展)
	- [函数默认值](#函数默认值)
		- [默认允许使用解构赋值](#默认允许使用解构赋值)
		- [函数的length属性](#函数的length属性)
		- [作用域](#作用域)
	- [rest参数](#rest参数)
	- [扩展运算符](#扩展运算符)
	- [箭头函数](#箭头函数)

<!-- tocstop -->

# ES6函数扩展

## 函数默认值

ES6可以直接在把默认值写在参数后面。

```js
function log(x, y = 'World') {
  console.log(x, y);
}

log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello
```

参数是默认声明，不能再使用`let`或者`const`。

### 默认允许使用解构赋值

```js
function foo({x, y = 5}) {
  console.log(x, y);
}

foo({}) // undefined, 5
foo({x: 1}) // 1, 5
foo({x: 1, y: 2}) // 1, 2
foo() // TypeError: Cannot read property 'x' of undefined
```

格式不正确会报错。

对象解构默认值

```js
// 写法一
function m1({x = 0, y = 0} = {}) {
  return [x, y];
}

// 写法二
function m2({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}
```

写法一的意思是函数参数的默认值是**空对象**，但设置了对象解构赋值的默认值。

写法二的函数参数默认值是一个**具体属性的对象**但没有设置对象解构赋值的默认值。

>通常情况下，定义了默认值的参数，应该是函数的尾参数。
>只有参数严格等于undefined，默认值才会生效。

### 函数的length属性

函数的`length`属性，不会计算有默认值以及其后面的参数个数。

```js
(function (a = 0, b, c) {}).length // 0
(function (a, b = 1, c) {}).length // 1
```

### 作用域

如果一个函数的默认值是一个变量，该变量的作用域是先函数作用域，再全局作用域。

```js
let x = 1;

function f(y = x) {
  let x = 2;
  console.log(y);
}

f() // 1
```

上面代码中，函数调用时，`y`的默认值变量`x`尚未在函数内部生成，所以`x`指向全局变量。
如果全局全局作用域不存在，就会报错。

参数默认值设为`undefined`，表明这个参数是可以省略的。

## rest参数

[rest参数](https://note.niefee.com/ECMAScript/ES6%E6%95%B0%E7%BB%84%E6%89%A9%E5%B1%95.html#rest运算符)

`rest`参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。
函数的`length`属性，不包括`rest`参数。

## 扩展运算符

它好比`rest`参数的逆运算，将一个数组转为用逗号分隔的参数序列。

[扩展运算符](https://note.niefee.com/ECMAScript/ES6%E6%95%B0%E7%BB%84%E6%89%A9%E5%B1%95.html#扩展运算符)

主要用于函数的调用。

```js
function add(x, y) {
  return x + y;
}

var numbers = [4, 38];
add(...numbers) // 42
```

只要含有`Iterator`接口的对象，都可以用扩展运算符转为真正的数组。

```js
var nodeList = document.querySelectorAll('div');
var array = [...nodeList];
```

## 箭头函数

ES6允许使用“箭头”（`=>`）定义函数。

```js
var sum = (num1, num2) => num1 + num2;
// 等同于
var sum = function(num1, num2) {
  return num1 + num2;
};
```

`rest`参数与箭头函数结合的例子。

```js
const numbers = (...nums) => nums;

numbers(1, 2, 3, 4, 5)
// [1,2,3,4,5]

const headAndTail = (head, ...tail) => [head, tail];

headAndTail(1, 2, 3, 4, 5)
// [1,[2,3,4,5]]
```

注意：

1. 函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。

2. 不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。

3. 不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用Rest参数代替。

4. 不可以使用yield命令，因此箭头函数不能用作Generator函数。


实际上箭头函数根本没有自己的this，导致内部的this就是外层代码块的this。

```js
// ES6
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}
//等同于
// ES5
function foo() {
  var _this = this;

  setTimeout(function () {
    console.log('id:', _this.id);
  }, 100);
}
```

## 绑定this

ES7提案中有，函数绑定运算符是并排的两个双冒号（`::`），双冒号左边是一个对象，右边是一个函数。该运算符会自动将左边的对象，作为上下文环境（即`this`对象），绑定到右边的函数上面。

```js
foo::bar;
// 等同于
bar.bind(foo);

foo::bar(...arguments);
// 等同于
bar.apply(foo, arguments);

const hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return obj::hasOwnProperty(key);
}
```

## 尾调用

指某个函数的最后一步是调用另一个函数。

```js
function f() {
  let m = 1;
  let n = 2;
  return g(m + n);
}
f();

// 等同于
function f() {
  return g(3);
}
f();

// 等同于
g(3);
```

上面代码中，如果函数g不是尾调用，函数f就需要保存内部变量m和n的值、g的调用位置等信息。但由于调用g之后，函数f就结束了，所以执行到最后一步，完全可以删除 f(x) 的调用帧，只保留 g(3) 的调用帧。

这就叫做“尾调用优化”（Tail call optimization），即只保留内层函数的调用帧。如果所有函数都是尾调用，那么完全可以做到每次执行时，调用帧只有一项，这将大大节省内存。这就是“尾调用优化”的意义。

>[参考](http://es6.ruanyifeng.com/?search=import&x=15&y=8#docs/function)
