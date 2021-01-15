import request from "@/utils/request";

let index="http://192.124.1.57:5021/jxy"
/**
 * 获取景区列表
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getScenery(params) {
  return request.get(index+'/scenery/getSceneryPage', {params})
}


/**
 * 增加景区
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function addScenery(params) {
  return request.post(index+'/scenery/addScenery', params)
}

/**
 * 获取景区详情
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getSceneryDetails(params) {
  return request.post(index+'/scenery/getSceneryById', params)
}

/**
 * 修改景区
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function updateScenery(params) {
  return request.post(index+'/scenery/updateScenery', params)
}

/**
 * 删除景区
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function delScenery(params) {
  return request.post(index+'/scenery/delScenery', params)
}
