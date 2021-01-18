import request from "@/utils/request";

// let index="http://192.168.31.161:10209"
let index="/jxy"
/**
 * 获取活动列表
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getActivityPage(params) {
  return request.get(index+'/activity/getActivityPage', {params})
}
/**
 * 修改上线情况
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function updateActivityIsUp(params) {
  return request.post(index+'/activity/updateActivityIsUp', params)
}
/**
 * 添加活动
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function addActivity(params) {
  return request.post(index+'/activity/addActivity', params)
}
/**
 * 修改活动
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function updateActivity(params) {
  return request.post(index+'/activity/updateActivity', params)
}
/**
 * 获取活动信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getActivityById(params) {
  return request.post(index+'/activity/getActivityById', params)
}
/**
 *删除活动信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function delActivityd(params) {
  return request.post(index+'/activity/delActivity', params)
}
