import request from '@/utils/request'
let index = 'http://192.168.31.28:10211'

/**
 * 获取订单列表
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getOrderList(params) {
  return request.get(index+'/order/sList', { params })
}


/**
 * 删除订单数据
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function delOrder(params) {
  return request.get(index+'/order/delOrder', params)
}

/**
 * 新增订单数据
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function addOrder(params) {
  return request.post(index+'/order/addOrder', params)
}


/**
 * 获取订单详情数据
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getOrderDetails(oId) {
  return request.get(index+'/order/sDetail/'+oId)
}

/**
 * 获取快递详情数据
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getOrderExpress(deliveryId) {
  return request.get(index+'/order/express/'+deliveryId)
}

/**
 * 修改用户地址数据
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function updateAdress(params) {
  return request.post(index+'/order/update/adress', params)
}

/**
 * 修改邮费价格
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function updateFreight(params) {
  return request.post(index+'/order/update/freight', params)
}

/**
 * 商家快递信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function addDeliveryId(params) {
  return request.post(index+'/order/addDeliveryId', params)
}

/**
 * 取消订单
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function cancelOrder(params) {
  return request.post(index+'/order/cancel', params)
}