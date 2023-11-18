import request from '@/utils/request'

export function feedBackList(data) {
  return request({
    url: '/list-feedback',
    method: 'post',
    data
  })
}

export function handleFeedback(data) {
  return request({
    url: '/handle-feedback',
    method: 'post',
    data
  })
}
