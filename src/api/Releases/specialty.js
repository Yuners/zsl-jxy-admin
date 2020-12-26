import request from "@/utils/request";

/**
 * 获取景区列表
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getSpecialty(params) {
  return request.get('/specialty/getSpecialtyPage', {params})
}


/**
 * 增加景区
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function addSpecialty(params) {
  return request.post('/specialty/addSpecialty', params)
}

/**
 * 获取景区详情
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getSpecialtyDetails(params) {
  return request.post('/specialty/getSpecialtyById', params)
}

/**
 * 修改景区
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function updateSpecialty(params) {
  return request.post('/specialty/updateSpecialty', params)
}

/**
 * 删除景区
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function delSpecialty(params) {
  return request.post('/specialty/delSpecialty', params)
}
