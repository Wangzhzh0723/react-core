## 1. JSX 的执行过程

- 1. 我们在写代码的时候写成 JSX `<h1>hello, word</h1>`
- 2. 在打包的时候, 会调用 webpack 中的 babel-loader 把 JSX 写法转成 JS 写法(React.createElement("h1", {}, "hello, word"))
- 3. 在浏览器里执行 React.createElement, 得到虚拟 DOM, 也就是 React 元素, 他是一个普通的 JS 对象, 描述了界面上想看到的 DOM 元素的样式
- 4. 把 React 元素(虚拟 DOM)给了 ReactDOM.render, render 会把虚拟 DOM 转化成真实的 DOM, 插入到页面
