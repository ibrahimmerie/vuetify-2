import { AppSettings } from '../models/AppSettings'
import { LogLevel, PublicClientApplication } from '@azure/msal-browser'

export function getMsalInstance(appSettings: AppSettings): PublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: appSettings.AzureB2C.ClientId,
      authority: appSettings.AzureB2C.Authority,
      knownAuthorities: appSettings.AzureB2C.KnownAuthorities.split(','),
      redirectUri: appSettings.AzureB2C.RedirectUri,
    },
    cache: {
      cacheLocation: 'localStorage',
    },
    system: {
      loggerOptions: {
        loggerCallback: (level: LogLevel, message: string, containsPii: boolean) => {
          if (containsPii) {
            return
          }
          switch (level) {
            case LogLevel.Error:
              console.error(message)
              return
            case LogLevel.Info:
              console.info(message)
              return
            case LogLevel.Verbose:
              console.debug(message)
              return
            case LogLevel.Warning:
              console.warn(message)
              return
            default:
              return
          }
        },
        logLevel: LogLevel.Error,
      },
    },
  })
}
