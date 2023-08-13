import { createDomain } from 'effector'
import { ICosts } from '../types'

const costs = createDomain()

export const setCost = costs.createEvent<ICosts[]>()
export const createCost = costs.createEvent<ICosts>()
export const updateCost = costs.createEvent<ICosts>()
export const removeCost = costs.createEvent<string | number>()
export const setTotalPrice = costs.createEvent<number>()

export const $costs = costs
  .createStore<ICosts[]>([])
  .on(setCost, (_, value) => value)
  .on(createCost, (state, value) => [...state, value])

export const $totalPrice = costs.createStore<number>(0).on(setTotalPrice, (_, value) => value)
