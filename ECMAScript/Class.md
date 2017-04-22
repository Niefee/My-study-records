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
