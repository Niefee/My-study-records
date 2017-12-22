
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [ArrayBuffer](#arraybuffer)
	* [ArrayBuffer方法](#arraybuffer方法)
		* [ArrayBuffer.prototype.byteLength](#arraybufferprototypebytelength)
		* [ArrayBuffer.prototype.slice()](#arraybufferprototypeslice)
		* [ArrayBuffer.isView()](#arraybufferisview)
	* [DataView](#dataview)
	* [TypedArray](#typedarray)
		* [构造函数方法](#构造函数方法)
			* [TypedArray(buffer, byteOffset=0, length?)](#typedarraybuffer-byteoffset0-length)
			* [TypedArray(length)](#typedarraylength)
			* [TypedArray(typedArray)](#typedarraytypedarray)

<!-- /code_chunk_output -->

# ArrayBuffer

数组缓冲区（array buffer）是内存中包含一定数量字节的区域，而所有的类型化数组都基于数组缓冲区。
使用 ArrayBuffer 构造器来创建一个数组缓冲区：

```js
const buf = new ArrayBuffer(32);

console.log(buf);
// ArrayBuffer(21) {}

buf.toString();
// "[object ArrayBuffer]"
```
生成了一段 32 字节的内存区域，每个字节的值默认都是 0。

## ArrayBuffer方法

### ArrayBuffer.prototype.byteLength
返回所分配的内存区域的字节长度。

```js
const buffer = new ArrayBuffer(32);
buffer.byteLength
// 32
```

### ArrayBuffer.prototype.slice()

允许将内存区域的一部分，拷贝生成一个新的`ArrayBuffer`对象。

```js
const buffer = new ArrayBuffer(8);
const newBuffer = buffer.slice(0, 3);
```

### ArrayBuffer.isView()

静态方法，判断是否为`ArrayBuffer`的视图实例。

## DataView

为了读写这段内容，需要为它提供视图。`DataView`视图的创建，需要提供`ArrayBuffer`对象实例作为参数。

```js
const buf = new ArrayBuffer(32);
const dataView = new DataView(buf);
console.log(dataView);
// buffer:ArrayBuffer(32)
// byteLength:32
// byteOffset:0

dataView.getUint8[0]
```
## TypedArray

还有一种是统称`TypedArray `的视图，包含如下构造函数：

数据类型 | 构造函数	|字节长度	|含义	|对应的 C 语言类型
------|-----|----------|----------|----|----------------
Int8|Int8Array	 |1	|8 位带符号整数	 |signed char
Uint8 |Uint8Array	|1	|8 位不带符号整数	 |unsigned char
Uint8C |Uint8ClampedArray |1	|8 位不带符号整数（自动过滤溢出）	 |unsigned char
Int16 |Int16Array	|2	|16 位带符号整数	 |short
Uint16 |Uint16Array	|2	|16 位不带符号整数	 |unsigned short
Int32 |Int32Array	|4	|32 位带符号整数	 |int
Uint32 |Uint32Array	|4	|32 位不带符号的整数 |	unsigned int
Float32 |Float32Array	|4	|32 位浮点数	 |float
Float64 |Float64Array	|8	|64 位浮点数 |	double

### 构造函数方法

#### TypedArray(buffer, byteOffset=0, length?)

```js
// 创建一个32字节的ArrayBuffer
var buf = new ArrayBuffer(32);

// 创建一个指向b的Int32视图，开始于字节0，直到缓冲区的末尾
var int8 = new Int8Array(buf);
console.log(int8);
// Int8Array(32) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
int8.length
// 32
int8.byteLength
// 32

// 创建一个指向b的Int16视图，开始于字节4，长度为8
var int16 = new Int16Array(buf, 4, 8);
console.log(int16);
// Int16Array(8) [0, 0, 0, 0, 0, 0, 0, 0]
int16.length
// 8
int16.byteLength
// 16
```

参数说明：

 - 第一个参数（必需）：视图对应的底层`ArrayBuffer`对象。
 - 第二个参数（可选）：视图开始的字节序号，默认从 0 开始。
 - 第三个参数（可选）：视图包含的数据个数，默认直到本段内存区域结束。


#### TypedArray(length)

```js
const f64a = new Float64Array(8);
f64a[0] = 10;
f64a[1] = 20;
f64a[2] = f64a[0] + f64a[1];
```

上图生成了8个成员（共64字节），并对部分成员赋值。

#### TypedArray(typedArray)

```js
const typedArray = new Int8Array(new Uint8Array(4));
```

```js
const x = new Int8Array([1, 1]);
const y = new Int8Array(x);
x[0] // 1
y[0] // 1

x[0] = 2;
y[0] // 1
```
此方法只是复制参数数组的值，内存不一样。

```js
const x = new Int8Array([1, 1]);
const y = new Int8Array(x.buffer);
x[0] // 1
y[0] // 1

x[0] = 2;
y[0] // 2
```

使用`x.buffer`会基于同一内存。
