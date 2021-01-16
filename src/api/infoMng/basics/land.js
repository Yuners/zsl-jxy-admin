import request from "@/utils/request";
// let index = 'http://192.168.31.28:10209'
let index = '/jxy'
/**
 * 新增土地信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function addLand( params ) {
  return request.post(index+'/land/addLand', params)
}

/**
 * 删除土地信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function delLand( params ) {
  return request.post(index+'/land/delLand', params)
}

/**
 * 根据id查询土地信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getLandById( params ) {
  return request.post(index+'/land/getLandById', params)
}

/**
 * 获取土地信息分页数据
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getLandPage( params ) {
  return request.get(index+'/land/getLandPage', { params })
}

/**
 * 修改土地信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function updateLand( params ) {
  return request.post(index+'/land/updateLand', params)
}

/**
 * 是否存在该村当年信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getLandFlag( params ) {
  return request.post(index+'/land/getLandFlag', params)
}