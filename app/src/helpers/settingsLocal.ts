import { AppSettings } from '../models/AppSettings'

const settingsLocal: AppSettings = {
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
    RedirectUri: 'http://localhost:5173',
    RedirectStartPage: '',
    LogoutRoute: '/logout',
  },
  Api: {
    // BaseUri: 'http://localhost:7071/api',
    BaseUri: 'https://studentathleteapi.azurewebsites.net/api',
  },
}

export default settingsLocal
