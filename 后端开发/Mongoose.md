
<!-- toc orderedList:0 depthFrom:1 depthTo:6 -->

* [Mongoose](#mongoose)
    * [使用mongoose连接数据库](#使用mongoose连接数据库)
    * [Schema](#schema)
    * [model](#model)

<!-- tocstop -->

# Mongoose

关系型数据库使用`表`来存储数据，使用`行`来组织，一个表内有多个行。想获取数据，要使用SQL语言查询。
MongoDB是非关系型(NOSQL)数据库，也叫文档数据库，没有关系型数据库中`表`与`行`的概念，类似的只有`集合`与`文档`的概念。
`集合`与`表`、`文档`与`行`有点类似。

## 使用mongoose连接数据库

```js
var mongoose=require('mongoose'),
db_url='mongodb://localhost:12345/dbCol';
//dbCol是一个数据库名称

mongoose.connect(db_url);

mongoose.connection.on('connected',function(){
    console.log('mongoose connection open to '+ db_url);
});
//除了connected事件，还有error、disconnected

```

## Schema

一种以文件形式存储的数据库模型骨架，无法直接通往数据库端，也就是说它不具备对数据库的操作能力.
每一个`schema`会映射到`mongodb`当中的`collection`。

```js
//定义一个Schema

SchemaGo=mongoose.Schema;
//新建一个schema实例对象
var UserSchema=new SchemaGo({
    username:{type:String},
    userpwd:{type:String},
    userage:{type:Number},
    logindate:{type:Date},
});
```

schema中的数据类型

 - String
 - Number
 - Date
 - Boolean
 - Buffer
 - ObjectId
 - Mixed
 - Array

## model

`model`是由`schema`生成的模型，可以对数据库的操作。

```js
//model

var UserDo= mongoose.model('UserBo',UserSchema);
//UserBo为Model的名字，也是数据库中collection的名字，UserSchema为生成Model所需要的schema,Model就像是schema所编译而成的一样。

var user = new UserDo({
    username : 'niefee',
    userpwd:'adsf',
    userage:24,
    logindate : new Date()
});

//保存数据
user.save(function(err,res){
    if(err){
        console.log('err>>>',err);
    }else{
        console.log('res>>',res);
    }
});

```

>[参考](http://www.cnblogs.com/zhongweiv/p/mongoose.html)
