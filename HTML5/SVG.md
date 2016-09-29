#SVG

##创建形状

基本图形

```html
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <circle cx="100" cy="100" r="40" fill="transparent" stroke="black" stroke-width="5"></circle>
        <circle cx="100" cy="100" r="40" style="fill:white;stroke:black;stroke-width:5;"></circle>-->
        <rect width="200" height="200" x="100" y="100" fill="red" rx="30"></rect>
        <line x1="50" y1="50" x2="200" y2="300" stroke="black" stroke-width="5" stroke-opacity="0.5"></line>
</svg>
```

 - circle 圆形
     - cx(圆心的x轴坐标) 、cy(圆心的y轴坐标)  、r(半径)
     - 属性
         - fill：填充的颜色，`transparent`表示透明；
         - stroke：边框颜色，
         - 边框宽度
     - style
         - 也可以使用这个`style`属性设置上面的样式

 - rect 矩形
     - width 、height 、x 、y
     - rx(矩形的圆角x轴半径值) ry(矩形的圆角y轴半径值)
 - line 线条
     - x1 y1 x2 y2
     - stroke-opacity ：透明度，取值1到0；


##标签

 - g

可以包含多个基本图形，它只可以设置所有图形共享的属性。

 - text

`x`和`y`值的坐标原点，取决于`text-anchor`的取值，默认是`start`。

```html
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
	<g style="cursor:pointer">
    	<circle cx="200" cy="200" r="50" fill="transparent" stroke="red" stroke-width="5" ></circle>
        /* text-anchor的取值可以是middle、start、end。 */
  		<text x="200" y="208" font-size="20" text-anchor="middle">科鲁兹</text>
    </g>
</svg>
```

 - image

```html
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
	<g style="cursor:pointer">
    	<image x="150" y="149" width="100" height="103" xlink:href="img/main.png"></image>
  		<text x="200" y="208" font-size="20" text-anchor="middle">科鲁兹</text>
    </g>
</svg>
```

`image`的`x`、`y`值以左上角为坐标。

- polyline

绘制折线的标签。

```html
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
     <polyline points="50 50 200 300 230 300 250 200" fill="none" stroke="black" stroke-width="5"></polyline>
</svg>
```
每两个数字确定一个坐标点。

 - polygon

```html
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <polygon points="50,50,200,300,230,300,250,200" fill="none" stroke="black" stroke-width="5"></polygon>
</svg>
```

绘制多边形，会自动闭合，每两个数字确定一个坐标点。

 - path

这是最基础的的一个标签，其他标签可以基于这个标签创建。

**d ：属性**

 1. M、L、Z

`M`代表线条的开始，`L`代表线条或者折线的下一个点，`Z`代表连接到第一个点自动闭合。

```html
 <path d="M50 100L200 200L100 100ZM300 100L300 300" stroke="black" stroke-width="5" fill="none"></path>
```

 2. H、V

水平绘制、垂直绘制，值代表坐标。


```html
<path d="M50 100H200V200" stroke="black" stroke-width="5" fill="none"></path>
```

如果是小写的`h`、`v`，代表长度。

 3. C、A、Q、T

贝赛尔曲线的坐标。

 4. A命令

X半径、Y半径

角度、弧长（0:小弧 ;1 大弧）

方向（0:逆时针;1:顺时针 ）

终点坐标X坐标、终点坐标Y坐标

```html
<path d="M150 150A100 100 0 0 1 250 150L225 175A50 50 0 0 0 175 175Z" stroke="black" stroke-width="5" fill="none"></path>
```

 - animate

`SVG`运动标签

```html
<rect width="50" height="200" x="100" y="100" fill="red">
     <animate attributeName="width" dur="1" from="50" to="200"></animate>
</rect>
```



##创建元素

```js
//设置命名空间
var svgNS = 'http://www.w3.org/2000/svg';
//父元素
var oParent = document.getElementById('div1');
//创建元素
var oSvg = document.createElementNS(svgNS , 'svg');

oSvg.setAttribute('xmlns',svgNS);
oSvg.setAttribute('width','100%');
oSvg.setAttribute('height','100%');

oParent.appendChild( oSvg );
```

设置命名空间，是为了避免与`html`产生命名污染。
