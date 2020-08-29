import request from '@/api/request'

function skuList(kv) {
  return request({
    url: '/api/leju/admin/productSku/skuList',
    method:'get',
    kv
  })
}

function saveOrUpdateSku(kv) {
  return request({
    url:'/api/leju/admin/productSku/saveOrUpdate',
    method: 'post',
    kv
  })
}

function removeSku(kv) {
  return request({
    url:'/api/leju/admin/productSku/del',
    method:'get',
    kv
  })
}

export default {
  skuList,
  saveOrUpdateSku,
  removeSku
}