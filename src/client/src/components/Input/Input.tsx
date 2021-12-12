import React, { FC, ReactNode, useRef } from "react"

import "./Input.scss"

interface InputProps {
  buttonContent: ReactNode;
  onSubmit: Function;
  placeholder: string;
}

const Input: FC<InputProps> = ({ buttonContent, onSubmit, placeholder }) => {


  const input = useRef<HTMLInputElement>(null)
  const getInputValue = () => input.current == null ? '' : input.current.value

  return (
    <div className="input-box__container">
      <div className="input-box__input">
        <input ref={input} type="text" placeholder={placeholder}/>
      </div>
      <button className="input-box__submit-button" onClick={() => onSubmit(getInputValue())}>
        { buttonContent }
      </button>
    </div>
  )
}

export default Input