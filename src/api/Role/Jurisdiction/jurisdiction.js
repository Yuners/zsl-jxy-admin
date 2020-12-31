import request from "@/utils/request";


/**
 * 查询权限树
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function selectJurisdictionTree( params ) {
  return request.post('/jurisdiction/select/tree', params)
}
