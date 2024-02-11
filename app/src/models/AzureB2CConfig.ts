export class AzureB2CConfig {
  public ClientId!: string
  public Authority!: string
  public PasswordResetAuthority!: string
  public ChangePasswordAuthority!: string
  public KnownAuthorities!: string
  public LoginScopes!: string[]
  public LoginExtraScopesToConsent!: string[]
  public DefaultAccessTokenScopes!: string[]
  public ACRTokenClaim!: string
  public RedirectUri!: string
  public RedirectStartPage!: string
  public LogoutRoute!: string

  constructor(init?: Partial<AzureB2CConfig>) {
    if (init) {
      Object.assign(this, init)
    }
  }
}
