[TOC]

##import与export

**import**

```js
import * as _ from 'src/lodash';           // 引入外部文件所有对象
import { each, map } from 'src/lodash';    // 引入外部文件部分对象
import _ from 'src/lodash';                // 引入外部文件默认导出对象
import _, { each, map } from 'src/lodash'; // 同时引入默认导出对象和部分对象
import 'src/lodash';                       // 只加载外部文件，但啥都不引入
 
```

**export**

```js
export let _ = function () {};           // 导出 _ 对象
export function lodash () {};            // 导出 lodash 函数
export default function (x) {return x};  // 导出匿名函数并设为默认导出对象
export { _, lodash as default };         // 一次导出多个对象

```

>链接：https://www.zhihu.com/question/27917401/answer/38709677


##reactj入门

**JSX语言**允许**HTML**与**JavaScript**混写。
遇到 HTML 标签（以 < 开头），就用 HTML 规则解析；遇到代码块（以 \{ 开头），就用 JavaScript 规则解析。

**ReactDOM.render**是**React**的最基本方法，用于将模板转为 **HTML** 语言，并插入指定的 DOM 节点。


```
ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('example')
);
```

**React**允许将代码封装成组件（component），然后像插入普通**HTML**标签一样，在网页中插入这个组件。

**React.createClass**方法就用于生成一个组件类。

```
var HelloMessage = React.createClass({
  render: function() {
    return <h1>Hello {this.props.name}</h1>;
  }
});

ReactDOM.render(
  <HelloMessage name="John" />,
  document.getElementById('example')
);
```

>组件类的第一个字母必须大写，否则会报错。

组件类只能包括一个顶层标签。

可以通过`this.props`读取组件类上的属性值。

注意：使用`className`表示`class`,`htmlFor`表示`for`;

























