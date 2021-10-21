import { Token } from '../store/models/auth'

export function isAuth():boolean| Token {
  const token = localStorage.getItem('session')
  if (token) {
    return JSON.parse(token)
  }
  return false
}