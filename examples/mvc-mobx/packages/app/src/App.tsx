import React, { useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { AppState, TimerView } from './TimerView'

declare global {
  interface Window { mymodule: any; }
  const mymodule: any
}

export const App = () => {
  let history = useHistory()
  console.log('history', history)
  let [router, setRouter] = React.useState(<div><Link to="/main">About</Link></div>)
  useEffect(() => {
    return history.listen(async (location) => {
      console.log(`You changed the page to: ${location.pathname}`)
      if (location.pathname === '/main') {
        // const { Routes } = await import('@enterprise-ui/mvc-mobx-main')

        const lib = 'http://localhost:3000/modules/main/bundle.js'

        await import(/* webpackIgnore: true */lib)
        // console.log('mymodule', mymodule)
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
