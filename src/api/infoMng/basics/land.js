import request from "@/utils/request";

/**
 * 新增土地信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function addLand( params ) {
  return request.post('/land/addLand', params)
}

/**
 * 删除土地信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function delLand( params ) {
  return request.post('/land/delLand', params)
}

/**
 * 根据id查询土地信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getLandById( params ) {
  return request.post('/land/getLandById', params)
}

/**
 * 获取土地信息分页数据
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getLandPage( params ) {
  return request.get('/land/getLandPage', { params })
}

/**
 * 修改土地信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function updateLand( params ) {
  return request.post('/land/updateLand', params)
}

/**
 * 是否存在该村当年信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getLandFlag( params ) {
  return request.post('/land/getLandFlag', params)
}