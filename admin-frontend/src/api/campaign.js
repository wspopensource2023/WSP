import request from '@/utils/request'

export function createCampaign(data) {
  return request({
    url: '/CreateCampaign',
    method: 'post',
    data
  })
}

export function listCampaign(data) {
  return request({
    url: '/ListCampaign',
    method: 'post',
    data
  })
}
