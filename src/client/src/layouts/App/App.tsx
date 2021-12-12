import React, { useEffect, useState } from "react"
import { initiateConfiguration } from "app-shared/config"
import { Home } from "../Home/Home"
import "./App.scss"
import { Config } from "../../common"

export default function App(){

  const [appReady, setAppReady] = useState(false)

  const initApp = async () => {
    let status = true
    
    status = status && await initiateConfiguration([
      [Config.HTTP_ENDPOINT, process.env.REACT_APP_HTTP_ENDPOINT],
      [Config.APP_URL, window.location.origin]
    ])

    return status
  }
  const closeApp = () => {

  }
  
  useEffect(() => {
    initApp().then((status: boolean) => setAppReady(status))
    return closeApp
  }, [])

  return (
    appReady
    ? <div id="app-container">
      <Home/>
      <div id="signature">
        by xkcm
      </div>
    </div>
    : <span>loading</span>
  )
}