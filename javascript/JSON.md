## JSON

在`JSON`中，一共就这么几种数据类型：

 - number：和JavaScript的`number`完全一致；

 - boolean：就是JavaScript的`true`或`false`；

 - string：就是JavaScript的`string`；

 - null：就是JavaScript的`null`；

 - array：就是JavaScript的Array表示方式——`[]`；

 - object：就是JavaScript的`{ ... }`表示方式。


## 序列化

```js
JSON.stringify(value [, replacer] [, space])
```

```js
var xiaoming = {
    name: '小明',
    age: 14,
    gender: true,
    height: 1.65,
    grade: null,
    'middle-school': '\"W3C\" Middle School',
    skills: ['JavaScript', 'Java', 'Python', 'Lisp']
};

JSON.stringify(xiaoming, ['name', 'skills'], '  ');
```

结果：

```js
{
  "name": "小明",
  "skills": [
    "JavaScript",
    "Java",
    "Python",
    "Lisp"
  ]
}
```

**参数**

**value**：必需。要转换的 JavaScript 值（通常为对象或数组）。   

**replacer**:可选。用于转换结果的函数或数组。

**space**：可选，向返回值 JSON 文本添加缩进、空格和换行符以使其更易于读取。   

定义一个`toJSON()`的方法，直接返回JSON应该序列化的数据：

```js
var xiaoming = {
    name: '小明',
    age: 14,
    gender: true,
    height: 1.65,
    grade: null,
    'middle-school': '\"W3C\" Middle School',
    skills: ['JavaScript', 'Java', 'Python', 'Lisp'],
    toJSON: function () {
        return { // 只输出name和age，并且改变了key：
            'Name': this.name,
            'Age': this.age
        };
    }
};

JSON.stringify(xiaoming); // '{"Name":"小明","Age":14}'
```

## 反序列化

拿到一个JSON格式的字符串，我们直接用`JSON.parse()`把它变成一个JavaScript对象：

```js
JSON.parse('[1,2,3,true]'); // [1, 2, 3, true]
JSON.parse('{"name":"小明","age":14}'); // Object {name: '小明', age: 14}
JSON.parse('true'); // true
JSON.parse('123.45'); // 123.45

JSON.parse('{"name":"小明","age":14}', function (key, value) {
    // 把number * 2:
    if (key === 'name') {
        return value + '同学';
    }
    return value;
}); // Object {name: '小明同学', age: 14}
```

>参考资料：
> >[廖学峰](http://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001434499490767fe5a0e31e17e44b69dcd1196f7ec6fc6000)
> [TechNet](https://technet.microsoft.com/zh-cn/sysinternals/cc836459)
