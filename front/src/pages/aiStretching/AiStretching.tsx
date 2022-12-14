import React, { useState } from "react";
import neckguideImg from "../../assets/img/neck_guide_img.jpg";
import * as S from "./AiStretchingStyle";
import * as B from "../../styles/BtnStyle";
import AiStretchingVideo from "./AiStretchingVideo";
import { useNavigate, useParams } from "react-router-dom";
import * as D from "./StretchingData";
import { useEffect } from "react";
import completionIcon from "../../assets/img/completion_icon.png";
import * as Api from "../../api/api";
import { useRecoilValue } from "recoil";
import userState from "../../atoms/user";
require("@tensorflow/tfjs");
const AiStretching = () => {
  const [bodyId, setBodyId] = useState("");
  const navigate = useNavigate();
  const [start, setStart] = useState(false);
  const [step, setStep] = useState(0);
  const [time, setTime] = useState(10);
  const [theEnd, setTheEnd] = useState(false);
  const { id } = useParams<{ id: keyof typeof D.explains }>();
  const user = useRecoilValue(userState);
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
  useEffect(() => {
    if (id !== undefined && step === D.stepOfStretching[id]) {
      setTheEnd(true);
      Api.patch(`bodies/${user?.id}/terminating`, {
        body_id: bodyId,
      });
    }
  }, [step]);
  useEffect(() => {
    Api.post(`bodies/${user?.id}/recording`, {
      tag: id as string,
    }).then((res) => setBodyId(res.data.body_id));
  }, []);
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
            <video key={`/videos/${step}/${start}.mp4`} autoPlay={start} muted>
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
      {theEnd === true && (
        <S.FinisheContent>
          <div>
            <img src={`${completionIcon}`} alt="촬영완료" />
            <p>스트레칭 완료!</p>
            <S.btnWrap>
              <B.CheckBtn
                onClick={() => {
                  navigate("/chaircoach");
                }}
              >
                다시 하기
              </B.CheckBtn>
              <B.CheckBtn
                check="true"
                onClick={() => {
                  navigate("/");
                }}
              >
                메인페이지
              </B.CheckBtn>
            </S.btnWrap>
          </div>
        </S.FinisheContent>
      )}
    </S.InspectionLayout>
  );
};

export default AiStretching;
