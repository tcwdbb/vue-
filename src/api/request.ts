import axios from 'axios'
import { tansParams } from '@/utils/utils'
import { getToken } from '@/utils/auth'
import { Toast } from 'vant'
import {
  addPending,
  removePending,
  httpErrorStatusHandle
} from '../utils/requestUtils'

// 计数开启请求遮罩层api数量
let _count = 0

/**
 * 关闭Loading层
 * @param {*} _options
 */
function closeLoading(config: any) {
  if (config.loading && _count > 0) _count--
  if (_count === 0) {
    Toast.clear()
    // PhLoading.hide();
  }
}

// 创建axios实例
const request = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  // baseURL: process.env.VUE_APP_BASE_API,
  baseURL: import.meta.env.VITE_APP_BASE_API as string,
  // 超时
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  repeat_request_cancel: true, // 是否开启取消重复请求, 默认为 true
  loading: true // 是否开启loading层效果, 默认为false
})

// request拦截器
request.interceptors.request.use(
  (config) => {
    // 是否需要设置 token
    const isToken = (config.headers || {}).isToken === false
    if (getToken() && !isToken) {
      config.headers!['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    // get请求映射params参数
    if (config.method === 'get' && config.params) {
      let url = config.url + '?' + tansParams(config.params)
      url = url.slice(0, -1)
      config.params = {}
      config.url = url
    }
    // 移除重复请求
    removePending(config)
    // 添加请求
    config.repeat_request_cancel && addPending(config)
    if (config.loading) {
      _count++
      if (_count === 1) {
        Toast.loading({
          duration: 0,
          forbidClick: true,
          message: '加载中...'
        })
      }
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 请求完成移除该请求
    removePending(response.config)
    // 关闭loading
    response.config.loading && closeLoading(response.config)
    // 二进制数据则直接返回
    if (
      response.request.responseType === 'blob' ||
      response.request.responseType === 'arraybuffer'
    ) {
      return response.data
    }
    return response.data
  },
  (error) => {
    error.config && removePending(error.config)
    // 关闭loading
    error.config.loading && closeLoading(error.config)
    httpErrorStatusHandle(error)
    return Promise.reject(error)
  }
)

export default request
