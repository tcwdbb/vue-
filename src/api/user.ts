import request from './request'

export function apiGetUserInfo(id: number | string) {
  return request({
    url: 'api/userinfo',
    params: {
      id
    },
    // 是否取消重复请求
    repeat_request_cancel: true,
    // 是否展示loading提示
    loading: false
  })
}

export function apiLogin(username: string, password: string) {
  return request({
    url: 'api/login',
    method: 'post',
    data: {
      username,
      password
    },
    repeat_request_cancel: true,
    loading: true
  })
}
