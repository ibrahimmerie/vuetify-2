import { AxiosInstance } from 'axios'
import { useAzureB2CAuthStore } from '../../stores/azureB2CAuthStore'

export default async function setup(axiosInstance: AxiosInstance): Promise<void> {
  axiosInstance.interceptors.request.use(
    async (config) => {
      const azureB2CAuthStore = useAzureB2CAuthStore()
      config.headers.Authorization = `Bearer ${await azureB2CAuthStore.fetchAccessToken()}`
      return config
    },
    (err: any) => {
      return Promise.reject(err)
    }
  )
}
