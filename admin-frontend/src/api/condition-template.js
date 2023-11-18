import request from '@/utils/request'

export function createConditionTemplate(data) {
  return request({
    url: '/CreateConditionTemplate',
    method: 'post',
    data
  })
}

export function listConditionTemplate(data) {
  return request({
    url: '/ListConditionTemplate',
    method: 'post',
    data
  })
}
