import request from "@/utils/request";
// let index = 'http://192.168.31.28:10209'
let index = '/jxy'
/**
 * 新增人口信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function addPopulation( params ) {
  return request.post(index+'/population/addPopulation', params)
}

/**
 * 删除人口信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function delPopulation( params ) {
  return request.post(index+'/population/delPopulation', params)
}

/**
 * 根据id查询人口信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getPopulationById( params ) {
  return request.post(index+'/population/getPopulationById', params)
}

/**
 * 获取人口信息分页数据
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getPopulationPage( params ) {
  return request.get(index+'/population/getPopulationPage', { params })
}

/**
 * 修改人口信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function updatePopulation( params ) {
  return request.post(index+'/population/updatePopulation', params)
}

/**
 * 是否存在该村当年信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getPopulationFlag( params ) {
  return request.post(index+'/population/getPopulationFlag', params)
}