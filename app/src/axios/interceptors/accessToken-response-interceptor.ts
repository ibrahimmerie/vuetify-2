import { AxiosInstance } from 'axios'
import { useAzureB2CAuthStore } from '../../stores/azureB2CAuthStore'

export default async function setup(axiosInstance: AxiosInstance): Promise<void> {
  axiosInstance.interceptors.response.use(
    (response) => {
      const azureB2CAuthStore = useAzureB2CAuthStore()
      if (response.status === 401) {
        azureB2CAuthStore.logoutActiveUser()
      }
      return response
    },
    (err: any) => {
      return Promise.reject(err)
    }
  )
}
