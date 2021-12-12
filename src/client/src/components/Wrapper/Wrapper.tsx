import classNames from "classnames"
import React, { CSSProperties, FC } from "react"
import "./Wrapper.scss"


const Wrapper: FC & { Overlay: typeof Overlay } = ({ children, ...props }) => {
  return (
    <div className="wrapper" {...props}>
      { children }
    </div>
  )
}

interface OverlayProps {
  overlayStyle?: CSSProperties;
  overlayVisible?: boolean;
  [key: string]: any;
}

const Overlay: FC<OverlayProps> = ({ overlayVisible, overlayStyle, children, ...props }) => {

  const DEFAULT_VISIBILITY = false

  return (
    <Wrapper {...props}>
      { children }
      <div style={overlayStyle} className={classNames("wrapper__overlay", { "hidden": !(overlayVisible ?? DEFAULT_VISIBILITY) })}>
        <div className="loading-circle"></div>
      </div>
    </Wrapper>
  )
}

Wrapper.Overlay = Overlay

export default Wrapper