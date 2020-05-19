import React, { useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { AppState, TimerView } from './TimerView'

export const App = () => {
  let history = useHistory()
  console.log('history', history)
  let [router, setRouter] = React.useState(<div><Link to="/main">About</Link></div>)
  useEffect(() => {
    return history.listen(async (location) => {
      console.log(`You changed the page to: ${location.pathname}`)
      if (location.pathname === '/main') {
        const { Routes } = await import('@enterprise-ui/mvc-mobx-main')
        setRouter(<Routes />)
      }
    })
  }, [history])

  const appState = new AppState()

  return (
    <div>
      {router}
      <TimerView appState={appState} />
    </div>
  )
}
