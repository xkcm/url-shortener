import { initiateConfiguration } from "app-shared/config"
import React, { useEffect, useState } from "react"
import { Config } from "../../common"
import AppRouter from "../../components/AppRouter"
import "./App.scss"

export default function App(){

  const [appReady, setAppReady] = useState(false)

  const initApp = async () => {
    let status = true
    
    status = status && await initiateConfiguration([
      [Config.HTTP_ENDPOINT, process.env.REACT_APP_HTTP_ENDPOINT],
      [Config.APP_URL, window.location.origin],
      [Config.VERSION, "1.0.0"]
    ])

    return status
  }
  const closeApp = () => {

  }
  
  useEffect(() => {
    initApp().then((status: boolean) => setAppReady(status))
    return closeApp
  }, [])

  if (!appReady) return <span>loading</span>

  return (
    <div id="app-container">
      <AppRouter/>
    </div>
  )
}