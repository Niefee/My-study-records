# 深入浅出MySQL

## 数据库相关操作

使用MySQL关键字，要使用反引号。

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

查看数据详细信息

```sql
SHOW CREATE DATABASE db1;
```

修改数据编码方式

```sql
ALTER DATABASE db1 [DEFAULT] CHARACTERS SET [=] charset;
```