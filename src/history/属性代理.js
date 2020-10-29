import React from "react"
import ReactDOM from "react-dom"
/**
 * 高阶组件  它是一个函数
 * 属性代理 给老组件增加额外的属性
 */

const loading = message => OldComponent => {
  return class NewComponent extends React.Component {
    render() {
      const extraProps = {
        hide: () => {
          let loading = document.getElementById("loading")
          if (loading) {
            loading.style.display = "none"
          }
        },
        show: () => {
          let loading = document.getElementById("loading")
          if (loading) {
            loading.style.display = "block"
          } else {
            let div = document.createElement("div")
            div.innerHTML = `<p id="loading" style="position:absolute;top:100px;left:50%;width:100px;z-index:10;background-color:gray;color:red">${message}</p>`
            document.body.appendChild(div)
          }
        }
      }
      let newProps = { ...this.props, ...extraProps }

      return <OldComponent {...newProps} />
      //return React.createElement(OldComponent,newProps);
      // {type:OldComponent,props:newProps}
    }
  }
}
class Hello extends React.Component {
  render() {
    return (
      <div>
        {this.props.title}
        <button onClick={this.props.hide}>隐藏</button>
        <button onClick={this.props.show}>显示</button>
      </div>
    )
  }
}
let LoadingHello = loading("加载中....")(Hello)
ReactDOM.render(<LoadingHello title="标题" />, document.getElementById("root"))
