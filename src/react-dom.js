/*
 * @Author: Jonath
 * @Date: 2020-10-25 00:53:59
 * @LastEditors: Jonath
 * @LastEditTime: 2020-10-26 17:01:37
 * @Description: React渲染相关
 */

import { isString, isNumber, isFunction } from "./utils/util"
import { addEvent } from "./event"

/**
 * 虚拟DOM转换成真实DOM, 并插入到容器里
 * @param {*} vdom 虚拟DOM(React元素)
 * @param {*} container 插入到哪个容器里
 */
export function render(vdom, container) {
  const dom = createDOM(vdom)
  dom && container.appendChild(dom)
}
/**
 * 把虚拟DOM变成真实DOM
 * @param {*} vdom null 数字  字符串  React元素(虚拟DOM)
 */
export function createDOM(vdom) {
  if (vdom == null) {
    return ""
  }
  if (isString(vdom) || isNumber(vdom)) {
    const dom = document.createTextNode(vdom)
    dom.textContent = vdom.toString()
    return dom
  }
  // React元素
  const { type, props, ref } = vdom
  let dom
  // 是组件
  if (isFunction(type)) {
    if (type.isReactComponent) {
      // 类组件
      return updateClassComponent(vdom)
    } else {
      // 函数组件
      return updateFunctionComponent(vdom)
    }
  } else {
    dom = document.createElement(type) // span div ...
  }

  updateProps(dom, {}, props) // 更新属性, 把虚拟DOM上的属性设置到真实DOM上

  const children = props.children
  reconcileChildren(children, dom)
  if (ref) ref.current = dom

  vdom.dom = dom

  return dom
}

/**
 * 得到函数组件的真实DOM
 * @param {*} vdom 函数组件的虚拟DOM
 */
function updateFunctionComponent(vdom) {
  const { type, props, ref } = vdom
  const renderVdom = type(props)
  const dom = createDOM(renderVdom)
  if (ref) {
    ref.current = dom
  }
  return dom
}

/**
 * 得到类组件的真实DOM
 * @param {*} vdom 类组件的虚拟DOM
 */
function updateClassComponent(vdom) {
  const { type, props, ref } = vdom
  // 创建类组件实例
  const classInstance = new type(props)

  // 让虚拟DOM的classInstance = 类组件的实例
  vdom.classInstance = classInstance

  // 将要挂载生命周期
  if (classInstance.componentWillMount) {
    classInstance.componentWillMount()
  }

  // 调用实例的render方法得到其虚拟DOM
  const renderVdom = classInstance.render()
  // 创建真实DOM
  const dom = createDOM(renderVdom)
  // 让类组件实例上挂载一个dom指向类实例的真实DOM
  classInstance.dom = dom
  // 让组件的实例老的vdom属性指向renderDom
  classInstance.oldVdom = renderVdom

  // 让这个类虚拟DOM的dom属性和render方法返回的虚拟DOM的dom属性都指向真实DOM
  vdom.dom = renderVdom.dom = dom

  if (ref) {
    ref.current = classInstance
  }

  // 挂载完成生命周期
  if (classInstance.componentDidMount) {
    classInstance.componentDidMount()
  }

  return dom
}

/**
 * 把属性更新到dom元素上
 * @param {*} dom dom DOM元素
 * @param {*} oldProps 旧props 属性
 * @param {*} newProps 新props 属性
 */
function updateProps(dom, oldProps, newProps) {
  for (const key in newProps) {
    if (key === "children") continue
    const element = newProps[key]
    if (key === "style") {
      // dom.style.color = "red"
      for (const styleKey in element) dom.style[styleKey] = element[styleKey]
    } else if (key.startsWith("on")) {
      // 处理事件
      // dom[key.toLowerCase()] = element
      addEvent(dom, key.toLowerCase(), element)
    } else {
      // dom.className = "title"
      dom[key] = element
    }
  }
}

/**
 * 把子节点从虚拟DOM全部转换成真实DOM并更新到父节点中
 * @param {*} childrenVdom 子节点虚拟DOM数组
 * @param {*} parentDom 父节点真实DOM
 */
function reconcileChildren(childrenVdom = [], parentDom) {
  childrenVdom.forEach(childVdom => render(childVdom, parentDom))
}

/**
 * 找到老的虚拟oldVdom和新的虚拟newVdom, 把响应的差更新到真实DOM上
 * @param {*} parentDOM 父的DOM节点
 * @param {*} oldVdom 老的虚拟DOM
 * @param {*} newVdom 新的虚拟DOM
 */
export function compareTwoVdom(parentDOM, oldVdom, newVdom) {
  if (oldVdom == null && newVdom == null) {
    // 都不存在
    return null
  } else if (oldVdom && newVdom == null) {
    // 旧存在  新不存在  删除
    const { dom: currentDom, classInstance } = oldVdom
    currentDom.parentNode.removeChild(currentDom)

    if (classInstance && classInstance.componentWillUnmount) {
      // 调用卸载生命周期
      classInstance.componentWillUnmount()
    }
    return null
  } else if (oldVdom == null && newVdom) {
    // 旧的不存在  新的存在
    // 创建新的dom, 并赋值给newVdom
    const newDOM = (newVdom.dom = createDOM(newVdom))

    parentDOM.appendChild(newDOM)
    return newVdom
  }
  // 都存在
  updateElement(parentDOM, oldVdom, newVdom)

  return newVdom
}

/**
 * DOM-DIF 深度比较优化策略  同级比较
 * 进入深度比较
 * @param {*} oldVdom 老的虚拟dom
 * @param {*} newVdom 新的虚拟dom
 */
function updateElement(parentDOM, oldVdom, newVdom) {
  if (
    (isString(oldVdom) || isNumber(oldVdom)) &&
    (isString(newVdom) || isNumber(newVdom))
  ) {
    if (newVdom !== oldVdom) {
      parentDOM.textContent = newVdom.toString()
    }
    return
  }
  // 获取老的真实DOM
  const currentDom = (newVdom.dom = oldVdom.dom)
  newVdom.classInstance = oldVdom.classInstance
  if (isString(oldVdom.type)) {
    // 原生dom元素
    // 更新属性
    updateProps(currentDom, oldVdom.props, newVdom.props)
    // 更新儿子
    updateChildren(currentDom, oldVdom.props.children, newVdom.props.children)
  } else if (isFunction(oldVdom.type)) {
    // 更新类实例
    updateClassInstanceComponent(oldVdom, newVdom)
  }
}

/**
 * 更新子节点
 * @param {*} parentDOM 父的真实DOM
 * @param {*} oldChildren 老的虚拟doms
 * @param {*} newChildren 新的虚拟doms
 */
function updateChildren(parentDOM, oldChildren, newChildren) {
  //  TODO DOM-DIFF 优化
  const maxLength = Math.max(oldChildren.length, newChildren.length)
  for (let i = 0; i < maxLength; i++) {
    compareTwoVdom(parentDOM, oldChildren[i], newChildren[i])
  }
}

/**
 * 更新类的实例
 * @param {*} oldVdom 老的虚拟dom
 * @param {*} newVdom 新的虚拟dom
 */
function updateClassInstanceComponent(oldVdom, newVdom) {
  const { classInstance } = oldVdom
  // 当父组件更新的时候, 会让子组件更新
  if (classInstance.componentWillReceiveProps) {
    classInstance.componentWillReceiveProps(newVdom.props)
  }
  // 把新的属性传递给emitUpdate方法
  classInstance.updater.emitUpdate(newVdom.props)
}

const ReactDOM = {
  render
}

export default ReactDOM
