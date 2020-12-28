import request from "@/utils/request";

/**
 * 添加目录
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function addDirectoryTree(params) {
  return request.post('/directoryTree/add', params)
}


/**
 * 修改目录
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function updateDirectoryTree(params) {
  return request.post('/directoryTree/update', params)
}

/**
 * 修改目录
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function updateDirectoryTree(params) {
  return request.post('/directoryTree/update', params)
}

/**
 * 删除目录
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function delectDirectoryTree(params) {
  return request.post('/directoryTree/update', params)
}

/**
 * 禁用目录
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function selectDirectoryTree(params) {
  return request.post('/directoryTree/select/tree', params)
}
