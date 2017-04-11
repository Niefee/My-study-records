
<!-- toc orderedList:0 depthFrom:1 depthTo:6 -->

* [meta标签](#meta标签)
    * [viewport指令](#viewport指令)

<!-- tocstop -->

# meta标签
## viewport指令

```html
<meta name="viewport" content="width=240, height=320, user-scalable=yes, initial-scale=2.5, maximum-scale=5.0, minimun-scale=1.0">

<!-- 以下的是常用设置 -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```


 - `width`和`height`指令分别指定视区的逻辑宽度和高度。他们的值要么是以像素为单位的数字，要么是一个特殊的标记符号。`width`指令使用`device-width`标记可以指示视区宽度应为设备的屏幕宽度。类似地`height`指令使用`device-height`标记指示视区高度为设备的屏幕高度。

 - `user-scalable`指令指定用户是否可以缩放视区，即缩放Web页面的视图。值为yes时允许用户进行缩放，值为no时不允许缩放。

 - `initial-scale`指令用于设置Web页面的初始缩放比例。默认的初始缩放比例值因智能手机浏览器的不同而有所差异。通常情况下设备会在浏览器中呈现出整个Web页面，设为1.0则将显示未经缩放的Web文档。

 - `maximum-scale`和`minimum-scale`指令用于设置用户对Web页面缩放比例的限制。值的范围为`0.25`至`10.0`之间。与`initial-scale`相同，这些指令的值是应用于视区内容的缩放比例。
