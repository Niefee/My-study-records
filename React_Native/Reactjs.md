
<!-- toc orderedList:0 -->

- [Reactjs](#reactjs)
	- [ReactDOM.render()](#reactdomrender)
	- [JSX 语法](#jsx-语法)
	- [组件](#组件)
	- [this.props.children](#thispropschildren)
	- [PropTypes](#proptypes)
	- [获取真实的DOM节点](#获取真实的dom节点)
	- [this.state](#thisstate)
	- [表单](#表单)
	- [组件生命周期](#组件生命周期)
	- [生命周期与回调函数](#生命周期与回调函数)
	- [Ajax](#ajax)

<!-- tocstop -->
## Reactjs

### ReactDOM.render()

`ReactDOM.render()`是React最基本的方法，用于将模板转为 HTML 语言，并插入。

```js
ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('example')
);
```

>只能包括一个最顶层的标签。

### JSX 语法

 `JSX` 的基本语法规则：遇到 `HTML` 标签（以 `<` 开头），就用 `HTML` 规则解析；遇到代码块（以 `{ `开头），就用 `JavaScript` 规则解析，而且允许混写。

```js
var names = ['Alice', 'Emily', 'Kate'];

ReactDOM.render(
  <div>
  {
    names.map(function (name) {
      return <div>Hello, {name}!</div>
    })
  }
  </div>,
  document.getElementById('example')
);
```

`JSX`允许模板插件 JavaScript 变量。如果是数组，就会展开。

### 组件

React 允许将代码封装成组件，然后像 HTML 插入。

`createClass`用于生成一个组件类。

```js
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

组件类第一个字母必须是大写，否则报错。

组件的属性可以在组件类的`this.props`对象上获取。

### this.props.children

`this.props`对象的属性与组件一一对应。
但唯一的例外是`this.props.children`属性。

### PropTypes

组件类的`PropTypes`属性，用来验证组件实例是够符合要求。

```js
var MyTitle = React.createClass({

    getDefaultProps : function () {
       return {
         title : 'Hello World'
       };
     },

  propTypes: {
    title: React.PropTypes.string.isRequired,
  },

  render: function() {
     return <h1> {this.props.title} </h1>;
   }
});
```
上面的`MyTitle`组件有一个`title`属性，`PropTypes`规定属性必须是字符串，而是必须填写的。

`getDefaultProps`设置默认值。

通用写法：

```js
static defaultProps = {
       value: false,
   };

static propTypes = {
   value:React.PropTypes.func,
}
```

### 获取真实的DOM节点

组件的都是虚拟的 DOM ，是内存当中的一种数据结构。数据的变动先发生在虚拟 DOM 中，然后再反映在真实的DOM上。

要获得真实的DOM节点，就要用到`ref`属性。

```js
var MyComponent = React.createClass({
  handleClick: function() {
    this.refs.myTextInput.focus();
    console.log(this.refs.myTextInput.value);
  },
  render: function() {
    return (
      <div>
        <input type="text" ref="myTextInput" />
        <input type="button" value="Focus the text input" onClick={this.handleClick} />
      </div>
    );
  }
});

ReactDOM.render(
  <MyComponent />,
  document.getElementById('example')
);
```

`this.refs.[refName]`属性获取真实的DOM，所以等到虚拟 DOM 插入后才能使用这个属性，否则报错。

### this.state

组件免不了要与用户互动，React 的一大创新就是将组件看成一个状态机。状态变化就会触发重新渲染UI。

```js
var LikeButton = React.createClass({
  getInitialState: function() {
    return {liked: false};
  },
  handleClick: function(event) {
    this.setState({liked: !this.state.liked});
  },
  render: function() {
    var text = this.state.liked ? 'like' : 'haven\'t liked';
    return (
      <p onClick={this.handleClick}>
        You {text} this. Click to toggle.
      </p>
    );
  }
});

ReactDOM.render(
  <LikeButton />,
  document.getElementById('example')
);
```

 - `getInitialState`:定义初始状态，也是一个对象，通过`this.state`可以获取。
 - `this,setState`:修改状态值，修改后会自动调用`this.render`方法，重新渲染。

`this.props`表示一旦确定就不太改变的属性，`this.state`会随用户互动而产生变化。

### 表单

```js
var Input = React.createClass({
  getInitialState: function() {
    return {value: 'Hello!'};
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
  },
  render: function () {
    var value = this.state.value;
    return (
      <div>
        <input type="text" value={value} onChange={this.handleChange} />
        <p>{value}</p>
      </div>
    );
  }
});

ReactDOM.render(<Input/>, document.body);
```

`event.target.value`用于读取文本输入的内容。
`onchange`事件对用于的输入做出反应。
### 组件生命周期

组件的生命周期可分成三个状态：

 - `Mounting`：已插入真实 DOM
 - `Updating`：正在被重新渲染
 - `Unmounting`：已移出真实 DOM

 React 为每个状态都提供了两种处理函数，will 函数在进入状态之前调用，did 函数在进入状态之后调用，三种状态共计五种处理函数。

  - componentWillMount()
  - componentDidMount()
  - componentWillUpdate(object nextProps, object nextState)
  - componentDidUpdate(object prevProps, object prevState)
  - componentWillUnmount()

 此外，React 还提供两种特殊状态的处理函数。

  - componentWillReceiveProps(object nextProps)：已加载组件收到新的参数时调用
  - shouldComponentUpdate(object nextProps, object nextState)：组件判断是否重新渲染时调用

### 生命周期与回调函数

生命周期|	调用次数|	能否使用 setSate()
-------|----------|---------------
getDefaultProps	|1(全局调用一次)	|否
getInitialState|	1	|否
componentWillMount|	1	|是
render|	>=1	|否
componentDidMount	|1	|是
componentWillReceiveProps|	>=0|	是
shouldComponentUpdate|	>=0|	否
componentWillUpdate|	>=0|	否
componentDidUpdate|	>=0|	否
componentWillUnmount|	1	|否

### Ajax

略。

>资料参考：[阮一峰](http://www.ruanyifeng.com/blog/2015/03/react.html)
