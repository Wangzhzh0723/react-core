/*
 * @Author: Jonath
 * @Date: 2020-10-25 00:53:50
 * @LastEditors: Jonath
 * @LastEditTime: 2020-10-26 13:39:39
 * @Description: React
 */
import { Component } from "./component"

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
  props.children = children
  return {
    type,
    props,
    ref
  }
}

function createRef() {
  return {
    current: null
  }
}

const React = {
  createElement,
  Component,
  createRef
}

export default React
