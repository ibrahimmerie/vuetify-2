import { AppSettings } from '../models/AppSettings'
import settings from './settings'
import settingsLocal from './settingsLocal'

const STORAGE_APP_SETTINGS_KEY = 'appSettings'

function setLocalAppsettings(response: any) {
  const _appSettings = new AppSettings(response)
  localStorage.setItem(STORAGE_APP_SETTINGS_KEY, JSON.stringify(_appSettings))
  return _appSettings
}

export function fetchAndTransferAppsettings(): AppSettings {
  if (process.env.NODE_ENV === 'development') {
    console.log('Local settings enabled')
    return setLocalAppsettings(settingsLocal)
  } else {
    console.log('Default settings enabled')
    return setLocalAppsettings(settings)
  }
}

export function getLocalAppsettings(): AppSettings {
  const localSettings = localStorage.getItem(STORAGE_APP_SETTINGS_KEY)
  return new AppSettings(JSON.parse(localSettings!))
}
