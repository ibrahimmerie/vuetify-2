export class ApiConfig {
  public BaseUri!: string

  constructor(init?: Partial<ApiConfig>) {
    if (init) {
      Object.assign(this, init)
    }
  }
}
