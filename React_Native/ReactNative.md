
<!-- toc orderedList:0 -->

- [Fetch()](#fetch)
- [定义组件的属性类型和默认属性](#定义组件的属性类型和默认属性)
- [state](#state)

<!-- tocstop -->
## Fetch()

```js
loadData(){
    var vn='2.3.0',OS_IOS=(Platform.OS == 'ios'?true:false);

    const promise =new Fetch({
            url: 'app/update.json',
            method:'POST',
            data: {
                //上传本地的系统信息，后端处理后返回结果。
                "platformDeviceTypeCode" : OS_IOS ? 'ios-hand':'aos-hand',//传入当前版本系统
                "versionNumber" :vn//版本号
            }
    }).dofetch();

    promise.then((data)=>{
        console.log('-------Platform-----',Platform);
        console.log('------OS_IOS------',OS_IOS);
        console.log('--------vn------',vn);
        console.log('=>data',data);

    })
    .catch((error)=>{
        console.log('=>catch',error);
    })
}
```

## 定义组件的属性类型和默认属性

在ES5里，属性类型和默认属性分别通过`propTypes`成员和`getDefaultProps`方法来实现。

```js
//ES5
var Video = React.createClass({
    getDefaultProps: function() {
        return {
            autoPlay: false,
            maxLoops: 10,
        };
    },
    propTypes: {
        autoPlay    : React.PropTypes.bool.isRequired,
        maxLoops    : React.PropTypes.number.isRequired,
        posterFrameSrc: React.PropTypes.string.isRequired,
        videoSrc    : React.PropTypes.string.isRequired,
        width 		: React.PropTypes.number, 					// 宽度
		height		: React.PropTypes.number.isRequired, 		// 高度，必须
		images		: React.PropTypes.array,					// 图片数组
		onPress		: React.PropTypes.func,						// 图片点击事件，回传图片下标
		imageProps  : React.PropTypes.object,
		renderPagination: React.PropTypes.func,

    },
    render: function() {
        return (
            <View />
        );
    },
});


//ES6

class Video extends React.Component {
    static defaultProps = {
        autoPlay: false,
        maxLoops: 10,
    };  // 注意这里有分号
    static propTypes = {
        autoPlay: React.PropTypes.bool.isRequired,
        maxLoops: React.PropTypes.number.isRequired,
        posterFrameSrc: React.PropTypes.string.isRequired,
        videoSrc: React.PropTypes.string.isRequired,

        //这个属性的类型要求按照TextInput类型要求检查
        InputFn: TextInput.propTypes.style,
        
    };  // 注意这里有分号
    render() {
        return (
            <View />
        );
    } // 注意这里既没有分号也没有逗号
}
```
关键字`isRequired`代表这个参数是必须的，没有就报错。

要求属性是JavaScript基本类型

 - React.PropTypes.array;
 - React.PropTypes.bool;
 - React.PropTypes.func;
 - React.PropTypes.number;
 - React.PropTypes.object;
 - React.PropTypes.string;

>参考http://m.blog.csdn.net/article/details?id=52129858


## state

```js
//ES6
class Video extends React.Component {
    state = {
        loopsRemaining: this.props.maxLoops,
    }
}

//ES6
class Video extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loopsRemaining: this.props.maxLoops,
        };
    }
}
```
