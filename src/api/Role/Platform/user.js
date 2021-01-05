import request from "@/utils/request"

/**
 * 查询个人用户信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getUser() {
  return request.get('http://192.168.31.161:10202/user')
}

