##Buffer类

###创建

 - 方法 1

创建长度为 10 字节的 Buffer 实例：

    var buf = new Buffer(10);

 - 方法 2

通过给定的数组创建 Buffer 实例：

    var buf = new Buffer([10, 20, 30, 40, 50]);

 - 方法 3

通过一个字符串来创建 Buffer 实例：

    var buf = new Buffer("www.runoob.com", "utf-8");

###写入

语法：

    buf.write(string[, offset[, length]][, encoding])

 - string - 写入缓冲区的字符串。

 - offset - 缓冲区开始写入的索引值，默认为 0。

 - length - 写入的字节数，默认为 buffer.length

 - encoding - 使用的编码。默认为 'utf8' 。

```js
buf = new Buffer(256);
len = buf.write("www.runoob.com");

console.log("写入字节数 : "+  len);
```

###读取

####buf.toString([encoding[, start[, end]]])

把`Buffer`的编码转换成字符。

 - encoding - 使用的编码。默认为 'utf8' 。

 - start - 指定开始读取的索引位置，默认为 0。

 - end - 结束位置，默认为缓冲区的末尾。

```js

var buf = new Buffer(26);

for (var i = 0 ; i < 26 ; i++) {
  buf[i] = i + 97;
}

console.log( buf.toString('ascii'));       // 输出: abcdefghijklmnopqrstuvwxyz
console.log( buf.toString('ascii',0,5));   // 输出: abcde
console.log( buf.toString('utf8',0,5));    // 输出: abcde
console.log( buf.toString(undefined,0,5)); // 使用 'utf8' 编码, 并输出: abcde

```

####String.fromCharCode()

字符串静态方法， 把 `Unicode` 值转化成字符。

```js
var bf = new Buffer('miaov', 'utf-8');
console.log(bf);

for (var i=0; i<bf.length; i++) {
    //console.log( bf[i].toString(16) );

    console.log( String.fromCharCode( bf[i] ) );
}

//结果
<Buffer 6d 69 61 6f 76>
m
i
a
o
v
```
####stringObject.charCodeAt(index)

把字符转化成`Unicode`值。

```js
var str="Hello world!"
document.write(str.charCodeAt(1))
//101
```

###将 Buffer 转换为 JSON 对象

    buf.toJSON()

```js
var buf = new Buffer('www.runoob.com');
var json = buf.toJSON(buf);

console.log(json);

//[ 119, 119, 119, 46, 114, 117, 110, 111, 111, 98, 46, 99, 111, 109 ]
```

###合并缓冲区

    Buffer.concat(list[,totalLength])

 - list - 用于合并的 Buffer 对象数组列表。

 - totalLength - 指定合并后Buffer对象的总长度。

###拷贝缓冲区

    buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])

 - targetBuffer - 要拷贝的 Buffer 对象。

 - targetStart - 数字,写入的Buffer对象的开始位置, 可选, 默认: 0

 - sourceStart - 数字,拷贝Buffer对象的开始位置 可选, 默认: 0

 - sourceEnd - 数字, 拷贝Buffer对象的结束位置，Â可选, 默认: buffer.length

```js
var buffer1 = new Buffer('ABC');
// 拷贝一个缓冲区
var buffer2 = new Buffer(3);
buffer1.copy(buffer2);
console.log("buffer2 content: " + buffer2.toString());

//buffer2 content: ABC
```

###缓冲区裁剪

    buf.slice([start[, end]])

 - start - 数字, 可选, 默认: 0

 - end - 数字, 可选, 默认: buffer.length

```js
var buffer1 = new Buffer('runoob');
// 剪切缓冲区
var buffer2 = buffer1.slice(0,2);
console.log("buffer2 content: " + buffer2.toString());
```

    buffer2 content: ru

###缓冲区长度

    buf.length

###静态方法

 - Buffer.isEncoding(encoding)

判断是否支持这个编码方式。


 - Buffer.isBuffer(obj)

测试这个 `obj` 是否是一个 `Buffer`。

 - Buffer.byteLength(string, [encoding])

将会返回这个字符串真实byte长度。

```js
var str='heoo林喔';
console.log(Buffer.byteLength(str));
console.log(Buffer.byteLength(str,'utf-8'));
console.log(Buffer.byteLength(str,'ascii'));
console.log(Buffer.byteLength(str,'base64'));

//结果
10
10
6
4
```
不同的编码方式，字节长度会不一样。

 - Buffer.concat(list, [totalLength])

```js
var str1 = 'miaov';
var str2 = '妙味';

var list = [new Buffer(str1), new Buffer(str2)];
console.log(list);
```
