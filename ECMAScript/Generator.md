
<!-- toc orderedList:0 depthFrom:1 depthTo:6 -->

* [Generator](#generator)
    * [简介](#简介)
    * [yield语句](#yield语句)
    * [与 Iterator 接口的关系](#与-iterator-接口的关系)
    * [next方法的参数](#next方法的参数)
    * [for...of循环](#forof循环)
    * [Generator.prototype.return()](#generatorprototypereturn)
    * [yield* 语句](#yield-语句)
    * [Generator函数的this](#generator函数的this)

<!-- tocstop -->

# Generator
## 简介

`Generator函数`是一个状态机，封装了多个内部状态。执行 Generator 函数会返回一个遍历器对象，可以依次遍历 `Generator函数` 内部的每一个状态。

`Generator函数`特征：

1. `function`关键字与函数名之间有一个星号
2. 函数体内部使用`yield`语句，定义不同的内部状态（`yield`在英语里的意思就是“`产出`”）。

```js
function* helloWorldGenerator() {
  console.log('我执行了。');
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();//函数并不会执行
```

必须要调用`next`方法，内部指针指向下一个位置。
`yield`语句是暂停执行的标记，而`next`方法可以恢复执行。

## yield语句

运行逻辑如下:

1. 遇到`yield`语句，就暂停执行后面的操作，并将紧跟在`yield`后面的那个表达式的值，作为返回的对象的`value`属性值。
2. 下一次调用`next`方法时，再继续往下执行，直到遇到下一个`yield`语句。
3. 如果没有再遇到新的`yield`语句，就一直运行到函数结束。如果遇到`return`语句，将`return`语句后面的表达式的值，作为返回的对象的value属性值，并结束后面的`yield`语句。
4. 如果该函数没有`return`语句，则返回的对象的`value`属性值为`undefined`。

`yield`语句只能用在`Generator`函数中，其他函数（例如立刻执行函数）会报错。

## 与 Iterator 接口的关系

由于Generator函数就是遍历器生成函数，因此可以把Generator赋值给对象的`Symbol.iterator`属性，从而使得该对象具有Iterator接口。

```js
var myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

[...myIterable] // [1, 2, 3]
```

Generator函数执行后，返回一个遍历器对象。该对象本身也具有`Symbol.iterator`属性，执行后返回自身。

```js
function* gen(){
  // some code
}

var g = gen();

g[Symbol.iterator]() === g
// true
```

## next方法的参数

`yield`句本身没有返回值，或者说总是返回`undefined`。`next`方法可以带一个参数，**该参数就会被当作上一个`yield`语句的返回值**。

```js
function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}

var a = foo(5);
a.next() // Object{value:6, done:false}
a.next() // Object{value:NaN, done:false}
a.next() // Object{value:NaN, done:true}

var b = foo(5);
b.next() // { value:6, done:false }
b.next(12) // { value:8, done:false }
b.next(13) // { value:42, done:true }
```

## for...of循环

`for...of`循环可以自动遍历Generator函数时生成的`Iterator`对象，且此时不再需要调用`next`方法。

```js
function *foo() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  return 6;
}

for (let v of foo()) {
  console.log(v);
}
// 1 2 3 4 5
```

## Generator.prototype.return()

Generator函数返回的遍历器对象，还有一个`return`方法，可以返回给定的值，并且终结遍历`Generator`函数。

```js
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

var g = gen();

g.next()        // { value: 1, done: false }
g.return('foo') // { value: "foo", done: true }
g.next()        // { value: undefined, done: true }
```
调用`return`方法后，Generator函数的遍历就终止了。

## yield* 语句

如果在 Generator 函数内部，调用另一个 Generator 函数，默认情况下是没有效果的。

```js
function* foo() {
  yield 'a';
  yield 'b';
}

function* bar() {
  yield 'x';
  foo();
  yield 'y';
}

for (let v of bar()){
  console.log(v);
}
// "x"
// "y"
```

`yield*`语句，用来在一个 Generator 函数里面执行另一个 Generator 函数。

```js
function* bar() {
  yield 'x';
  yield* foo();
  yield 'y';
}

for (let v of bar()){
  console.log(v);
}
// "x"
// "a"
// "b"
// "y"
```

## Generator函数的this

 Generator函数总是返回一个遍历器，ES6规定这个遍历器是Generator函数的实例，也继承了Generator函数的`prototype`对象上的方法。

```js
function* g() {}

g.prototype.hello = function () {
return 'hi!';
};

let obj = g();

obj instanceof g // true
obj.hello() // 'hi!'
```
