import request from '@/utils/request'

let index="http://192.124.1.57:5021/jxy"
/**
 * 根据PCode查询字典，包括子集
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getDictionaryAllByPCode( params ) {
    
    return request.post(index+'/dictionary/getDictionaryAllByPCode', params)
}