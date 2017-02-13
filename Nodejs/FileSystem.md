
<!-- toc orderedList:0 depthFrom:1 depthTo:6 -->

* [fs](#fs)
    * [FileSystem简介](#filesystem简介)
        * [fs.open(path, flags, [mode], callback)](#fsopenpath-flags-mode-callback)
        * [fs.read(fd, buffer, offset, length, position, callback)](#fsreadfd-buffer-offset-length-position-callback)
        * [fs.write(fd, buffer, offset, length[, position], callback)](#fswritefd-buffer-offset-length-position-callback)
    * [文件直接操作](#文件直接操作)
        * [fs.readFile(filename, [options], callback)](#fsreadfilefilename-options-callback)
        * [fs.unlink(path, callback)](#fsunlinkpath-callback)
        * [fs.rename(oldPath, newPath, callback)](#fsrenameoldpath-newpath-callback)
        * [fs.stat(path, callback)](#fsstatpath-callback)
        * [fs.watch(filename, [options], [listener])](#fswatchfilename-options-listener)
    * [文件夹操作](#文件夹操作)
        * [fs.mkdir(path, [mode], callback)](#fsmkdirpath-mode-callback)
        * [fs.rmdir(path, callback)](#fsrmdirpath-callback)
        * [fs.readdir(path, callback)](#fsreaddirpath-callback)

<!-- tocstop -->

# fs
## FileSystem简介

文件系统模块是一个简单包装的标准 **POSIX** 文件 **I/O** 操作方法集。您可以通过调用`require('fs')`来获取该模块。文件系统模块中的所有方法均有异步和同步版本。

### fs.open(path, flags, [mode], callback)

fs.open(path, flags, [mode], callback)
*   path : 要打开的文件的路径
*   flags : 打开文件的方式 读/写
*   mode : 设置文件的模式 读/写/执行  4/2/1
*   callback : 回调
    * err : 文件打开失败的错误保存在err里面，如果成功err为null
    * fd : 被打开文件的标识，

```js
fs.open('1.txt', 'r', function(err, fd) {

    //console.log(err);
    //console.log(fd);

    if (err) {
        console.log( '文件打开失败' );
    } else {
        console.log( '文件打开成功' );
        console.log( fd );
    }

});
```

### fs.read(fd, buffer, offset, length, position, callback)

*   fd : 通过open方法成功打开一个文件返回的编号
*   buffer : buffer对象
*   offset : 新的内容添加到buffer中的起始位置
*   length ： 添加到buffer中内容的长度
*   position ：读取的文件中的起始位置
*   callback : 回调
    * err
    * uffer的长度
    * buffer对象


```js
fs.open('1.txt', 'r', function(err, fd) {
    if (err) {
        console.log('文件打开失败');
        console.log(err);
    } else {
        var bf1 = new Buffer('123456789');
        fs.read( fd, bf1, 0, 4, null, function( err, len, newBf ) {
            console.log( newBf );
        } );
    }
});

```

### fs.write(fd, buffer, offset, length[, position], callback)

 * fs.write(fd, buffer, offset, length[, position], callback)
 *   fd : 打开的文件
 *   buffer : 要写入的数据
 *   offset : buffer对象中要写入的数据的起始位置
 *   length : 要写入的buffer数据的长度
 *   position : fd中的起始位置
 *   callback : 回调
     * err:错误信息，没有就显示`null`
     * written:表明传入的`string`需要写入的字符串的字节长度
     * string:表明传入的字符串

```js
fs.write( fd, bf, 0, 3, 5, function() {
            console.log(arguments);
        } )
```

另一种写法：

**fs.write(fd, data[, position[, encoding]], callback)**

```js
fs.write(fd, '1234aqws你好', 0, 'utf-8', function(err, written, string) {
            console.log("ok");
            console.log(err);
            console.log(written);
            console.log(string);
});
```

操作结束后，要关闭打开的文件。

```js
fs.close(fd, function() {

});
```

## 文件直接操作

### fs.writeFile(filename, data, encoding='utf8', [callback])

异步地写入数据到文件，如果文件已经存在，则替代文件。 `data` 可以是一个字符串或一个 `buffer`。

 - file <String> | <Buffer> | <Integer> 文件名或文件描述符
 - data <String> | <Buffer>
 - options <Object> | <String>
     - encoding <String> | <Null> 默认 = 'utf8'
     - mode <Integer> 默认 = 0o666
     - flag <String> 默认 = 'w'
 - callback <Function>

### fs.readFile(filename, [options], callback)

 - filename {String}
     - options {Object}
     - encoding {String | Null} default = null
 - flag {String} default = 'r'
 - callback {Function}

异步读取一个文件的全部内容。举例：

```js
fs.readFile('test.txt', function (err, data) {
  if (err) throw err;
  console.log(data);
});
```

### fs.unlink(path, callback)

删除一个文件

完成时的回调函数（callback）只接受一个参数：可能出现的异常信息.

### fs.rename(oldPath, newPath, callback)

重命名一个函数

完成时的回调函数（callback）只接受一个参数：可能出现的异常信息.

### fs.stat(path, callback)

返回文件的详细信息

### fs.watch(filename, [options], [listener])

监听文件的变化，监听器的回调函数得到两个参数`(event, filename)`。其中 `event` 是 'rename'（重命名）或者 'change'（改变），而 `filename` 则是触发事件的文件名。


## 文件夹操作

### fs.mkdir(path, [mode], callback)

创建文件夹，完成时的回调函数（callback）只接受一个参数：可能出现的异常信息。文件 `mode` 默认为 0777。

### fs.rmdir(path, callback)

删除一个文件夹

### fs.readdir(path, callback)

读取 path 路径所在目录的内容。 回调函数 `(callback)` 接受两个参数 `(err, files)`其中 `files` 是一个存储目录中所包含的文件名称的数组，数组中不包括 '.' 和 '..'。
