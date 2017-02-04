
<!-- toc orderedList:0 depthFrom:1 depthTo:6 -->

* [MongoDB](#mongodb)
    * [MongoDB安装](#mongodb安装)
    * [使用数据库](#使用数据库)

<!-- tocstop -->


# MongoDB
## MongoDB安装

**MAC平台下：**

1. 下载最新版本
    1. 地址：https://www.mongodb.com/download-center
2. 将MongoDB添加到环境变量中

```bash
##mongod config
#vim ~/.bash_profile

export PATH=/Users/**/mongodb/bin:$PATH

## 然后使命令生效

source ~/.bash_profile。
```
添加了系统环境变量，以后就不用使用`./bin/mongod`调用文件了，直接使用`mongo`就行了。

3. 配置文件

```bash
mongodb --dbpath $dbpath
##数据库文件路径

--logpath $logpath
##日志文件的路径

--logappend
##以追加啊的方式打开文件

--fork
##将数据库文件放到后台运行
```

配置文件：

```bash
##启动的端口
port =12345

##存放数据文件的文件夹
dbpath =data

##存放打印日志文件的文件夹
logpath =log/mongod.log

##Linux为后台进程
fork =true
```
>在mongoDB文件夹里新建了三个文件夹data、log、conf

4. 启动数据库服务器

```bash
##启动mongodb服务
##mongod.conf 为配置文件
./bin/mongod -f conf/mongod.conf
```
>mongod是用来启动服务器

```bash
##连接到mongoDB服务器
./bin/mongo 127.0.0.1:12345/test
```
>mongo编译后是客户端

5. 关闭服务器

```bash
use admin

db.shutdownServer();

```

>[参考](http://www.cnblogs.com/wx1993/p/5187530.html)

## 使用数据库

```bash
# 查看数据库
> show dbs
admin   0.000GB
local   0.000GB

# 选择数据库
## 如果没有这个数据库，会自动创建
>use userDB
switched to db userDB

# 删除数据库
> db.dropDatabase()
{"dropped" : "userDB","ok" : 1}

# 在一个集合中插入数据，没有这个集合的话会自动创建
> db.useDB.insert({x:1})

# 查看集合
>show collections

# 查看信息
> db.userDB.find()
> db.userDB.find({x:1})

# 集合中数据数量
> db.userDB.find().count()

# 跳过数据、返回一定数量的数据
> db.userDB.find().skip(1).limit(2)

# 排序

升序：
> db.userInfo.find().sort({age: 1});

降序：
> db.userInfo.find().sort({age: -1});
```
