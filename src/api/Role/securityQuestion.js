import request from "@/utils/request"

/**
 * 查询
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function selectListSecurityQuestion() {
  return request.get('/securityQuestion/select/list')
}