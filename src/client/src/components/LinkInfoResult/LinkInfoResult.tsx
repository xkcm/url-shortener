import { config } from "app-shared/config"
import { LinkInfo } from "app-shared/typings"
import React, { FC, useState } from "react"
import { Config } from "../../common"
import LinkInfoResultPiece from "../LinkInfoResultPiece/LinkInfoResultPiece"
import Tooltip from "../Tooltip/Tooltip"
import "./LinkInfoResult.scss"


const resolveURL = (base: string, url: string) => new URL(url, base).href+'/'

const LinkInfoResult: FC<{ linkInfo: LinkInfo }> = ({ linkInfo }) => {

  const [tooltipVisible, setVisibleTooltip] = useState<number>()

  const fullUrl = resolveURL(config(Config.APP_URL), linkInfo.hash)
  const islinkOwnedByUser = "pass" in linkInfo

  const copyToClipboard = async (content: string, tooltipIndex: number) => {
    await navigator.clipboard.writeText(content)
    setVisibleTooltip(undefined)
    setVisibleTooltip(tooltipIndex)
  }

  const hashStats = resolveURL(fullUrl, 'stats')

  return (
    <div className="result-container">
      <Tooltip.Clipboard visible={tooltipVisible === 0}>
        <LinkInfoResultPiece className="full-url" icon="link" allowCopying={true} copyCallback={() => copyToClipboard(fullUrl, 0)}>
          <a href={fullUrl}>{fullUrl}</a>
        </LinkInfoResultPiece>
      </Tooltip.Clipboard>
      { islinkOwnedByUser ?
        <>
          <Tooltip text="Use this key to unlock the hash stats" position="left" dense visibleOnHover visible>
            <Tooltip.Clipboard visible={tooltipVisible === 1}>
              <LinkInfoResultPiece className="password" icon="key" allowCopying={true} copyCallback={() => copyToClipboard(linkInfo.pass, 1)}>
                {linkInfo.pass}
              </LinkInfoResultPiece>
            </Tooltip.Clipboard>
          </Tooltip>
          <div className="hash-stats">
            You can view the hash stats at <a href={hashStats}>{hashStats}</a> using the provided key.
          </div>
        </> :
        <div className="link-already-created-message">
          Someone has already generated hash for this link, you can use it but you will not have access to the hash stats.
        </div>
      }
    </div>
  )
}

export default LinkInfoResult
