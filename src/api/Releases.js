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

/**
 * 新增名宿
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function addBed( params ) {
  return request.post('/bed/addBed', params)
}

/**
 * 删除名宿
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function delBed( params ) {
  return request.post('/bed/delBed', params)
}

/**
 * 获取名宿详情
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getBedDetails( params ) {
  return request.post('/bed/getBedById', params)
}

/**
 * 获取名宿列表
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getBedList( params ) {
  return request.get('/bed/getBedPage', { params })
}

/**
 * 修改名宿
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function updateBed( params ) {
  return request.post('/bed/updateBed', params)
}

/**
 * 获取民宿设备
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getBedDictionary(params) {
  return request.post('/dictionary/getDictionaryAllByPCode', params)
}


