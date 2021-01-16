import request from "@/utils/request";
// let index = 'http://192.168.31.28:10209'
let index = '/jxy'
/**
 * 新增经济管理信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function addEconomics( params ) {
  return request.post(index+'/economics/addEconomics', params)
}

/**
 * 删除经济管理信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function delEconomics( params ) {
  return request.post(index+'/economics/delEconomics', params)
}

/**
 * 根据id查询经济管理信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getEconomicsById( params ) {
  return request.post(index+'/economics/getEconomicsById', params)
}

/**
 * 获取经济管理信息分页数据
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getEconomicsPage( params ) {
  return request.get(index+'/economics/getEconomicsPage', { params })
}

/**
 * 修改经济管理信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function updateEconomics( params ) {
  return request.post(index+'/economics/updateEconomics', params)
}

/**
 * 是否存在该村当年信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getEconomicsFlag( params ) {
  return request.post(index+'/economics/getEconomicsFlag', params)
}