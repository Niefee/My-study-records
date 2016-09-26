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
