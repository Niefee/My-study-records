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

### 配置文件

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

><http://www.jianshu.com/p/bed000e1830b>

### 配置参数

server下的结点：

listen：监听80端口

server_name：转发到的地址，要配置成域名形式，不能是`127.0.0.1`

proxy_pass：要代理的地址

## Linux

root权限打开一个窗口，来管理文件：

```shell
gnome-open /etc
　　
ubuntu中 nautilus /etc
```

```shell
server {
    # 监听的端口
    listen      80;
    # 或者监听的地址和端口
    #listen       193.168.1.25:9090;

    #用193.168.1.25:80访问到193.168.1.25:9090的内容。
    server_name  193.168.1.25;

    #charset koi8-r;

    # 日志文件地址
    #access_log  logs/host.access.log  main;

    location / {
        # 代理的地址
        proxy_pass http://193.168.1.25:9090;

        # 或者以一个文件夹为根目录启动服务器
        #root   html;
        #root    E:/Data/code/vue/vue-2.0-simple-routing-example;
        #index  index.html index.htm;
    }
```

### Ubuntu安装

<http://blog.takwolf.com/2016/10/19/setup-nginx-on-ubuntu/index.html>

### CentOS安装

<http://www.centoscn.com/image-text/install/2014/0812/3480.html>

<https://my.oschina.net/liucao/blog/470241>
