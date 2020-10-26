// 核心库  与渲染平台无关
import React from "./react"
// 渲染库, 可以把React渲染到不同的平台上 react-dom react-native react-canvas
import ReactDOM from "./react-dom"

class Hello extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      number: 0
    }
  }
  onClickHandler = event => {
    console.log(event)
    setTimeout(() => {
      console.log(event)
      this.setState({ number: this.state.number + 1 })
      console.log(this.state.number)
    }, 20)
    this.setState({ number: this.state.number + 1 }, () => {
      console.log(this.state.number)
    })
    console.log(this.state.number)
  }
  onClickDiv = () => {
    console.log("haha")
  }
  render() {
    return (
      <div onClick={this.onClickDiv}>
        <p>name:{this.props.name}</p>
        <p>number: {this.state.number}</p>
        <button onClick={this.onClickHandler}>++</button>
      </div>
    )
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
