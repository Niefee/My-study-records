# nginx

## window平台

### 1. 下载

到官网下载安装包：

<http://nginx.org/en/download.html>

### 启动

直接进入目录，可以直接双击`nginx.exe`启动。

或者

启动终端，使用`start nginx.exr`启动。

默认`80`端口，打开浏览器输入`127.0.0.1`或者`localhost`可以查看内容。

## 配置文件

可以打开conf文件夹下的`nginx.conf`文件可以配置项目参数。

nginx命令：

```
nginx -s stop       快速关闭Nginx，可能不保存相关信息，并迅速终止web服务。
nginx -s quit       平稳关闭Nginx，保存相关信息，有安排的结束web服务。
nginx -s reload     因改变了Nginx相关配置，需要重新加载配置而重载。
nginx -s reopen     重新打开日志文件。
nginx -c filename   为 Nginx 指定一个配置文件，来代替缺省的。
nginx -t            不运行，而仅仅测试配置文件。nginx 将检查配置文件的语法的正确性，并尝试打开配置文件中所引用到的文件。
nginx -v            显示 nginx 的版本。
nginx -V            显示 nginx 的版本，编译器版本和配置参数。
```