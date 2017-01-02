# 正则表达式

## RegExp构造函数

```js
new RegExp(/abc/ig, 'i').flags
// "i"
```

如果`RegExp`构造函数第一个参数是一个正则对象，那么可以使用第二个参数指定修饰符，同时会覆盖原来的正则表达式的修饰符。

## u修饰符

ES6对正则表达式添加了u修饰符，含义为“Unicode模式”，用来正确处理大于`\uFFFF`的Unicode字符。

```js
/^\uD83D/u.test('\uD83D\uDC2A')
// false
```
`\uD83D\uDC2A`是一个四个字节的UTF-16编码，代表一个字符。

### 点字符

点（`.`）字符在正则表达式中，含义是除了换行符以外的任意单个字符。对于码点大于0xFFFF的Unicode字符，点字符不能识别，必须加上u修饰符。

```js
var s = '𠮷';

/^.$/.test(s) // false
/^.$/u.test(s) // true
```

### Unicode字符表示法

```js
/\u{61}/.test('a') // false
/\u{61}/u.test('a') // true
/\u{20BB7}/u.test('𠮷') // true
```

ES6可以使用大括号表示Unicode字符，但要加上修饰符`u`。

### 量词

所有量词都会正确识别码点大于`0xFFFF`的Unicode字符。

使用u修饰符的情况下，Unicode表达式当中的大括号才会被正确解读。

## y修饰符

`y`修饰符的作用与`g`修饰符类似，也是全局匹配，后一次匹配都从上一次匹配成功的下一个位置开始。

```js
var s = 'aaa_aa_a';
var r = /a+_/y;

r.exec(s) // ["aaa_"]
r.exec(s) // ["aa_"]
```

## sticky属性

ES6的正则对象多了sticky属性，表示是否设置了`y`修饰符。

## flags属性

ES6为正则表达式新增了flags属性，会返回正则表达式的修饰符。

```js
// ES5的source属性
// 返回正则表达式的正文
/abc/ig.source
// "abc"

// ES6的flags属性
// 返回正则表达式的修饰符
/abc/ig.flags
// 'gi'
```

## 先行断言

”先行断言“指的是，x只有在y前面才匹配，必须写成`/x(?=y)/`。比如，只匹配百分号之前的数字，要写成`/\d+(?=%)/`。”先行否定断言“指的是，x只有不在y前面才匹配，必须写成`/x(?!y)/`。比如，只匹配不在百分号之前的数字，要写成`/\d+(?!%)/`。

```js
/\d+(?=%)/.exec('100% of US presidents have been male')  // ["100"]
/\d+(?!%)/.exec('that’s all 44 of them')                 // ["44"]
```
