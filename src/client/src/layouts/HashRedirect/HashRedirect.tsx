import { config } from "app-shared/config"
import React, { FC, useCallback, useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { HashNotProvidedError } from "../../common"
import CornerInfo from "../../components/CornerInfo/CornerInfo"
import LoadingDots from "../../components/LoadingDots/LoadingDots"
import { getDestination } from "../../services/Links.service"
import "./HashRedirect.scss"


const properRedirect = (destination: string) => {
  window.location.assign(destination)
}

const HashRedirect: FC = () => {
  const { hash } = useParams()
  const [destination, setDestination] = useState<string>()
  const [time, setTime] = useState<number>(5)
  const [jobInfo, setJobInfo] = useState<string>("Fetching hash info")
  const [errorInfo, setErrorInfo] = useState<string>()
  const interval = useRef<NodeJS.Timeout>()

  const startCountdown = () => {
    setJobInfo("Redirecting")
    interval.current = setInterval(function tm(){
      setTime(t => t-1)
    }, 1000)
  }

  const redirectToDestination = useCallback(async () => {
    if (!hash) throw new HashNotProvidedError()
    const d = await getDestination(hash)
    if (d === null) {
      setJobInfo("Your link is broken :/")
      setErrorInfo("Hash was not found in the server's database, it might have been deleted or has never existed")
      return
    }
    setDestination(d)
    startCountdown()
  }, [hash])

  useEffect(() => {
    redirectToDestination()
  }, [redirectToDestination])
  useEffect(() => {
    if (time === 0 && interval.current && !!destination) {
      clearInterval(interval.current)
      if (config('PRODUCTION')) properRedirect(destination as string)
    }
  }, [time, destination])

  return (
    <>
      <CornerInfo appName/>
      <div className="redirection-info__container">
        
        { !!destination ?
        <>
          <h2>{jobInfo}</h2>
          <div>You will be automatically redirected to <span className="destination"><a href={destination}>{destination}</a></span> in <span>{time}</span>s...</div> 
        </> :
          <h2>{jobInfo}</h2>
        }
        { !errorInfo ?
          <LoadingDots/> :
          <span>{errorInfo}</span>
        }
      </div>
    </>
  )
}

export default HashRedirect
