import React from "./react"
import ReactDOM from "./react-dom"

class Counter extends React.PureComponent {
  state = {
    number: 0,
    name: "🃏"
  }
  onClick = () => {
    this.setState({
      number: this.state.number + 0
    })
  }
  render() {
    console.log("render")
    return (
      <div>
        <p>name: {this.state.name}</p>
        <p>number: {this.state.number}</p>
        <button onClick={this.onClick}>+</button>
      </div>
    )
  }
}
ReactDOM.render(<Counter />, document.getElementById("root"))
