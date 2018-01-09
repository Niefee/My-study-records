
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [child_process](#child_process)
	* [进程及线程](#进程及线程)
	* [Nodejs四种创建进程的方式](#nodejs四种创建进程的方式)
		* [spawn()](#spawn)

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

`spawn()`方法用于从执行的命令创建一个新进程，命令的参数被做为数组传入，忽略参数时将传入一个空数组。

```js
// child.js
console.log('child argv: ', process.argv);
process.stdin.pipe(process.stdout);
```

```js
// parent.js
const p = child_process.spawn(
  'node', // 需要执行的命令
  ['child.js', 'a', 'b'], // 传递的参数
  {}
);
console.log('child pid:', p.pid);
p.on('exit', code => {
  console.log('exit:', code);
});
```

参考资料：
> https://segmentfault.com/a/1190000005004946#articleHeader4
> https://itbilu.com/nodejs/core/E1kBYnPH.html
> https://segmentfault.com/a/1190000007735211
