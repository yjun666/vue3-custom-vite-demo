import {http} from '@/service'
import { encryptedData } from '@/utils/encrypt'
import { loginRsa, tokenName } from '@/config'

export async function login(data) {
  if (loginRsa) {
    data = await encryptedData(data)
  }
  return http.request({
    url: '/login',
    method: 'post',
    data,
  })
}

export function getUserInfo(value) {
  return http.request({
    url: '/userInfo',
    method: 'post',
    data: {
      [tokenName]: value,
    },
  })
}

export function logout() {
  return http.request({
    url: '/logout',
    method: 'post',
  })
}

export function register() {
  return http.request({
    url: '/register',
    method: 'post',
  })
}
