import classNames from "classnames"
import React, { FC, useEffect, useRef } from "react"
import "./Tooltip.scss"


interface TooltipProps {
  visible?: boolean;
  position?: "top" | "bottom" | "left" | "right";
  text: string;
  nudge?: [number, number];
  dense?: boolean;
  hide?: number;
}

const Tooltip: FC<TooltipProps> & { Clipboard: typeof Clipboard } = ({ children, visible, position, text, nudge, dense, hide }) => {

  const translateNudge = nudge || [0,0]
  const innerContainer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (innerContainer.current) innerContainer.current.style.animationName = "scaleIn"

    if (hide !== undefined) {
      timeout = setTimeout(() => {
        if (innerContainer.current) {
          innerContainer.current.style.animationName = "scaleOut";
        }
      }, Math.max(hide - 200, hide))
    }

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [hide, visible])

  return (
    <div className="tooltip__outer-container">
      { children }
      { visible &&
        <div className={`tooltip__${position || 'top'} tooltip__container`} style={{ display: !visible ? "none" : "block" }}>
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