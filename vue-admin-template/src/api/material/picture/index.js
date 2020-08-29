import request from '@/api/request'

function pictureList (kv) {
  return request({
    url:'/api/leju/admin/material/list',
    method: 'get',
    kv
  })
}

function removePicture(kv) {
  return request ({
    url:'/api/leju/admin/material/del',
    method:'get',
    kv
  })
}

export default {
  pictureList,
  removePicture
}