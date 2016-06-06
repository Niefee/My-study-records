[TOC]
##image元素

 - naturalWidth属性，naturalHeight属性

这两个属性只读，表示image对象真实的宽度和高度。

##Canvas 

```
<canvas id="myCanvas" width="400" height="200">
  您的浏览器不支持canvas！
</canvas>

var canvas = document.getElementById('myCanvas');

if (canvas.getContext) {
  var ctx = canvas.getContext('2d');
}
```

>每个canvas元素都有一个对应的context对象（上下文对象），Canvas API定义在这个context对象上面，所以需要获取这个对象，方法是使用getContext方法。

###绘图方法

canvas画布提供了一个用来作图的平面空间，该空间的每个点都有自己的坐标，x表示横坐标，y表示竖坐标。原点(0, 0)位于图像左上角，x轴的正向是原点向右，y轴的正向是原点向下。

 - 绘制路径

beginPath方法表示开始绘制路径，moveTo(x, y)方法设置线段的起点，lineTo(x, y)方法设置线段的终点，stroke方法用来给透明的线段着色。

```js
ctx.beginPath(); // 开始路径绘制
ctx.moveTo(20, 20); // 设置路径起点，坐标为(20,20)
ctx.lineTo(200, 20); // 绘制一条到(200,20)的直线
ctx.lineWidth = 1.0; // 设置线宽
ctx.strokeStyle = "#CC0000"; // 设置线的颜色
ctx.stroke(); // 进行线的着色，这时整条线才变得可见
```

 - 绘制矩形

fillRect(x, y, width, height)方法用来绘制矩形，它的四个参数分别为矩形左上角顶点的x坐标、y坐标，以及矩形的宽和高。fillStyle属性用来设置矩形的填充色。

```js
ctx.fillStyle = 'yellow';
ctx.fillRect(50, 50, 200, 100); 
//strokeRect方法与fillRect类似，用来绘制空心矩形。
//
ctx.strokeRect(10,10,200,100); 

//clearRect方法用来清除某个矩形区域的内容。
//
ctx.clearRect(100,50,50,50);  

```

 - 绘制文本

 fillText(string, x, y) 用来绘制文本，它的三个参数分别为文本内容、起点的x坐标、y坐标。使用之前，需用font设置字体、大小、样式（写法类似与CSS的font属性）。与此类似的还有strokeText方法，用来添加空心字。

```js
// 设置字体
ctx.font = "Bold 20px Arial"; 
// 设置对齐方式
ctx.textAlign = "left";
// 设置填充颜色
ctx.fillStyle = "#008600"; 
// 设置字体内容，以及在画布上的位置
ctx.fillText("Hello!", 10, 50); 
// 绘制空心字
ctx.strokeText("Hello!", 10, 100); 
```

 - 绘制圆形和扇形

arc方法用来绘制扇形。

    ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);

arc方法的x和y参数是圆心坐标，radius是半径，startAngle和endAngle则是扇形的起始角度和终止角度（以弧度表示），anticlockwise表示做图时应该逆时针画（true）还是顺时针画（false）。

```js
ctx.beginPath(); 
ctx.arc(60, 60, 50, 0, Math.PI*2, true); 
ctx.fillStyle = "#000000"; 
ctx.fill();

//绘制空心圆形的例子。
//
ctx.beginPath(); 
ctx.arc(60, 60, 50, 0, Math.PI*2, true); 
ctx.lineWidth = 1.0; 
ctx.strokeStyle = "#000"; 
ctx.stroke();
```

 - 设置渐变色

createLinearGradient方法用来设置渐变色。

```js
var myGradient = ctx.createLinearGradient(0, 0, 0, 160); 

myGradient.addColorStop(0, "#BABABA"); 

myGradient.addColorStop(1, "#636363");
```

createLinearGradient方法的参数是(x1, y1, x2, y2)，其中x1和y1是起点坐标，x2和y2是终点坐标。通过不同的坐标值，可以生成从上至下、从左到右的渐变等等。

 - 设置阴影

```js
ctx.shadowOffsetX = 10; // 设置水平位移
ctx.shadowOffsetY = 10; // 设置垂直位移
ctx.shadowBlur = 5; // 设置模糊度
ctx.shadowColor = "rgba(0,0,0,0.5)"; // 设置阴影颜色

ctx.fillStyle = "#CC0000"; 
ctx.fillRect(10,10,200,100);
```





