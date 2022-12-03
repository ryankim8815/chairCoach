import React, { useState } from 'react'
import * as S from './TimerStyle'
const Timer = ({time,setTime}:any) => {
  return (
    <S.OutTimer>
        <S.InnerTimer>
          <S.Title>{time}</S.Title>
        </S.InnerTimer>
      </S.OutTimer>
  )
}

export default Timer
