##安装

使用npm全局安装typings

    npm install -g typings


##安装插件

以安装`node.js`自动补全为例，在项目根目录下使用bash或者cmd，输

    typings install dt-node --global

其中`dt~`为使用DefinitelyTyped类型定义的意思，vscode可以识别这种定义。

同理，安装`express`、`lodash`：

```
typings install dt~express --global
typings install dt~lodash --global
```

##typings基本语法

```nodejs
# 安装Typings的命令行代码. 
npm install typings --global

# 搜索对应模块的typings定义. 
typings search tape

# 根据名称寻找一个可获得的typings定义. 
typings search --name react

# 如果你用一个独立包的模块: 
# 或者并不是安装全局模块
# 比如并不是在命令行通过输入npm install -g typings这种方式安装的. 
typings install debug --save

# 如果是通过script标记
# 或者是子环境的一部分
# 或者全局typings命令不可用的时候： 
typings install dt~mocha --global --save

# 从其他版本处安装typings定义(比如env或者npm). 
typings install env~atom --global --save
typings install npm~bluebird --save

# 使用该文件`typings/index.d.ts` (在`tsconfig.json`文件使用或者用 `///` 定义). 
cat typings/index.d.ts
```

##typings使用

添加文件链接到`js`文件头部

    /// <reference path="./typings/main.d.ts" />

>参看：http://www.cnblogs.com/Leo_wl/p/5455619.html
>http://blog.csdn.net/liyijun4114/article/details/51658087