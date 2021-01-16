import request from "@/utils/request";
// let index="/role"
let index="http://192.168.31.252:10207"
/**
 * 添加
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function addFramework( params ) {
  return request.post(index+'/framework/add', params)
}

/**
 * 修改目录
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function updateFramework( params ) {
  return request.post(index+'/framework/update', params)
}



/**
 * 删除目录
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function delectFramework( params ) {
  return request.post(index+'/framework/delect', params)
}

/**
 *  禁用目录
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function disabledFramework( params ) {
  return request.post(index+'/framework/disabled', params)
}

/**
 * 查询当前可用目录菜单
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function selectFramework( params ) {
  return request.post(index+'/framework/select', params)
}
