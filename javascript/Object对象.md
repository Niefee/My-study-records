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
