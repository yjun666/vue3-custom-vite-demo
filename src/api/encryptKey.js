import { http } from '@/service'

export function getPublicKey() {
  return http.request({
    url: '/publicKey',
    method: 'post',
  })
}
export function getPrivateKey() {
  return http.request({
    url: '/privateKey',
    method: 'post',
  })
}
