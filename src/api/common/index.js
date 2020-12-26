import request from "@/utils/request";

/**
 * 获取分类
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getDictionary(params) {
  return request.post('/dictionary/getDictionaryByCode', params)
}
