import request from "@/utils/request";

/**
 * 新增人口信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function addPopulation( params ) {
  return request.post('/population/addPopulation', params)
}

/**
 * 删除人口信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function delPopulation( params ) {
  return request.post('/population/delPopulation', params)
}

/**
 * 根据id查询人口信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getPopulationById( params ) {
  return request.post('/population/getPopulationById', params)
}

/**
 * 获取人口信息分页数据
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getPopulationPage( params ) {
  return request.get('/population/getPopulationPage', { params })
}

/**
 * 修改人口信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function updatePopulation( params ) {
  return request.post('/population/updatePopulation', params)
}

/**
 * 是否存在该村当年信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getPopulationFlag( params ) {
  return request.post('/population/getPopulationFlag', params)
}