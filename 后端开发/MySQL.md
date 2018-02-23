# MySQL

`MySQL` 为关系型数据库(Relational Database Management System)，一个关系型数据库由一个或数个表格组成。

![mysql.jpg](img/mysql.jpg)

登陆命令：

```js
mysql –u用户名 [–h主机名或者IP地址,-P端口号] –p密码
```
> –p密码选项不一定是要在最后；
> –u、-h、-p后无空格。

## 数据库操作

```bash
#查看数据库
show databases; 

#选择一个数据库
use 数据库名;

#创建数据库
create database 数据库名;

#查看创建数据库的SQL语言
show create database 数据库名;

#删除数据库
DROP DATABASE 数据库名;

#查看表
show tables;	
```

## 数据库表操作

```bash
#选择一个数据库
use 数据库名;

#创建表
create table student(id int(11) not null,name char(20));

#查看表结构
desc student;
+--------+----------+------+-----+---------+-------+
| Field  | Type     | Null | Key | Default | Extra |
+--------+----------+------+-----+---------+-------+
| std_id | int(11)  | NO   |     | NULL    |       |
| name   | char(20) | YES  |     | NULL    |       |
+--------+----------+------+-----+---------+-------+

#插入数据
insert into student(id,name) values(1001,’zhangsan’);

#查询数据
select * from student; 
+--------+----------+
| std_id | name     |
+--------+----------+
|   1001 | zhangsan |
+--------+----------+

#删除数据
delete from student where id=1001;

#修改数据
update student set name='LiSi' where id=1001;

#删除数据
delete from student where id=1001;
```

## MySQL数据类型

### 数字型

这些类型包括严格数值数据类型(INTEGER、SMALLINT、DECIMAL和NUMERIC)，以及近似数值数据类型(FLOAT、REAL和DOUBLE PRECISION)。

类型|大小|范围（有符号）|范围（无符号）|用途
----|-----|-----------|-------------|-------
TINYINT	|1 字节|	(-128，127)|	(0，255) | 	小整数值
SMALLINT |	2 字节	|(-32 768，32 767) |	(0，65 535)	| 大整数值
MEDIUMINT	|3 字节	 | (-8 388 608，8 388 607) | 	(0，16 777 215) | 	大整数值
INT或INTEGER	|4 字节	 | (-2 147 483 648，2 147 483 647) | 	(0，4 294 967 295) | 	大整数值
BIGINT	|8 字节	 | (-9 233 372 036 854 775 808，9 223 372 036 854 775 807) | 	(0，18 446 744 073 709 551 615) | 	极大整数值
FLOAT	|4 字节	 | (-3.402 823 466 E+38，-1.175 494 351 E-38)，0，(1.175 494 351 E-38，3.402 823 466 351 E+38) | 	0，(1.175 494 351 E-38，3.402 823 466 E+38) | 	单精度 <br/> 浮点数值
DOUBLE	|8 字节	 | (-1.797 693 134 862 315 7 E+308，-2.225 073 858 507 201 4 E-308)，0，(2.225 073 858 507 201 4 E-308，1.797 693 134 862 315 7 E+308) | 	0，(2.225 073 858 507 201 4 E-308，1.797 693 134 862 315 7 E+308) | 	双精度<br/>浮点数值
DECIMAL	|对DECIMAL(M,D) ，如果M>D，为M+2否则为D+2	 | 依赖于M和D的值	 | 依赖于M和D的值	 | 小数值

> int(num)代表数据不够num位的情况下，用数字0填充。数据会自动变成unsigned类型的


### 日期和时间类型

表示时间值的日期和时间类型为DATETIME、DATE、TIMESTAMP、TIME和YEAR。

类型	|大小(字节)	|范围	|格式	|用途
------|-----|---------|--------|---------
DATE	|3	|1000-01-01/9999-12-31|	YYYY-MM-DD	日期值
TIME	|3	|'-838:59:59'/'838:59:59'	|HH:MM:SS	时间值或持续时间
YEAR	|1	|1901/2155	|YYYY	年份值
DATETIME	|8	|1000-01-01 00:00:00/9999-12-31 23:59:59	|YYYY-MM-DD HH:MM:SS	混合日期和时间值
TIMESTAMP	|4	| 1970-01-01 00:00:00/2038-01-19 03:14:07  |YYYYMMDD HHMMSS	混合日期和时间值，时间戳

### 字符串类型

字符串类型指CHAR、VARCHAR、BINARY、VARBINARY、BLOB、TEXT、ENUM和SET。

类型 |	大小 |	用途
-----|----------|--------
CHAR|	0-255字节|	定长字符串
VARCHAR|	0-65535 字节	|变长字符串
TINYBLOB|	0-255字节	|不超过 255 个字符的二进制字符串
TINYTEXT|	0-255字节	|短文本字符串
BLOB|	0-65 535字节	|二进制形式的长文本数据
TEXT|	0-65 535字节	|长文本数据
MEDIUMBLOB|	0-16 777 215字节|	二进制形式的中等长度文本数据
MEDIUMTEXT|	0-16 777 215字节	|中等长度文本数据
LONGBLOB|	0-4 294 967 295字节	|二进制形式的极大文本数据
LONGTEXT|	0-4 294 967 295字节	|极大文本数据