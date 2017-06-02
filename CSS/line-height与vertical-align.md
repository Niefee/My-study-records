
<!-- toc orderedList:0 depthFrom:1 depthTo:6 -->

* [line-height与vertical-align](#line-height与vertical-align)
    * [line-height](#line-height)
        * [4种box](#4种box)
        * [六种线](#六种线)
        * [vertical-align](#vertical-align)

<!-- tocstop -->

# line-height与vertical-align

## line-height
![line-height](img/line-height.png)

**行高(line-height)**是指文本行基线间的垂直距离。

**行距**是上一行的底线和下一行的顶线之间的距离，行距的一半是**半行距**。

```CSS
半行距 = （line-height - font-size）/2
```

半行距为负时(当line-height < font-size)，这时候两行之间就会重叠。

如果父元素的`line-height`有单位（px、%）,那么子元素继承的值则是父元素计算后的一个具体的px级别的值；

以下，P得到的是`10px*150%=15px`的行高，而P的字体大小为`30px`，所以发生了重叠。

```HTML
<div style="border:dashed 1px #0e0;line-height:150%;font-size:10px;">
    <p style="font-size:30px;">
        1232<br/>
        123
    </p>
</div>
```
<div style="border:dashed 1px #0e0;line-height:150%;font-size:10px;">
    <p style="font-size:30px;">
        1232<br/>
        123
    </p>
</div>

而如果没有单位，子元素就会根据自己的**字体大小**，与**父元素的行高数值**计算自己的行高。



css中起高度作用的应该就是**height**以及**line-height**。

```css
.test1{font-size:20px; line-height:0; border:1px solid #cccccc; background:#eeeeee;}
.test2{font-size:0; line-height:20px; border:1px solid #cccccc; background:#eeeeee;}
```

```html
<div class="test1">测试</div>
<div class="test2">测试</div>
```

**效果:**

![line-height](img/line-height2.png)

`line-height`的最终表现是通过`line boxes`实现的，而无论`line boxes`所占据的高度是多少（无论比文字大还是比文字小），其占据的空间都是与文字内容共用水平线的

### 4种box

 - inline box(行内框):每个**行内元素**会生成一个行内框，行内框是一个浏览器渲染模型中的一个概念，无法显示出来，行内框的高度等于`font-size`，设定`line-height`时，**行内框的高度不变，改变的是行距**。

 - line box(行框):指本行的一个虚拟的矩形框，由该行中**行内框**组成。行框也是浏览器渲染模式中的一个概念，无法显示出来。**等于最上行内框顶部到最下行内框底部的距离(保证足以容纳它所包含的所有inline-box)**。当有多行内容时，每一行都有自己的**行框**。

![line-box](img/line-box.png)

 - content area(内容区):内容区是围绕着文字的一种box，无法显示出来，由`text-top`与`text-bottom`包裹，其高度取决于`font-size`。
 - containing box :包裹着上述三种box的box。

### 六种线


 - **baseline**:box的baseline与parent box的baseline对齐；如果该box没有baseline，则该box的底外边缘与parent box的baseline对齐；
 - **middle**：box的垂直中点与parent box的基线与parent box中小写字母x高度的一半的和对齐；
 - **sub**：降低box的基线到合适的位置来作为parent box的下标；
 - **super**:升高box的基线到合适的位置来作为parent box的上标；
 - **text-top**:box的top与父容器的内容区的顶部对齐；
 - **text-bottom**:box的bottom与父容器的内容区的底部对齐；

`font-size`的大小决定`text-top`到`text-bottom`之间的位置,`line-height`的大小决定`top`与`bottom`的位置。

>参考：
> 1. [深入了解CSS字体度量，行高和vertical-align](http://www.w3cplus.com/css/css-font-metrics-line-height-and-vertical-align.html)
> 2. http://www.cnblogs.com/fengzheng126/archive/2012/05/18/2507632.html
> 3. https://sinaad.github.io/xfe/2016/04/15/css-line-height/
> 4. [css行高line-height的一些深入理解及应用--张鑫旭]( http://www.zhangxinxu.com/wordpress/2009/11/css%E8%A1%8C%E9%AB%98line-height%E7%9A%84%E4%B8%80%E4%BA%9B%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3%E5%8F%8A%E5%BA%94%E7%94%A8/)
> 5. [详解CSS行高](https://sinaad.github.io/xfe/2016/04/15/css-line-height/)
> 6. [W3C标准--建议阅读](https://www.w3.org/TR/2011/REC-CSS2-20110607/visudet.html#line-height)

### vertical-align

CSS 的属性 `vertical-align` 用来指定行内元素（`inline`）或表格单元格（`table-cell`）元素的垂直对齐方式。

 - **baseline**:元素基线与父元素的基线对齐。

 - **sub**:元素基线与父元素的下标基线对齐。
 - **super**:元素基线与父元素的上标基线对齐。
 - **text-top**:元素顶端与父元素字体的顶端对齐。
 - **text-bottom**:元素底端与父元素字体的底端对齐。
 - **middle**:元素中线与父元素的小写x中线对齐。
 - **< length>**:元素基线超过父元素的基线指定高度。可以取负值。
 - **< percentage>**:同 < length> , 百分比相对于 `line-height `。

以下两个值是相对于整行来说的：

 - **top**：元素及其后代的顶端与整行的顶端对齐。
 - **bottom**：元素及其后代的底端与整行的底端对齐。


父元素取值**table-cell**元素:

 - baseline (and sub, super, text-top, text-bottom, <length>, and <percentage>)
     - 与同行单元格的基线对齐。
 - top
     - 单元格的内边距的上边缘与行的顶端对齐。
 - middle
     - 单元格垂直居中。
 - bottom
     - 单元格的内边距的下边缘与行的底端对齐。


![baseline](img/baseline.png)

上图所示线条从上到下为：

```
/*顶线*/
vertical-align:top;

vertical-align:text-top;

/*上标*/
vertical-align:super;  

/*中线*/   
vertical-align:middle;   

/*基线*/
vertical-align:baseline;  

/*下标*/
vertical-align:sub;		  

vertical-align:bottom;   

/*底线*/
vertical-align:text-bottom;
```
