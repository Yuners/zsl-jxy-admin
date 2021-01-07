import request from "@/utils/request"
/**
 * 发送短信验证码
 * @param {} params 
 */
export function getSmsCode (params){
    return request.post('http://192.124.1.57:5021/base/sms/code',params);
}