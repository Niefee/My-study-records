<!-- toc orderedList:0 -->

- [ECMAScript](#ecmascript)
	- [数组](#数组)
		- [新方法](#新方法)
		- [循环遍历](#循环遍历)
	- [数据结构](#数据结构)
		- [set()](#set)
		- [map()](#map)
		- [转数组](#转数组)

<!-- tocstop -->

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

### 循环遍历

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


## 数据结构

### set()

```js
"use strict"

var set=new Set([1,2,2,3,4,5]);
console.log(set);

//Set { 1, 2, 3, 4, 5 }
//去掉重复

//console.log(set.size);
//5
```

**方法**

 - add()
     - 添加内容
 - delete()
     - 删除
 - has()
     - 查找
 - clear()
     - 全部清除


它是类数组，但成员值是唯一的。

### map()

```js
var mm=new Map([["name","leo"],["age","40"]]);
```

**方法**

 - set()
     - 添加数值
 - get()
     - 访问数值
 - has(key)
 - delete()
 - clear()

### 转数组

```js
var arr=[...map];
```
