import request from '@/utils/request'
let index="/jxy"

/**
 * 获取运费列表
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getFreightList(params) {
  return request.get(index+'/freight/getFreightPage', { params })
}


/**
 * 删除运费数据
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function delFreight(params) {
  return request.get(index+'/freight/delFreight', params)
}

/**
 * 新增运费数据
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function addFreight(params) {
  return request.post(index+'/freight/addFreight', params)
}


/**
 * 新增运费数据
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getFreightDetails(params) {
  return request.post(index+'/freight/getFreightById', params)
}


/**
 * 修改运费数据
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function updateFreight(params) {
  return request.post(index+'/freight/updateFreight', params)
}
