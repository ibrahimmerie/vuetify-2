import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

export default class AxiosBase {
  protected axiosInstance: AxiosInstance
  protected axiosConfig: AxiosRequestConfig
  protected type: string

  constructor(interceptors: Array<any>, baseUrl: string, type = '') {
    this.type = type
    this.axiosConfig = {
      baseURL: baseUrl,
      params: {
        code: 'mykeydawg',
      },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }

    this.axiosInstance = axios.create(this.axiosConfig)

    if (interceptors) {
      for (const interceptor of interceptors) {
        interceptor(this.axiosInstance)
      }
    }
  }

  protected throwOnErrorResponse(response: AxiosResponse): void {
    if (response && response.status !== 200) {
      throw new Error('Failed')
    }
  }

  protected async Fetch<T>(url: string): Promise<T> {
    const response = await this.axiosInstance.get<T>(url)
    this.throwOnErrorResponse(response)
    return response.data as T
  }

  protected async Delete<T>(url: string, returnBoolean = true): Promise<T | boolean> {
    let response: any
    try {
      response = await this.axiosInstance.delete<T>(url)
    } catch (error: any) {
      response = error.response
    }
    this.throwOnErrorResponse(response)
    if (returnBoolean) {
      // Response data contain status code
      return response.status.toString().startsWith('2')
    }
    return response.data as T
  }

  protected async Post<T>(url: string, data: any, returnBoolean = true): Promise<T | boolean> {
    let response: any
    try {
      response = await this.axiosInstance.post(url, data)
    } catch (error: any) {
      response = error.response
    }
    this.throwOnErrorResponse(response)
    if (returnBoolean) {
      // Response data contain status code
      return response.status.toString().startsWith('2')
    }
    return response.data as T
  }

  protected async Put<T>(url: string, data: any, returnBoolean = true): Promise<T | boolean> {
    let response: any
    try {
      response = await this.axiosInstance.put(url, data)
    } catch (error: any) {
      response = error.response
    }
    this.throwOnErrorResponse(response)
    if (returnBoolean) {
      // Response data contain status code
      return response.status.toString().startsWith('2')
    }
    return response.data as T
  }
}
