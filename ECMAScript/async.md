
<!-- toc orderedList:0 depthFrom:1 depthTo:6 -->

* [async](#async)
    * [Promise 对象](#promise-对象)
    * [async 函数的实现原理](#async-函数的实现原理)

<!-- tocstop -->

# async
`async`可以看做是 `Generator` 函数的语法糖。

```js
var asyncRead = async function () {
  var f1 = await 12*12;
  var f2 = await 14*13;
  console.log(f1.toString());
  console.log(f2.toString());
};
var res=asyncRead();
//144
//182
```
`async`函数自带执行器，与普通函数一模一样，只要一行。不像Generator函数，需要调用`next`方法。

`yield`命令后面只能是 Thunk 函数或 Promise 对象，而`async`函数的`await`命令后面，可以是Promise 对象和原始类型的值。

`async`函数返回的是 Promise 对象，可以使用then方法添加回调函数。

```js
// 函数声明
async function foo() {}

// 函数表达式
const foo = async function () {};

// 对象的方法
let obj = { async foo() {} };
obj.foo().then(...)
```
## Promise 对象

`return`语句返回的值，会成为`then`方法回调函数的参数。`async`函数内部抛出错误，会导致返回的 Promise 对象变为reject状态。抛出的错误对象会被`catch`方法回调函数接收到。

```js
async function f() {
  await Promise.reject('出错了');
  await Promise.resolve('hello world'); // 不会执行
}

f()
.then(v => console.log(v))
.catch(e => console.log(e))
// 出错了
```

如果不想后序的代码中断，可以使用`try...catch`结构。

```js
async function f() {
  try {
    await Promise.reject('出错了');
  } catch(e) {
  }
  return await Promise.resolve('hello world');
}

f()
.then(v => console.log(v))
// hello world
```

或者后面添加一个`catch`方法：

```js
async function f() {
  await Promise.reject('出错了')
    .catch(e => console.log(e));
  return await Promise.resolve('hello world');
}

f()
.then(v => console.log(v))
// 出错了
// hello world
```

## async 函数的实现原理

`async` 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。

```js
async function fn(args) {
  // ...
}

// 等同于

function fn(args) {
  return spawn(function* () {
    // ...
  });
}
```
