import request from '@/utils/request'

// 获取景区列表
export function getScenery(params) {
  return request.get('/scenery/getSceneryPage',{ params })
}

// 增加景区
export function addScenery(params) {
  return request.post('/scenery/addScenery', params )
}
