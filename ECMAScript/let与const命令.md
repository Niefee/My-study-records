
<!-- toc orderedList:0 -->

- [let命令](#let命令)
	- [基本用法](#基本用法)
	- [变量声明](#变量声明)
	- [块级作用域](#块级作用域)
- [const命令](#const命令)
	- [基本用法](#基本用法)

<!-- tocstop -->
# let命令
## 基本用法

ES6新增了`let`命令，用来声明变量。它的用法类似于var，但是所声明的变量，只在let命令所在的代码块内有效。

```js
{
  let a = 10;
  var b = 1;
}

a // ReferenceError: a is not defined.
b // 1
```


`for`循环适合使用`let`命令，计数器`i`只在循环体内有效。

```js
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 10

var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6
```

## 变量声明

`let`不存在声明提升，它声明的变量绑定所在的块级作用域，凡是在声明之前就使用这些变量，就会报错。而且不可重复声明。

```js
var tmp = 123;

if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}
```
## 块级作用域

```js
function f1() {
  let n = 5;
  if (true) {
    let n = 10;
  }
  console.log(n); // 5
}
```

块级作用域内，外层代码不受内层代码块的影响,而且外层作用域无法读取内层作用域的变量，内层作用域可以定义外层作用域的同名变量。

应该避免在块级作用域内声明函数，如有必要，可以写成函数表达式。

# const命令

## 基本用法

`const`声明一个只读的常量。一旦声明，常量的值就不能改变。

```js
const PI = 3.1415;
PI // 3.1415

PI = 3;
// TypeError: Assignment to constant variable.
```

`const`的作用域与`let`命令相同：只在声明所在的块级作用域内有效。

对于符合类型的变量，变量名不指向数据，而是指向数据所在的地址。

`const`命令只是保证变量名指向的地址不变，并不保证该地址的数据不变。

```js
const foo = {};
foo.prop = 123;

foo.prop
// 123
```
