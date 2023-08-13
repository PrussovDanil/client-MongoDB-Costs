import React, { useEffect, useRef, useState } from 'react'
import { Header } from './Header/Header'
import { Spinner } from '../Spinner/Spinner'
import { getAuthDataLS } from '../../utils/auth'
import { getCostsFx } from '../../api/costsClient'
import { $costs, setCost } from '../../context'
import { useStore } from 'effector-react'

export const CostsPage = () => {
  const [spinner, setSpinner] = useState(false)
  const store = useStore($costs)
  const shouldLoadCosts = useRef(true)
  useEffect(() => {
    if (shouldLoadCosts.current) {
      shouldLoadCosts.current = false
      handleGetCosts()
      console.log(store)
    }
  }, [])

  const handleGetCosts = async () => {
    setSpinner(true)
    const authData = getAuthDataLS()
    const costs = await getCostsFx({
      url: '/cost',
      token: authData.access_token,
    })

    setSpinner(false)
    setCost(costs)
  }
  return (
    <div className='container'>
      <h1 style={{ textAlign: 'center', marginBottom: 30 }}>Keeping track of my expenses</h1>
      <Header costs={[]} />
      {spinner && <Spinner top={10} left={10} />}
    </div>
  )
}
