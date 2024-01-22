import type { IResponseData } from '@/service'
import axios from 'axios'
import type {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosInstance,
  InternalAxiosRequestConfig
} from 'axios'

interface ICustomConfig<T = AxiosResponse> extends AxiosRequestConfig {
  data?: T
  Interceptors?: IIntercetor<T>
}
interface IIntercetor<T = AxiosResponse> {
  requestIntercetorsSuccess?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  requestIntercetorsError?: (err: any) => any
  responseIntercetorsSuccess?: (res: T) => T
  responseIntercetorsErrro?: (err: any) => any
}
class LAxios {
  instance: AxiosInstance
  constructor(config: ICustomConfig) {
    this.instance = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout
    })
    this.instance.interceptors.request.use(
      (config) => {
        const i18n_token = localStorage.getItem('i18n_template_userinfo')
        if (i18n_token!==null) {
          config.headers.Authorization = JSON.parse(i18n_token).token
        }
        return config
      },
      (err) => err
    )
    this.instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      config.Interceptors?.responseIntercetorsErrro
    )
  }
  request<T, R>(method: string, config: ICustomConfig<T>) {
    return new Promise<R>((resolve, reject) => {
      this.instance
        .request<any, R>({
          ...config,
          method
        })
        .then((res) => {
          resolve(res as unknown as R)
        })
        .catch((err) => reject(err))
    })
  }

  get<T = AxiosResponse, R = IResponseData>(config: ICustomConfig<T>) {
    return this.request<T, R>('GET', config)
  }
  patch<T = AxiosResponse, R = IResponseData>(config: ICustomConfig<T>) {
    return this.request<T, R>('Patch', config)
  }
  post<T = AxiosResponse, R = IResponseData>(config: ICustomConfig<T>) {
    return this.request<T, R>('post', config)
  }
  delete<T = AxiosResponse, R = IResponseData>(config: ICustomConfig<T>) {
    return this.request<T, R>('DELETE', config)
  }
}

export const oneNet = new LAxios({
  baseURL: 'http://localhost:8080',
  timeout: 100000,
  Interceptors: {}
})
