import request from "@/utils/request"
let index="/role"
/**
 * 查询
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function selectListSecurityQuestion() {
  return request.get(index+'/securityQuestion/select/list')
}