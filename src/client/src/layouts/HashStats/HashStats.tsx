import { LinkInfo } from "app-shared/typings";
import React, { FC, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { IncorrectPasswordError, PromiseValue, UndefinedHashError } from "../../common";
import CornerInfo from "../../components/CornerInfo/CornerInfo";
import HashStatsResult from "../../components/HashStatsResult/HashStatsResult";
import UnlockStatsForm from "../../components/UnlockStatsForm/UnlockStatsForm";
import { deleteHash, getStats } from "../../services/Links.service";
import "./HashStats.scss";

const HashStats: FC = () => {

  const { hash } = useParams()
  const [unlocked, setUnlocked] = useState(false)
  const [error, setError] = useState<string>()
  const [hashStats, setHashStats] = useState<LinkInfo>()
  const password = useRef<string>()

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
      password.current = pass
    } catch (e) {
      throwError(e as Error)
    }
  }

  const hashDelete = async () => {
    if (!password.current) return throwError(new IncorrectPasswordError("Password is undefined"))
    if (!hash) return throwError(new UndefinedHashError("Hash was not provided"))
    await deleteHash(hash, password.current)
      .then(() => setError("Hash was successfully deleted"))
      .catch(throwError)
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
          { unlocked && !error && hashStats && <HashStatsResult hashStats={hashStats} onHashDelete={hashDelete}/> }
        </div>
      </div>
    </>
  )
}

export default HashStats
