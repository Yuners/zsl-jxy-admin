import request from "@/utils/request";

let index="/role"
/**
 * 添加目录
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function addDirectoryTree( params ) {
  return request.post(index+'/directoryTree/add', params)
}


/**
 * 修改目录
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function updateDirectoryTree( params ) {
  return request.post(index+'/directoryTree/update', params)
}



/**
 * 删除目录
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function delectDirectoryTree( params ) {
  return request.post(index+'/directoryTree/delect', params)
}

/**
 *  禁用目录
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function disabledDirectoryTree( params ) {
  return request.post(index+'/directoryTree/disabled', params)
}

/**
 * 查询当前可用目录菜单
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function selectDirectoryTree( params ) {
  return request.post(index+'/directoryTree/select/tree', params)
}
