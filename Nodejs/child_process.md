
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [child_process](#child_process)
	* [进程及线程](#进程及线程)
	* [Nodejs四种创建进程的方式](#nodejs四种创建进程的方式)
		* [spawn()](#spawn)
		* [exec/execFile](#execexecfile)
		* [fork](#fork)

<!-- /code_chunk_output -->

# child_process

## 进程及线程

一个任务实际上就是一个进程（`Process`），它是操作系统进行资源分配和调度的最小单位，是应用程序运行的载体，有自己独立的内存空间。

一个进程，如播放器在播放视频的过程，也同时播放音频、字幕。
在一个进程内要同时干多件事就需要运行多个**子任务**，这些进程内的子任务就是线程（`Thread`），它是**程序执行**的最小单位，一个进程可以有一个或多个线程，各个线程间可以共享进程的内存空间。

## Nodejs四种创建进程的方式

### spawn()

语法：
```js
child_process.spawn(command[, args][, options])
```

`spawn()`适合用在进程的输入、输出数据量比较大的情况（因为它支持以 `stream` 的使用方式），可以用于任何命令。

`spawn()`方法用于从执行的命令创建一个新进程，命令的参数被作为数组传入，忽略参数时将传入一个空数组。

```js
// child.js
console.log('child argv: ', process.argv);
process.stdin.pipe(process.stdout);

// parent.js
const p = child_process.spawn(
    'node', // 需要执行的命令
    ['child.js', 'a', 'b'], // 传递的参数
    {}
);
p.on('exit', code => {
    console.log('exit:', code);
});
```

`spawn()`方法创建一个子进程来执行特定命令，用法与`execFile`方法类似，但是没有回调函数，只能通过监听事件，来获取运行结果。
```js
var child = child_process.spawn('node', ['-v']);
// console.log('child argv: ', process.argv);
child.stdout.on('data', function (data) {
  console.log('stdout: ' + data);
});

```

`spawn()`方法的部分配置（options）如下：
```js
{
    // 可以指定命令在哪个目录执行
    'cwd': null,
    // 传递环境变量，node 脚本可以通过 process.env 获取到
    'env': {},
    // 配置子进程的 stdio 配置
    'stdio': 'pipe' | 'ignore' | 'inherit',
    // 为子进程独立运行做好准备
    'detached': false,
    // 指定用户 id
    'uid': 0,
    // 指定组 id
    'gid': 0,
    // 如果是true，在shell里运行程序。默认是false。（很有用，比如 可以通过 /bin/sh -c xxx 来实现 .exec() 这样的效果）
    'shell'：true | false
}
```

```js
var spawn = require('child_process').spawn;
// 建议Window下要用dir命令， Linux下可以用ls
var ls = spawn('dir', ['-l'], {
    stdio: 'inherit', // 参考：http://nodejs.cn/api/child_process.html#child_process_options_stdio
    cwd: '../', // 在上一层运行这个命令
    shell: true //window下这里要true才能有输出
});

ls.on('close', function(code){
    console.log('child exists with code: ' + code);
});

```

>.exec()、.execFile()、.fork()底层都是通过.spawn()实现的。


### exec/execFile

语法：
```js
child_process.exec(command[, options][, callback])

child_process.execFile(file[, args][, options][, callback])
```
`exec()`与`execFile()`会使用一个 Buffer 来存储进程执行后的标准输出结果，可以一次性在 callback 里面获取到。不太适合输出数据量大的场景。
```js
// child.js
console.log('child argv: ', process.argv);
```

`exec()`示例：
```js
// parent.js
const child_process = require('child_process');
const p = child_process.exec(
  'node child.js a b', // 执行的命令
  {},
  (err, stdout, stderr) => {
    if (err) {
      // err.code 是进程退出时的 exit code，非 0 都被认为错误
      // err.signal 是结束进程时发送给它的信号值
      console.log('err:', err, err.code, err.signal);
    }
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
  }
);
console.log('child pid:', p.pid);
```

`execFile()`示例：

```js
// parent.js
const p = child_process.execFile(
  'node', // 可执行文件
  ['child.js', 'a', 'b'], // 传递给命令的参数
  {},
  (err, stdout, stderr) => {
    if (err) {
      // err.code 是进程退出时的 exit code，非 0 都被认为错误
      // err.signal 是结束进程时发送给它的信号值
      console.log('err:', err, err.code, err.signal);
    }
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
  }
);
console.log('child pid:', p.pid);
```
两个方式都可以使用的配置：

```js
{
    // 可以指定命令在哪个目录执行
    'cwd': null,
    // 传递环境变量，node 脚本可以通过 process.env 获取到
    'env': {},
    // 指定 stdout 输出的编码，默认用 utf8 编码为字符串（如果指定为 buffer，那 callback 的 stdout 参数将会是 Buffer）
    'encoding': 'utf8',
    // 指定执行命令的 shell，默认是 /bin/sh（unix） 或者 cmd.exe（windows）
    'shell': '',
    // kill 进程时发送的信号量
    'killSignal': 'SIGTERM',
    // 子进程超时未执行完，向其发送 killSignal 指定的值来 kill 掉进程
    'timeout': 0,
    // stdout、stderr 允许的最大输出大小（以 byte 为单位），如果超过了，子进程将被 kill 掉（发送 killSignal 值）
    'maxBuffer': 200 * 1024,
    // 指定用户 id
    'uid': 0,
    // 指定组 id
    'gid': 0
}
```
`exec()`会创建一个`shell`，效率可能稍慢。所以不支持 I/O 重定向和文件查找这样的行为。

```js
//  有输出
cp.exec('find e:\\Data test.js',{}, function(err, stdout, stderr){
    console.log(stdout);
});

// 报错
cp.execFile('find', ['e:\\Data test.js'], function(err, stdout, stderr){})
```
### fork

语法：
```js
child_process.fork(modulePath[, args][, options])
```
`child_process.fork() `方法是 `child_process.spawn()` 的一个特例，专门用于衍生新的 Node.js 进程，只能运行Node脚本。 跟 `child_process.spawn()` 一样返回一个 `ChildProcess` 对象。 返回的 `ChildProcess` 会有一个额外的内置的通信通道，它允许消息在父进程和子进程之间来回传递。

```js
// child.js
console.log('child argv: ', process.argv);
process.stdin.pipe(process.stdout);

// parent.js
const p = child_process.fork(
  'child.js', // 需要执行的脚本路径
  ['a', 'b'], // 传递的参数
  {}
);
console.log('child pid:', p.pid);

p.on('exit', code => {
  console.log('exit:', code);
});
```
> 配置options选项跟`spawn()`一致。

参考资料：
> https://segmentfault.com/a/1190000005004946#articleHeader4
> https://itbilu.com/nodejs/core/E1kBYnPH.html
> https://segmentfault.com/a/1190000007735211
> http://javascript.ruanyifeng.com/nodejs/child-process.html#toc5
