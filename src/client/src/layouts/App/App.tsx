import React, { useEffect, useState } from "react"
import { initiateConfiguration } from "../../config"
import { Home } from "../Home/Home"
import "./App.scss"

export default function App(){

  const [appReady, setAppReady] = useState(false)

  const initApp = async () => {
    let status = true

    status = status && await initiateConfiguration()

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
    : <span>to chuj</span>
  )
}