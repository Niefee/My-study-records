
<!-- toc orderedList:0 depthFrom:1 depthTo:6 -->

* [Vue](#vue)
    * [钩子函数](#钩子函数)
    * [Vue指令](#vue指令)
        * [v-html](#v-html)
        * [v-bind](#v-bind)
        * [v-if](#v-if)
        * [v-on](#v-on)
        * [v-model](#v-model)
        * [v-for](#v-for)
    * [过滤器](#过滤器)
        * [计算属性](#计算属性)

<!-- tocstop -->

# Vue

## 钩子函数

对于前端来说，钩子函数就是指在所有函数执行前，先执行了的函数。提供一个可以影响默认的(或原有的)流程(机制)的时机。

## Vue指令

带有前缀`v-`表示Vue提供的特殊属性，用于在表达式的值改变时，将某些行为应用到 DOM 上。

### v-html

使用 `v-html` 指令用于输出 html 代码：

```html
<div id="app">
    <div v-html="message"></div>
</div>

<script>
new Vue({
  el: '#app',
  data: {
    message: '<h1>helo</h1>'
  }
})
</script>
```

###  v-bind

HTML 属性中的值应使用`v-bind`指令。

```html
<!-- CSS -->
<style>
.classStyle{
  background: #444;
  color: #eee;
}
</style>

<!-- HTML -->
<div id="app">
  <label for="r1">修改颜色</label><input type="checkbox" v-model="classBool" id="r1">
  <br><br>
  <div v-bind:class="{'classStyle': classBool}">
    directiva v-bind:class
  </div>
</div>

<!-- JS -->
<script>
new Vue({
	el: '#app',
  data:{
  	classBool: false
  }
});
</script>
```

### v-if

`v-if`指令根据表示表达式的值(`true` or `false`)决定是否插入元素。

```html
<div id="app">
    <p v-if="seen">现在你看到我了</p>
    <p v-else>你看不到我了</p>
</div>

<script>
new Vue({
  el: '#app',
  data: {
    seen: true
  }
})
</script>
```

###  v-on

`v-on`指令，它用于监听 DOM 事件：

```html
<a v-on:click="doSomething">
```

>在这里参数是监听的事件名。

###  v-model

`v-model`可以监听输入框的输入内容，实现双向数据绑定。

```html
<div id="app">
    <p>{{ message }}</p>
    <input v-model="message">
</div>

<script>
new Vue({
  el: '#app',
  data: {
    message: 'Runoob!'
  }
})
</script>
```

### v-for

`v-for`指令可以绑定数组的数据来循环操作。指令需要以 `item in items` 形式的特殊语法。

```html
<ul>
  <li v-for="(value, key, index) in todos">
   {{ index }}. {{ key }} : {{ value }}
  </li>
</ul>
</div>

<script type="text/javascript">
var app4 = new Vue({
    el: '#app-4',
    data: {
    todos: [
          { text: '学习 JavaScript' },
          { text: '学习 Vue' },
          { text: '整个牛项目' }
        ]
    }
})
</script>
```
## 过滤器

过滤器的设计目的就是用于文本转换，被用作一些常见的文本格式化。

```html
<!-- in mustaches -->
{{ message | capitalize }}

{{ message | filterA | filterB }}

{{ message | filterA('arg1', arg2) }}

<!-- in v-bind -->
<div v-bind:id="rawId | formatId"></div>
```
在`mustache`绑定和 `v-bind` 表达式中使用。

```html
<div id="app">
  {{ message | capitalize }}
</div>

<script>
new Vue({
  el: '#app',
  data: {
    message: 'hello world'
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
})
</script>
```
### 计算属性

```html

<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>

<script type="text/javascript">
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // a computed getter
    reversedMessage: function () {
      // `this` points to the vm instance
      return this.message.split('').reverse().join('')
    }
  },

  //也可以用下面的方法
  // in component
    methods: {
      reversedMessage: function () {
        return this.message.split('').reverse().join('')
      }
    }
})
</script>

```
计算属性是基于它们的依赖进行**缓存**的。计算属性只有在它的**相关依赖发生改变**时才会重新求值。这就意味着只要 `message `还没有发生改变，多次访问 `reversedMessage` 计算属性会立即返回之前的计算结果，而不必再次执行函数。

>参考：https://cn.vuejs.org/v2/guide/computed.html

