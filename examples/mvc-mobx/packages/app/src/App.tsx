import React from 'react'
import { useHistory, Link } from 'react-router-dom'
import { AppState, TimerView } from './TimerView'

declare global {
  interface Window { mymodule: any; }
  const mymodule: any
}

// window.React = React

export const App = () => {
  let history = useHistory()
  console.log('history', history)
  let [router, setRouter] = React.useState(<div><Link to="/main">About</Link></div>)
  React.useEffect(() => {
    return history.listen(async (location) => {
      console.log(`You changed the page to: ${location.pathname}`)
      if (location.pathname === '/main') {
        const lib = '/modules/main/bundle.js'
        await import(/* webpackIgnore: true */lib)
        const { Routes } = mymodule
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
