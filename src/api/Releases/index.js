import request from "@/utils/request";

/**
 * 发布
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function issue( params ) {
  return request.post('/apply/addApply', params)
}
