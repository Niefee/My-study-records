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
