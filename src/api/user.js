import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/declare/api/login',
    method: 'post',
    data
  })
}

export function saveApi(data) {
  return request({
    url: '/declare/api/uploadIds',
    method: 'post',
    data
  })
}

export function dataApi(data) {
  return request({
    url: '/declare/api/myInfo',
    method: 'get'
  })
}

export function validateCodelogin(data) {
  return request({
    url: '/declare/api/validateCodelogin',
    method: 'post',
    data
  })
}

export function validateSecretKeylogin(data) {
  return request({
    url: '/declare/api/validateSecretKeylogin',
    method: 'post',
    data
  })
}
