import React, { FC } from "react"

import "./LoadingDots.scss"

const LoadingDots: FC = () => {
  return (
    <div className="loading-dots__container">
      <div className="loading-dots__dot dot--1"></div>
      <div className="loading-dots__dot dot--2"></div>
      <div className="loading-dots__dot dot--3"></div>
    </div>
  )
}

export default LoadingDots