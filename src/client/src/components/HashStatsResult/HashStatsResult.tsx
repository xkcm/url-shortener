
import { LinkInfo, LinkInfoKeys } from "app-shared/typings"
import React, { FC } from "react"
import Icon from "../Icon/Icon"
import LinkInfoResultPiece from "../LinkInfoResultPiece/LinkInfoResultPiece"
import "./HashStatsResult.scss"


interface HashStatsResultProps {
  hashStats: Pick<LinkInfo, LinkInfoKeys.DESTINATION | LinkInfoKeys.VIEWS>;
  onHashDelete: (...args: any[]) => any
}

const HashStatsResult: FC<HashStatsResultProps> = ({ hashStats: { destination, views }, onHashDelete }) => {
  const getGramaticallyCorrectViewsText = () => {
    return `${views} redirection` + (views !== 1 ? 's' : '')
  }
  
  return (
    <div className="hash-stats">
      <LinkInfoResultPiece icon="link" className="destination-stat stat">
        <a href={destination}>{destination}</a>
      </LinkInfoResultPiece>
      <LinkInfoResultPiece icon="share" className="views-stat stat">
        {getGramaticallyCorrectViewsText()}
      </LinkInfoResultPiece>
      <button className="delete-button" onClick={onHashDelete}>
        <span className="caption">delete hash</span>
        <Icon size={28}>delete</Icon>
      </button>
    </div>
  )
}

export default HashStatsResult
