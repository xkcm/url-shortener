import { config } from "app-shared/config"
import { LinkInfo } from "app-shared/typings"
import React, { FC, useState } from "react"
import { Config } from "../../common"
import Icon from "../Icon/Icon"
import Tooltip from "../Tooltip/Tooltip"

import "./LinkInfoResult.scss"

const LinkInfoResult: FC<{ linkInfo: LinkInfo }> = ({ linkInfo }) => {

  const [tooltipVisible, setVisibleTooltip] = useState<number>()

  const fullUrl = new URL(linkInfo.hash, config(Config.APP_URL)).href
  const islinkOwnedByUser = "pass" in linkInfo

  const copyToClipboard = async (content: string, tooltipIndex: number) => {
    await navigator.clipboard.writeText(content)
    setVisibleTooltip(undefined)
    setVisibleTooltip(tooltipIndex)
  }

  return (
    <div className="result-container">
      <Tooltip.Clipboard visible={tooltipVisible === 0}>
        <div className="full-url info-container">
          <div className="icon">
            <Icon size={28}>link</Icon>
          </div>
          <span className="text">
            <a href={fullUrl}>{fullUrl}</a>
          </span>
          <div className="icon clipboard" onClick={() => copyToClipboard(fullUrl, 0)}>
            <Icon size={28}>content_copy</Icon>
          </div>
        </div>
      </Tooltip.Clipboard>
      { islinkOwnedByUser ?
        <Tooltip.Clipboard visible={tooltipVisible === 1}>
          <div className="password info-container">
            <div className="icon">
              <Icon size={28}>key</Icon>
            </div>
            <span className="text">{linkInfo.pass}</span>
            <div className="icon clipboard" onClick={() => copyToClipboard(linkInfo.pass, 1)}>
              <Icon size={28}>content_copy</Icon>
            </div>
          </div>
        </Tooltip.Clipboard> :
        <div className="link-already-created-message">
          Someone has already generated hash for this link, you can use it but you will not have access to the hash stats.
        </div>
      }
    </div>
  )
}

export default LinkInfoResult
