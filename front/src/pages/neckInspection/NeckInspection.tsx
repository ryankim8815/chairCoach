import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import NeckVideo from "../../components/neckVideo/NeckVideo";

import * as B from "../../styles/BtnStyle";
import * as S from "./NeckInspectionStyle";
import neckguideImg from "../../assets/img/neck_guide_img.jpg";
import completionIcon from "../../assets/img/completion_icon.png";
import guideLine from "../../assets/img/guide_line.svg";

const NeckInspection = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(5);
  const [step, setStep] = useState(0);
  const playInspection = useRef(false);
  const startTimer = () => {
    setStep((prev) => prev + 1);
    let timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      handleStep();
      handleInspection();
    }, 5000);
  };
  const handleStep = () => {
    setStep((prev) => prev + 1);
  };
  const handleInspection = () => {
    playInspection.current = true;
  };

  return (
    <S.InspectionLayout>
      <S.MainCont>
        <S.GuideTextWrap>
          {step === 0 && (
            <p>
              가이드 이미지와 유사한 각도를 유지해주세요!
              <br />
              “촬영하기” 버튼을 클릭하시면 5초 후에 촬영됩니다.
            </p>
          )}

          {step === 1 && (
            <p>
              5초간 가이드 이미지와
              <br />
              유사한 각도를 유지해주세요!
            </p>
          )}

          {/* {step === 2 && <p>사진촬영이 정상적으로 완료되었습니다!</p>} */}
        </S.GuideTextWrap>

        <S.MiddleContent>
          {step !== 2 && (
            <S.ImgCont>
              <img src={`${neckguideImg}`} alt="가이드 이미지" />
              <span>가이드 이미지</span>
            </S.ImgCont>
          )}

          <div>
            <NeckVideo
              time={time}
              step={step}
              setStep={setStep}
              playInspection={playInspection}
            />
          </div>

          {step === 0 && (
            <S.ReadyGuide>
              <img src={`${guideLine}`} alt="가이드라인" />
              <p>웹캠에 상반신 반 정도 보이게 해야 진단 정확도가 높아집니다.</p>
            </S.ReadyGuide>
          )}

          {step === 1 && <S.TimeText>{time}</S.TimeText>}
        </S.MiddleContent>

        <S.btnWrap>
          {step === 0 && (
            <>
              <B.CheckBtn onClick={() => navigate("/aboutneck")}>
                돌아가기
              </B.CheckBtn>
              <B.CheckBtn check="true" onClick={startTimer}>
                촬영 시작
              </B.CheckBtn>
            </>
          )}
        </S.btnWrap>
      </S.MainCont>

      {step === 2 && (
        <S.FinisheContent>
          <div>
            <img src={`${completionIcon}`} alt="촬영완료" />
            <p>촬영완료!</p>
            <S.btnWrap>
              <B.CheckBtn
                onClick={() => {
                  setStep((prev) => prev - 2);
                  setTime(5);
                }}
              >
                다시 촬영하기
              </B.CheckBtn>
              <B.CheckBtn
                check="true"
                onClick={() => {
                  navigate("/inspectionresult");
                }}
              >
                검사결과
              </B.CheckBtn>
            </S.btnWrap>
          </div>
        </S.FinisheContent>
      )}
    </S.InspectionLayout>
  );
};

export default NeckInspection;
