import request from '@/api/request'

function customerList (kv) {
  return request ({
    url:'/api/leju/admin/client/userList',
    method: 'get',
    kv
  })
}

function customerDetail (kv) {
  return request ({
    url:'/api/leju/admin/client/userDetail',
    method: 'get',
    kv
  })
}

export default {
  customerList,
  customerDetail
}