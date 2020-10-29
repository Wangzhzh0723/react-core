import React from "react"
import ReactDOM from "react-dom"
let root = document.getElementById("root")
class MouseTracker extends React.Component {
  constructor(props) {
    super(props)
    this.state = { x: 0, y: 0 }
  }
  handleMouseMove = event => {
    this.setState({
      x: event.clientX,
      y: event.clientY
    })
  }
  render() {
    return (
      <div
        onMouseMove={this.handleMouseMove}
        style={{ border: "1px solid red" }}
      >
        {this.props.render(this.state)}
      </div>
    )
  }
}
ReactDOM.render(
  <MouseTracker
    render={props => (
      <>
        <h1>移动鼠标</h1>
        <p>
          当前的鼠标位置是x={props.x},y={props.y}
        </p>
      </>
    )}
  />,
  root
)
