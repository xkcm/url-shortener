import classNames from "classnames"
import React, { FC } from "react"
import Icon from "../Icon/Icon"
import "./LinkInfoResultPiece.scss"


interface LinkInfoResultPieceProps {
  icon: string;
  allowCopying?: boolean;
  copyCallback?: (...args: []) => any;
  className?: string;
}

const LinkInfoResultPiece: FC<LinkInfoResultPieceProps> = ({ className, icon, children, allowCopying, copyCallback }) => {

  return (
    <div className={classNames("info-container", className)}>
      <div className="icon">
        <Icon size={28}>{icon}</Icon>
      </div>
      <span className="text">{children}</span>
      { allowCopying && copyCallback &&
        <div className="icon clipboard" onClick={() => copyCallback()}>
          <Icon size={28}>content_copy</Icon>
        </div>
      }
    </div>
  )
}

export default LinkInfoResultPiece
