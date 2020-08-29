import request from '@/api/request'

function bannerList(kv) {
  return request({
    url:'/api/leju/admin/home/banners',
    method:'get',
    kv
  })
}

export default {
  bannerList
}
