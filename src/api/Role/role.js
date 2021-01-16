import request from "@/utils/request";
// let index="/role"
let index="http://192.168.31.252:10207"
/**
 * 添加角色
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function addRole( params ) {
  return request.post(index+'/role/add', params)
}

/**
 * 修改角色
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function updateRole( params ) {
  return request.post(index+'/role/updateName', params)
}



/**
 * 删除角色
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function delectRole( params ) {
  return request.post(index+'/role/delect', params)
}

/**
 *  禁用角色
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function disabledRole( params ) {
  return request.post(index+'/role/disabled', params)
}

/**
 * 查询当前可用分页列表
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function selectRoleList( params ) {
  return request.post(index+'/role/select/list', params)
}

/**
 * 查询当前可用角色分页列表
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function selectRolePage( params ) {
  return request.get(index+'/role/select/page', {params})
}
/**
 * 查询角色信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function selectRole( params ) {
  return request.post(index+'/role/select', params)
}
