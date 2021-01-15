import request from "@/utils/request";

let index="http://192.168.31.161:10209"

/**
 * 获取活动列表
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getActivityPage(params) {
  return request.get(index+'/activity/getActivityPage', {params})
}
/**
 * 获取活动列表
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function updateActivityIsUp(params) {
  return request.post(index+'/activity/updateActivityIsUp', params)
}
 