import request from "@/utils/request";

/**
 * 新增经济管理信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function addEconomics( params ) {
  return request.post('/economics/addEconomics', params)
}

/**
 * 删除经济管理信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function delEconomics( params ) {
  return request.post('/economics/delEconomics', params)
}

/**
 * 根据id查询经济管理信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getEconomicsById( params ) {
  return request.post('/economics/getEconomicsById', params)
}

/**
 * 获取经济管理信息分页数据
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getEconomicsPage( params ) {
  return request.get('/economics/getEconomicsPage', { params })
}

/**
 * 修改经济管理信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function updateEconomics( params ) {
  return request.post('/economics/updateEconomics', params)
}

/**
 * 是否存在该村当年信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getEconomicsFlag( params ) {
  return request.post('/economics/getEconomicsFlag', params)
}