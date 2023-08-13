import { createEffect } from 'effector'
import { IBaseEffectArgs, ICreateCost, IRefreshToken } from '../types'
import api from './axiosClient'
import { toastHelper } from '../utils/toastHelper'
import { removeUser } from '../utils/auth'
import { handleAxiosError } from '../utils/errors'

export const createCostsFx = createEffect(async ({ url, cost, token }: ICreateCost) => {
  try {
    const { data } = await api.post(
      url,
      { ...cost },
      { headers: { Authorization: `Bearer ${token}` } },
    )
    return data
  } catch (error) {
    toastHelper('error', `${error}`)
  }
})

export const getCostsFx = createEffect(async ({ url, token }: IBaseEffectArgs) => {
  try {
    const { data } = await api.get(url, { headers: { Authorization: `Bearer ${token}` } })
    return data
  } catch (error) {
    handleAxiosError(error, { type: 'get' })
    toastHelper('error', `${error}`)
  }
})

export const refreshTokenFx = createEffect(async ({ url, token, username }: IRefreshToken) => {
  try {
    const result = await api.post(url, { refresh_token: token, username })
    if (result.status === 200) {
      localStorage.setItem(
        'auth',
        JSON.stringify({
          ...result.data,
          username,
        }),
      )
      return result.data.access_token
    } else {
      removeUser()
    }
  } catch (error) {
    console.log(error)
  }
})
