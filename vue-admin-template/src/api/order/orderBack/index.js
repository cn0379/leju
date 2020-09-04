import request from '@/api/request'

function orderBackList (kv) {
  return request({
    url: '/api/leju/admin/orderBack/list',
    method: 'get',
    kv
  })
}

function orderBackDetail (kv) {
  return request ({
    url: '/api/leju/admin/orderBack/detail',
    method: 'get',
    kv
  })
}

function closeOrder (kv) {
  return request ({
    url: '/api/leju/admin/orderBack/closeOrder',
    method: 'post',
    kv
  })
}

function orderBackDone (kv) {
  return request ({
    url:'/api/leju/admin/orderBack/backDone',
    method:'post',
    kv
  })
}

function agreeBackOrder (kv) {
  return request ({
    url:'/api/leju/admin/orderBack/agreeBack',
    method:'post',
    kv
  })
}

function rejectBackOrder (kv) {
  return request ({
    url: '/api/leju/admin/orderBack/rejectBack',
    method: 'post',
    kv
  })
}

export default {
  orderBackList,
  orderBackDetail,
  closeOrder,
  orderBackDone,
  agreeBackOrder,
  rejectBackOrder
}