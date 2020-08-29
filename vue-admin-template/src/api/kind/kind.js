import request from '@/api/request'

function kindList(kv) {
  return request({
    url:'/api/leju/admin/kind/list',
    method:'get',
    kv
  })
}

export default {
  kindList,
}