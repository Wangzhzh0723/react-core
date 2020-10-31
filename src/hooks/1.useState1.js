import React from "react"
import ReactDOM from "react-dom"
import { isFunction } from "./utils/util"

/**
 * hooks都是函数
 * 会以use开头
 * 解决函数组件不能使用状态的问题
 * 类组件每次都创建实例,性能较差
 * 1. 每次组件渲染都是一个闭包
 * 2. 函数式更新 解决延迟(setTimeout)更新问题
 */

let lastState

function useState(initialState) {
  initialState = isFunction(initialState) ? initialState() : initialState
  lastState = lastState || initialState
  function setState(newState) {
    if (isFunction(newState)) {
      newState = newState(lastState)
    }
    if (lastState === newState) return
    lastState = newState
    render()
  }
  return [lastState, setState]
}

let lastRef
function useRef() {
  lastRef = lastRef || { current: null }
  return lastRef
}

function Counter() {
  const [number, setNumber] = useState(() => 0)
  const numberRef = useRef()
  function updateNumber() {
    setTimeout(() => {
      setNumber(number => number + 1)
    }, 1000)
  }

  return (
    <div>
      <p>number: {number}</p>
      <button
        onClick={() => {
          setNumber(number + 1)
          numberRef.current = number + 1
        }}
      >
        +
      </button>
      <button onClick={updateNumber}>lazy</button>
    </div>
  )
}
function render() {
  ReactDOM.render(<Counter />, document.getElementById("root"))
}

render()
