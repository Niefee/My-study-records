<!-- @import "[TOC]" {cmd:"toc", depthFrom:1, depthTo:6, orderedList:false} -->

<!-- code_chunk_output -->

* [Java基础](#java基础)
	* [数组](#数组)
		* [定义数组变量](#定义数组变量)
		* [直接初始化数据](#直接初始化数据)
	* [对象](#对象)
		* [包裹类型](#包裹类型)
		* [new创建](#new创建)

<!-- /code_chunk_output -->


# Java基础

## 数组

### 定义数组变量

    <类型>[] <名字>=new <类型>[元素个数]


```java
int[] arr=new int[100];
double[] arr=new double[10];
```

 - 元素个数必须是整数
 - 元素个数必须给出
 - 元素个数可以是变量

### 直接初始化数据

```java
int[] arr={1,2,3,4,5}
```

## 对象

### 包裹类型

每个基础类型都有对应的包裹类型。

| 基础类型| 包裹类型 |
|-------|-------|
|boolean|Boolean|
|char   |Character|
|int    |Integer    |
|double|Double|

可以用包裹类型定义变量，也可以做一些特殊的操作。

```java
//定义遍历
int i=10;
Integer k=10;
k=i;

Character.isDigit('1')
//true

Integer.MAX_VALUE
//2147483647
```

### new创建

```java
String s= new String("a string");

//or
String s="a string"
```
