import request from '@/api/request'

function goodsList(kv) {
  return request({
    url: '/api/leju/admin/product/list',
    method: 'get',
    kv
  })
}

function switchCode(kv) {
  return request({
    url: '/api/leju/admin/product/switchCode',
    method: 'post',
    kv
  })
}

function goodsDetail(kv) {
  return request({
    url:'/api/leju/admin/product/detail',
    method: 'get',
    kv
  })
}

function saveOrUpdateGoods(kv) {
  return request({
    url:'/api/leju/admin/product/saveOrUpdate',
    method: 'post',
    kv
  })
}

export default {
  goodsList,
  switchCode,
  goodsDetail,
  saveOrUpdateGoods
}