/*
 * @Author: Jonath
 * @Date: 2020-10-25 00:53:50
 * @LastEditors: Jonath
 * @LastEditTime: 2020-10-26 13:39:39
 * @Description: React
 */
import { Component } from "./component"
import { reactFragment } from "./utils/constants"
import { wrapToVdom } from "./utils/util"

/**
 * 创建React元素
 * @param {*} type 元素类型
 * @param {*} config 配置对象  , 一般就是属性对象
 * @param  {...any} children 儿子节点
 */
export function createElement(type, config = {}, ...children) {
  const props = { ...config }
  const ref = props.ref
  delete props.ref
  // children中元素 可能是 null, React元素, 数字, 字符串
  props.children = children.map(wrapToVdom)
  return {
    type,
    props,
    ref
  }
}

function cloneElement(element, props, ...children) {
  props.children = children
  return {
    ...element,
    props
  }
}

function createRef() {
  return {
    current: null
  }
}

function createContext() {
  // 创建上下文
  const context = {
    _currentValue: null, // 值
    Provider: Provider, // 提供者
    Consumer: Consumer // 消费者
  }
  function Provider({ value, children: [child] }) {
    context._currentValue = value // 赋值
    return child
  }

  function Consumer({ children: [child] }) {
    // 运行并传入值
    return child(context._currentValue)
  }
  return context
}

const React = {
  createElement,
  Component,
  createRef,
  createContext,
  cloneElement,
  Fragment: reactFragment
}

export default React
