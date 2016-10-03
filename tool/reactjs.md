
## reactj入门


**JSX语言**允许**HTML**与**JavaScript**混写。
遇到 HTML 标签（以 `<` 开头），就用 HTML 规则解析；遇到代码块（以 `{ `开头），就用 JavaScript 规则解析。

**ReactDOM.render**是**React**的最基本方法，用于将模板转为 **HTML** 语言，并插入指定的 DOM 节点。


```js
ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('example')
);
```

**React**允许将代码封装成组件（component），然后像插入普通**HTML**标签一样，在网页中插入这个组件。

**React.createClass**方法就用于生成一个组件类。

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

**React.Component**生成一个组件类

```js
import React from 'react';

class Contacts extends React.Component {  
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div></div>
    );
  }
}

export default Contacts;  

```

>这是ES6的方法。
>http://www.peachis.me/react-createclass-versus-extends-react-component/

>组件类的第一个字母必须大写，否则会报错。

组件类只能包括一个顶层标签。

可以通过`this.props`读取组件类上的属性值。

注意：使用`className`表示`class`,`htmlFor`表示`for`;


**this.state**

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

`getInitialState`:定义了初始状态；
`this.state`:可以读取初始状态的对象的属性值；
`this.setState`:修改状态值；
`this.render`:每次修改状态值都会调用这个方法；


`this.props` 表示那些一旦定义，就不再改变的特性，而 `this.state`是会随着用户互动而产生变化的特性。


**表单**

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

`this.props.value`不能读取文本框输入的内容，但可以通过`event.target.value`读取。


**组件生命周期**

 - Mounting：已插入真实 DOM

 - Updating：正在被重新渲染

 - Unmounting：已移出真实 DOM

**React**为每个状态都提供了两种处理函数，**will** 函数在进入状态之前调用，**did**函数在进入状态之后调用，三种状态共计五种处理函数。

 - componentWillMount()
 - componentDidMount()
 - componentWillUpdate(object nextProps, object nextState)
 - componentDidUpdate(object prevProps, object prevState)
 - componentWillUnmount()


```js
var Hello = React.createClass({
  getInitialState: function () {
    return {
      opacity: 1.0
    };
  },

  componentDidMount: function () {
    this.timer = setInterval(function () {
      var opacity = this.state.opacity;
      opacity -= .05;
      if (opacity < 0.1) {
        opacity = 1.0;
      }
      this.setState({
        opacity: opacity
      });
    }.bind(this), 100);
  },

  render: function () {
    return (
      <div style={{opacity: this.state.opacity}}>
        Hello {this.props.name}
      </div>
    );
  }
});

ReactDOM.render(
  <Hello name="world"/>,
  document.body
);

```

`hello`组件加载后，通过`componentDidMount`方法设置一个定时器，从而引发重新渲染。

组件属性值应该写成：

```js
style={{opacity: this.state.opacity}}
```

>第一重大括号表示这是 JavaScript 语法，第二重大括号表示样式对象。

**Ajax**

数据可以通过`componentDidMount`设置**Ajax**请求等到，等到成功后，可以用`this.setState`重新渲染UI。

>http://www.ruanyifeng.com/blog/2015/03/react.html

##State 和 Props

可以声明 prop 为指定的 JS 基本数据类型，默认情况，这些数据是可选的:

 - optionalArray: React.PropTypes.array,
 - optionalBool: React.PropTypes.bool,
 - optionalFunc: React.PropTypes.func,
 - optionalNumber: React.PropTypes.number,
 - optionalObject: React.PropTypes.object,
 - optionalString: React.PropTypes.string,

###React 组件 API

 - 设置状态：**setState**
 - 替换状态：**replaceState**
 - 设置属性：**setProps**
 - 替换属性：**replaceProps**
 - 强制更新：**forceUpdate**
 - 获取DOM节点：**getDOMNode**
 - 判断组件挂载状态：**isMounted**

###ref

`ref`可以绑定在`render()`输出的任何组件上，允许用户引用`render()`返回相应的支撑实例。

```js
var MyComponent = React.createClass({
  handleClick: function() {
    // 使用原生的 DOM API 获取焦点
    this.refs.myInput.focus();
  },
  render: function() {
    //  当组件插入到 DOM 后，ref 属性添加一个组件的引用于到 this.refs
    return (
      <div>
        <input type="text" ref="myInput" />
        <input
          type="button"
          value="点我输入框获取焦点"
          onClick={this.handleClick}
        />
      </div>
    );
  }
});
```

##遍历循环

###循环子节点

```js
const  NotesList = React.createClass({
  render: function() {
    return (
      <ol>
      {
        React.Children.map(this.props.children, function (child) {
          return <li>{child}</li>;
        })
      }
      </ol>
    );
  }
});
```


```js
ReactDOM.render(
  <NotesList>
    <span>hello</span>
    <span>world</span>
  </NotesList>,
  document.body
);
```

上面代码的 NoteList 组件有两个 span 子节点，它们都可以通过 this.props.children 读取。

###循环json数据

```js
const List=React.createClass({
    render:function() {
        return (
            <ul>
            {
                React.Children.map(this.props.ld, function (ls) {
                    return <li>{ls}</li>;
                })
            }
            </ul>
        )
    }
});
```

```js
var name=["ane","INdo","dfoH"];
```

会以列表展开数据。
