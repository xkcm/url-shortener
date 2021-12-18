import classNames from "classnames"
import React, { FC, useEffect, useRef, useState } from "react"
import "./Tooltip.scss"


interface TooltipProps {
  visible?: boolean;
  position?: "top" | "bottom" | "left" | "right";
  text: string;
  nudge?: [number, number];
  dense?: boolean;
  hide?: number;
  visibleOnHover?: boolean;
}

const Tooltip: FC<TooltipProps> & { Clipboard: typeof Clipboard } = ({ children, visibleOnHover, visible: pVisible, position, text, nudge, dense, hide }) => {

  const translateNudge = nudge || [0,0]
  const innerContainer = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const visible = pVisible ?? true

  useEffect(() => {
    let timeout: NodeJS.Timeout

    openTooltip()

    if (hide !== undefined) {
      timeout = setTimeout(() => {
        closeTooltip()
      }, Math.max(hide - 200, hide))
    }

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [hide, visible])

  const openTooltip = () => {
    if (innerContainer.current) innerContainer.current.style.animationName = "scaleIn"
  }
  const closeTooltip = () => {
    if (innerContainer.current) innerContainer.current.style.animationName = "scaleOut";
  }

  const hoverEnter = () => {
    setHovered(true)
    if (visibleOnHover) openTooltip()
  }

  const hoverLeave = () => {
    setHovered(false)
    if (visibleOnHover) closeTooltip()
  }

  const canBeDisplayed = () => visible && ((visibleOnHover && hovered) || !visibleOnHover)

  return (
    <div className="tooltip__outer-container">
      <div className="tooltip__wrapped-content" onMouseEnter={hoverEnter} onMouseLeave={hoverLeave}>
        { children }
      </div>
      { canBeDisplayed() &&
        <div className={`tooltip__${position || 'top'} tooltip__container`} style={{ display: !canBeDisplayed() ? "none" : "block" }}>
          <div style={{ transform: `translate(${translateNudge[0]}px, ${translateNudge[1]}px)` }} className={classNames(`tooltip__body`, { 'tooltip__dense': dense })}>
            <div ref={innerContainer} className="tooltip__inner-container">
              <span className="tooltip__text">
                {text}
              </span>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

const Clipboard: FC<Partial<TooltipProps>> = ({ children, ...props }) => <Tooltip text="Copied to clipboard!" position="right" hide={3000} dense {...props}> { children } </Tooltip>


Tooltip.Clipboard = Clipboard

export default Tooltip