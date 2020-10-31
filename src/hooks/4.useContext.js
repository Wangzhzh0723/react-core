import React from "react"
import ReactDOM from "react-dom"

// 先创建context对象
const CounterContext = React.createContext()

// 所有状态
const hookStates = []
// 状态下标
let hookIndex = 0

function useReducer(reducer, initialState, init) {
  // 获取第一次定义的的state
  hookStates[hookIndex] =
    hookStates[hookIndex] || (init ? init(initialState) : initialState)
  // 记录state存储的下标
  const currentIndex = hookIndex
  function dispatch(action) {
    const oldState = hookStates[currentIndex]
    hookStates[currentIndex] = reducer ? reducer(oldState, action) : action
    render()
  }
  // 返回数据  数组好处,不显示定义数据的名字
  return [hookStates[hookIndex++], dispatch]
}

// useState是一个简化版的useReducer
// 什么时候用useState  什么时候用useReducer
// 状态变更处理逻辑比较简单的时候,用useState, 反之用useReducer

function useState(initialState) {
  return useReducer(null, initialState)
}

function useContext(context) {
  return context._currentValue
}

/**
 * 处理器
 * 接受一个老状态和一个动作, 返回一个新状态
 */
function reducer(state, action) {
  switch (action.type) {
    case "add":
      state.number += 1
      break
    case "minus":
      state.number -= 1
      break
    default:
      break
  }
  return { ...state }
}

let initialState = 0

function init(initialState) {
  return { number: initialState }
}

function Counter() {
  const { state, dispatch } = useContext(CounterContext)
  return (
    <div>
      <p>number: {state.number}</p>
      <button
        onClick={() => {
          dispatch({
            type: "add"
          })
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          dispatch({
            type: "minus"
          })
        }}
      >
        -
      </button>
    </div>
  )
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState, init)
  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      <Counter />
    </CounterContext.Provider>
  )
}
function render() {
  hookIndex = 0
  ReactDOM.render(<App />, document.getElementById("root"))
}

render()
