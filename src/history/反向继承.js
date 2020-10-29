import React from "react"
import ReactDOM from "react-dom"
/**
 * 高阶组件  它是一个函数
 * 反向继承 基于反向继承，我们可以拦截生命周期，state还有渲染过程
 * 比如说这个 Button是antdesign提供的标准组件，我们改不了，那应该如何增强它，给他加儿子数字，加点击事件，让儿子数字加1
 */

const wrapper = OldComponent => {
  //让新组件继续老组件
  return class NewComponent extends OldComponent {
    state = { number: 0 }
    componentWillMount() {
      console.log("NewComponent componentWillMount")
      super.componentWillMount()
    }
    componentDidMount() {
      console.log("NewComponent componentDidMount")
      super.componentDidMount()
    }
    handleClick = event => {
      this.setState({ number: this.state.number + 1 })
    }
    render() {
      console.log("NewComponent render")
      let oldElement = super.render()
      console.log(oldElement)
      let newProps = {
        ...oldElement.props,
        onClick: this.handleClick
      }
      console.log(newProps)
      return React.cloneElement(oldElement, newProps, this.state.number)
    }
  }
}
@wrapper
class Button extends React.Component {
  state = { name: "按钮" }
  static getButton() {
    return "getButton"
  }
  componentWillMount() {
    console.log("OldComponent componentWillMount")
  }
  componentDidMount() {
    console.log("OldComponent componentDidMount")
  }
  render() {
    console.log("OldComponent render")
    return <button name={this.state.name} title={this.props.title} />
  }
}
console.log(Button.getButton())
ReactDOM.render(<Button />, document.getElementById("root"))
