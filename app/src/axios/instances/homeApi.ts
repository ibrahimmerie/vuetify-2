import { getLocalAppsettings } from '../../helpers/appSettingsHelper'
import AccessTokenRequestInterceptor from '../interceptors/accessToken-request-interceptor'
import AccessTokenResponseInterceptor from '../interceptors/accessToken-response-interceptor'
import AxiosBase from './axiosBase'

export default class HomeApi extends AxiosBase {
  constructor(interceptors: Array<any>) {
    const baseUrl = getLocalAppsettings().Api.BaseUri
    super(interceptors, baseUrl)
  }

  public async getMessage(): Promise<string> {
    const response = await this.axiosInstance.get<string>('/message')
    this.throwOnErrorResponse(response)
    return response.data
  }

  public async getDate(): Promise<string> {
    const response = await this.axiosInstance.get<string>('/time')
    this.throwOnErrorResponse(response)
    return response.data
  }
}

export const homeApi = new HomeApi([AccessTokenRequestInterceptor, AccessTokenResponseInterceptor])
