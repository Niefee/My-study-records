

<!-- toc orderedList:0 depthFrom:1 depthTo:6 -->

* [process](#process)
    * [标准输入输出流](#标准输入输出流)

<!-- tocstop -->

# process
`process` 是一个全局变量，即 `global` 对象的属性。

```js
console.log(global.process);
//等同于
console.log(process);
```

`Process` 提供了很多有用的属性，便于我们更好的控制系统的交互：

属性	| 描述
-----|-------
stdout	|标准输出流。
stderr	|标准错误流。
stdin	|标准输入流。
argv	|argv 属性返回一个数组，由命令行执行脚本时的各个参数组成。它的第一个成员总是node，第二个成员是脚本文件名，其余成员是脚本文件的参数。
execPath|	返回执行当前脚本的 Node 二进制文件的绝对路径。
execArgv	|返回一个数组，成员是命令行下执行脚本时，在Node可执行文件与脚本文件之间的命令行参数。
env	|返回一个对象，成员为当前 shell 的环境变量
exitCode	|进程退出时的代码，如果进程优通过 process.exit() 退出，不需要指定退出码。
version|	Node 的版本，比如v0.10.18。
versions	|一个属性，包含了 node 的版本和依赖.
config	|一个包含用来编译当前 node 执行文件的 javascript 配置选项的对象。它与运行 ./configure 脚本生成的 "config.gypi" 文件相同。
pid|	当前进程的进程号。
title|	进程名，默认值为"node"，可以自定义该值。
arch	|当前 CPU 的架构：'arm'、'ia32' 或者 'x64'。
platform	|运行程序所在的平台系统 'darwin', 'freebsd', 'linux', 'sunos' 或 'win32'
mainModule	|require.main 的备选方法。不同点，如果主模块在运行时改变，require.main可能会继续返回老的模块。可以认为，这两者引用了同一个模块。

## 标准输入输出流

```js
//以前两者的效果一样
process.stdin.write('hello');
console.log('hello');
```
```js
//默认情况下，输入流是关闭的，要监听必须打开输入流
process.stdin.resume();

//监听用户的输入数据
process.stdin.on('data',function(chunk){
    console.log('用户输入了：'+chunk);
});
```
> [process属性](http://nodejs.jakeyu.top/#t135process)
