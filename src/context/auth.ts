import { createDomain } from 'effector'

const auth = createDomain()

export const setAuth = auth.createEvent<boolean>()
export const setUsername = auth.createEvent<string>()

export const $auth = auth.createStore(false).on(setAuth, (_, value) => value)
export const $username = auth.createStore('').on(setUsername, (_, value) => value)
