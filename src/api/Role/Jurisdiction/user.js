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