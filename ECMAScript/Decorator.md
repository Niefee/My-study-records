# Decorator(修饰器)

---
<h3>暂停更新</h3>
由于这个特性支持有限，以后再更新。
2017年04月23日
---
修饰器（Decorator）是一个函数，用来修改类的行为。

修饰器对类的行为的改变，是代码编译时发生的，而不是在运行时。

```js
function testable(target) {
  target.isTestable = true;
}

@testable
class MyTestableClass {}

console.log(MyTestableClass.isTestable) // true
```

`@testable`就是一个修饰器。它修改了`MyTestableClass`这个类的行为，为它加上了静态属性`isTestable`。
