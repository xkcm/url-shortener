import { initiateConfiguration } from "app-shared/config"
import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Config } from "../../common"
import HashRedirect from "../HashRedirect/HashRedirect"
import { Home } from "../Home/Home"
import "./App.scss"

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
    appReady ?
    <div id="app-container">
      <Router>
        <Routes>
          <Route index element={<Home/>} />
          <Route path=":hash" element={<HashRedirect/>} />
        </Routes>
      </Router>
      <div id="signature">
        by xkcm
      </div>
    </div>
    : <span>loading</span>
  )
}