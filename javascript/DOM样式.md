[TOC]

##获取DOM节点样式

 - element.style

`element.style`只能获取写在元素标签中的行内style属性值，无法获取到定义在`<style></style>`和通过`<link href=”css.css”>`加载进来的样式属性。

    var ele = document.getElementById('ele');
    ele.style.color;    //获取颜色


 - window.getComputedStyle()

`window.getComputedStyle()`:可以获取当前元素所有最终使用的CSS属性值。

    var ele = document.getElementById('ele');
    var styles = window.getComputedStyle(ele,null);
    styles.color;  //获取颜色

>这个方法接受两个参数,如果不需要伪元素信息，第二个参数可以是null。

 - element.currentStyle 

IE 专用，返回的是元素当前应用的最终CSS属性值。

    var ele = document.getElementById('ele');
    var ele = document.getElementById('ele');
    styles.color;

 - getPropertyValue()

获取CSS样式的直接属性名称

    var ele = document.getElementById('ele');
    window.getComputedStyle(ele,null).getPropertyValue('color');

>属性名不支持驼峰格式。

 - getAttribute()

与getPropertyValue类似，有一点的差异是属性名驼峰格式。

    var test = document.getElementById('test');
    window.getComputedStyle(test, null).getAttribute("backgroundColor"); 
    //test.getAttribute("style");

>只能获取标签`< style>< /style>`内的属性值,也可以直接使用`ele.getAttribute()`获取标签属性值。
>这个方法在非IE下 会有兼容问题。







