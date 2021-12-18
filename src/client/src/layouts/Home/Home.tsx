import { LinkInfo } from "app-shared/typings"
import React, { CSSProperties, useState } from "react"
import CornerInfo from "../../components/CornerInfo/CornerInfo"
import Icon from "../../components/Icon/Icon"
import Input from "../../components/Input/Input"
import LinkInfoResult from "../../components/LinkInfoResult/LinkInfoResult"
import Tooltip from "../../components/Tooltip/Tooltip"
import Wrapper from "../../components/Wrapper/Wrapper"
import { fetchHash } from "../../services/Links.service"
import "./Home.scss"

const standarizeUrl = (url: string) => {
  try {
    return new URL(url).href
  } catch (e) {
    return null
  }
}

export function Home(){

  const [overlayVisible, setOverlayVisible] = useState(false)
  const [linkInfo, setLinkInfo] = useState<LinkInfo>()
  const [tooltipVisible, setTooltipVisible] = useState(false)

  const getHash = async (url: string) => {
    setOverlayVisible(true)

    let newUrl = standarizeUrl(url)

    if (!newUrl) {
      setTooltipVisible(true)
    }
    else {
      const hash = await fetchHash(newUrl)
      setLinkInfo(hash)
    }
    
    setOverlayVisible(false)
  }

  const overlayStyle: CSSProperties = {
    backgroundColor: "#0e242a",
    borderRadius: '3px',
    overflow: 'hidden'
  }

  return (
    <>
      <CornerInfo/>
      <div id="home-container">
        <div id="center-content">
          <div id="home-header">
            <h2>url-shortener</h2>
            <p>URL shortening service using cryptographic functions</p>
          </div>
            { linkInfo === undefined ?
              <Wrapper.Overlay overlayVisible={overlayVisible} overlayStyle={overlayStyle}>
                <Tooltip position="left" text="URL is invalid" visible={tooltipVisible} dense>
                  <Input placeholder="Your link goes here" onFocus={() => setTooltipVisible(false)} onSubmit={getHash} buttonContent={<Icon size={36}>chevron_right</Icon>}></Input>
                </Tooltip>
              </Wrapper.Overlay> :
              <LinkInfoResult linkInfo={linkInfo}/>
            }
        </div>
      </div>
    </>
  )
}