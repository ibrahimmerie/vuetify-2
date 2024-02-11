import { AxiosInstance } from 'axios'

export default function setup(axiosInstance: AxiosInstance): void {
  const code = 'G4A0326FCzxvmjaW4CrV8kbuxCXsxOdWZdxWi5HN/pfA0ujLgRwqkw==' //TODO move to config/get from secrets API
  const clientId = 'default'

  axiosInstance.interceptors.request.use(
    (config) => {
      config.params = { ...config.params, code, clientId }
      return config
    },
    (err: any) => {
      return Promise.reject(err)
    }
  )
}
