const KEY = 'leju_admin'
const USERINFO_KEY = 'leju_admin_userInfo'

// 设置token
export function setToken (token) {
  window.localStorage.setItem(KEY, token)
}
// 获取token
export function getToken () {
  return window.localStorage.getItem(KEY)
}
// 清除tokne
export function removeToken () {
  window.localStorage.removeItem(KEY)
}
// 保存用户信息
export function saveUserInfo (userInfo) {
  let userInfoStr = JSON.stringify(userInfo)
  window.localStorage.setItem(USERINFO_KEY, userInfoStr)
}
// 获取用户信息
export function getUserInfo () {
  let userInfoStr = window.localStorage.getItem(USERINFO_KEY)
  if(userInfoStr !== '' && userInfoStr !== 'undefined') {
    return JSON.parse(userInfoStr)
  }else {
    return {}
  }
}
// 清除用户信息
export function removeUserInfo () {
  window.localStorage.removeItem(USERINFO_KEY)
}
// 清除token 及 用户信息
export function clearLoginInfo () {
  removeToken ()
  removeUserInfo ();
}

