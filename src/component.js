/*
 * @Author: Jonath
 * @Date: 2020-10-26 13:36:31
 * @LastEditors: Jonath
 * @LastEditTime: 2020-10-26 13:43:33
 * @Description: 组件
 */
import { createDOM } from "./react-dom"
import { isFunction } from "./utils/util"
export class Component {
  // 标识是类组件
  static isReactComponent = true
  constructor(props) {
    this.props = props
    this.state = {}
    // 为每个组件实例配一个Updater类实例
    this.updater = new Updater(this)
  }
  /**
   * @param {*} partialState 新的部分状态
   */
  setState(partialState) {
    this.updater.addState(partialState)
  }
  forceUpdate() {
    // 重新调用render方法的带新的虚拟DOM
    const newRenderVdom = this.render()
    updateClassComponent(this, newRenderVdom)
  }
}

function updateClassComponent(classInstance, renderDom) {
  // 旧的真实DOM
  const oldDom = classInstance.dom
  // 得到新的真实DOM
  const newDom = (classInstance.dom = createDOM(renderDom))
  // 新旧DOM替换
  oldDom.parentNode.replaceChild(newDom, oldDom)
}

/**
 * 更新器队列
 */
export const updateQueue = {
  updaters: new Set(), // 更新器数组
  isBatchingUpdate: true, // 标志 是否处于批量更新模式  默认是批量更新
  add(updater) {
    // 增加更新器
    this.updaters.add(updater)
  },
  batchUpdate() {
    // 强制更新更新器
    this.updaters.forEach(updater => updater.updateComponent())
    this.isBatchingUpdate = false
    this.updaters.clear()
  }
}

class Updater {
  /**
   *  构造函数
   * @param {*} classInstance 类组件的实例
   */
  constructor(classInstance) {
    this.classInstance = classInstance // 类组件实例
    this.pendingStates = [] // 等待更新的状态
  }
  addState(partialState) {
    // 缓存分状态
    this.pendingStates.push(partialState)
    // 如果处于批量更新模式, 也就是异步更新模式, 把当前的update实例放到updateQueue队列中
    // 如果是费批量更新, 也就是同步更新的话, 就直接调用updateComponent更新
    updateQueue.isBatchingUpdate
      ? updateQueue.add(this)
      : this.updateComponent()
  }
  updateComponent() {
    // 开始真正用pendingStates更新this.state
    const { classInstance, pendingStates } = this
    if (pendingStates.length) {
      // 组件的老状态和数组中的新状态合并后的带最后的额新状态
      classInstance.state = this.getState()
      classInstance.forceUpdate() // 让组件强制更新
    }
  }
  getState() {
    const { classInstance, pendingStates } = this
    let { state } = classInstance
    if (pendingStates.length) {
      // 有等待更新的状态
      pendingStates.forEach(nextState => {
        if (isFunction(nextState)) {
          // 如果是函数 执行得到新状态
          nextState = nextState(state)
        }
        // 合并状态
        state = { ...state, ...nextState }
      })
      // 清空pendingStates
      pendingStates.length = 0
    }
    return state
  }
}
