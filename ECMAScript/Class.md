
<!-- toc orderedList:0 depthFrom:1 depthTo:6 -->

* [class](#class)
    * [基本语法](#基本语法)
    * [constructor方法](#constructor方法)
    * [类的实例对象](#类的实例对象)
    * [this的指向](#this的指向)
    * [Class的继承](#class的继承)
    * [类的prototype属性和\_\_proto\_\_属性](#类的prototype属性和__proto__属性)
    * [Extends 的继承目标](#extends-的继承目标)
        * [子类继承Object类。](#子类继承object类)
        * [不存在任何继承。](#不存在任何继承)
        * [子类继承null。](#子类继承null)
    * [super](#super)
    * [实例的\_\_proto\_\_属性](#实例的__proto__属性)
    * [Class的取值函数（getter）和存值函数（setter）](#class的取值函数getter和存值函数setter)
    * [Class 的 Generator 方法](#class-的-generator-方法)
    * [Class 的静态方法](#class-的静态方法)
    * [new.target属性](#newtarget属性)
    * [Mixin模式的实现](#mixin模式的实现)

<!-- tocstop -->

# class

## 基本语法

ES6引入`Class`这个概念，作为对象模板。

```js
//es5
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};

var p = new Point(1, 2);

//ES6

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
```
ES5的构造函数`Point`，对应ES6的`Point`类的构造方法。

构造函数的`prototype`属性，在ES6的“类”上面继续存在。

```js
class Point {
  constructor(){
    // ...
  }

  toString(){
    // ...
  }

  toValue(){
    // ...
  }
}

// 等同于

Point.prototype = {
  toString(){},
  toValue(){}
};
```

`prototype`对象的`constructor`属性，直接指向“类”的本身。

```js
Point.prototype.constructor === Point // true
```

## constructor方法

`constructor`方法是类的默认方法，通过`new`命令生成对象实例时，自动调用该方法。

`constructor`方法默认返回实例对象（即`this`），完全可以指定返回另外一个对象。

```js
class Foo {
  constructor() {
    return Object.create(null);
  }
}

new Foo() instanceof Foo
// false
```

## 类的实例对象

类的调用的要加上`new`，类的所有实例共享一个原型对象。

```js
var p1 = new Point(2,3);
var p2 = new Point(3,2);

p1.__proto__.printName = function () { return 'Oops' };

p1.printName() // "Oops"
p2.printName() // "Oops"

var p3 = new Point(4,2);
p3.printName() // "Oops"
```

## this的指向

类的方法内部如果含有`this`，它默认指向类的实例。

```js
class Logger {
  printName(name = 'there') {
    this.print(`Hello ${name}`);
  }

  print(text) {
    console.log(text);
  }
}
const logger = new Logger();
logger.printName();
//Hello there
```

## Class的继承

Class之间可以通过`extends`关键字实现继承。

```js
class Point {
    constructor(x,y,color){
        this.x=x;
        this.y=y;
        this.color=color;
    }
    chooseColor(){
        console.log('color:',this.color);
    }
}

class ColorPoint extends Point {
  constructor() {
      super(1,2,'blue');
  }
  toString(){
      return 'ColorPoint:'+super.color
  }
}

var cp=new ColorPoint();
cp.chooseColor()
//VM2425:8 color: blue
```
`super`表示父类的构造函数，新建父类的`this`对象。子类没有调用，会报错。

## 类的prototype属性和\_\_proto\_\_属性

1. 子类的`__proto__`属性，表示构造函数的继承，总是指向父类。
2. 子类`prototype`属性的`__proto__`属性，表示方法的继承，总是指向父类的`prototype`属性。

```js
class A {
}

class B extends A {
}

B.__proto__ === A // true
B.prototype.__proto__ === A.prototype // true
```

## Extends 的继承目标

### 子类继承Object类。

```js
class A extends Object {
}

A.__proto__ === Object // true
A.prototype.__proto__ === Object.prototype // true
```
`A`其实就是构造函数`Object`的复制，`A`的实例就是`Object`的实例。

### 不存在任何继承。

```js
class A {
}

A.__proto__ === Function.prototype // true
A.prototype.__proto__ === Object.prototype // true
```

这种情况下，`A`作为一个基类（即不存在任何继承），就是一个普通函数，所以直接继承`Funciton.prototype`。调用后返回空对象，指向造函数（Object）的`prototype`属性。

### 子类继承null。
```js
class A extends null {
}

A.__proto__ === Function.prototype // true
A.prototype.__proto__ === undefined // true
```

## super

`super`代表父类`A`的构造函数，返回子类`b`的实例。
`spuer`内部`this`指向`B`。

```js
class A {
  constructor() {
    console.log(new.target.name);
  }
}
class B extends A {
  constructor() {
    super();
  }
}
new A() // A
new B() // B
```

`super`作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。

通过`super`调用父类的方法时，`super`会绑定子类的`this`。

```js
class A {
  constructor() {
    this.x = 1;
  }
  print() {
    console.log(this.x);
  }
}

class B extends A {
  constructor() {
    super();
    this.x = 2;
  }
  m() {
    super.print();
    //new A().print.call(this);
  }
}

let b = new B();
b.m() // 2
```

## 实例的\_\_proto\_\_属性

子类实例的\_\_proto\_\_属性的\_\_proto\_\_属性，指向父类实例的\_\_proto\_\_属性。也就是说，子类的原型的原型，是父类的原型。

```js
var p1 = new Point(2, 3);
var p2 = new ColorPoint(2, 3, 'red');

p2.__proto__ === p1.__proto__ // false
p2.__proto__.__proto__ === p1.__proto__ // true
```

## Class的取值函数（getter）和存值函数（setter）

```js
class MyClass {
  constructor() {
    // ...
  }
  get prop() {
    return 'getter';
  }
  set prop(value) {
    console.log('setter: '+value);
  }
}

let inst = new MyClass();

inst.prop = 123;
// setter: 123

inst.prop
// 'getter'
```
`prop`属性有对应的存值函数和取值函数，因此赋值和读取行为都被自定义了。


## Class 的 Generator 方法

```js
class Foo {
  constructor(...args) {
    this.args = args;
  }
  * [Symbol.iterator]() {
    for (let arg of this.args) {
      yield arg;
    }
  }
}

for (let x of new Foo('hello', 'world')) {
  console.log(x);
}
// hello
// world
```

Foo类的`Symbol.iterator`方法前有一个星号，表示该方法是一个 Generator 函数。`Symbol.iterator`方法返回一个Foo类的默认遍历器

## Class 的静态方法

如果在一个方法前，加上`static`关键字，就表示该方法不会被实例继承，而是直接通过类来调用。父类的静态方法，能被子类继承。也可以在`super`上调用。

```js
class Foo {
  static classMethod() {
    return 'hello';
  }
}

Foo.classMethod() // 'hello'

var foo = new Foo();
foo.classMethod()
// TypeError: foo.classMethod is not a function
```

ES6只用静态方法，没有静态属性。

## new.target属性

`new`命令作用于的那个构造函数，子类继承父类时，`new.target`会返回子类。

```js
class Rectangle {
  constructor(length, width) {
    console.log(new.target === Rectangle);
    this.length = length;
    this.width = width;
  }
}

var obj = new Rectangle(3, 4); // 输出 true
```

## Mixin模式的实现

`Mixin`模式指的是，将多个类的接口“混入”（mix in）另一个类。

```js
function mix(...mixins) {
  class Mix {}

  for (let mixin of mixins) {
    copyProperties(Mix, mixin);
    copyProperties(Mix.prototype, mixin.prototype);
  }

  return Mix;
}

function copyProperties(target, source) {
  for (let key of Reflect.ownKeys(source)) {
    if ( key !== "constructor"
      && key !== "prototype"
      && key !== "name"
    ) {
      let desc = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, desc);
    }
  }
}

class DistributedEdit extends mix(Loggable, Serializable) {
  // ...
}
```
上面代码的`mix`函数，可以将多个对象合成为一个类。
