# Reflect

`Reflect`对象是 ES6 操作对象的新API。

将`Object`对象的一些明显属于语言内部的方法（比如`Object.defineProperty`），放到`Reflect`对象上。现阶段，某些方法同时在`Object`和`Reflect`对象上部署，未来的新方法将只部署在`Reflect`对象上。也就是说，从`Reflect`对象上可以拿到语言内部的方法。

 `Reflect`让Object操作都变成函数行为。

```js
// 老写法
'assign' in Object // true

// 新写法
Reflect.has(Object, 'assign') // true
```

`Reflect`对象的方法与`Proxy`对象的方法一一对应，只要是`Proxy`对象的方法，就能在`Reflect`对象上找到对应的方法。

```js
var loggedObj = new Proxy(obj, {
  get(target, name) {
    console.log('get', target, name);
    return Reflect.get(target, name);
  },
  deleteProperty(target, name) {
    console.log('delete' + name);
    return Reflect.deleteProperty(target, name);
  },
  has(target, name) {
    console.log('has' + name);
    return Reflect.has(target, name);
  }
});
```

每一个`Proxy`对象的拦截操作（`get`、`delete`、`has`），内部都调用对应的`Reflect`方法，保证原生行为能够正常执行。
只是添加了输出日志的功能。

## 静态方法

`Reflect`对象一共有13个静态方法。大部分与`Object`对象的同名方法的作用都是相同的，而且它与`Proxy`对象的方法是一一对应的。

### Reflect.get(target,name,receiver)

`receiver`可以绑定读取函数的`this`。

```js
var myObject = {
  foo: 1,
  bar: 2,
  get baz() {
    return this.foo + this.bar;
  },
};

var myReceiverObject = {
  foo: 4,
  bar: 4,
};
//第一个参数必须是对象
Reflect.get(myObject, 'baz', myReceiverObject) // 8
```

### Reflect.set(target,name,value,receiver)

```js
var myObject = {
  foo: 4,
  set bar(value) {
    return this.foo = value;
  },
};

var myReceiverObject = {
  foo: 0,
};

Reflect.set(myObject, 'foo', 2);
myObject.foo // 2

Reflect.set(myObject, 'bar', 1, myReceiverObject);
myObject.foo // 2
myReceiverObject.foo // 1
```

如果`name`属性设置了赋值函数，则赋值函数的`this`绑定`receiver`。

### Reflect.has(target,name)

`Reflect.has`方法对应`name in obj`里面的`in`运算符。

```js
var myObject = {
  foo: 1,
};

// 旧写法
'foo' in myObject // true

// 新写法
Reflect.has(myObject, 'foo') // true
```

### Reflect.apply(target,thisArg,args)
### Reflect.construct(target,args)

```js
function Greeting(name) {
  this.name = name;
}
Greeting.prototype.sayname=function(){console.log(this.name)}

// new 的写法
const instance1 = new Greeting('张三');
instance1.sayname();//张三

// Reflect.construct 的写法
const instance2 = Reflect.construct(Greeting, ['赵四']);
instance1.sayname();//赵四
```
### Reflect.defineProperty(target,name,desc)
### Reflect.deleteProperty(target,name)

`Reflect.deleteProperty方`法等同于`delete obj[name]`，用于删除对象的属性。

```js
const myObj = { foo: 'bar' };

// 旧写法
delete myObj.foo;

// 新写法
Reflect.deleteProperty(myObj, 'foo');
```

### Reflect.ownKeys(target)

`Reflect.ownKeys`方法用于返回对象的所有属性，基本等同于`Object.getOwnPropertyNames`与`Object.getOwnPropertySymbols`之和。

```js
var myObject = {
  foo: 1,
  bar: 2,
  [Symbol.for('baz')]: 3,
  [Symbol.for('bing')]: 4,
};

// 旧写法
Object.getOwnPropertyNames(myObject)
// ['foo', 'bar']

Object.getOwnPropertySymbols(myObject)
//[Symbol.for('baz'), Symbol.for('bing')]

// 新写法
Reflect.ownKeys(myObject)
// ['foo', 'bar', Symbol.for('baz'), Symbol.for('bing')]
```
### Reflect.isExtensible(target)
### Reflect.preventExtensions(target)
### Reflect.getOwnPropertyDescriptor(target, name)
### Reflect.getPrototypeOf(target)

`Reflect.getPrototypeOf`方法用于读取对象的`__proto__`属性，对应`Object.getPrototypeOf(obj)`。

```js
const myObj = new FancyThing();

// 旧写法
Object.getPrototypeOf(myObj) === FancyThing.prototype;

// 新写法
Reflect.getPrototypeOf(myObj) === FancyThing.prototype;
```
### Reflect.setPrototypeOf(target, prototype)

`Reflect.setPrototypeOf`方法用于设置对象的`__proto__`属性，返回第一个参数对象，对应`Object.setPrototypeOf(obj, newProto)`。

```js
const myObj = new FancyThing();

// 旧写法
Object.setPrototypeOf(myObj, OtherThing.prototype);

// 新写法
Reflect.setPrototypeOf(myObj, OtherThing.prototype);

```

>详情请看：http://es6.ruanyifeng.com/?search=import&x=15&y=8#docs/reflect#静态方法
