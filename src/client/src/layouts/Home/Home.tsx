import React, { CSSProperties, useState } from "react"
import Icon from "../../components/Icon/Icon"
import Input from "../../components/Input/Input"
import Wrapper from "../../components/Wrapper/Wrapper"
import { generateHash } from "../../services/Links.service"

import "./Home.scss"

export function Home(){

  const [overlayVisible, setOverlayVisible] = useState(false)
  const [hash, setHash] = useState<string>()

  const displayContent = async (url: string) => {
    setOverlayVisible(true)

    const hash = await generateHash(url)
    
    setOverlayVisible(false)
  }

  const overlayStyle: CSSProperties = {
    backgroundColor: "#0e242a"
  }

  return (
    <div id="home-container">
      <div id="center-content">
        <div id="home-header">
          <h2>url-shortener</h2>
          <p>URL shortening service using cryptographic functions</p>
        </div>
        <Wrapper.Overlay overlayVisible={overlayVisible} overlayStyle={overlayStyle} style={{ borderRadius: '3px', overflow: 'hidden' }}>
          <Input placeholder="Your link goes here" onSubmit={displayContent} buttonContent={<Icon size={36}>chevron_right</Icon>}></Input>
        </Wrapper.Overlay>
      </div>
    </div>
  )
}