import Cookies from 'js-cookie'
import { tokenName } from '@/config'

const TokenKey = tokenName;

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token: any) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}
