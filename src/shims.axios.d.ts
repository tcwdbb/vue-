import { AxiosRequestConfig } from 'axios'

declare module 'axios' {

  export interface AxiosRequestConfig {
    loading?: boolean,
    repeat_request_cancel?: boolean
  }
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>
  }
} 