import request from '@/utils/request'
import api from '@/api/api'

// 查询redis数据
export function getRedisByKey(env, key) {
  return request({
    url: `${api.getRedisByKey}/env=${env}&key=${key}`,
    method: 'get',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
  })
}
