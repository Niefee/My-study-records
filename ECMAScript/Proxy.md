# Proxy

`Proxy`用于修改某些操作的默认行为，即对编程语言进行编程。

ES6 原生提供 `Proxy` 构造函数，用来生成 `Proxy` 实例。

```js
var proxy = new Proxy(target, handler);
```

`new Proxy()`表示生成一个`Proxy`实例，`target`参数表示所要拦截的目标对象，`handler`参数也是一个对象，用来定制拦截行为。

```js
var proxy = new Proxy({}, {
  get: function(target, property) {
    return 35;
  }
});

proxy.time // 35
proxy.name // 35
proxy.title // 35
```

## Proxy支持的拦截操作

 - get(target, propKey, receiver)

拦截对象属性的读取，比如`proxy.foo`和`proxy['foo']`,而且`get`方法可以继承。

```js
var person = {
  name: "张三"
};

var proxy = new Proxy(person, {

    //target指person这个对像，property值对象中的一个属性
  get: function(target, property) {

    //判断person中是否有某个属性
    if (property in target) {
      return target[property];
    } else {
      throw new ReferenceError("Property \"" + property + "\" does not exist.");
    }
  }
});

proxy.name // "张三"
proxy.age // 抛出一个错误

//方法继承

let proto = new Proxy(person, {
  get(target, propertyKey, receiver) {
    console.log('GET '+propertyKey);
    return target[propertyKey];
  }
});

let obj = Object.create(proto);
console.log(obj.name);
//GET name
//张三

```

 - set(target, propKey, value, receiver)

拦截对象属性的设置，比如`proxy.foo = v`或`proxy['foo'] = v`，返回一个布尔值。


```js
let validator = {
  set: function(obj, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer');
      }
      if (value > 200) {
        throw new RangeError('The age seems invalid');
      }
    }

    // 对于age以外的属性，直接保存
    obj[prop] = value;
  }
};

let person = new Proxy({}, validator);

person.age = 100;

person.age // 100
person.age = 'young' // 报错
person.age = 300 // 报错
```

 - has(target, propKey)

拦截`propKey in proxy`的操作，返回一个布尔值。

使用`has`方法隐藏某些属性，不被`in`运算符发现。

```js
var handler = {
  has (target, key) {
    if (key[0] === '_') {
      return false;
    }
    return key in target;
  }
};
var target = { _prop: 'foo', prop: 'foo' };
var proxy = new Proxy(target, handler);
'_prop' in proxy // false
```

 - deleteProperty(target, propKey)

拦截`delete proxy[propKey]`的操作，返回一个布尔值。

```js
var handler = {
  deleteProperty (target, key) {
    invariant(key, 'delete');
    return true;
  }
};
function invariant (key, action) {
  if (key[0] === '_') {
    throw new Error(`Invalid attempt to ${action} private "${key}" property`);
  }
}

var target = { _prop: 'foo' };
var proxy = new Proxy(target, handler);
delete proxy._prop
// Error: Invalid attempt to delete private "_prop" property
```

>全部内容可以查看链接：http://es6.ruanyifeng.com/?search=import&x=15&y=8#docs/proxy
