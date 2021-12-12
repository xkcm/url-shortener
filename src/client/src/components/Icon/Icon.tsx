import React, { CSSProperties, FC } from "react"
import "./Icon.scss"

interface IconProps {
  color?: string;
  size?: number;
}

const Icon: FC<IconProps> = (props) => {

  const style: CSSProperties = {
    color: props.color,
    fontSize: `${props.size || 16}px`
  }

  return (
    <span style={style} className="icon-container">
      {props.children}
    </span>
  )
}

export default Icon