import request from "@/utils/request";

/**
 * 添加角色
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function addFramework( params ) {
  return request.post('/role/add', params)
}

/**
 * 修改角色
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function updateFramework( params ) {
  return request.post('/role/updateName', params)
}



/**
 * 删除角色
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function delectFramework( params ) {
  return request.post('/role/delect', params)
}

/**
 *  禁用角色
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function disabledFramework( params ) {
  return request.post('/role/disabled', params)
}

/**
 * 查询当前可用分页列表
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function selectFramework( params ) {
  return request.post('/role/select/list', params)
}

/**
 * 查询当前可用角色分页列表
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function selectFrameworkPage( params ) {
  return request.get('/role/select/page', {params})
}