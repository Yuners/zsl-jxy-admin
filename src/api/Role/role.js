import request from "@/utils/request";

/**
 * 添加角色
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function addRole( params ) {
  return request.post('/role/add', params)
}

/**
 * 修改角色
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function updateRole( params ) {
  return request.post('/role/updateName', params)
}



/**
 * 删除角色
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function delectRole( params ) {
  return request.post('/role/delect', params)
}

/**
 *  禁用角色
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function disabledRole( params ) {
  return request.post('/role/disabled', params)
}

/**
 * 查询当前可用分页列表
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function selectRoleList( params ) {
  return request.post('/role/select/list', params)
}

/**
 * 查询当前可用角色分页列表
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function selectRolePage( params ) {
  return request.get('/role/select/page', {params})
}
/**
 * 查询角色信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function selectRole( params ) {
  return request.post('/role/select', params)
}