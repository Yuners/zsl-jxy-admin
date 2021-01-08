import request from "@/utils/request";


/**
 * 系统列表查询
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function selectListOwnershipSystem( params ) {
  return request.post('/ownershipSystem/select/list', params)
}