import React from "react"
import ReactDOM from "react-dom"

/**
 * 函数式
 * 纯函数
 * 1. 相同的参数返回相同的结果
 * 2. 不能修改作用域外的变量
 */

// 不要在if 和 循环中 使用hooks, 否则下标索引会混乱

function useLayoutEffect(callback, deps) {
  const currentIndex = hookIndex
  if (hookStates[hookIndex]) {
    const { lastDestroy, lastDeps } = hookStates[hookIndex] // 获取上一次的依赖数组
    const same = !!deps && deps.every((d, index) => d === lastDeps[index])
    if (!same) {
      // 如果本次的依赖数组和上次的依赖数组不一样
      const state = {
        lastDestroy: undefined,
        lastDeps: deps
      }
      hookStates[currentIndex] = state
      // 用微任务实现, 保证callback是在本次页面渲染结束之前执行
      Promise.resolve().then(() => {
        lastDestroy && lastDestroy()
        state.lastDestroy = callback() // 保存上次副作用的返回函数和依赖项
      })
    }
  } else {
    const state = {
      lastDestroy: undefined,
      lastDeps: deps
    }
    hookStates[currentIndex] = state
    // 用微任务实现, 保证callback是在本次页面渲染结束之前执行
    Promise.resolve().then(() => {
      state.lastDestroy = callback() // 保存上次副作用的返回函数和依赖项
    })
  }
  hookIndex++
}

function Counter() {
  const divRef = React.useRef()
  useLayoutEffect(() => {
    divRef.current.style.transform = "translateX(400px)"
  }, [])
  const style = {
    width: 100,
    height: 100,
    background: "red",
    transition: "1s"
  }
  return <div style={style} ref={divRef}></div>
}
function render() {
  hookIndex = 0
  ReactDOM.render(<Counter />, document.getElementById("root"))
}

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

function useState(initialState) {
  return useReducer(null, initialState)
}

render()
