import React from "./react"
import ReactDOM from "./react-dom"
const Parent = () => {
  return <Child />
}

function Child() {
  return <Grand />
}

function Grand() {
  return <DoubleGrand />
}

class DoubleGrand extends React.Component {
  state = {
    number: 0
  }
  onClick = () => {
    this.setState({
      number: this.state.number + 1
    })
  }
  render() {
    return <div onClick={this.onClick}>DoubleGrand {this.state.number}</div>
  }
}
ReactDOM.render(<Parent />, document.getElementById("root"))
