import request from '@/utils/request'
let index="/jxy"
/**
 * 新增名宿
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function addBed( params ) {
  return request.post(index+'/bed/addBed', params)
}

/**
 * 删除名宿
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function delBed( params ) {
  return request.post(index+'/bed/delBed', params)
}

/**
 * 获取名宿详情
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getBedDetails( params ) {
  return request.post(index+'/bed/getBedById', params)
}

/**
 * 获取名宿列表
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getBedList( params ) {
  return request.get(index+'/bed/getBedPage', { params })
}

/**
 * 修改名宿
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function updateBed( params ) {
  return request.post(index+'/bed/updateBed', params)
}

/**
 * 获取民宿设备
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getBedDictionary(params) {
  return request.post(index+'/dictionary/getDictionaryAllByPCode', params)
}
