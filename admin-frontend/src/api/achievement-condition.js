import request from '@/utils/request'

export function createAchievementCondition(data) {
  return request({
    url: '/CreateAchievementCondition',
    method: 'post',
    data
  })
}

export function listAchievementCondition(data) {
  return request({
    url: '/ListAchievementCondition',
    method: 'post',
    data
  })
}
