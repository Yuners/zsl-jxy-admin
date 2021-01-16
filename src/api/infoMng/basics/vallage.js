import request from "@/utils/request";
// let index = 'http://192.168.31.28:10209'
let index = '/jxy'
/**
 * 新增乡村信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function addVillage( params ) {
  return request.post(index+'/village/addVillage', params)
}

/**
 * 删除乡村信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function delVillage( params ) {
  return request.post(index+'/village/delVillage', params)
}

/**
 * 根据id查询乡村信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getVillageById( params ) {
  return request.post(index+'/village/getVillageById', params)
}

/**
 * 获取乡村信息分页数据
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getVillagePage( params ) {
  return request.get(index+'/village/getVillagePage', { params })
}

/**
 * 修改乡村信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function updateVillage( params ) {
  return request.post(index+'/village/updateVillage', params)
}

/**
 * 是否存在该村当年信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getVillageFlag( params ) {
  return request.post(index+'/village/getVillageFlag', params)
}