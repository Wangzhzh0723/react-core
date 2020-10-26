## 1. JSX 的执行过程

- 1. 我们在写代码的时候写成 JSX `<h1>hello, word</h1>`
- 2. 在打包的时候, 会调用 webpack 中的 babel-loader 把 JSX 写法转成 JS 写法(React.createElement("h1", {}, "hello, word"))
- 3. 在浏览器里执行 React.createElement, 得到虚拟 DOM, 也就是 React 元素, 他是一个普通的 JS 对象, 描述了界面上想看到的 DOM 元素的样式
- 4. 把 React 元素(虚拟 DOM)给了 ReactDOM.render, render 会把虚拟 DOM 转化成真实的 DOM, 插入到页面

> - 1. React 元素可能是字符串, 也可能是函数(函数组件), 也可能是一个类(类组件)
> - 2. 在定义组件元素的时候, 会把 JSX 所有的属性封装成 props 传递给组件
> - 3. 组件的名称首字母一定要大写, 因为 React 是根据首字母大小写区分是原生还是自定义组件
> - 4. 组件要先定义, 在使用
> - 5. 组件要返回且只能返回一个 React 元素, 返回多个需要用 React.Fragment 包起来

## 2. 函数组件的渲染过程

- 1. 定义一个 React 元素, 也就是虚拟 DOM, type == 组件构造函数
- 2. render 方法会执行构造函数, 并传入 props 返回虚拟 DOM
- 3. 把返回的虚拟 DOM 转成真实 DOM 插入到页面中去

## 3. 类组件的渲染过程

- 1. 定义一个类组件 React 元素
- 2. render 过程先创建类组件的实例 new Component(props), 并把 props 传进去
- 3. 调用组件实例的 render 方法的到 React 元素
- 4. 把返回的虚拟 DOM 转成真实 DOM 插入到页面中去
