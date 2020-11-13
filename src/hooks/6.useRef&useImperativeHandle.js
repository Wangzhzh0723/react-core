import React from "react"
import ReactDOM from "react-dom"
/**
 * 如何获取 最新的值
 * useRef会返回一个可变的ref对象 {current}
 * ref对象在组件的整个生命周期内保持不变
 */
let hookStates = []
let hookIndex = 0
function useState(initialState) {
  hookStates[hookIndex] = hookStates[hookIndex] || initialState
  let currentIndex = hookIndex
  function setState(newState) {
    hookStates[currentIndex] =
      typeof newState === "function"
        ? newState(hookStates[currentIndex])
        : newState
    render()
  }
  return [hookStates[hookIndex++], setState]
}
function useRef(current) {
  hookStates[hookIndex] = hookStates[hookIndex] || { current }
  return hookStates[hookIndex++]
}
//只要函数组件重新渲染执行完成了，那么里面的状态就是最新的了
//类组件需要创建实例，不能轻易销毁，比较消耗性能 current可以是任意东西
//React.createRef React.useRef; React.forwardRef 转发Ref
//因为函数组件没有实例
function useImperativeHandle(ref, factory) {
  ref.current = factory()
}
function FunctionChild(props, ref) {
  let inputRef = React.useRef() //return {current:null}
  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current.focus()
    }
  }))
  //当这个虚拟的input组件在挂载到页面中之后会ref.current=真实DOM
  //我希望可以控制上级组件的操作
  return <input ref={inputRef} />
}
/* function forwardRef(FunctionChild){
   return class extends React.Component{
     render(){
       //element {type,props,ref,key}
       //ref非常的特殊，不能让直接用，是一个内部保持的变量
       //return FunctionChild(this.props,this.props.ref2);
       return <FunctionChild {...this.props}/>
     }
   }
} */
const ForwardFunctionChild = React.forwardRef(FunctionChild)
function Parent() {
  let [number, setNumber] = React.useState(0) //定义一个状态
  const functionChildRef = React.useRef() //生成一个ref对象 {current:null}
  const getFocus = () => {
    //functionChildRef.current 这是真实DOM
    functionChildRef.current.focus()
    //functionChildRef.current.parentNode.removeChild(functionChildRef.current);
  }
  return (
    <div>
      <ForwardFunctionChild ref={functionChildRef} />
      <p>{number}</p>
      <button onClick={() => setNumber(x => x + 1)}>+</button>
      <button onClick={getFocus}>获得焦点</button>
    </div>
  )
}
function render() {
  hookIndex = 0
  ReactDOM.render(<Parent />, document.getElementById("root"))
}
render()

/*
useMemo<{
  number: number;
}>(factory: () => {
  number: number;
}, deps: React.DependencyList): {
  number: number;
} */
