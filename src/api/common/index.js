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
 * 获取地区
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getArea( params ) {
  return request.post('http://192.168.31.252:10207/framework/select', params)
}
