
<!-- toc orderedList:0 depthFrom:1 depthTo:6 -->

* [CSS长度单位](#css长度单位)
    * [px](#px)
    * [em](#em)
    * [rem](#rem)
    * [vh and vw](#vh-and-vw)
    * [vmin and vmax](#vmin-and-vmax)
    * [ex and ch](#ex-and-ch)
    * [设备像素与独立像素](#设备像素与独立像素)

<!-- tocstop -->

# CSS长度单位

## px
`px`是你屏幕设备物理上能显示出的最小的一个点。
 `px`是被定义为小但仍可见，并且水平向的1px宽的线可以清晰地显示出来的单位(无抗锯齿)。

 https://www.w3.org/Style/Examples/007/units.zh_CN.html

## em

`em` 被定义为相对于当前对象内文本的字体大小(`font-size`)。`font-size`默认会继承父级的大小。

```html
<style media="screen">
body {
    font-size: 14px;
}
div {
    font-size: 1.2em; // calculated at 14px * 1.2, or 16.8px
}
</style>
<body>
    <div>
        Test <!-- 14 * 1.2 = 16.8px -->
        <div>
            Test <!-- 16.8 * 1.2 = 20.16px -->
            <div>
                Test <!-- 20.16 * 1.2 = 24.192px -->
            </div>
        </div>
    </div>
</body>
```
<p>
<iframe height='265' scrolling='no' title='Cascading em Values' src='//codepen.io/tutsplus/embed/xbZQRQ/?height=265&theme-id=0&default-tab=html,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='http://codepen.io/tutsplus/pen/xbZQRQ/'>Cascading em Values</a> by Envato Tuts+ (<a href='http://codepen.io/tutsplus'>@tutsplus</a>) on <a href='http://codepen.io'>CodePen</a>.
</iframe>
</p>

## rem

基于一个根元素（大多数情况下是html元素）设置元素的大小。

```css
html {
    font-size: 14px;
}
div {
    font-size: 1.2rem;//14*1.2
}
```
```html
<body>
    <div>
        Test <!-- 14 * 1.2 = 16.8px -->
        <div>
            Test <!-- 14 * 1.2 = 16.8px -->
            <div>
                Test <!-- 14 * 1.2 = 16.8px -->
            </div>
        </div>
    </div>
</body>
```
## vh and vw

`1vh` 等于1/100的视口高度。

浏览器高度`900px`, `1 vh = 900px/100 = 9 px`。

同理，`vw`就是视口（`viewport`）就宽度的1/100。

## vmin and vmax

![vmaxANDvmin](./img/vmaxANDvmin.jpg)

`vmin` 和 `vmax`则关于视口高度和宽度两者的最小或者最大值。

如果浏览器设置为`1100px`宽、`700px`高，`1vmin`会是`7px`,`1vmax`为`11px`。
然而，如果宽度设置为`800px`，高度设置为`1080px`，`1vmin`将会等于`8px`而`1vmax`将会是`10.8px`。

## ex and ch

`ex`和`ch`单位是基于字体（`font-family`）的度量单位，依赖于设定的字体

![exANDch](./img/exANDch.jpg)


`ex`单位被定义为`0`字符的宽度。


```html
<div class='x' style='display:inline-block;'>xxxx</div>
<div class="line" style='display:inline-block;overflow:hidden;height:1ex;background:#aaa;width:50px;color:#fff;'>xx</div>
<div class="line" style='display:inline-block;overflow:hidden;height:2ex;background:#aaa;width:50px;color:#fff;'>xx</div>
<div class='x' style='display:inline-block;font-size:2em'>xxxx</div>
```

<h4>定义一条与字母x高度相同的线：</h4>
<div class='x' style='display:inline-block;'>xxxx</div>
<div class="line" style='display:inline-block;overflow:hidden;height:1ex;background:#aaa;width:50px;color:#fff;'>xx</div>
<div class="line" style='display:inline-block;overflow:hidden;height:2ex;background:#aaa;width:50px;color:#fff;'>xx</div>
<div class='x' style='display:inline-block;font-size:2em'>xxxx</div>

----

`ch`单位被定义为那个字体的小写`x`的高度。

```html
<style>
    h1{margin:10px 0;font-size:16px;}
    div{overflow:hidden;width:10ch;background:#ccc;}
</style>

<h1>定义一个宽度正好能装下10个0的容器：</h1>
<div>0000000000</div>
```


<h4>定义一个宽度正好能装下10个0的容器：</h4>
<div style='overflow:hidden;width:10ch;background:#ccc;'>0000000000</div>

---
>[参考](http://web.jobbole.com/82490/)

## 设备像素与独立像素

**设备像素(device pixel)**:设备像素设是物理概念，指的是设备中使用的物理像素。比如iPhone 5的分辨率640 x 1136px。

**CSS像素** 是Web编程的概念，指的是CSS样式代码中使用的逻辑像素。

比如iPhone 5使用的是Retina视网膜屏幕，使用`2px x 2px`的 device pixel 代表 `1px x 1px `的 css pixel，所以设备像素数为`640 x 1136px`，而CSS逻辑像素数为`320 x 568px`。

```js
设备像素比 = 设备像素/设备独立像素 // 在某一方向上，x方向或者y方向
```

```js
//打印台中输入

console.log(screen.availHeight);
//568
console.log(screen.availWidth);
//320
console.log(window.devicePixelRatio);
//2
```
[参考](http://ued.ourfuture.cn/fed/4200.html)
