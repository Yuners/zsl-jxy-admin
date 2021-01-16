import request from "@/utils/request";
let index="/jxy"
/**
 * 新增美食
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function addFood( params ) {
  return request.post(index + '/food/addFood', params)
}

/**
 * 删除美食
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function delFood( params ) {
  return request.post(index + '/food/delFood', params)
}

/**
 * 获取美食详情
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getFoodDetails( params ) {
  return request.post(index + '/food/getFoodById', params)
}

/**
 * 获取美食列表
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getFoodList( params ) {
  return request.get(index + '/food/getFoodPage', { params })
}

/**
 * 修改美食
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function updateFood( params ) {
  return request.post(index + '/food/updateFood', params)
}
