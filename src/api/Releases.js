import request from '@/utils/request'

/**
 * 获取景区列表
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getScenery(params) {
  return request.get('/scenery/getSceneryPage', {params})
}

/**
 * 获取景区分类
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getDictionary(params) {
  return request.post('/dictionary/getDictionaryByCode', params)
}

/**
 * 增加景区
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function addScenery(params) {
  return request.post('/scenery/addScenery', params)
}

/**
 * 获取景区详情
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getSceneryDetails(params) {
  return request.post('/scenery/getSceneryById', params)
}

/**
 * 修改景区
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function updateScenery(params) {
  return request.post('/scenery/updateScenery', params)
}

/**
 * 删除景区
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function delScenery(params) {
  return request.post('/scenery/delScenery', params)
}
