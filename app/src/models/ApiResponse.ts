export interface ApiResponse {
  data?: object | []
  errorMessage?: string
  status?: number
  success: boolean
}
