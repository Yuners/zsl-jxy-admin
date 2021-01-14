import request from '@/utils/request'


/**
 * 获取订单列表
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getOrderList(params) {
  return request.get('/order/sList', { params })
}


/**
 * 删除订单数据
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function delOrder(params) {
  return request.get('/order/delOrder', params)
}

/**
 * 新增订单数据
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function addOrder(params) {
  return request.post('/order/addOrder', params)
}


/**
 * 获取订单详情数据
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getOrderDetails(oId) {
  return request.get('/order/sDetail/'+oId)
}

/**
 * 获取快递详情数据
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getOrderExpress(deliveryId) {
  return request.get('/order/express/'+deliveryId)
}

/**
 * 修改用户地址数据
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function updateAdress(params) {
  return request.post('/order/update/adress', params)
}

/**
 * 修改邮费价格
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function updateFreight(params) {
  return request.post('/order/update/freight', params)
}

/**
 * 取消订单
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function cancelOrder(params) {
  return request.post('/cancel', params)
}