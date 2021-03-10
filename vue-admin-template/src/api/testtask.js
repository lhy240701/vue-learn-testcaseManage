import request from '@/utils/request'
import api from '@/api/api'
// 创建
export function createTask(data) {
  return request({
    url: `${api.createTask}`,
    method: 'post',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    data
  })
}
// 分页查询
export function getTaskPage(data) {
  return request({
    url: `${api.getTaskList}`,
    method: 'post',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    data
  })
}
// 获取详情
export function getByTaskID(id) {
  return request({
    url: `${api.getByTaskID}/${id}`,
    method: 'get',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
  })
}
// 删除
export function deleteTask(id) {
  return request({
    url: `${api.deleteTask}/${id}`,
    method: 'delete',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
  })
}
// 更新
export function updateTask(id, data) {
  return request({
    url: `${api.updateTask}/${id}`,
    method: 'put',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    data
  })
}
// 获取所有的serviceName
export function getAllServiceName() {
  return request({
    url: `${api.getAllServiceName}`,
    method: 'get',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }

  })
}



