import request from '@/api/request'

function orderList (kv) {
  return request ({
    url:'/api/leju/admin/order/list',
    method:'get',
    kv
  })
}

function orderDetail (kv) {
  return request({
    url:'/api/leju/admin/order/detail',
    method:'get',
    kv
  })
}

function uesrOrderInfo (kv) {
  return request ({
    url:'/api/leju/admin/order/orderUserInfo',
    method:'get',
    kv
  })
}

export default {
  orderList,
  orderDetail,
  uesrOrderInfo,
}