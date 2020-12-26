import request from "@/utils/request";

/**
 * 新增美食
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function addFood( params ) {
  return request.post('/food/addFood', params)
}

/**
 * 删除美食
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function delFood( params ) {
  return request.post('/food/delFood', params)
}

/**
 * 获取美食详情
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getFoodDetails( params ) {
  return request.post('/food/getFoodById', params)
}

/**
 * 获取美食列表
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getFoodList( params ) {
  return request.get('/food/getFoodPage', { params })
}

/**
 * 修改美食
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function updateFood( params ) {
  return request.post('/food/updateFood', params)
}
