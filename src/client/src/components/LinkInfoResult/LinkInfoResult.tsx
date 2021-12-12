import React, { FC, useState } from "react"
import { LinkInfo } from "app-shared/typings"
import { Config } from "../../common"
import { config } from "app-shared/config"

import "./LinkInfoResult.scss"
import Icon from "../Icon/Icon"
import classNames from "classnames"

const LinkInfoResult: FC<{ linkInfo: LinkInfo }> = ({ linkInfo }) => {

  const fullUrl = new URL(linkInfo.hash, config(Config.APP_URL)).href
  const islinkOwnedByUser = "pass" in linkInfo

  const [lastCopied, setLastCopied] = useState<number>()

  const copyToClipboard = (content: string, copyButtonIndex: number) => {
    console.log("copying", content)
    console.log(copyButtonIndex)
    if (copyButtonIndex !== undefined) setLastCopied(copyButtonIndex)
  }

  return (
    <div className="result-container">
      <div className="full-url info-container">
        <div className="icon">
          <Icon size={28}>link</Icon>
        </div>
        <span className="text">
          <a href={fullUrl}>{fullUrl}</a>
        </span>
        <div className={classNames("icon clipboard", { copied: lastCopied === 0 })} onClick={() => copyToClipboard(fullUrl, 0)}>
          <Icon size={28}>content_paste</Icon>
        </div>
      </div>
      { islinkOwnedByUser ?
        <div className="password info-container" onClick={() => copyToClipboard(linkInfo.pass, 1)}>
          <div className="icon">
            <Icon size={28}>key</Icon>
          </div>
          <span className="text">{linkInfo.pass}</span>
          <div className={classNames("icon clipboard", { copied: lastCopied === 1 })}>
            <Icon size={28}>content_paste</Icon>
          </div>
        </div> :
        <div className="link-already-created-message">
          Someone has already generated hash for this link
        </div>
      }
    </div>
  )
}

export default LinkInfoResult
