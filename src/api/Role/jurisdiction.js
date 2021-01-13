import request from "@/utils/request";

let index="/role"
/**
 * 查询权限树
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function selectJurisdictionTree( params ) {
  return request.post(index+'/jurisdiction/select/tree', params)
}
