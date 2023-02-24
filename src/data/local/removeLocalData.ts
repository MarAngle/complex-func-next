import buildLocalDataName from './buildLocalDataName'

/**
 * 清除缓存
 * @param {string} name
 */
function removeLocalData(name: string) {
  name = buildLocalDataName(name)
  localStorage.removeItem(name)
}

export default removeLocalData
