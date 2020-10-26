import { updateQueue } from "./component"

/**
 * 给dom元素绑定事件
 * @param {*} dom 给那个dom元素
 * @param {*} eventType 事件类型
 * @param {*}} listener 事件处理函数
 */
export function addEvent(dom, eventType, listener) {
  // 给dom增加一个store属性
  const store = dom.store || (dom.store = {})
  store[eventType] = listener
  document.addEventListener(eventType.slice(2), dispatchEvent, false)
  //   if (!document[eventType]) {
  //     // 有可能会被覆盖用户的赋值, 也可能被用户的赋值覆盖掉
  //     // 推荐上面的事件订阅方式
  //     document[eventType] = dispatchEvent // document.onclick = dispatchEvent
  //   }
}

// 共享一个合成对象, 使用的时候赋值 , 使用完清空 (使用了persist会持久化这个event)  提高性能
let syntheticEvent = {}

/**
 * @param {*} event 原生事件对象
 */
function dispatchEvent(event) {
  const { target, type } = event // type = click
  const { store } = target
  const eventType = `on${type}` // onclick
  const listener = store && store[eventType]
  // 点击绑定事件外面 的 dom 未绑定 事件 store 不存在直接返回
  if (!listener) return

  updateQueue.isBatchingUpdate = true

  syntheticEvent = createSyntheticEvent(event)
  listener.call(target, syntheticEvent)
  for (const key in syntheticEvent) {
    syntheticEvent[key] = null
  }

  updateQueue.batchUpdate()
}

function createSyntheticEvent(nativeEvent) {
  const syntheticEvent = {}
  for (const key in nativeEvent) {
    syntheticEvent[key] = nativeEvent[key]
  }
  return syntheticEvent
}
