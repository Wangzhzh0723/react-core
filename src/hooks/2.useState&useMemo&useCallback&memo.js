import React from "react"
import ReactDOM from "react-dom"
import { isFunction } from "./utils/util"

/**
 * useCallback
 * useMemo
 * 要想要让函数组件拥有类似 PureComponent 的能力, 需要使用memo(组件),useMemo(数据), useCallback(函数)
 */

// 所有状态
const hookStates = []
// 状态下标
let hookIndex = 0

function useState(initialState) {
  // 获取第一次定义的的state
  hookStates[hookIndex] =
    hookStates[hookIndex] ||
    (isFunction(initialState) ? initialState() : initialState)
  // 记录state存储的下标
  const currentIndex = hookIndex
  function setState(newState) {
    // 如果是函数执行
    if (isFunction(newState)) {
      newState = newState(hookStates[currentIndex])
    }
    if (newState === hookStates[currentIndex]) return
    hookStates[currentIndex] = newState
    // 重新渲染
    render()
  }
  // 返回数据  数组好处,不显示定义数据的名字
  return [hookStates[hookIndex++], setState]
}
function useMemo(factory, deps) {
  if (hookStates[hookIndex]) {
    const [lastMemo, lastDeps] = hookStates[hookIndex]
    // 比较依赖项是否发生变化
    const same = deps.every((d, index) => d === lastDeps[index])
    if (same) {
      // 没发生变化 hookIndex ++  返回旧值
      hookIndex++
      return lastMemo
    }
    // 发生变化, 重新执行, 返回新值并更新hook状态
    const newMemo = factory()
    hookStates[hookIndex++] = [newMemo, deps]
    return newMemo
  } else {
    // 如果取不到, 说明是第一次调用
    const newMemo = factory()
    hookStates[hookIndex++] = [newMemo, deps]
    return newMemo
  }
}
function useCallback(callback, deps) {
  if (hookStates[hookIndex]) {
    const [lastCallback, lastDeps] = hookStates[hookIndex]
    // 比较依赖项是否发生变化
    const same = deps.every((d, index) => d === lastDeps[index])
    if (same) {
      // 没发生变化 hookIndex ++  返回旧值
      hookIndex++
      return lastCallback
    }
    // 发生变化, 重新执行, 返回新值并更新hook状态
    hookStates[hookIndex++] = [callback, deps]
    return callback
  } else {
    // 如果取不到, 说明是第一次调用
    hookStates[hookIndex++] = [callback, deps]
    return callback
  }
}

function memo(OldComponent) {
  return class extends React.PureComponent {
    render() {
      return <OldComponent {...this.props} />
    }
  }
}

function Child(props) {
  console.log("props render")
  return <button onClick={props.handlerClick}>{props.data.number}</button>
}

const ChildMemo = memo(Child)
function App() {
  const [number, setNumber] = useState(() => 0)
  const [name, setName] = useState(() => "小王")
  const data = useMemo(
    () => ({
      number
    }),
    [number]
  )
  const handler = useCallback(
    e => {
      setNumber(number + 1)
    },
    [number]
  )
  console.log("app render")
  return (
    <div>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      <ChildMemo data={data} handlerClick={handler} />
    </div>
  )
}
function render() {
  hookIndex = 0
  ReactDOM.render(<App />, document.getElementById("root"))
}

render()
