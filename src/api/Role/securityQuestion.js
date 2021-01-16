import request from "@/utils/request"
// let index="/role"
let index="http://192.168.31.252:10207"
/**
 * 查询
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function selectListSecurityQuestion() {
  return request.get(index+'/securityQuestion/select/list')
}