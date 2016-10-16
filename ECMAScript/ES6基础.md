# ECMAScript

## 数组

### 新方法

 - Array.from()

将类数组转换成数组。

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

 - Array.of()

Array.of方法用于将一组值，转换为数组。

```js
Array.of(3, 11, 8) // [3,11,8]
Array.of(3) // [3]
Array.of(3).length // 1
```

###循环遍历

```js
var str="muNi";

for(var value of str){
    console.log(v);
}

var str="muNi";

//对键值进行遍历
for(var value of str){
    console.log(value);
}

//对key值进行遍历
for(var key of str){
    console.log(key);
}

//对键名键值遍历
for(var [k,v] of str.entries()){
    console.log(k,v);
}
```
