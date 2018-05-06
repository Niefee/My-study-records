
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

* [深入浅出MySQL](#深入浅出mysql)
	* [数据库相关操作](#数据库相关操作)
	* [数据表](#数据表)
	* [数据操作](#数据操作)
	* [事物处理](#事物处理)
		* [事物条件](#事物条件)

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

### 事物条件

 - **原子性：** 一个事务（transaction）中的所有操作，要么全部完成，要么全部不完成，不会结束在中间某个环节。
 - **一致性：**在事务开始之前和事务结束以后，数据库的完整性没有被破坏。
 - **隔离性：**数据库允许多个并发事务同时对其数据进行读写和修改的能力，隔离性可以防止多个事务并发执行时由于交叉执行而导致数据的不一致。
 - **持久性：**事务处理结束后，对数据的修改就是永久的，即便系统故障也不会丢失。

