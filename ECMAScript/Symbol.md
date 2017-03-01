
<!-- toc orderedList:0 depthFrom:1 depthTo:6 -->

* [Symbol](#symbol)
    * [概述](#概述)
    * [作为属性名的Symbol](#作为属性名的symbol)
    * [属性名遍历](#属性名遍历)
    * [Symbol.for()，Symbol.keyFor()](#symbolforsymbolkeyfor)

<!-- tocstop -->

# Symbol

## 概述

ES6引入了一种新的原始数据类型`Symbol`，表示独一无二的值。

**Symbol** 值通过`Symbol`函数生成，可以加上参数，表示对实例的描述。

```js
let s = Symbol();
let s1 = Symbol('foo');

console.log(s);
console.log(s1);
//Symbol()
//Symbol(ew)

typeof s
typeof s1
// "symbol"
// "symbol"
```
`Symbol`函数不能使用`new`命令，这是一种数据类型，不是对象。

如果`Symbol`参数是一个对象，就会调用`toString`方法。

```js
let obj1={a:'aa'}
let obj2={a:'aa',toString:function(){console.log("hei")}}

let sym=Symbol(obj);
let sym1=Symbol(obj1);

//hei
```

`Symbol`不能与其他数据类型运行，可以转换成字符串以及布尔值。

```js
var sym = Symbol('My symbol');

String(sym) // 'Symbol(My symbol)'
sym.toString() // 'Symbol(My symbol)'
Boolean(sym) //true
```

## 作为属性名的Symbol

每个Symbol值都是不相等的，作为对象属性名不会给覆盖，但不能用户点运算。

```js
var mySymbol = Symbol();
var a = {};

a.mySymbol = 'Hello!';
a[mySymbol] // undefined
a['mySymbol'] // "Hello!"
```

## 属性名遍历

对象的`Symbol`属性只能通过`Object.getOwnPropertySymbols`方法获得。

```js
var obj = {};
var a = Symbol('a');
var b = Symbol('b');

obj[a] = 'Hello';
obj[b] = 'World';

var objectSymbols = Object.getOwnPropertySymbols(obj);

objectSymbols
// [Symbol(a), Symbol(b)]
```

一个新的API，`Reflect.ownKeys`方法可以返回所有类型的键名，包括常规键名和 Symbol 键名。

```js
let obj = {
  [Symbol('my_key')]: 1,
  enum: 2,
  nonEnum: 3
};

Reflect.ownKeys(obj)
//  ["enum", "nonEnum", Symbol(my_key)]
```

## Symbol.for()，Symbol.keyFor()

`Symbol.for()`方法会搜索有没有这个参数作为名称的`Symbol`值，有就返回，没有就新建。

```js
var s1 = Symbol.for('foo');
var s2 = Symbol.for('foo');

s1 === s2 // true
s1
//Symbol(foo)
s2
//Symbol(foo)
```

`Symbol.keyFor`方法返回一个已登记的 `Symbol` 类型值的`key`。

```js
var s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"

```

>参考：http://es6.ruanyifeng.com/#docs/symbol
