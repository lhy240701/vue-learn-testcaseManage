import request from '@/utils/request'
import api from '@/api/api'
// 创建
export function createSuite(data) {
  return request({
    url: `${api.createsuite}`,
    method: 'post',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    data
  })
}
// 分页查询
export function getList(data) {
  return request({
    url: `${api.getList}`,
    method: 'post',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    data
  })
}
// 查询
export function findsuite(data) {

}
// 删除
export function delById(id) {
  return request({
    url: `${api.delById}/${id}`,
    method: 'delete',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
  })
}

// 获取详情
export function getById(id) {
  return request({
    url: `${api.getById}/${id}`,
    method: 'get',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
  })
}
// 更新
export function updateById(id, data) {
  return request({
    url: `${api.updateById}/${id}`,
    method: 'put',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    data
  })
}
// 根据serviceName查询测试任务id和taskName
export function getTaskNameByServiceName(data) {
  return request({
    url: `${api.getTaskNameByServiceName}/${data}`,
    method: 'get',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    data
  })
}

