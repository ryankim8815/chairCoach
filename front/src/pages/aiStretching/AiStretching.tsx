import React, { useState } from "react";
import neckguideImg from "../../assets/img/neck_guide_img.jpg";
import * as S from "./AiStretchingStyle";
import * as B from "../../styles/BtnStyle";
import AiStretchingVideo from "./AiStretchingVideo";
import { useParams } from "react-router-dom";
import * as D from "./StretchingData";
import { useEffect } from "react";

require("@tensorflow/tfjs");
const AiStretching = () => {
  const [start, setStart] = useState(false);
  const [step, setStep] = useState(0);
  const [time, setTime] = useState(10);
  const [theEnd, setTheEnd] = useState(false);
  const { id } = useParams<{ id: keyof typeof D.explains }>();
  console.log(id !== undefined && D.stepOfStretching[id]);
  const handleTimer = () => {
    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      setStep((prev) => prev + 1);
      setTime(10);
      setStart(false);
    }, 10000);
  };
  console.log(theEnd);
  useEffect(() => {
    if (id !== undefined && step === D.stepOfStretching[id]) {
      setTheEnd(true);
    }
  }, [step]);

  return (
    <S.InspectionLayout>
      <S.MainCont>
        <S.GuideTextWrap>
          <p style={{ whiteSpace: "pre-line" }}>
            {id !== undefined && D.explains[id][step]}
          </p>
        </S.GuideTextWrap>
        <S.MiddleContent>
          <S.ImgCont>
            <video key={`/videos/${step}/${start}.mp4`} autoPlay={start}>
              <source src={`/videos/${step}.mp4`} type="video/mp4" />
            </video>
            <span>가이드 동영상</span>
            <S.TimerBox>
              {start === false ? (
                <B.MiddleBtn
                  onClick={() => {
                    setStart(true);
                    handleTimer();
                  }}
                >
                  시작하기
                </B.MiddleBtn>
              ) : (
                <span>{time}초</span>
              )}
            </S.TimerBox>
          </S.ImgCont>

          <div>
            <AiStretchingVideo />
          </div>
        </S.MiddleContent>
      </S.MainCont>
    </S.InspectionLayout>
  );
};

export default AiStretching;
