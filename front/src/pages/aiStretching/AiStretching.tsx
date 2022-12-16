import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userState from "../../atoms/user";
import AiStretchingVideo from "./AiStretchingVideo";
import * as D from "./StretchingData";
import * as Api from "../../api/api";
import * as S from "./AiStretchingStyle";
import * as B from "../../styles/BtnStyle";
import neckguideImg from "../../assets/img/neck_guide_img.jpg";
import completionIcon from "../../assets/img/completion_icon.png";
import guideLine from "../../assets/img/guide_line.svg";

require("@tensorflow/tfjs");
const AiStretching = () => {
  const [bodyId, setBodyId] = useState("");
  const navigate = useNavigate();
  const [start, setStart] = useState(false);
  const [step, setStep] = useState(0);
  const [time, setTime] = useState(10);
  const [theStart, setTheStart] = useState(true);
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
    if (user === null) {
      if (id !== undefined && step === D.stepOfStretching[id]) {
        setTheEnd(true);
      }
    }
    if (user !== null) {
      if (id !== undefined && step === D.stepOfStretching[id]) {
        setTheEnd(true);
        Api.patch(`bodies/${user?.id}/terminating`, {
          body_id: bodyId,
        });
      }
    }
  }, [step]);
  useEffect(() => {
    if (user !== null) {
      Api.post(`bodies/${user?.id}/recording`, {
        tag: id as string,
      }).then((res) => setBodyId(res.data.body_id));
    }
  }, []);
  return (
    <S.InspectionLayout>
      <S.MainCont>
        <S.GuideTextWrap>
          {theStart && (
            <p className="startTitle">
              “스트레칭 시작하기” 버튼을 클릭하시면 스트레칭이 시작됩니다.
              <br />
              시작 시 가이드 영상과 유사한 자세를 유지해주세요!
            </p>
          )}
          <p>{id !== undefined && D.explains[id][step]}</p>
        </S.GuideTextWrap>
        <S.MiddleContent>
          <S.LeftContent>
            <S.VideoContent>
              <video
                key={`/videos/${step}/${start}.mp4`}
                autoPlay={start}
                muted
              >
                <source src={`/videos/${step}.mp4`} type="video/mp4" />
              </video>
              <span>가이드 동영상</span>
            </S.VideoContent>

            {!theStart && (
              <S.StretchingStartWrap>
                {start ? (
                  <span className="timer">{time}</span>
                ) : (
                  <S.btnWrap>
                    <B.CheckBtn
                      check="true"
                      onClick={() => {
                        setStart(true);
                        handleTimer();
                      }}
                    >
                      시작하기
                    </B.CheckBtn>
                  </S.btnWrap>
                )}
              </S.StretchingStartWrap>
            )}
          </S.LeftContent>

          <S.CanvasContent>
            <AiStretchingVideo />

            {theStart && (
              <S.ReadyGuide>
                <img src={`${guideLine}`} alt="가이드라인" />
                <p>
                  웹캠에 상반신 반 정도 보이게 해야 진단 정확도가 높아집니다.
                </p>
              </S.ReadyGuide>
            )}
          </S.CanvasContent>
        </S.MiddleContent>

        <S.btnWrap>
          {theStart ? (
            <>
              <B.CheckBtn onClick={() => navigate("/chaircoach")}>
                돌아가기
              </B.CheckBtn>
              <B.CheckBtn check="true" onClick={() => setTheStart(false)}>
                스트레칭 시작
              </B.CheckBtn>
            </>
          ) : (
            <p>자세를 알맞게 해주세요!</p>
          )}
        </S.btnWrap>
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
