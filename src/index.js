// 核心库  与渲染平台无关
import React from "react"
// 渲染库, 可以把React渲染到不同的平台上 react-dom react-native react-canvas
import ReactDOM from "react-dom"

class Hello extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      number: 0
    }
  }
  componentWillMount() {
    console.log("componentWillMount")
  }
  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps")
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate")
    return nextState.number % 3 === 0
  }
  componentWillUpdate() {
    console.log("componentWillUpdate")
  }
  componentDidUpdate() {
    console.log("componentDidUpdate")
  }
  componentDidMount() {
    console.log("componentDidMount")
  }

  componentWillUnmount() {
    console.log("componentWillUnmount")
  }
  onClickHandler = event => {
    // console.log(event)
    // setTimeout(() => {
    //   console.log(event)
    //   this.setState({ number: this.state.number + 1 })
    //   console.log(this.state.number)
    // }, 20)
    this.setState({ number: this.state.number + 1 })
    // console.log(this.state.number)
  }
  render() {
    return (
      <div>
        <p>name:{this.props.name}</p>
        <p>number: {this.state.number}</p>
        <button onClick={this.onClickHandler}>++</button>
      </div>
    )
  }
}

class Welcome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 0
    }
  }
  onChangeHandler = () => {
    this.setState({
      name: this.state.name + 1
    })
  }
  render() {
    return (
      <h1 className={this.props.className} style={this.props.style}>
        <button onClick={this.onChangeHandler}>改变name</button>
        {this.state.name === 3 ? null : <Hello name={this.state.name} />}
      </h1>
    )
  }
}

const element = React.createElement(Welcome, {
  className: "title",
  style: {
    color: "red"
  }
})
ReactDOM.render(element, window.root)
