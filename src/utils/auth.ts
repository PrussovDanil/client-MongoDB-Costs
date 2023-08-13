import { setCost } from '../context'
import { setAuth, setUsername } from '../context/auth'
import { toastHelper } from './toastHelper'

export const removeUser = () => {
  localStorage.removeItem('auth')
  setAuth(false)
  setUsername('')
  setCost([])
}

export const getAuthDataLS = () => {
  try {
    const lSData = JSON.parse(localStorage.getItem('auth') as string)
    if (!lSData) {
      removeUser()
      return
    }
    return lSData
  } catch (error) {
    removeUser()
    toastHelper('error', 'Problem with token ')
  }
}
