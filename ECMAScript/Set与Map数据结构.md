<!-- toc orderedList:0 depthFrom:1 depthTo:6 -->

* [Set](#set)
    * [Set实例的属性和方法](#set实例的属性和方法)
* [Map](#map)
    * [实例的属性和操作方法](#实例的属性和操作方法)
    * [遍历方法](#遍历方法)

<!-- tocstop -->

# Set

ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。

Set 本身是一个构造函数，用来生成 Set 数据结构。

```js
const s = new Set();

[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));
//add方法向 Set 结构加入成员

for (let i of s) {
  console.log(i);
}
// 2 3 5 4
```

想Set数据结构中加入值时，不会发生类型转换，但`NaN`等于自身。
但是相同的对象，会被当成两个不一样的值。

```js
let set = new Set();

set.add({a:12});
set.size
//1

set.add({a:12});
set.size
//2
```

## Set实例的属性和方法

Set结构的实例有以下属性。

 - Set.prototype.constructor：构造函数，默认就是Set函数。
 - Set.prototype.size：返回Set实例的成员总数。

Set实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。下面先介绍四个操作方法。

 - add(value)：添加某个值，返回Set结构本身。
 - delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
 - has(value)：返回一个布尔值，表示该值是否为Set的成员。

```js
if (properties.has(someName)) {
  // do something
}
```

 - clear()：清除所有成员，没有返回值。

`Array.from`方法可以将Set结构转为数组。

```js
var items = new Set([1, 2, 3, 4, 5]);
var array = Array.from(items);
```

Set结构的实例有四个遍历方法，可以用于遍历成员。

 - keys()：返回键名的遍历器
 - values()：返回键值的遍历器
 - entries()：返回键值对的遍历器
 - forEach()：使用回调函数遍历每个成员

# Map

ES6提供了Map数据结构，它类似于对象，也是键值对的集合，但是“**键**”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。

```js
var m = new Map();
var o = {p: 'Hello World'};

m.set(o, 'content')
m.get(o) // "content"

m.has(o) // true
m.delete(o) // true
m.has(o) // false
```

```js
var map = new Map();

var k1 = ['a'];
var k2 = ['a'];

map
.set(k1, 111)
.set(k2, 222);

map.get(k1) // 111
map.get(k2) // 222
```
Map的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。
如果Map的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map将其视为一个键，包括`0`和`-0`，`NaN`与`NaN`。

## 实例的属性和操作方法

 - size()

`size`属性返回Map结构的成员总数。

 - set(key, value)

`set`方法设置key所对应的键值，然后返回整个Map结构。

 - get(key)

`get`方法读取key对应的键值，如果找不到key，返回undefined。

 - has

 `has`方法返回一个布尔值，表示某个键是否在Map数据结构中。

 - delete(key)

`delete`方法删除某个键，返回true。如果删除失败，返回false。

 - clear()

`clear`方法清除所有成员，没有返回值。

## 遍历方法

Map原生提供三个遍历器生成函数和一个遍历方法。

 - keys()：返回键名的遍历器。
 - values()：返回键值的遍历器。
 - entries()：返回所有成员的遍历器。
 - forEach()：遍历Map的所有成员。
