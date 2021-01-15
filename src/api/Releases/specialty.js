import request from "@/utils/request";

<<<<<<< HEAD
let index="http://192.124.1.57:5021/jxy"
=======
let index="http://192.168.31.252:10209"
>>>>>>> b4a55f01d5bcf63afec266b17b1d7b4496435101
/**
 * 获取景区列表
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getSpecialty(params) {
  return request.get(index+'/specialty/getSpecialtyPage', {params})
}


/**
 * 增加景区
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function addSpecialty(params) {
  return request.post(index+'/specialty/addSpecialty', params)
}

/**
 * 获取景区详情
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getSpecialtyDetails(params) {
  return request.post(index+'/specialty/getSpecialtyById', params)
}

/**
 * 修改景区
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function updateSpecialty(params) {
  return request.post(index+'/specialty/updateSpecialty', params)
}

/**
 * 删除景区
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function delSpecialty(params) {
  return request.post(index+'/specialty/delSpecialty', params)
}

/**
 * 获取运费模板列表
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getFreightList() {
  return request.get(index+'/freight/getAllFreight')
}

/**
 * 获取用户须知列表
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getNoticeList(params) {
  return request.get(index+'/notice/getAllNotice', params)
}
/**
 * 特产上下架
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function putawaySpecialty(params) {
  return request.post(index+'/specialty/putawaySpecialty', params)
}
