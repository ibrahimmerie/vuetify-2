import { AppSettings } from '../models/AppSettings'

const settings: AppSettings = {
  AzureB2C: {
    ClientId: '143a4a62-fdde-4383-ae6b-2920e5a14e40',
    Authority: 'https://studentathleteco.b2clogin.com/studentathleteco.onmicrosoft.com/B2C_1_sign-up-sign-in/',
    PasswordResetAuthority:
      'https://studentathleteco.b2clogin.com/studentathleteco.onmicrosoft.com/B2C_1_PasswordReset/',
    ChangePasswordAuthority: '',
    KnownAuthorities: 'studentathleteco.b2clogin.com',
    LoginScopes: ['openid', 'profile', 'offline_access'],
    LoginExtraScopesToConsent: [],
    DefaultAccessTokenScopes: [],
    ACRTokenClaim: '',
    RedirectUri: 'https://mango-tree-0b32d450f.3.azurestaticapps.net',
    RedirectStartPage: '',
    LogoutRoute: '/logout',
  },
  Api: {
    BaseUri: 'https://studentathleteapi.azurewebsites.net/api',
  },
}

export default settings
