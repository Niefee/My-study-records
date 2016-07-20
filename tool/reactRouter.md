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


