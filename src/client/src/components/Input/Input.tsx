import React, { FC, ReactNode, useCallback, useEffect, useRef } from "react"
import "./Input.scss"


interface InputProps {
  buttonContent: ReactNode;
  onSubmit: (...args: any[]) => any;
  onFocus?: (...args: any[]) => any;
  placeholder: string;
}

const Input: FC<InputProps> = ({ buttonContent, onSubmit, onFocus, placeholder }) => {

  const submitCallback = useCallback((keyEvent: KeyboardEvent) => {
    if (keyEvent.key === "Enter") onSubmit(getInputValue())
  }, [onSubmit])

  useEffect(() => {
    const inputEl = input.current as HTMLInputElement
    inputEl.addEventListener("keyup", submitCallback)
    return () => {
      inputEl.removeEventListener("keyup", submitCallback)
    }
  }, [submitCallback])

  const input = useRef<HTMLInputElement>(null)
  const getInputValue = () => input.current == null ? '' : input.current.value

  return (
    <div className="input-box__container">
      <div className="input-box__input">
        <input ref={input} type="text" placeholder={placeholder} onFocus={() => (onFocus || (() => {}))()}/>
      </div>
      <button className="input-box__submit-button" onClick={() => onSubmit(getInputValue())}>
        { buttonContent }
      </button>
    </div>
  )
}

export default Input