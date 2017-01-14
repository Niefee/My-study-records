
<!-- toc orderedList:0 depthFrom:1 depthTo:6 -->

- [ES6对象扩展](#es6对象扩展)
	- [属性表示](#属性表示)
	- [属性名表达式](#属性名表达式)
	- [Object.is()](#objectis)
	- [Object.assign()](#objectassign)
	- [属性的可枚举性](#属性的可枚举性)
	- [属性的遍历](#属性的遍历)
	- [\_\_proto\_\_ 属性](#__proto__-属性)
	- [Object.setPrototypeOf()](#objectsetprototypeof)
	- [Object.getPrototypeOf()](#objectgetprototypeof)
	- [Object.keys()，Object.values()，Object.entries()](#objectkeysobjectvaluesobjectentries)
		- [Object.keys](#objectkeys)
		- [Object.values](#objectvalues)
		- [Object.entries](#objectentries)
	- [对象的扩展运算符](#对象的扩展运算符)
		- [解构赋值](#解构赋值)
		- [扩展运算符](#扩展运算符)
	- [Object.getOwnPropertyDescriptor()](#objectgetownpropertydescriptor)
	- [Object.create(prototype, descriptors)](#objectcreateprototype-descriptors)
	- [数据属性和访问器属性](#数据属性和访问器属性)
	- [JS原型和原型链](#js原型和原型链)

<!-- tocstop -->

# ES6对象扩展

## 属性表示

ES6 允许在对象之中，直接写变量。这时，属性名为变量名, 属性值为变量的值。

```js
function f(x, y) {
  return {x, y};
}

// 等同于

function f(x, y) {
  return {x: x, y: y};
}

f(1, 2) // Object {x: 1, y: 2}
```

## 属性名表达式

```js
// 方法一
obj.foo = true;

// 方法二
obj['a' + 'bc'] = 123;
```

>表达式作为属性名要写在方括号中。

如果属性名表达式是一个对象，会转为字符串`[object Object]`。

```js
const keyA = {a: 1};
const keyB = {b: 2};

const myObject = {
  [keyA]: 'valueA',
  [keyB]: 'valueB'
};

myObject // Object {[object Object]: "valueB"}
```

`[keyA]`和`[keyB]`得到的都是`[object Object]`，所以`[keyB]`会把`[keyA]`覆盖掉，而`myObject`最后只有一个`[object Object]`属性。

## Object.is()

它用来比较两个值是否严格相等，与严格比较运算符（`===`）的行为基本一致。

不同之处：

```js
+0 === -0 //true
NaN === NaN // false

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
```

## Object.assign()

`Object.assign`方法用于对象的合并，将源对象（`source`）的所有可枚举属性，复制到目标对象（`target`）。

```js
var target = { a: 1 };

var source1 = { b: 2 };
var source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
```

同名的情况下，后者覆盖前者。

```js
Object.assign(undefined) // 报错
Object.assign(null) // 报错

let obj = {a: 1};
Object.assign(obj, undefined) === obj // true
Object.assign(obj, null) === obj // true
```

首参不能为`undefined`或`null`，两者不能转换成对象。在其他位置，会给自动忽略掉。
数值和布尔值都会被忽略，字符串会以数组形式传入。

**注意：**

`Object.assign()`是浅拷贝，原对象改变，它也会改变。

```js
var obj1 = {a: {b: 1}};
var obj2 = Object.assign({}, obj1);

obj1.a.b = 2;
obj2.a.b // 2
```

## 属性的可枚举性

每个对象都有一个描述对象，控制该属性行为。

```js
let obj = { foo: 123 };
Object.getOwnPropertyDescriptor(obj, 'foo')
//  {
//    value: 123,
//    writable: true,
//    enumerable: true,
//    configurable: true
//  }
```

`enumerable`属性，称为”可枚举性“，如果该属性为false，就表示某些操作会忽略当前属性。

ES5有三个操作会忽略`enumerable`为`false`的属性。

1. for...in循环：只遍历对象自身的和继承的可枚举的属性
2. Object.keys()：返回对象自身的所有可枚举的属性的键名
3. JSON.stringify()：只串行化对象自身的可枚举的属性

ES6新增了一个操作`Object.assign()`，会忽略`enumerable`为`false`的属性，只拷贝对象自身的可枚举的属性。

```js
Object.getOwnPropertyDescriptor(Object.prototype, 'toString').enumerable
// false

Object.getOwnPropertyDescriptor([], 'length').enumerable
// false
```

`toString`和`length`属性的`enumerable`都是`false`，因此`for...in`不会遍历到这两个继承自原型的属性。

## 属性的遍历

1. for...in
    -  `for...in`循环遍历对象自身的和继承的可枚举属性（不含Symbol属性）。

2. Object.keys(obj)
    - `Object.keys`返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含Symbol属性）。

3. Object.getOwnPropertyNames(obj)
    - `Object.getOwnPropertyNames`返回一个数组，包含对象自身的所有属性（不含Symbol属性，但是包括不可枚举属性）。

4. Object.getOwnPropertySymbols(obj)
    - `Object.getOwnPropertySymbols`返回一个数组，包含对象自身的所有Symbol属性。

5. Reflect.ownKeys(obj)
    - `Reflect.ownKeys`返回一个数组，包含对象自身的所有属性，不管是属性名是Symbol或字符串，也不管是否可枚举。

## \_\_proto\_\_ 属性

`__proto__` 属性（前后各两个下划线），用来读取或设置当前对象的`prototype`对象。

```js
// es6的写法
var obj = {
  method: function() { ... }
};
obj.__proto__ = someOtherObj;

// es5的写法
var obj = Object.create(someOtherObj);
obj.method = function() { ... };
```

## Object.setPrototypeOf()

`Object.setPrototypeOf`方法的作用与`__proto__`相同，用来设置一个对象的`prototype`对象。

```js
// 格式
Object.setPrototypeOf(object, prototype)

// 用法
var o = Object.setPrototypeOf({}, null);

//该方法等同于下面的函数。

function (obj, proto) {
  obj.__proto__ = proto;
  return obj;
}
```

## Object.getPrototypeOf()

该方法与`setPrototypeOf`方法配套，用于读取一个对象的`prototype`对象。

```js
Object.getPrototypeOf(obj);
//下面是一个例子。

function Rectangle() {
}

var rec = new Rectangle();

Object.getPrototypeOf(rec) === Rectangle.prototype
// true

Object.setPrototypeOf(rec, Object.prototype);
Object.getPrototypeOf(rec) === Rectangle.prototype
// false
```

## Object.keys()，Object.values()，Object.entries()

### Object.keys

返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。

```js
var obj = { foo: 'bar', baz: 42 };
Object.keys(obj)
// ["foo", "baz"]
```

### Object.values

该方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（`enumerable`）属性的键值。

### Object.entries

该方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（`enumerable`）属性的键值对数组。

```js
let {keys, values, entries} = Object;
let obj = { a: 1, b: 2, c: 3 };

for (let key of keys(obj)) {
  console.log(key); // 'a', 'b', 'c'
}

for (let value of values(obj)) {
  console.log(value); // 1, 2, 3
}

for (let [key, value] of entries(obj)) {
  console.log([key, value]); // ['a', 1], ['b', 2], ['c', 3]
}
```

## 对象的扩展运算符

###  解构赋值

对象的解构赋值用于从一个对象取值，相当于将所有可遍历的、但尚未被读取的属性，分配到指定的对象上面。所有的键和它们的值，都会拷贝到新对象上面。

```js
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x // 1
y // 2
z // { a: 3, b: 4 }
```

上面代码中，变量`z`是解构赋值所在的对象。它获取等号右边的所有尚未读取的键（`a`和`b`），将它们连同值一起拷贝过来。

### 扩展运算符

扩展运算符（`...`）用于取出参数对象的所有可遍历属性，拷贝到当前对象之中。

```js
let z = { a: 3, b: 4 };
let n = { ...z };
n // { a: 3, b: 4 }
```
这等同于使用`Object.assign`方法。

```js
let aWithOverrides = { ...a, x: 1, y: 2 };
// 等同于
let aWithOverrides = { ...a, ...{ x: 1, y: 2 } };
// 等同于
let x = 1, y = 2, aWithOverrides = { ...a, x, y };
// 等同于
let aWithOverrides = Object.assign({}, a, { x: 1, y: 2 });
```

## Object.getOwnPropertyDescriptor()

返回某个对象属性的描述对象（`descriptor`）。

```js
var obj = { p: 'a' };

Object.getOwnPropertyDescriptor(obj, 'p')
// Object { value: "a",
//   writable: true,
//   enumerable: true,
//   configurable: true
// }
```

>参考：http://es6.ruanyifeng.com/?search=import&x=15&y=8#docs/object

## Object.create(prototype, descriptors)

创建一个具有指定原型且可选择性地包含指定属性的对象。

 - prototype
	 - 必需。  要用作原型的对象。  可以为 null。  
 - descriptors
	 - 可选。  包含一个或多个属性描述符的 JavaScript 对象。  

```js
var newObj = Object.create(null, {
            size: {
                value: "large",
                enumerable: true
            },
            shape: {
                value: "round",
                enumerable: true
            }
        });

document.write(newObj.size + "<br/>");
document.write(newObj.shape + "<br/>");
document.write(Object.getPrototypeOf(newObj));

// Output:
// large
// round
// null
```

## 数据属性和访问器属性

`数据属性`是可获取和设置值的属性。

|数据描述符特性	|	说明		|		默认|
|----------|---------|------------------|
|Value		|	属性的当前值。	|	undefined|
|writable	|	true 或 false。如果 writable 设置为 true，则可以修改属性值。|	false|
|enumerable 	|	true 或 false。如果 enumerable 设置为 true，则可以由 for…in 语句枚举属性。	|	false|
|configurable|	true 或 false。如果 configurable 设置为 true，则可以更改属性的特性且可以删除属性。|	false|


`访问器属性`是只要设置或检索属性值，访问器属性 就会调用用户提供的函数。

访问器描述符特性		|说明		|默认
-------|--------|-------------
get		|返回属性值的函数。此函数没有参数。		|undefined
set		|设置属性值的函数。它具有一个包含要分配的值的参数。		|undefined
enumerable		|true 或 false。如果 enumerable 设置为 true，则可以由 for…in 语句枚举属性。		|false
configurable		|true 或 false。如果 configurable 设置为 true，则可以更改属性的特性且可以删除属性。		|false

## JS原型和原型链

**每个构造函数生成实例的时候 会自带一个constructor属性 指向该构造函数**

```js
//所以:
实例.constructor == 构造函数

var arr = new Array();

arr.constructor === Array; //true

arr instanceof Array; //true
```

每个构造函数都有一个`prototype`属性，指向另一个对象。这个对象的所有属性和方法，都会被构造函数的实例继承。

```js
function Cat(name){
	//构造函数自身的属性name
    this.name = name;
}
Cat.sex = '女';
Cat.prototype.age = '12';
var cat = new Cat('大黄');
cat.age;//12
cat.sex;//undefine 也就是说明实例只能继承构造函数原型上的属性和方法
cat.hasOwnProperty("name");//true  hasOwnProperty判断是自己本身的属性还是继承的
cat.hasOwnProperty("age");//false
```


JS在创建对象（不论是普通对象还是函数对象）的时候，都有一个叫做`__proto__`的内置属性，用于指向创建它的函数对象的原型对象`prototype`。

```js
cat.__proto__===Cat.prototype;//true
```
**同样，Cat.prototype对象也有__proto__属性，它指向创建它的函数对象（Object）的prototype**

```js
Cat.prototype.__proto__=== Object.prototype;//true
```

**继续，Object.prototype对象也有__proto__属性，但它比较特殊，为null**

```js
Object.prototype.__proto__;//null
```

我们把这个有`__proto__`串起来的直到`Object.prototype.__proto__`为`null`的链叫做**原型链**。

>[参考](http://blog.csdn.net/qietingfengdeyanse/article/details/52488252)
