import request from "@/utils/request";
let index="http://192.168.31.252:10209"
/**
 * 发布
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function issue( params ) {
  return request.post(index+'/apply/addApply', params)
}

/**
 * 审批
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function updateApply( params ) {
  return request.post(index+'/apply/updateApply', params)
}

/**
 * 获取申请列表
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getApplyList( params ) {
  return request.get(index+'/apply/getApplyPage', { params })
}
