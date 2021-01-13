import request from "@/utils/request";

let index="/role"
/**
 * 系统列表查询
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function selectListOwnershipSystem( params ) {
  return request.post(index+'/ownershipSystem/select/list', params)
}