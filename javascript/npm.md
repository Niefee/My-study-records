##简介

`npm`是一个Node模块登记管理与管理系统。

##常用命令：

把`npm`更新到最新版

    $ npm install npm@latest -g

查看信息

```
# 查看 npm 命令列表
$ npm help

# 查看各个命令的简单用法
$ npm -l

# 查看 npm 的版本
$ npm -v

# 查看 npm 的配置
$ npm config list -l
```

###npm init

`npm init`初始化`package.json`的配置，使用`-f`(代表force)，`-y`(代表也是yes)。

    $ npm init -y

###npm set

设置环境变量

```
$ npm set init-author-name 'Your name'
$ npm set init-author-email 'Your email'
$ npm set init-author-url 'http://yourdomain.com'
$ npm set init-license 'MIT'
```

执行`npm init`时填写的信息，保存在用户目录`~/.npmrc`文件中。

###npm info

`npm info`命令可以查看每个模块的具体信息，返回javascript对象。

###npm search

`npm search`命令用于搜索npm仓库，它后面可以跟字符串，也可以跟正则表达式。

###npm list

`npm list`命令以树型结构列出当前项目安装的所有模块，以及它们依赖的模块。

    $ npm list

加上global参数，会列出全局安装的模块。

    $ npm list -global

npm list命令也可以列出单个模块。

    $ npm list underscore

###npm install

有`-g`参数代表全局安装，本地安装的会会在本目录下安装。

支持从Github代码库地址安装

    $ npm install git://github.com/package/path.git
    $ npm install git://github.com/package/path.git#0.1.0

直接使用`npm install`会安装`package.json`里的配置文件。

指定安装版本：

```
$ npm install sax@latest
$ npm install sax@0.1.1
```

添加安装信息：

 - **–save**：模块名将被添加到dependencies，可以简化为参数-S。
 - **–save-dev**: 模块名将被添加到devDependencies，可以简化为参数-D。
 - **-save-optionsl**:安装包信息将加入到optionalDependencies（可选阶段的依赖）,简写-O。
 - **-save-exact**:精确安装指定模块版本。


一旦安装了某个模块，就可以在代码中用**require**命令调用这个模块。


    var backbone = require('backbone')
    console.log(backbone.VERSION)


###npm update npm uninstall

```
# 升级当前项目的指定模块
$ npm update [package name]


# 卸载已安装的模块。
$ npm uninstall [package name]
```

###npm run

`npm run`命令可以可以运行`package.json`里的`script`脚本。

>http://javascript.ruanyifeng.com/nodejs/npm.html


###npm outdated

`npm outdated`检查模块是否过期。

###npm cache

`npm cache`管理模块的缓存

    //查看缓存
    npm cache ls [<path></path>]


    //清理缓存
    npm cache clean [<path></path>]</version></name></tarball></folder></tarball>


## npm 代理配置

### (1)通过 config 配置指向国内镜像源

```
npm config set registry http://registry.cnpmjs.org //配置指向源
npm info express  //下载安装第三方包
```

### (2)通过 npm 命令指定下载源

```
npm --registry http://registry.cnpmjs.org info express
```

### (3)在配置文件 ~/.npmrc 文件写入源地址

```
nano ~/.npmrc   //打开配置文件
registry =https://registry.npm.taobao.org   //写入配置文件
```

>推荐最后一种方法，前两个都是临时的。

### 全局安装新命令

```
$ npm install -g cnpm --registry=https://registry.npm.taobao.org
```
