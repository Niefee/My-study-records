## process基础

标准输出输出

```js
process.stdin.setEncoding('utf8');

process.stdin.on('readable', () => {
  var chunk = process.stdin.read();
  if(typeof chunk === 'string'){
    chunk = chunk.slice(0,-2);
    process.stdout.write(`stringLength:${chunk.length}\n`);
  }
  if(chunk === ''){
    process.stdin.emit('end');
    return;
  }
  if (chunk !== null) {
    process.stdout.write(`data: ${chunk}\n`);
  }
});

process.stdin.on('end', () => {
  process.stdout.write('end--');
});

```

>`process.stdin.emit('end')`可以激活`process.stdin.on('end',fn)`，其他是对输入的各种情况进行判断。
