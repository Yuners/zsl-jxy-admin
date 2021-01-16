import request from "@/utils/request";

let index="/jxy"
// let index="http://192.168.31.252:10209"
/**
 * 新增乡村简介
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function addVillage( params ) {
  return request.post(index+'/villageDescrible/addVillage', params )
}

/**
 * 删除乡村简介
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function delVillage( params ) {
  return request.post(index+'/villageDescrible/delVillage', params )
}

/**
 * 获取乡村简介详情
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getVillageDetails( params ) {
  return request.post(index+'/villageDescrible/getVillageById', params )
}

/**
 * 获取乡村简介列表
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getVillageList( params ) {
  return request.get(index+'/villageDescrible/getVillagePage', { params } )
}

/**
 * 修改乡村简介
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function updateVillage( params ) {
  return request.post(index+'/villageDescrible/updateVillage', params )
}
