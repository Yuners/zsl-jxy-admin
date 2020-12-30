import request from "@/utils/request";


/**
 * 新增乡村简介
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function addVillage( params ) {
  return request.post('/villageDescrible/addVillage', params )
}

/**
 * 删除乡村简介
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function delVillage( params ) {
  return request.post('/villageDescrible/delVillage', params )
}

/**
 * 获取乡村简介详情
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getVillageDetails( params ) {
  return request.post('/villageDescrible/getVillageById', params )
}

/**
 * 获取乡村简介列表
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getVillageList( params ) {
  return request.get('/villageDescrible/getVillagePage', { params } )
}

/**
 * 修改乡村简介
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function updateVillage( params ) {
  return request.post('/villageDescrible/updateVillage', params )
}

