import { AzureB2CConfig } from './AzureB2CConfig'
import { ApiConfig } from './ApiConfig'

export class AppSettings {
  public AzureB2C: AzureB2CConfig = new AzureB2CConfig()
  public Api: ApiConfig = new ApiConfig()

  public constructor(init?: Partial<AppSettings>) {
    if (init) {
      Object.assign(this, init)

      this.AzureB2C = new AzureB2CConfig(init.AzureB2C)
      this.Api = new ApiConfig(init.Api)
    }
  }
}
