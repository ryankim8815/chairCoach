import React, { useRef, useEffect, useState } from "react";
import NeckVideo from "../../components/neckVideo/NeckVideo";
import Timer from "../../components/timer/Timer";

import * as S from "./NeckInspectionStyle";
const NeckInspection = () => {
  const [time, setTime] = useState(5);
  const startTimer = () => {
    let timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
    }, 5000);
  };
  return (
    <S.InspectionLayout>
      <S.UpperCont>
        <Timer time={time} />
        <S.Btn
          onClick={() => {
            startTimer();
          }}
        >
          촬영 시작
        </S.Btn>
      </S.UpperCont>

      <S.MainCont>
        <S.ImgCont />
        <NeckVideo />
      </S.MainCont>
    </S.InspectionLayout>
  );
};

export default NeckInspection;
