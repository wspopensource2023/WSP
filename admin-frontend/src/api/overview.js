import request from '@/utils/request'

export function profileList(data) {
  return request({
    url: '/GetBackendOverview',
    method: 'post',
    data
  })
}

export function black(data) {
  return request({
    url: '/block',
    method: 'post',
    data
  })
}

export function white(data) {
  return request({
    url: '/remove',
    method: 'post',
    data
  })
}

export function getUser(data) {
  return request({
    url: '/GetUser',
    method: 'post',
    data
  })
}

export function account() {
  return request({
    url: '/Me',
    method: 'post'
  })
}
