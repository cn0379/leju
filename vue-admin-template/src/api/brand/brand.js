import request from '@/api/request'

function brandList(kv) {
  return request({
    url: '/api/leju/admin/brand/listAll',
    method: 'get',
    kv
  })
}

function brandDetail(kv) {
  return request({
    url:'api/leju/admin/brand/detail',
    method: 'get',
    kv
  })
}

function removeBrand(kv) {
  return request({
    url:'/api/leju/admin/brand/del',
    method:'get',
    kv
  })
}

function saveOrUpdateBrand(kv) {
  return request({
    url:'/api/leju/admin/brand/saveOrUpdate',
    method:'post',
    kv
  })
}

export default {
  brandList,
  brandDetail,
  removeBrand,
  saveOrUpdateBrand
}