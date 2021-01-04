import request from "@/utils/request"

/**
 * 查询当前可用角色分页列表
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function findPage( params ) {
  return request.get('http://192.168.31.161:10202/user/select/pages', {params})
}

/**
 * 查询当前可用角色分页列表
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function password( userId ) {
  return request.put(`http://192.168.31.161:10202/user/password/${userId}`)
}

/**
 * 查询当前可用角色分页列表
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function deleteUser( userId ) {
  return request.delete(`http://192.168.31.161:10202/user/${userId}`)
}
