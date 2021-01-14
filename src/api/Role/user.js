import request from "@/utils/request"
// let index="/user"
let index="http://192.124.1.57:5021/user"
/**
 * 查询权限用户列表
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function findPage( params ) {
  return request.get(index+'/user/select/pages', {params})
}
/**
 * 查询用户列表
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function find( params ) {
  return request.get(index+'/user/pages', {params})
}
/**
 * 密码重置
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function password( userId ) {
  return request.put(index+`/user/password/${userId}`)
}

/**
 * 用户删除
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function deleteUser( userId ) {
  return request.delete(index+`/user/${userId}`)
}
/**
 * 查询个人用户信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getUsers() {
  return request.get(index+'/user')
}
/**
 * 用户信息查询
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getUser ( userId ) {
  return request.get(index+`/user/user/${userId}`)
}

/**
 * 用户角色列表查询
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function roleList ( params ) {
  return request.post(index+`/user/roleList`,params)
}
/**
 * 创建用户
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function userCreated ( params ) {
  return request.post(index+`/user/created`,params)
}

/**
 * 修改用户信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function updateUserInfo ( params ) {
  return request.put(index+`/user/info`,params)
}

/**
 * 修改密码
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function updatePassword(parms) {
  return request.post(index+'/secret/password',parms)
}
/**
 * 修改手机号
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function updatePhone(parms) {
  return request.post(index+'/secret/phone',parms)
}
/**
 * 修改密保
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function updateSecurity(parms) {
  return request.post(index+'/secret/security',parms)
}
/**
 * 获取安全密钥
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function postSecret(parms) {
  return request.post(index+'/secret',parms)
}

/**
 * 禁用/解禁用户
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function disabledUser(userId) {
  return request.put(index+`/user/disabled/${userId}`)
}