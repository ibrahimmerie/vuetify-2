import { B2CClient } from '../models/B2CClient'
import { getMsalInstance } from '../plugins/msalInstance'
import {
  AccountInfo,
  CacheLookupPolicy,
  InteractionRequiredAuthError,
  RedirectRequest,
  SilentRequest,
} from '@azure/msal-browser'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { getLocalAppsettings } from '../helpers/appSettingsHelper'

export const useAzureB2CAuthStore = defineStore('azureB2CAuth', () => {
  // State
  const _appSettings = getLocalAppsettings()
  const _msalInstance = getMsalInstance(_appSettings)
  const _activeUserClientList = ref<Array<B2CClient>>()
  const _activeUserAccount = ref<AccountInfo>(_msalInstance.getActiveAccount()!)
  const _setActiveUserClientInProgress = ref<boolean>(false)
  const _loginScopes = ref<Array<string>>(_appSettings.AzureB2C.LoginScopes)
  const _loginExtraScopesToConsent = ref<Array<string>>(_appSettings.AzureB2C.LoginExtraScopesToConsent)
  const _defaultAccessTokenScopes = ref<Array<string>>(_appSettings.AzureB2C.DefaultAccessTokenScopes)
  const _acrTokenClaim = ref<string>(_appSettings.AzureB2C.ACRTokenClaim)
  const _redirectUri = ref<string>(_appSettings.AzureB2C.RedirectUri)
  const _redirectStartPage = ref<string>(`${_redirectUri.value}${_appSettings.AzureB2C.RedirectStartPage}`)
  const _passwordResetAuthority = ref<string>(_appSettings.AzureB2C.PasswordResetAuthority)

  //Getters
  const activeUserAccount = computed(() => _activeUserAccount.value)
  const activeUserGuid = computed(() => _activeUserAccount?.value?.localAccountId)
  const activeUserRoles = computed(() => _activeUserAccount?.value?.idTokenClaims?.roles)
  const activeUserTokenClaims = computed(() => _activeUserAccount?.value?.idTokenClaims)
  const activeUserClientList = computed(() => _activeUserClientList.value)
  const setActiveUserClientInProgress = computed(() => _setActiveUserClientInProgress.value)
  const acrTokenClaim = computed(() => _acrTokenClaim.value)
  const activeUserClient = computed(() => {
    return _activeUserClientList.value?.find(
      (x) => x.clientGuid === _activeUserAccount.value.idTokenClaims!['clientId']
    )
  })

  async function setActiveUserAccount(account: AccountInfo): Promise<void> {
    _msalInstance.setActiveAccount(account)
    _activeUserAccount.value = account
  }

  async function setActiveUserClient(fsiClientId: number, clientGuid: string): Promise<void> {
    _setActiveUserClientInProgress.value = true

    const silentRequest = {
      scopes: _defaultAccessTokenScopes.value,
      account: activeUserAccount.value,
      extraQueryParameters: { selectedClient: fsiClientId.toString(), clientGuid: clientGuid },
      cacheLookupPolicy: CacheLookupPolicy.Skip, // forces network call to retrieve new token
    }

    try {
      await _msalInstance.acquireTokenSilent(silentRequest)
    } catch (error) {
      if (error instanceof InteractionRequiredAuthError) {
        await handleLogin()
      }

      return Promise.reject('failed')
    }

    _activeUserAccount.value = _msalInstance.getActiveAccount()!
    _setActiveUserClientInProgress.value = false
  }

  async function logoutActiveUser(): Promise<void> {
    await _msalInstance.logoutRedirect()
  }

  async function handlePasswordReset(): Promise<void> {
    const passwordResetRequest: RedirectRequest = {
      scopes: _loginScopes.value,
      extraScopesToConsent: _loginExtraScopesToConsent.value,
      authority: _passwordResetAuthority.value,
    }

    await _msalInstance.loginRedirect(passwordResetRequest)
  }

  async function handleLogin(): Promise<void> {
    const loginRequest: RedirectRequest = {
      scopes: _loginScopes.value,
      extraScopesToConsent: _loginExtraScopesToConsent.value,
      redirectUri: _redirectUri.value,
      redirectStartPage: _redirectStartPage.value,
    }

    await _msalInstance.loginRedirect(loginRequest)
  }

  async function fetchAccessToken(): Promise<string> {
    const silentRequest: SilentRequest = {
      scopes: _defaultAccessTokenScopes.value,
      account: _msalInstance.getActiveAccount()!,
      forceRefresh: false,
      cacheLookupPolicy: CacheLookupPolicy.Default,
    }

    try {
      const result = await _msalInstance.acquireTokenSilent(silentRequest)

      return result.accessToken || result.idToken
    } catch (error) {
      if (error instanceof InteractionRequiredAuthError) {
        await handleLogin()
      }

      return Promise.reject('Failed')
    }
  }

  return {
    _activeUserAccount,
    _activeUserClientList,
    _loginScopes,
    _loginExtraScopesToConsent,
    _defaultAccessTokenScopes,
    _setActiveUserClientInProgress,
    _redirectUri,
    _redirectStartPage,
    activeUserAccount,
    activeUserGuid,
    activeUserRoles,
    activeUserTokenClaims,
    activeUserClient,
    activeUserClientList,
    setActiveUserClientInProgress,
    acrTokenClaim,
    fetchAccessToken,
    setActiveUserClient,
    setActiveUserAccount,
    logoutActiveUser,
    handleLogin,
    handlePasswordReset,
  }
})

// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useAzureB2CAuthStore, import.meta.hot))
// }
