import formatNum from './formatNum'

/**
 * 格式化数字
 * @param {string | number} originNum 数据
 * @param {'origin' | 'round' | 'floor' | 'ceil'} type 格式化类型
 * @param {number} radix 保留小数点位数
 * @param {boolean} NANZERO NAN是否格式化为0
 * @returns {number}
 */

export type mathType = 'origin' | 'round' | 'floor' | 'ceil'

function getNum(originNum: any, type: mathType = 'round', radix = 2, NANZERO = true) {
  let value = formatNum(originNum)
  if (isNaN(value)) {
    if (NANZERO) {
      value = 0
      console.log('NAN is find')
    }
  } else if (type != 'origin' && Math.round(value) !== value) { // 如果是小数
    let rate = Math.pow(10, radix)
    value = Math[type](value * rate) / rate
  }
  return value
}

export default getNum
