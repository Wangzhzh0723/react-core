/*
 * @Author: Jonath
 * @Date: 2020-10-26 13:36:31
 * @LastEditors: Jonath
 * @LastEditTime: 2020-10-26 13:43:33
 * @Description: 组件
 */
export class Component {
  // 标识是类组件
  static isReactComponent = true
  constructor(props) {
    this.props = props
  }
}
