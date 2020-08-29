import request from '@/api/request'

function articleList(kv) {
  return request({
    url:'/api/leju/admin/article/list',
    method:'get',
    kv
  })
}

function articleDetail(kv) {
  return request({
    url: '/api/leju/admin/article/detail',
    method:'get',
    kv
  })
}

function saveOrUpdateArticle(kv){
  return request({
    url:'/api/leju/admin/article/saveOrUpdate',
    method:'post',
    kv
  })
}

function removeArticle(kv) {
  return request({
    url: '/api/leju/admin/article/del',
    method: 'get',
    kv
  })
}


export default {
  articleList,
  articleDetail,
  saveOrUpdateArticle,
  removeArticle
}