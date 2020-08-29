import request from '@/api/request'

function dashboardInfo(kv) {
  return request({
    url:'/api/leju/admin/dashboard/baseInfo',
    method:'get',
    kv 
  })
}

export default {
  dashboardInfo,
}
