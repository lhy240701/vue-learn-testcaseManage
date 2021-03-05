import request from '@/utils/request'
import api from '@/api/api'

export function getGroupName(groupName) {
  return request({
    url: `${api.getGroupName}/${groupName}`,
    method: 'get',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
  })
}

export function getTaskName(taskName) {
  return request({
    url: `${api.getTaskName}/${taskName}`,
    method: 'get',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
  })
}
// 创建
export function createCase(data) {
  return request({
    url: `${api.createCase}`,
    method: 'post',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    data
  })
}

// 分页查询
export function getCaseList(data) {
  return request({
    url: `${api.getCaseList}`,
    method: 'post',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    data
  })
}

// 删除测试case
export function deleteCaseById(id) {
  return request({
    url: `${api.deleteCasebyId}/${id}`,
    method: 'delete',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
  })
}

// 根据id查询测试用例详情
export function getTestCaseById(id) {
  return request({
    url: `${api.getCaseById}/${id}`,
    method: 'get',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
  })
}

// 根据id更新测试用例
export function updateCaseById(id, data) {
  return request({
    url: `${api.updateCaseById}/${id}`,
    method: 'put',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    data
  })
}

