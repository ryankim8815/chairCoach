import React from "react";
import { useNavigate } from "react-router-dom";
import * as B from "../../styles/BtnStyle";
import * as S from "../surveyResult/ResultStyle";

const InspectionResult = () => {
  const navigate = useNavigate();

  return (
    <S.ResultContainer>
      <div className="inner">
        <S.Title>거북목증후군 자가진단 테스트 결과</S.Title>

        <S.InspectionResultWrap>
          <img src="" alt="사진들어갈 곳" />

          <S.SubTitle1>
            목과 어깨의 각도가 <S.PointText>*도</S.PointText> 이하로,
            <br />
            거북목 <S.PointText>위험</S.PointText> 단계입니다.
          </S.SubTitle1>
        </S.InspectionResultWrap>

        <S.RecommendBox>
          <S.SubTitle2 lineHeight={true}>
            <span>CHAIR COACH AI가이드</span>와 함께,
            <br />
            <span>거북목 예방 스트레칭</span>을 시작해볼까요?
          </S.SubTitle2>
          <S.BtnBox>
            <B.CheckBtn
              onClick={() => {
                navigate("/neckinspection");
              }}
              size="small"
              check="false"
            >
              다시 촬영하기
            </B.CheckBtn>

            <B.CheckBtn
              onClick={() => {
                navigate("/chaircoach");
              }}
              check="true"
              size="small"
            >
              스트레칭 하러가기
            </B.CheckBtn>
          </S.BtnBox>
        </S.RecommendBox>
      </div>
    </S.ResultContainer>
  );
};

export default InspectionResult;
