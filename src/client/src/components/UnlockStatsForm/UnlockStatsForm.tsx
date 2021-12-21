import React, { FC } from "react"
import Icon from "../Icon/Icon"
import Input from "../Input/Input"

import "./UnlockStatsForm.scoped.scss"

interface UnlockStatsFormProps {
  onSubmit: (pass: string) => any
}

const UnlockStatsForm: FC<UnlockStatsFormProps> = ({ onSubmit }) => {
  return (
    <>
      <span>To view the hash stats enter the password</span>
      <div>
        <Input buttonContent={<Icon size={32}>lock_open</Icon>} onSubmit={onSubmit} placeholder="Password"/>
      </div>
    </>
  )
}

export default UnlockStatsForm
