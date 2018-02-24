
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [MySQL](#mysql)
	* [数据库操作](#数据库操作)
	* [数据库表操作](#数据库表操作)
	* [MySQL数据类型](#mysql数据类型)
		* [数字型](#数字型)
		* [日期和时间类型](#日期和时间类型)
		* [字符串类型](#字符串类型)
	* [sql查询命令](#sql查询命令)
		* [DISTINCT](#distinct)
		* [ORDER BY](#order-by)
		* [WHERE](#where)
		* [IN](#in)
		* [NOT IN](#not-in)
		* [BETWEEN AND](#between-and)
		* [LIKE](#like)
		* [LIMIT](#limit)
		* [IS NULL](#is-null)

<!-- /code_chunk_output -->

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

>http://kmfree.me/2017/07/30/4_%E6%95%B0%E6%8D%AE%E5%BA%93%E7%9F%A5%E8%AF%86/MySQL/MySQL%E5%9F%BA%E7%A1%80/
>https://github.com/jaywcjlove/mysql-tutorial/blob/master/21-minutes-MySQL-basic-entry.md
>http://www.runoob.com/mysql/mysql-tutorial.html

## sql查询命令

### DISTINCT

当从表中查询数据时，您可能会得到重复的行。为了删除这些重复行，可以在`SELECT`语句中使用`DISTINCT` 子句。

```sql
SELECT  name FROM `test`

+------+
| name |
+------+
| tom  |
| amy  |
| tom  |
+------+

SELECT DISTINCT name FROM `test`;

+------+
| name |
+------+
| tom  |
| amy  |
+------+
```

> 如果查询多列数据，要每一个数据相同才会被删除。

### ORDER BY

语法：

```sql
SELECT column1, column2,...
FROM tbl
ORDER BY column1 [ASC|DESC], column2 [ASC|DESC],...
```

使用`ORDER BY`可以按照某个字段进行排序。
使用`ASC`或`DESC`按照升序或者降序排列。

```sql
SELECT name FROM `test` GROUP BY name DESC;

+------+
| name |
+------+
| tom  |
| mus  |
| amy  |
+------+
```

> 默认是ASC升序。

### WHERE 

在查询语句中使用`WHERE`语句来设定查询条件。

```sql
SELECT * FROM test WHERE name='tom';
+-------------+------+-----+------+
| id          | name | ps  | code |
+-------------+------+-----+------+
| 00000000123 | tom  | abc | 2221 |
| 00000000125 | tom  | abc | 0133 |
+-------------+------+-----+------+
```

> 可以结合使用AND或OR的逻辑运算符。

自定义排序函数FIELD():

```sql
SELECT 
    orderNumber, status
FROM
    orders
ORDER BY FIELD(status,
        'key_part1',
        'key_part2');
```


### IN

在`WHERE`子句中，筛选符合匹配的数据。

```sql
SELECT * FROM test WHERE name IN ('tom');
+-------------+------+-----+------+
| id          | name | ps  | code |
+-------------+------+-----+------+
| 00000000123 | tom  | abc | 2221 |
| 00000000125 | tom  | abc | 0133 |
+-------------+------+-----+------+
```

带有子查询的MySQL IN

```sql
SELECT 
    orderNumber, customerNumber, status, shippedDate
FROM
    orders
WHERE
    orderNumber IN (SELECT 
            orderNumber
        FROM
            orderDetails
        GROUP BY orderNumber
        HAVING SUM(quantityOrdered * priceEach) > 60000);
```

运算顺序为：

```sql
-- 第一步
SELECT 
    orderNumber
FROM
    orderDetails
GROUP BY orderNumber
HAVING SUM(quantityOrdered * priceEach) > 60000;

-- 第二步
SELECT 
    orderNumber, customerNumber, status, shippedDate
FROM
    orders
WHERE
    orderNumber IN (10165,10287,10310);
```


### NOT IN 

与`IN`运算符相反。

### BETWEEN AND

`BETWEEN AND`判断某字段值是否在给定的范围内。

```sql
select * from where userId between 5 and 7;

-- 等同于

select * from user where userId >= 5 and userId <= 7;
```

### LIKE 

`LIKE`操作符常用在模式匹配中查询数据。

与LIKE操作符一起使用：百分比 %和下划线_。

 - percent（%）通配符允许您匹配任何零个或多个字符的字符串。
 - 下划线（_）通配符允许您匹配任何单个字符。


```sql
-- 查找m结尾的数据
SELECT 
    name
FROM
    employees
WHERE
    firstname LIKE '%m';
```

```sql
-- 查找包含‘_20’字符的数据，ESCAPE 后面指定转义字符，默认为斜杠/
SELECT 
    productCode, productName
FROM
    products
WHERE
    productCode LIKE '%$_20%' ESCAPE '$';
```

### LIMIT

`LIMIT`子句在`SELECT`语句中用于约束结果集中的行数。

```sql
SELECT
    customernumber,
    customername,
    creditlimit
FROM
    customers
ORDER BY
    creditlimit DESC
LIMIT 3;

+----------------+------------------------------+-------------+
| customernumber | customername                 | creditlimit |
+----------------+------------------------------+-------------+
|            141 | Euro+ Shopping Channel       |   227600.00 |
|            124 | Mini Gifts Distributors Ltd. |   210500.00 |
|            298 | Vida Sport, Ltd              |   141300.00 |
+----------------+------------------------------+-------------+
```

> 如果LIMIT后还有参数，代表偏移量，从0开始。

### IS NULL 

判断数据是否为空，为NULL则返回true。

```sql
SELECT 
    customerName, 
    country, 
    salesrepemployeenumber
FROM
    customers
WHERE
    salesrepemployeenumber IS NULL;
```

> http://www.manongjc.com/mysql_basic/mysql-tutorial-basic.html