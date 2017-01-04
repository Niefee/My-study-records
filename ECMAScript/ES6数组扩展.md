
<!-- toc orderedList:0 -->

- [ES数组](#es数组)
	- [扩展运算符](#扩展运算符)
	- [rest运算符](#rest运算符)

<!-- tocstop -->

# ES数组
## 扩展运算符

扩展运算符用三个点号表示，功能是把数组或类数组对象展开成一系列用逗号隔开的值

```js
var foo = function(a, b, c) {
	console.log(a);
	console.log(b);
	console.log(c);
}
var arr = [1, 2, 3];
//传统写法
foo(arr[0], arr[1], arr[2]);

//使用扩展运算符
foo(...arr);
//1
//2
//3
```

特殊应用场景：

```js
//数组深拷贝
var arr2 = arr;
var arr3 = [...arr];
console.log(arr===arr2); //true, 说明arr和arr2指向同一个数组
console.log(arr===arr3); //false, 说明arr3和arr指向不同数组

//把一个数组插入另一个数组字面量
var arr4 = [...arr, 4, 5, 6];
console.log(arr4);//[1, 2, 3, 4, 5, 6]

//字符串转数组
var str = 'love';
var arr5 = [...str];
console.log(arr5);//[ 'l', 'o', 'v', 'e' ]
```

## rest运算符

rest运算符也是三个点号，不过其功能与扩展运算符恰好相反，把逗号隔开的值序列组合成一个数组

```js
//主要用于不定参数，所以ES6开始可以不再使用arguments对象
var bar = function(...args) {
	for (let el of args) {
		console.log(el);
	}
}
bar(1, 2, 3, 4);
//1
//2
//3
//4

bar = function(a, ...args) {
	console.log(a);
	console.log(args);
}
bar(1, 2, 3, 4);
//1
//[ 2, 3, 4 ]

//rest运算符配合解构使用：

var [a, ...rest] = [1, 2, 3, 4];
console.log(a);//1
console.log(rest);//[2, 3, 4]
```

>(来源)[http://www.tuicool.com/articles/26bAzmm]
