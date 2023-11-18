import request from '@/utils/request'

export function createBadge(data) {
  return request({
    url: '/CreateAchievement',
    method: 'post',
    data
  })
}

export function listBadge(data) {
  return request({
    url: '/ListAchievement',
    method: 'post',
    data
  })
}

export function uploadImage(file, filename) {
  const formData = new FormData()
  formData.append('form', file)
  formData.append('filename', filename)
  return request({
    url: '/UploadImage',
    method: 'post',
    data: formData
  })
}

export function updateAchievement(data) {
  return request({
    url: '/UpdateAchievement',
    method: 'post',
    data
  })
}
