import request from '@/api/request'

function doLogin (kv) {
  return request({
    url:'/api/leju/front/user/doLogin',
    method:'post',
    kv
  })
}

function doLogOut (kv) {
  return request ({
    url: '/api/leju/front/user/doLogout',
    method: 'get',
    kv
  })
}

export default {
  doLogin,
  doLogOut
}