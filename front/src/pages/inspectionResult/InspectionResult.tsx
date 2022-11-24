import React from "react";
import * as S from "./inspectionResultStyle";
const InspectionResult = () => {
  return (
    <S.ResultLayout>
      <div className="inner">
        <S.Title>거북목 진단 결과</S.Title>
        <S.MainCont>
          <S.Image />
         <S.RightCont>
         <S.TextBox>
            <S.SubTitle>
              목과 어깨의 각도가 *도 이하로,
              <br />
              거북목 ** 단계입니다.
              <br />
              <br />
              체어코치 AI가이드와 함께,
              <br /> 거북목 예방 스트레칭을 시작해볼까요?
            </S.SubTitle>
          </S.TextBox>
          <S.Btn>스트레칭 하러가기</S.Btn>
         </S.RightCont>
        </S.MainCont>
      </div>
    </S.ResultLayout>
  );
};

export default InspectionResult;
