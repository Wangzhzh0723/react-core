// 核心库  与渲染平台无关
import React from "./react"
// 渲染库, 可以把React渲染到不同的平台上 react-dom react-native react-canvas
import ReactDOM from "./react-dom"

class Hello extends React.Component {
  render() {
    return <p>name:{this.props.name}</p>
  }
}

function Welcome(props) {
  return React.createElement(
    "h1",
    {
      className: props.className,
      style: props.style
    },
    React.createElement("span", null, "hello", null, "h"),
    React.createElement(Hello, {
      name: "小王🃏"
    })
  )
}

const element = React.createElement(Welcome, {
  className: "title",
  style: {
    color: "red"
  }
})
ReactDOM.render(element, window.root)
