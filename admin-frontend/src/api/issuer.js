import request from '@/utils/request'

export function createIssuer(data) {
  return request({
    url: '/CreateIssuer',
    method: 'post',
    data
  })
}

export function listIssuer(data) {
  return request({
    url: '/ListIssuer',
    method: 'post',
    data
  })
}
