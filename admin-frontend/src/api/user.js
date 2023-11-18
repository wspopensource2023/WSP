import request from '@/utils/request'

export function userLogin(data) {
  return request({
    url: '/Login',
    method: 'post',
    data
  })
}
