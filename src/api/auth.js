import request from '@/utils/request'

// let index="/oauth";
let index="http://192.124.1.57:5021/oauth";
/**
 * 用户登录
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function userLogin( params ) {
    return request.post(index+'/login/userLogin', params)
}
/**
 * 用户认证
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function userOauth( params ) {
    return request.post(index+'/login/userOauth')
}