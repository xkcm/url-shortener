import { LinkInfo } from "app-shared/typings";
import React, { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { UndefinedHashError } from "../../common";
import CornerInfo from "../../components/CornerInfo/CornerInfo";
import HashStatsResult from "../../components/HashStatsResult/HashStatsResult";
import UnlockStatsForm from "../../components/UnlockStatsForm/UnlockStatsForm";
import { getStats } from "../../services/Links.service";
import "./HashStats.scss";


const HashStats: FC = () => {

  const { hash } = useParams()
  const [unlocked, setUnlocked] = useState(false)
  const [error, setError] = useState<string>()
  const [hashStats, setHashStats] = useState<LinkInfo>()

  const throwError = (error: Error) => {
    setError(error.message)
    setUnlocked(false)
  }

  const unlockHashStats = async (pass: string) => {
    if (!hash) return throwError(new UndefinedHashError("Hash was not provided"))
    try {
      const hashStats = await getStats(hash, pass)
      setUnlocked(true)
      setHashStats(hashStats)
    } catch (e) { throwError(e as Error) }
  }

  return (
    <>
      <CornerInfo appName/>
      <div className="container">
        <div className="center-container">
          <h2>Hash <span className="hash-text">{hash}</span> stats</h2>
          { error && 
            <div className="error-container">
              <span>{error}</span>
            </div>
          }
          { !unlocked  && !error && <UnlockStatsForm onSubmit={unlockHashStats}/> }
          { unlocked && !error && hashStats && <HashStatsResult hashStats={hashStats}/> }
        </div>
      </div>
    </>
  )
}

export default HashStats
