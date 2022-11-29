import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NeckVideo from "../../components/neckVideo/NeckVideo";
import Timer from "../../components/timer/Timer";

import * as S from "./NeckInspectionStyle";
const NeckInspection = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(5);
  const [step, setStep] = useState(0);
  const startTimer = () => {
    let timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      handleStep();
    }, 5000);
  };
  const handleStep = () => {
    setStep((prev) => prev + 1);
  };

  return (
    <S.InspectionLayout>
      <S.UpperCont>
        <Timer time={time} />
        {step === 0 ? (
          <S.Btn
            onClick={startTimer}
          >
            촬영 시작
          </S.Btn>
        ) : (
          <S.Btn
            onClick={() => {
              navigate("/inspectionresult");
            }}
          >
            검사결과
          </S.Btn>
        )}
      </S.UpperCont>

      <S.MainCont>
        <S.ImgCont />
        <NeckVideo time={time} step={step} setStep={setStep} />
      </S.MainCont>
    </S.InspectionLayout>
  );
};

export default NeckInspection;
