import React from 'react'
import { useHistory, Link } from 'react-router-dom'
import { AppState, TimerView } from './TimerView'
import * as _modulesConfig from './config.js'

declare global {
  interface Window {
    main: any;
  }
  const main: any
}

const modulesConfig: {
  [key: string]: {
    module: string
    moduleName: string
  }
} = _modulesConfig

export const App = () => {
  let history = useHistory()
  console.log('history', history)
  let [router, setRouter] = React.useState(<div><Link to="/main">About</Link></div>)
  React.useEffect(() => {
    return history.listen(async (location) => {
      console.log(`You changed the page to: ${location.pathname}`)
      if (modulesConfig[location.pathname]) {
        const moduleConfig = modulesConfig[location.pathname]
        const module = '/static' + location.pathname + '/bundle.js'
        await import(/* webpackIgnore: true */ module)
        const { Routes } = (window as any)[moduleConfig.moduleName]
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
