
<!-- toc orderedList:0 depthFrom:1 depthTo:6 -->

* [webpack](#webpack)
    * [概述](#概述)
    * [安装使用](#安装使用)
    * [使用](#使用)
    * [loader](#loader)
    * [配置文件](#配置文件)
    * [插件](#插件)
    * [开发环境](#开发环境)
    * [webpack压缩](#webpack压缩)
    * [手机访问](#手机访问)

<!-- tocstop -->

# webpack
## 概述
Webpack 是一个模块打包器。它将根据模块的依赖关系进行静态分析，然后将这些模块按照指定的规则生成对应的静态资源。

![](img/what-is-webpack.png)

## 安装使用

```js
npm install webpack -g
```

>这个必须要全局安装，才能使用webpack的命令。


需要使用webpack开发者工具，要单独安装:

```js
npm install webpack-dev-server --save-dev
```

## 使用

创建一个静态页面 index.html 和一个 JS 入口文件 entry.js：

```html
<!-- index.html -->
<html>
<head>
  <meta charset="utf-8">
</head>
<body>
    <h3 id="title">hello world</h3>
    <script src="bundle.js"></script>
</body>
</html>
```


```js
// entry.js
document.write('It works.');
console.log(document.getElementById('title').innerHTML);//hello world
```

然后编译`entry.js`,同时会生成`bundle.js`

    $ webpack entry.js bundle.js

在浏览器中打开`index.html`就可以查看结果。

在页面启动时，会先执行 `entry.js` 中的代码，其它模块会在运行 `require` 的时候再执行。

## loader

Webpack 本身只能处理 JavaScript 模块，如果要处理其他类型的文件，就需要使用 `loader` 进行转换。

Loader 可以在 `require()` 引用模块的时候添加，也可以在 webpack 全局配置中进行绑定，还可以通过命令行的方式使用。

使用`npm`安装`loader`：

```bash
# 用于CSS文件的转换处理
npm install css-loader style-loader

# 用于图片文件的转换处理
npm install file-loader url-loader
```

## 配置文件


```js
var webpack = require('webpack')

module.exports = {
  entry: './entry.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: 'style-loader!css-loader'},//webpack2写法
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
    ]
  }
}
```

运行命令`webpack`，就能查看效果了。

## 插件

安装本地项目依赖

```js
npm install webpack --save-dev
```

Webpack 本身内置了一些常用的插件，还可以通过 `npm` 安装第三方插件。

插件配置写在`webpack.config.js`中，

    plugins: [
        new webpack.BannerPlugin('This file is created by BB')
    ]


## 开发环境

全局安装`webpack-dev-server`,可以实时监听以及编译。

```js
// 安装
$ npm install webpack-dev-server -g

//运行
//页面有编译进度条
$ webpack-dev-server --progress --colors

```

>资料参考：http://zhaoda.net/webpack-handbook/index.html

## webpack压缩

 - 使用插插件`uglify`

```js
var webpack=require('webpack');

new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,  // remove all comments
      },
      compress: {
        warnings: false
      }
    })

```

 - 将React切换到产品环境

```js
   new webpack.DefinePlugin({
      'process.env': {
          //产品环境下，不会进行错误检测
          NODE_ENV: JSON.stringify("production")
      },
    }),
```

## 手机访问

```js
devServer{
  //使用webpack构建必须加上这行其他设备才可以访问。
  host:'0.0.0.0'
}
```

然后通过本地**服务器地址**加上**端口**访问电脑文件。

>详细教程：https://github.com/ruanyf/webpack-demos
