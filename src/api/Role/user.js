import request from "@/utils/request"

/**
 * 查询权限用户列表
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function findPage( params ) {
  return request.get('http://192.168.31.161:10202/user/select/pages', {params})
}
/**
 * 查询用户列表
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function find( params ) {
  return request.get('http://192.168.31.161:10202/user/pages', {params})
}
/**
 * 密码重置
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function password( userId ) {
  return request.put(`http://192.168.31.161:10202/user/password/${userId}`)
}

/**
 * 用户删除
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function deleteUser( userId ) {
  return request.delete(`http://192.168.31.161:10202/user/${userId}`)
}
/**
 * 查询个人用户信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getUsers() {
  return request.get('http://192.168.31.161:10202/user')
}
/**
 * 用户信息查询
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getUser ( userId ) {
  return request.get(`http://192.168.31.161:10202/user/user/${userId}`)
}

/**
 * 用户角色列表查询
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function roleList ( params ) {
  return request.post(`http://192.168.31.161:10202/user/roleList`,params)
}
/**
 * 创建用户
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function userCreated ( params ) {
  return request.post(`http://192.168.31.161:10202/user/created`,params)
}

/**
 * 修改用户信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function updateUserInfo ( params ) {
  return request.put(`http://192.168.31.161:10202/user/info`,params)
}

/**
 * 修改密码
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function updatePassword(parms) {
  return request.post('http://192.168.31.161:10202/secret/password',parms)
}
/**
 * 修改手机号
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function updatePhone(parms) {
  return request.post('http://192.168.31.161:10202/secret/phone',parms)
}
/**
 * 修改密保
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function updateSecurity(parms) {
  return request.post('http://192.168.31.161:10202/secret/security',parms)
}
/**
 * 获取安全密钥
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function postSecret(parms) {
  return request.post('http://192.168.31.161:10202/secret',parms)
}

/**
 * 禁用/解禁用户
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function disabledUser(userId) {
  return request.put(`http://192.168.31.161:10202/user/disabled/${userId}`)
}