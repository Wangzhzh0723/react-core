/*
 * @Author: Jonath
 * @Date: 2020-10-25 00:53:50
 * @LastEditors: Jonath
 * @LastEditTime: 2020-10-26 11:16:07
 * @Description: React
 */
/**
 * 创建React元素
 * @param {*} type 元素类型
 * @param {*} config 配置对象  , 一般就是属性对象
 * @param  {...any} children 儿子节点
 */
export function createElement(type, config = {}, ...children) {
  const props = { ...config }
  // children中元素 可能是 null, React元素, 数字, 字符串
  props.children = children
  return {
    type,
    props
  }
}

const React = {
  createElement
}

export default React
