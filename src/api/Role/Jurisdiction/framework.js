import request from "@/utils/request";

/**
 * 添加
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function addFramework( params ) {
  return request.post('/framework/add', params)
}

/**
 * 修改目录
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function updateFramework( params ) {
  return request.post('/framework/update', params)
}



/**
 * 删除目录
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function delectFramework( params ) {
  return request.post('/framework/delect', params)
}

/**
 *  禁用目录
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function disabledFramework( params ) {
  return request.post('/framework/disabled', params)
}

/**
 * 查询当前可用目录菜单
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function selectFramework( params ) {
  return request.post('/framework/select', params)
}
