import request from '@/utils/request'


/**
 * 获取运费列表
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getFreightList(params) {
  return request.get('/freight/getFreightPage', { params })
}


/**
 * 删除运费数据
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function delFreight(params) {
  return request.get('/freight/delFreight', params)
}
