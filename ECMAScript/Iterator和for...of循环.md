
<!-- toc orderedList:0 depthFrom:1 depthTo:6 -->

* [Iterator(遍历器)](#iterator遍历器)
    * [Iterator默认接口](#iterator默认接口)
    * [调用Iterator接口的场合](#调用iterator接口的场合)
    * [字符串的Iterator接口](#字符串的iterator接口)
    * [Iterator接口与Generator函数](#iterator接口与generator函数)
    * [遍历器对象的return()，throw()](#遍历器对象的returnthrow)
    * [for...of循环](#forof循环)
    * [数组](#数组)
    * [Set和Map结构](#set和map结构)
    * [计算生成的数据结构](#计算生成的数据结构)
    * [对象](#对象)

<!-- tocstop -->

# Iterator(遍历器)

`遍历器(Interator)`为不同的数据结构提供统一的访问机制，例如`数组（Array）`、`对象（Object）`、`Map`和`Set`。

Iterator的作用:

1. 为各种数据结构，提供一个统一的、简便的访问接口
2. 使得数据结构的成员能够按某种次序排列
3. 供ES6新的遍历命令`for...of`消费

Iterator的遍历过程:

1. 创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。

2. 第一次调用指针对象的`next`方法，可以将指针指向数据结构的第一个成员。

3. 第二次调用指针对象的`next`方法，指针就指向数据结构的第二个成员。

4. 不断调用指针对象的`next`方法，直到它指向数据结构的结束位置。

模拟`next`方法返回值的例子:

```js
var it = makeIterator(['a', 'b']);

function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function() {
      return nextIndex < array.length ?
        {value: array[nextIndex++], done: false} :
        {value: undefined, done: true};
    }
  };
}

it.next() // { value: "a", done: false }
it.next() // { value: "b", done: false }
it.next() // { value: undefined, done: true }
```

## Iterator默认接口

在ES6中，有三类数据结构原生具备**Iterator接口**：`数组`、某些类似数组的`对象`、`Set`和`Map`结构。

```js
const obj = {
  [Symbol.iterator] : function () {
    return {
      next: function () {
        return {
          value: 1,
          done: true
        };
      }
    };
  }
};
```

对象obj是可遍历的（iterable），因为具有`Symbol.iterator`属性。执行这个属性，会返回一个遍历器对象。每次调用`next`方法，就会返回一个代表当前成员的信息对象。

```js
let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();

iter.next() // { value: 'a', done: false }
iter.next() // { value: 'b', done: false }
iter.next() // { value: 'c', done: false }
iter.next() // { value: undefined, done: true }
```

## 调用Iterator接口的场合

除了`for...of`循环，有一些场合会默认调用`Iterator`接口(即`Symbol.iterator`方法)。

 - 结构赋值

对`数组`和`Set结构`进行解构赋值时，会默认调用`Symbol.iterator`方法。

```js
let set = new Set().add('a').add('b').add('c');

let [x,y] = set;
// x='a'; y='b'

let [first, ...rest] = set;
// first='a'; rest=['b','c'];
```

 - 扩展运算符

扩展运算符（...）也会调用默认的`iterator`接口。

```js
// 例一
var str = 'hello';
[...str] //  ['h','e','l','l','o']

// 例二
let arr = ['b', 'c'];
['a', ...arr, 'd']
// ['a', 'b', 'c', 'd']
```

这提供了一种简便机制，可以将任何部署了`Iterator`接口的数据结构，转为数组。

 - yield*

`yield*`后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。

```js
let generator = function* () {
  yield 1;
  yield* [2,3,4];
  yield 5;
};

var iterator = generator();

iterator.next() // { value: 1, done: false }
iterator.next() // { value: 2, done: false }
iterator.next() // { value: 3, done: false }
iterator.next() // { value: 4, done: false }
iterator.next() // { value: 5, done: false }
iterator.next() // { value: undefined, done: true }
```

 - 其他场合

由于数组的遍历会调用遍历器接口，所以任何接受数组作为参数的场合，其实都调用了遍历器接口。

 - for...of
 - Array.from()
 - Map(), Set(), WeakMap(), WeakSet()（比如new Map([['a',1],['b',2]])）
 - Promise.all()
 - Promise.race()


## 字符串的Iterator接口

字符串是一个类似数组的对象，也原生具有`Iterator`接口。

```js
var someString = "hi";
typeof someString[Symbol.iterator]
// "function"

var iterator = someString[Symbol.iterator]();

iterator.next()  // { value: "h", done: false }
iterator.next()  // { value: "i", done: false }
iterator.next()  // { value: undefined, done: true }
```

## Iterator接口与Generator函数

```js
var myIterable = {};

myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};
[...myIterable] // [1, 2, 3]

// 或者采用下面的简洁写法

let obj = {
  * [Symbol.iterator]() {
    yield 'hello';
    yield 'world';
  }
};

for (let x of obj) {
  console.log(x);
}
// hello
// world
```

`Symbol.iterator`方法几乎不用部署任何代码，只要用yield命令给出每一步的返回值即可。

## 遍历器对象的return()，throw()

`return`方法和`throw`方法是否部署是可选的。

`return`方法的使用场合是，如果`for...of`循环提前退出（通常是因为出错，或者有`break`语句或`continue`语句），就会调用`return`方法。

## for...of循环

一个数据结构只要部署了`Symbol.iterator`属性，就被视为具有`iterator`接口，就可以用`for...of`循环遍历它的成员。也就是说，`for...of`循环内部调用的是数据结构的`Symbol.iterator`方法。

## 数组

`for...in`循环读取键名，`for...of`循环读取键值。

`for...of`循环调用遍历器接口，数组的遍历器接口只返回具有数字索引的属性。

```js
let arr = [3, 5, 7];
arr.foo = 'hello';

for (let i in arr) {
  console.log(i); // "0", "1", "2", "foo"
}

for (let i of arr) {
  console.log(i); //  "3", "5", "7"
}
```

## Set和Map结构

`Set` 和 `Map` 结构也原生具有 `Iterator` 接口，可以直接使用`for...of`循环。

```js
var engines = new Set(["Gecko", "Trident", "Webkit", "Webkit"]);
for (var e of engines) {
  console.log(e);
}
// Gecko
// Trident
// Webkit

var es6 = new Map();
es6.set("edition", 6);
es6.set("committee", "TC39");
es6.set("standard", "ECMA-262");
for (var [name, value] of es6) {
  console.log(name + ": " + value);
}
// edition: 6
// committee: TC39
// standard: ECMA-262
```

## 计算生成的数据结构

有些数据结构是在现有数据结构的基础上，计算生成的。比如，`ES6的数组`、`Set`、`Map` 都部署了以下三个方法，调用后都返回遍历器对象。

 - `entries()` 返回一个遍历器对象，用来遍历`[键名, 键值]`组成的数组。对于数组，键名就是索引值；对于 Set，键名与键值相同。Map 结构的 Iterator 接口，默认就是调用`entries`方法。
 - `keys()` 返回一个遍历器对象，用来遍历所有的键名。
 - `values()` 返回一个遍历器对象，用来遍历所有的键值。

## 对象

对于普通的对象，`for...of`结构不能直接使用，会报错，必须部署了 `Iterator `接口后才能使用。

```js
let es6 = {
  edition: 6,
  committee: "TC39",
  standard: "ECMA-262"
};

for (let e in es6) {
  console.log(e);
}
// edition
// committee
// standard

for (let e of es6) {
  console.log(e);
}
// TypeError: es6 is not iterable
```

>[参考](http://es6.ruanyifeng.com/#docs/iterator)
