##react路由使用

```js
import { Link,Router,Route,hashHistory,browserHistory,IndexRoute,IndexRedirect,Redirect} from 'react-router'

ReactDOM.render((
    <div>
        <h2>路由转换测试</h2>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                {/*默认路由*/}
                {/*<IndexRoute component={Dashboard}/>*/}
                {/*重定向路由 ,加载首页的时候跳转到指定路由*/}
                {/*<IndexRedirect to="/inbox"/>*/}
                {/*路由跳转*/}
                {/*<Redirect from="/message" to="/inbox"/>*/}
                <Route path="/about" component={About}/>
                <Route path="/message" component={Message}/>
                <Route path="/inbox" component={Inbox}/>
            </Route>
        </Router>
    </div>
), document.getElementById('app'));
```

##React Router 通配符



```js
<Route path="/hello/:name">
// 匹配 /hello/michael
// 匹配 /hello/ryan

//:paramName匹配URL的一个部分，直到遇到下一个/、?、#为止。这个路径参数可以通过this.props.params.paramName取出。

<Route path="/hello(/:name)">
// 匹配 /hello
// 匹配 /hello/michael
// 匹配 /hello/ryan

//()表示URL的这个部分是可选的。

<Route path="/files/*.*">
// 匹配 /files/hello.jpg
// 匹配 /files/hello.html

<Route path="/files/*">
// 匹配 /files/ 
// 匹配 /files/a
// 匹配 /files/a/b

//*匹配任意字符，直到模式里面的下一个字符为止。匹配方式是非贪婪模式。

<Route path="/**/*.jpg">
// 匹配 /files/hello.jpg
// 匹配 /files/path/to/file.jpg

//** 匹配任意字符，直到下一个/、?、#为止。匹配方式是贪婪模式。

```