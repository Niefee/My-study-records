
<!-- toc orderedList:0 depthFrom:1 depthTo:6 -->

* [Promise](#promise)
    * [Promise简介](#promise简介)
    * [Promise.prototype.then()](#promiseprototypethen)
    * [Promise.prototype.catch](#promiseprototypecatch)
    * [Promise.all()](#promiseall)
    * [Promise.race()](#promiserace)
    * [Promise.resolve()](#promiseresolve)
    * [Promise.reject()](#promisereject)
    * [done()](#done)
    * [finally()](#finally)

<!-- tocstop -->

# Promise

## Promise简介

`Promise`有三种状态，`Pending`（进行中）、`Resolved`（已完成）、`Rejected`（已失效）。
`Promise`对象的状态改变，只有两种可能：从`Pending`变为`Resolved`和从`Pending`变为`Rejected`。

```js
var myFirstPromise = new Promise(function(resolve, reject){
    console.log('1>>');
    setTimeout(function(){
        resolve("成功!>>>");
    }, 1000);
});

myFirstPromise.then(function(successMessage){
    console.log("Yeah! " + successMessage);
});
//1>>
//1000毫秒后打印下面内容
//Yeah! 成功!>>>
```

`resolve`函数的作用是，将`Promise`对象的状态从“未完成”变为“成功”（即从`Pending`变为`Resolved`），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；`reject`同理。

一般都结果进行判断，然后决定是调用哪个函数。
```js
var promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

失败的话，会在调用`catch`方法后的回调函数。
```js
function asyncFunction() {
    return new Promise(function (resolve, reject) {
        reject ('reject -- Hello world');
    });
}
asyncFunction().then(function (value) {
    console.log(value);   
}).catch(function (error) {
    console.log('err>>>',error);
});
```

## Promise.prototype.then()

`then`方法返回的是一个新的`Promise`实例（注意，不是原来那个Promise实例）。因此可以采用链式写法。

```js
var p1=new Promise(function(resolve,reject){
    setTimeout(()=>{
        console.log('p1>>>');
        resolve('hei')
    },1000);
});

p1.then(
    function(res){
        console.log('res>>',res);
        return 'boy';
    }
).then(function(res){
    console.log('Good');
    console.log('res>>',res);
}).catch(err=>console.log('err>',err))


// p1>>>
// res>> hei
// Good
// res>> boy
```

前一个`then`方法的如果有返回值，会作为下一个`then`方法的参数。

## Promise.prototype.catch

`Promise.prototype.catch`方法是`.then(null, rejection)`的别名，用于指定发生错误时的回调函数。

如果异步操作抛出错误，状态就会变为`Rejected`，就会调用`catch`方法指定的回调函数，处理这个错误。

```js
var promise = new Promise(function(resolve, reject) {
  throw new Error('test');
});
promise.catch(function(error) {
  console.log(error);
});
// Error: test
```

## Promise.all()

```js
var p = Promise.all([p1, p2, p3]);
```

`Promise.all`方法接受一个数组作为参数，`p1`、`p2`、`p3`都是Promise对象的实例。

所有参数的状态都为`fulfilled`，`p`的状态才会是`fulfilled`。
或者其中一个是`rejected`，`p`的状态就会变成`rejected`。

```js
// 生成一个Promise对象的数组
var promises = [2, 3, 5, 7, 11, 13].map(function (id) {
  return getJSON("/post/" + id + ".json");
});

Promise.all(promises).then(function (posts) {
  // ...
}).catch(function(reason){
  // ...
});
```

## Promise.race()

```js
var p = Promise.race([p1, p2, p3]);
```

上面代码中，只要`p1`、`p2`、`p3`之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。

```js
const p = Promise.race([
  fetch('/resource-that-may-take-a-while'),
  new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('request timeout')), 5000)
  })
]);
p.then(response => console.log(response));
p.catch(error => console.log(error));
```
如果5秒之内`fetch`方法无法返回结果，变量`p`的状态就会变为`rejected`，从而触发`catch`方法指定的回调函数。

## Promise.resolve()

```js
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))
```

## Promise.reject()

`Promise.reject(reason)`方法也会返回一个新的 `Promise` 实例，该实例的状态为`rejected`。

```js
var p = Promise.reject('出错了');
// 等同于
var p = new Promise((resolve, reject) => reject('出错了'))

p.then(null, function (s) {
  console.log(s)
});
// 出错了
```

## done()

`Promise`对象的最后可以执行一个`done`方法，

```js
asyncFunc()
  .then(f1)
  .catch(r1)
  .then(f2)
  .done();
```
`done`都会捕捉到任何可能出现的错误，并向全局抛出。

## finally()

`finally`方法用于指定不管`Promise`对象最后状态如何，都会执行的操作。它与`done`方法的最大区别，它接受一个普通的回调函数作为参数，该函数不管怎样都必须执行。

```js
server.listen(0)
  .then(function () {
    // run test
  })
  .finally(server.stop);
```

>参考：http://es6.ruanyifeng.com/#docs/promise 、http://liubin.org/promises-book/、[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)
