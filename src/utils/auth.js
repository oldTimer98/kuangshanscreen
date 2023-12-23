const TokenKey = 'mine-Token'

export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
}

export function clearData() {
  var date = new Date()
  date.setTime(date.getTime() - 10000)
  document.cookie = 'test1=; expires=' + date.toGMTString()
  document.cookie = 'testc=; expires=' + date.toGMTString()
  document.cookie = 'newtest=; domain=.f.com;expires=' + date.toGMTString()
  return localStorage.clear()
}
