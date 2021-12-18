
import { LinkInfo } from "app-shared/typings"
import React, { FC } from "react"

import "./HashStatsResult.scss"

interface HashStatsResultProps {
  hashStats: LinkInfo
}

const HashStatsResult: FC<HashStatsResultProps> = ({ hashStats }) => {
  return (
    <code>{JSON.stringify(hashStats, null, 2)}</code>
  )
}

export default HashStatsResult
