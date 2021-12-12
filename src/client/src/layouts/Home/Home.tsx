import { LinkInfo } from "app-shared/typings"
import React, { CSSProperties, useState } from "react"
import Icon from "../../components/Icon/Icon"
import Input from "../../components/Input/Input"
import LinkInfoResult from "../../components/LinkInfoResult/LinkInfoResult"
import Wrapper from "../../components/Wrapper/Wrapper"
import { fetchHash } from "../../services/Links.service"

import "./Home.scss"

export function Home(){

  const [overlayVisible, setOverlayVisible] = useState(false)
  const [linkInfo, setLinkInfo] = useState<LinkInfo>()

  const getHash = async (url: string) => {
    setOverlayVisible(true)

    const hash = await fetchHash(url)
    setLinkInfo(hash)
    
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
          { linkInfo === undefined ?
            <Input placeholder="Your link goes here" onSubmit={getHash} buttonContent={<Icon size={36}>chevron_right</Icon>}></Input> :
            <LinkInfoResult linkInfo={linkInfo}/>
          }
        </Wrapper.Overlay>
      </div>
    </div>
  )
}