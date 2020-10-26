/*
 * @Author: Jonath
 * @Date: 2020-10-26 11:20:37
 * @LastEditors: Jonath
 * @LastEditTime: 2020-10-26 11:26:59
 * @Description: 公用方法
 */
const toString = Object.prototype.toString
const isType = type => obj => toString.call(obj) === `[object ${type}]`

export const isArray = isType("Array")
export const isBoolean = isType("Boolean")
export const isString = isType("String")
export const isNumber = isType("Number")

export const isObject = obj => obj !== null && typeof obj === "object"
export const isFunction = obj => typeof obj === "function"
