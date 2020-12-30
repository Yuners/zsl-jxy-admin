import request from '@/utils/request'


/**
 * 根据PCode查询字典，包括子集
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getDictionaryAllByPCode( params ) {
    
    return request.post('/dictionary/getDictionaryAllByPCode', params)
}