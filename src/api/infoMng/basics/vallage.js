import request from "@/utils/request";

/**
 * 新增乡村信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function addVillage( params ) {
  return request.post('/village/addVillage', params)
}

/**
 * 删除乡村信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function delVillage( params ) {
  return request.post('/village/delVillage', params)
}

/**
 * 根据id查询乡村信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getVillageById( params ) {
  return request.post('/village/getVillageById', params)
}

/**
 * 获取乡村信息分页数据
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getVillagePage( params ) {
  return request.get('/village/getVillagePage', { params })
}

/**
 * 修改乡村信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function updateVillage( params ) {
  return request.post('/village/updateVillage', params)
}

/**
 * 是否存在该村当年信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getVillageFlag( params ) {
  return request.post('/village/getVillageFlag', params)
}