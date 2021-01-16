import request from "@/utils/request";

/**
 * 获取分类
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getDictionary(params) {
  return request.post('/dictionary/getDictionaryByCode', params)
}

/**
 * 获取地区(省市县镇)
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getArea( params ) {
  return request.post('/role/framework/select', params)
}

/**
 * 获取地区(省)
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getPcca( params ) {
  return request.post('/role/framework/select/rank', params)
}
