import { getLocalAppsettings } from '../helpers/appSettingsHelper'
import { useAzureB2CAuthStore } from '../stores/azureB2CAuthStore'
import { EventMessage, EventType, AuthenticationResult } from '@azure/msal-browser'
import { getMsalInstance } from './msalInstance'

export const msalPlugin = {
  install: async () => {
    const azureB2CAuthStore = useAzureB2CAuthStore()
    const appSettings = getLocalAppsettings()
    const msalInstance = getMsalInstance(appSettings)

    msalInstance
      .handleRedirectPromise()
      .then(async (authResult: AuthenticationResult | null) => {
        if (!authResult) {
          if (!azureB2CAuthStore.activeUserAccount) {
            await azureB2CAuthStore.handleLogin()
          }
        }
      })
      .catch((e: any) => {
        console.error(e)
      })

    msalInstance.addEventCallback(async (event: EventMessage) => {
      switch (event.eventType) {
        case EventType.LOGIN_SUCCESS:
        case EventType.ACQUIRE_TOKEN_SUCCESS:
          console.log('Sign in successful at: ' + new Date(event.timestamp))

          if (event.payload) {
            const payload = event.payload as any
            await azureB2CAuthStore.setActiveUserAccount(payload.account)

            // if (azureB2CAuthStore.acrTokenClaim !== payload.idTokenClaims['acr']) {
            //   console.error('Invalid acr token claim')
            //   await azureB2CAuthStore.logoutActiveUser()
            //   break
            // }
          }
          break
        case EventType.ACQUIRE_TOKEN_FAILURE:
          console.error('Failed to acquire token, logging out')
          await azureB2CAuthStore.logoutActiveUser()
          break
        case EventType.LOGIN_FAILURE:
          if (event && event.error!.message.indexOf('AADB2C90118') > -1) {
            //AADB2C90118 error code denotes a password reset request
            await azureB2CAuthStore.handlePasswordReset()
          } else {
            await azureB2CAuthStore.handleLogin()
          }
      }
    })

    azureB2CAuthStore.fetchAccessToken()
  },
}
