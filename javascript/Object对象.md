##属性判断

 - in

`in`可以判断一个对象是否存在某个属性。

```js
var xiaoming = {
    name: '小明',
    birth: 1990,
};
'name' in xiaoming; // true
'grade' in xiaoming; // false
```

但是对于继承的属性，也同样判断为`true`。

```js
'toString' in xiaoming; // true
```

 - hasOwnProperty()


`hasOwnProperty()`可以判断一个属性是否自身拥有，而不是继承。

>`Object.keys`方法和`Object.getOwnPropertyNames`方法都可以遍历对象自身的属性，返回数组，只是后者还返回不可枚举的属性。

```js
var o = {
  p1: 123,
  p2: 456
};

Object.keys(o)
// ["p1", "p2"]

Object.getOwnPropertyNames(o)
// ["p1", "p2"]
```

##this

在函数内部定义的`this`，指向`window`;

在`'use strict';`严格模式下，`this`指向`undefined`。

```js
function tt(){console.log(this)}

tt();

//window{/.../}
```

绑定到对象上的函数称为方法，方法上的`this`，指向这个对象；

```js
var xiaoming = {
    name: '小明',
    birth: 1990,
    age: function(){
        var y = new Date().getFullYear();
        return y - this.birth;
    }
};

xiaoming.age()
//26
```

如何在方法函数里面再定义函数，`this`指向`window`。

##apply()、call()

这两个方法可以改变函数的`this`指向。

 - `apply()`把参数打包成`Array`再传入；

 - `call()`把参数按顺序传入。


```js
Math.max.apply(null, [3, 5, 4]); // 5
Math.max.call(null, 3, 5, 4); // 5
```

对普通函数调用，我们通常把`this`绑定为`null`。
