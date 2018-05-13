
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

* [深入浅出MySQL](#深入浅出mysql)
	* [数据库相关操作](#数据库相关操作)
	* [数据表](#数据表)
	* [数据操作](#数据操作)
	* [事物处理](#事物处理)
		* [事务条件](#事务条件)
		* [事务控制语句](#事务控制语句)
		* [事务顺序](#事务顺序)
		* [事务隔离级别](#事务隔离级别)
		* [脏读、幻读、不可重复读](#脏读-幻读-不可重复读)

<!-- /code_chunk_output -->


# 深入浅出MySQL

## 数据库相关操作

使用MySQL关键字，要使用反引号.

```sql
CREATE DATABASE `database`;
```

查看已有数据库

```sql
SHOW SCHEMAS;
-- 或
SHOW DATABASE;
```

查看警告

```sql
SHOW WARNINGS;
``` 

指定数据库编码方式

```sql
CREATE DATABASE IF NOT EXISTS db1 DEFAULT CHARACTER SET = 'UTF8';
```

查看数据库详细信息

```sql
SHOW CREATE DATABASE db1;
```

## 数据表

查看表结构

```sql
DESC tbl_name;

DESCRIBE tbl_name;

SHOW COLUMNS FROM tbl_name;
```

修改数据编码方式

```sql
ALTER DATABASE db1 [DEFAULT] CHARACTERS SET [=] charset;
```

添加字段

```sql
ALTER TABLE tbl_name 
ADD 字段名称 字段属性 [完整性约束条件] [FIRST|AFTER 字段名称]

-- eg
ALTER TABLE user1
ADD username VARCHAR(20);
```

删除字段

```sql
ALTER TABLE tbl_name
DROP 字段名称

-- eg
ALTER TABLE user1
DROP test;
```

添加默认值

```sql
ALTER TABLE tbl_name
ALTER 字段名称 SET DEFAULT 默认值;

-- eg
ALTER TABLE user2
ALTER email SET DEFAULT 'aa@qq.com';
```

删除默认值

```sql
ALTER TABLE tbl_name
ALTER 字段名称 DROP DEFAULT

-- eg
ALTER TABLE user ALTER age DROP DEFAULT;
```

修改字段名、字段类型、字段属性

```sql
ALTER TABLE tbl_name
MODIFY 字段名称 字段类型 [字段属性] [FIRST | AFTER 字段名称]

-- 或者
ALTER TABLE tbl_name
CHANGE 原字段名称 新字段名称 字段类型 字段属性 [FIRST | AFTER 字段名称]
```

添加主键

```sql
ALTER TABLE tbl_name
ADD PRIMARY KEY(字段名称)

-- eg
ALTER TABLE user ADD PRIMARY KEY(id);
```

删除主键

```sql
ALTER TABLE tbl_name
DROP PRIMARY KEY;
```

添加唯一主键

```sql
ALTER TABLE tbl_name
ADD UNIQUE KEY|INDEX [index_name] (字段名称)
```

删除唯一主键

```sql
ALTER TABLE tbl DROP index_name;

-- eg
ALTER TABLE user DROP INDEX username;
```

修改表名

```sql
ALTER TABLE tbl_name 
RENAME [TO|AS] new_tbl_name
-- 或
RENAME TABLE tbl_name TO new_tbl_name;
```

重置自动增长的初始值

```sql
-- 要清空数据才会发挥作用
ALTER TABLE tbl_name AUTO_INCREMENT=值
```

## 数据操作

查询数据

```sql
SELECT select_expr,... FROM tbl_name
[WHERE 条件]
[GROUP BY {col_name|position} HAVING 二次筛选]
[ORDER BY {col_name|position|expr} [ASC|DESC]]
[LIMIT 限制结果集的显示条数]
```

## 事物处理

### 事务条件

 - **原子性：** 一个事务（transaction）中的所有操作，要么全部完成，要么全部不完成，不会结束在中间某个环节。
 - **一致性：**在事务开始之前和事务结束以后，数据库的完整性没有被破坏。
 - **隔离性：**数据库允许多个并发事务同时对其数据进行读写和修改的能力，隔离性可以防止多个事务并发执行时由于交叉执行而导致数据的不一致。
 - **持久性：**事务处理结束后，对数据的修改就是永久的，即便系统故障也不会丢失。

> 可以接受事务的引擎中，都有`autocommit`选项，默认我们的操作都是自动提交，但可以设置`set autocommit = 0`取消。


### 事务控制语句

`BEGIN`或`START TRANSACTION`：显式地开启一个事务；

`COMMIT`：也可以使用COMMIT WORK，不过二者是等价的。COMMIT会提交事务，并使已对数据库进行的所有修改称为永久性的；

`ROLLBACK`：有可以使用ROLLBACK WORK，不过二者是等价的。回滚会结束用户的事务，并撤销正在进行的所有未提交的修改；

`SAVEPOINT identifier`：SAVEPOINT允许在事务中创建一个保存点，一个事务中可以有多个SAVEPOINT；

`RELEASE SAVEPOINT identifier`：删除一个事务的保存点，当没有指定的保存点时，执行该语句会抛出一个异常；

`ROLLBACK TO identifier`：把事务回滚到标记点；

`SET TRANSACTION`：用来设置事务的隔离级别。InnoDB存储引擎提供事务的隔离级别有READ UNCOMMITTED、READ COMMITTED、REPEATABLE READ和SERIALIZABLE。


### 事务顺序

`BEGIN` 开始一个事务
`ROLLBACK` 事务回滚
`COMMIT` 事务确认

> http://www.runoob.com/mysql/mysql-transaction.html

### 事务隔离级别

  - **Read Uncommitted（读取未提交内容）**：允许读取未提交的数据。
  - **Read Committed（读取提交内容）**：一个事务只能看见已经提交事务所做的改变。这种隔离级别会导致 -- **不可重复读（Nonrepeatable Read）**，因为同一事务的其他实例在该实例处理其间可能会有新的commit，所以同一select，前后可能返回不同结果。
   - **Repeatable Read（可重读）**： 同一事务的多个实例在并发读取数据时，会看到同样的数据行。期间插入数据可能导致**幻读**。
   - **Serializable（可串行化）**：sql中最高的隔离性级别，能够避免脏读，幻读，不可重复读。

### 脏读、幻读、不可重复读

 - 脏读是指，当一个事务在访问某一数据，并且修改了这一数据，但是在commit之前，另外一个事务也访问了同一数据，然后做了修改。
 - 不可重复读：在同一个事务生命周期内，也就是这个事务还未提交之前。如果另外一个事务，对数据进行了编辑(update)或者删除(delete)操作。那么A事务就会读取到。
 - 幻读：它的结果其实和不可重复读是一样的表现，差异就在于，不可重复读，主要是针对其他事务进行了编辑(update)和删除(delete)操作。而幻读主要是针对插入(insert)操作。也就是在一个事务生命周期内，会查询到另外一个事务新插入的数据。
 
> http://www.cnblogs.com/zhoujinyi/p/3437475.html

> https://www.jianshu.com/p/4ba118333a19
 
> http://xstarcd.github.io/wiki/MySQL/mysql_isolation_level.html
