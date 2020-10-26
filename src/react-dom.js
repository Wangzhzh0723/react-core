/*
 * @Author: Jonath
 * @Date: 2020-10-25 00:53:59
 * @LastEditors: Jonath
 * @LastEditTime: 2020-10-26 17:01:37
 * @Description: React渲染相关
 */

import { isString, isNumber, isFunction } from "./utils/util"

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
  const { type, props } = vdom
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

  updateProps(dom, props) // 更新属性, 把虚拟DOM上的属性设置到真实DOM上

  const children = props.children
  reconcileChildren(children, dom)

  return dom
}

/**
 * 得到函数组件的真实DOM
 * @param {*} vdom 函数组件的虚拟DOM
 */
function updateFunctionComponent(vdom) {
  const { type, props } = vdom
  const renderVdom = type(props)
  return createDOM(renderVdom)
}

/**
 * 得到类组件的真实DOM
 * @param {*} vdom 类组件的虚拟DOM
 */
function updateClassComponent(vdom) {
  const { type, props } = vdom
  // 创建类组件实例
  const classInstance = new type(props)
  // 调用实例的render方法得到其虚拟DOM
  const renderVdom = classInstance.render()
  // 让类组件实例上挂载一个dom指向类实例的真实DOM
  const dom = (classInstance.dom = createDOM(renderVdom))
  return dom
}

/**
 * 把属性更新到dom元素上
 * @param {*} dom DOM元素
 * @param {*} props 属性
 */
function updateProps(dom, props) {
  for (const key in props) {
    if (key === "children") continue
    const element = props[key]
    if (key === "style") {
      // dom.style.color = "red"
      for (const styleKey in element) dom.style[styleKey] = element[styleKey]
    } else if (key.startsWith("on")) {
      // 处理事件
      dom[key.toLowerCase()] = element
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

const ReactDOM = {
  render
}

export default ReactDOM
