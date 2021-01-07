import request from "@/utils/request"

/**
 * 查询个人用户信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getUser() {
  return request.get('http://192.168.31.161:10202/user')
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