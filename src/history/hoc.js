import React from "react"
import ReactDOM from "react-dom"

function withTracker(OldComponent) {
  return class MouseTracker extends React.Component {
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
          <OldComponent {...this.state} />
        </div>
      )
    }
  }
}
//要求类组件的render还是函数组件返回值只能返回一个React元素
let Hello = props => (
  <React.Fragment>
    <h1>移动鼠标</h1>
    <p>
      当前的鼠标位置是x={props.x},y={props.y}
    </p>
  </React.Fragment>
)
let TrackerHello = withTracker(Hello)
ReactDOM.render(<TrackerHello />, document.getElementById("root"))
