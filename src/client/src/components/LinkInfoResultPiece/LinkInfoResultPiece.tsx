import classNames from "classnames"
import React, { FC } from "react"
import Icon from "../Icon/Icon"

import "./LinkInfoResultPiece.scss"

interface LinkInfoResultPieceProps {
  icon: string;
  text: string;
  allowCopying?: boolean;
  copyCallback?: (content: string) => any;
  className?: string;
}

const LinkInfoResultPiece: FC<LinkInfoResultPieceProps> = ({ className, icon, text, allowCopying, copyCallback }) => {

  return (
    <div className={classNames("info-container", className)}>
      <div className="icon">
        <Icon size={28}>{icon}</Icon>
      </div>
      <span className="text">{text}</span>
      { allowCopying && copyCallback &&
        <div className="icon clipboard" onClick={() => copyCallback(text)}>
          <Icon size={28}>content_copy</Icon>
        </div>
      }
    </div>
  )
}

export default LinkInfoResultPiece
