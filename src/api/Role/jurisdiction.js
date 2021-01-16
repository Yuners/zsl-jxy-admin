import request from "@/utils/request";

let index="/role"
// let index="http://192.168.31.252:10207"
/**
 * 查询权限树
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function selectJurisdictionTree( params ) {
  return request.post(index+'/jurisdiction/select/tree', params)
}
