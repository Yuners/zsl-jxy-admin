import request from '@/utils/request'

let index="/jxy"
/**
 * 获取用户须知列表
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getNoticeList(params) {
  return request.get(index+'/notice/getNoticePage', { params })
}


/**
 * 删除用户须知数据
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function delNotice(params) {
  return request.post(index+'/notice/delNotice', params)
}

/**
 * 增加用户须知数据
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function addNotice(params) {
  return request.post(index+'/notice/addNotice', params)
}

/**
 * 修改用户须知数据
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function updateNotice(params) {
  return request.post(index+'/notice/updateNotice', params)
}

/**
 * 获取用户须知详情
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getNoticeDetails(params) {
  return request.post(index+'/notice/getNoticeById', params)
}
