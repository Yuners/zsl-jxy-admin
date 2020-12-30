import request from "@/utils/request";

/**
 * 新增基础建设信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function addInfrastructure( params ) {
  return request.post('/infrastructure/addInfrastructure', params)
}

/**
 * 删除基础建设信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function delInfrastructure( params ) {
  return request.post('/infrastructure/delInfrastructure', params)
}

/**
 * 根据id查询基础建设信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getInfrastructureById( params ) {
  return request.post('/infrastructure/getInfrastructureById', params)
}

/**
 * 获取基础建设信息分页数据
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getInfrastructurePage( params ) {
  return request.get('/infrastructure/getInfrastructurePage', { params })
}

/**
 * 修改基础建设信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function updateInfrastructure( params ) {
  return request.post('/infrastructure/updateInfrastructure', params)
}

/**
 * 是否存在该村当年信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getInfrastructureFlag( params ) {
  return request.post('/infrastructure/getInfrastructureFlag', params)
}