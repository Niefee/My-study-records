#JavaScript ES6模块加载

##export


```js
export { name1, name2, …, nameN };
export { variable1 as name1, variable2 as name2, …, nameN };
export let name1, name2, …, nameN; // 也可以是 var
export let name1 = …, name2 = …, …, nameN; // 也可以是 var, const

export default expression;
export default function (…) { … } // 也可以是 class, function*
export default function name1(…) { … } // 也可以是 class, function*
export { name1 as default, … };
```

导出一个模块中引入的的另外一些模块：
```js
//方法：
export * from …;
export { name1, name2, …, nameN } from …;
export { import1 as name1, import2 as name2, …, nameN } from …;

//例子：
// module.js
const PI = 3.14;
const value = 42;
export const table = {foo: 'bar'};
export function hello() {};

// main.js
export * from './module';
export {hello} from './module';
export {hello as foo} from './module';
```

>http://itbilu.com/javascript/js/Vk5VXbYTe.html

两种导出方式

**命名导出**

```js
export { myFunction }; // 导出一个函数声明
export const foo = Math.sqrt(2); // 导出一个常量
```

示例
```js
// module "my-module.js"
export function cube(x) {
  return x * x * x;
}
const foo = Math.PI + Math.SQRT2;
export { foo };
```

在其他脚本引用

```js
import { cube, foo } from 'my-module.js';
console.log(cube(3)); // 27
console.log(foo);    // 4.555806215962888
```



**默认导出**

```js
export default myFunctionOrClass
// 这里没有分号
```

关于默认导出方式，每个模块只有一个默认导出。一个默认导出可以是一个函数，一个类，一个对象等。当最简单导入的时候，这个值是将被认为是”入口”导出值。


示例

```js
// module "my-module.js"
let cube = function cube(x) {
  return x * x * x;
}
export default cube;
```

在另一个脚本引用

```js
// module "my-module.js"
import myFunction from 'my-module';
console.log(myFunction(3)); // 27​​​​​
```

>https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/export

##import

```js
import * as name from 'src/lodash';           // 引入外部文件所有对象
//可以使用name.module引用导出的所有模块中的某个

import { each, map } from 'src/lodash';    // 引入外部文件部分对象
import name from 'src/lodash';                // 引入外部文件默认导出对象
import name, { each, map } from 'src/lodash'; // 同时引入默认导出对象和部分对象
import 'src/lodash';                       // 只加载外部文件，但啥都不引入

```

导入整个模块的内容。以下代码将myModule添加到当前作用域，其中包括所有导出绑定。

```js
import myModule from "my-module.js";
```

导出一个或者多个成员

```js
import {myMember} from "my-module.js";
import {foo, bar} from "my-module.js";


import myDefault, {foo, bar} from "my-module.js"
//即my-module.js中的代码为：
...;export foo;export bar;export default myDefault;



//导入成员并指定一个方便的别名。
import {reallyReallyLongModuleMemberName as shortName} from "my-module.js";

```

>https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import
