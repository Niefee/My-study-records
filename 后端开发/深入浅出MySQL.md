<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->
- [深入浅出MySQL](#%E6%B7%B1%E5%85%A5%E6%B5%85%E5%87%BAmysql)
    - [数据库相关操作](#%E6%95%B0%E6%8D%AE%E5%BA%93%E7%9B%B8%E5%85%B3%E6%93%8D%E4%BD%9C)
    - [数据表](#%E6%95%B0%E6%8D%AE%E8%A1%A8)

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