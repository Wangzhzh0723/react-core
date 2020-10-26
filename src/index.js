// 核心库  与渲染平台无关
import React from "./react"
// 渲染库, 可以把React渲染到不同的平台上 react-dom react-native react-canvas
import ReactDOM from "./react-dom"

const element = React.createElement(
  "h1",
  {
    className: "title",
    style: {
      color: "red"
    }
  },
  React.createElement("span", null, "hello"),
  " word"
)
ReactDOM.render(element, window.root)
