import React, { useState } from 'react'
import * as S from './TimerStyle'

interface propsType{
  time: number,
}

const Timer = ({time}:propsType) => {
  return (
    <S.OutTimer>
        <S.InnerTimer>
          <S.Title>{time}</S.Title>
        </S.InnerTimer>
      </S.OutTimer>
  )
}

export default Timer
