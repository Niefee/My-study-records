
<!-- toc orderedList:0 -->

- [ES数组](#es数组)
	- [扩展运算符](#扩展运算符)
	- [rest运算符](#rest运算符)
	- [ES6数组方法](#es6数组方法)
		- [Array.from()](#arrayfrom)
		- [Array.of()](#arrayof)
		- [copyWithin](#copywithin)
		- [find()和findIndex()](#find和findindex)
		- [fill()](#fill)
		- [entries()，keys()和values()](#entrieskeys和values)
		- [Array.prototype.includes](#arrayprototypeincludes)
		- [数组的空位](#数组的空位)

<!-- tocstop -->

# ES数组
## 扩展运算符

扩展运算符用三个点号表示，功能是把数组或类数组对象展开成一系列用逗号隔开的值

```js
var foo = function(a, b, c) {
	console.log(a);
	console.log(b);
	console.log(c);
}
var arr = [1, 2, 3];
//传统写法
foo(arr[0], arr[1], arr[2]);

//使用扩展运算符
foo(...arr);
//1
//2
//3
```

特殊应用场景：

```js
//数组深拷贝
var arr2 = arr;
var arr3 = [...arr];
console.log(arr===arr2); //true, 说明arr和arr2指向同一个数组
console.log(arr===arr3); //false, 说明arr3和arr指向不同数组

//把一个数组插入另一个数组字面量
var arr4 = [...arr, 4, 5, 6];
console.log(arr4);//[1, 2, 3, 4, 5, 6]

//字符串转数组
var str = 'love';
var arr5 = [...str];
console.log(arr5);//[ 'l', 'o', 'v', 'e' ]
```

## rest运算符

rest运算符也是三个点号，不过其功能与扩展运算符恰好相反，把逗号隔开的值序列组合成一个数组

```js
//主要用于不定参数，所以ES6开始可以不再使用arguments对象
var bar = function(...args) {
	for (let el of args) {
		console.log(el);
	}
}
bar(1, 2, 3, 4);
//1
//2
//3
//4

bar = function(a, ...args) {
	console.log(a);
	console.log(args);
}
bar(1, 2, 3, 4);
//1
//[ 2, 3, 4 ]

//rest运算符配合解构使用：

var [a, ...rest] = [1, 2, 3, 4];
console.log(a);//1
console.log(rest);//[2, 3, 4]
```

>(来源)[http://www.tuicool.com/articles/26bAzmm]

## ES6数组方法

### Array.from()

`Array.from`方法用于将两类对象转为真正的数组：类似数组的对象（`array-like object`）和可遍历（`iterable`）的对象（包括ES6新增的数据结构`Set`和`Map`）。

```js
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
```

类数组的特性就是具有`length`属性。

与ES5的`Array.prototype.slice`相同。

`Array.from`还可以接受第二个参数，作用类似于数组的`map`方法。

```js
Array.from(arrayLike, x => x * x);
// 等同于
Array.from(arrayLike).map(x => x * x);
```

### Array.of()

`Array.of`方法用于将一组值，转换为数组。

```js
Array.of(3, 11, 8) // [3,11,8]

//Array()的使用

Array() // []
Array(3) // [, , ,]
Array(3, 11, 8) // [3, 11, 8]

```

### copyWithin

在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。

```js
Array.prototype.copyWithin(target, start = 0, end = this.length)
```

 - target（必需）：从该位置开始替换数据。

 - start（可选）：从该位置开始读取数据，默认为0。如果为负值，表示倒数。

 - end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。

```js
// 将3号位开始到4号位，复制到0号位，原位置数据会给覆盖
[1, 2, 3, 4, 5].copyWithin(0, 3, 4)
// [4, 2, 3, 4, 5]
```

### find()和findIndex()

```js
[1, 5, 10, 15].find(function(value, index, arr) {
  return value > 9;
}) // 10
```

返回第一个符合要求的成员，没有就返回`undefined`。

findIndex方法的用法与find方法非常类似，没有就返回`-1`。

```js
[1, 5, 10, 15].findIndex(function(value, index, arr) {
  return value > 9;
}) // 2
```

### fill()

`fill()`方法使用给定值，填充一个数组。

```js
['a', 'b', 'c'].fill(7)
// [7, 7, 7]

['a', 'b', 'c'].fill(7, 1, 2)
// ['a', 7, 'c']
```
第二、三个参数，代表填充的起始结束位置。

### entries()，keys()和values()

`for...of`循环进行遍历,`keys()`是对键名的遍历、`values()`是对键值的遍历，`entries()`是对键值对的遍历。

```js
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"
```

### Array.prototype.includes

`Array.prototype.includes`方法返回一个布尔值，表示某个数组是否包含给定的值。

该方法的第二个参数表示搜索的起始位置，默认为0，负数为倒数。

```js
[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true
```

### 数组的空位

数组的空位指，数组的某一个位置没有任何值。

```js
Array(3) // [, , ,]
```

ES5对空位的处理：

 - forEach(), filter(), every() 和some()都会跳过空位。

 - map()会跳过空位，但会保留这个值

 - join()和toString()会将空位视为undefined，而undefined和null会被处理成空字符串。

ES6则是明确将空位转为`undefined`。


>[参考](http://es6.ruanyifeng.com/?search=import&x=15&y=8#docs/array)
