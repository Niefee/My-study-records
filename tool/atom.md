## atom手动安装使用

1. 本地安装
以activate-power-mode插件为例

```js
cd ~/.atom/packages

git clone https://github.com/JoelBesada/activate-power-mode.git

cd activate-power-mode

npm install

```

然后重启。

2. 命令行安装

```
apm install atom-ternjs
```

国内需要科学上网。

3. 下载插件文件到本地

在插件地址里点击Repo就能进到插件对应的GitHub项目页面，然后你可以选择Clone or download下载项目到本地的/Users/username/.atom/packages路径下。

`.atom`默认情况下隐藏文件，Mac下的隐藏文件可以通过命令行显示出来。

显示隐藏文件：

    defaults write com.apple.finder AppleShowAllFiles -boolean true ; killall Finder

再次隐藏：

    defaults write com.apple.finder AppleShowAllFiles -boolean false ; killall Finder
