import axios from 'axios'
import qs from 'qs'
import { MessageBox, Message } from 'element-ui'

const service = axios.create({
  timeout: 5 * 1000
})

service.interceptors.request.use(
  config => {

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
  error => {
    Message({
      message: error.message,
      type: error,
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

function $http(configOptions) {
  let config = {}
  config.url = configOptions.url
  if (configOptions.method.toLowerCase() === 'get') {
    config.method = 'get'
    config.params = configOptions.kv
  } else if (configOptions.method.toLowerCase() === 'post') {
    config.method = 'post'
    config.headers = { 'content-type': 'application/x-www-form-urlencoded' }
    config.data = qs.stringify(configOptions.kv, { allowDots: true, arrayFormat:'repeat' })
  }
  return service(config)
}

export default $http