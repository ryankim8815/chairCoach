import { useLocation, useNavigate } from "react-router-dom";
import * as S from "./SurveyResultStyle";
import result1 from "../../assets/img/result1.png";
import result2 from "../../assets/img/result2.png";
import result3 from "../../assets/img/result3.png";
import * as B from "../../styles/BtnStyle";
import { MutableRefObject } from "react";
const SurveyResult = () => {
  const location = useLocation();
  const pointRef: MutableRefObject<number> = location.state.pointRef;
  console.log(pointRef);
  const navigate = useNavigate();
  return (
    <S.ResultContainer>
      <div className="inner">
        <S.Title>거북목증후군 자가진단 테스트 결과</S.Title>

        <S.ResultBox>
          <div>
            {pointRef.current >= 7 ? (
              <S.IconImg src={result3} />
            ) : pointRef.current >= 4 ? (
              <S.IconImg src={result2} />
            ) : (
              <S.IconImg src={result1} />
            )}
          </div>
          <div>
            <S.TextBox>
              <S.SubTitle1>
                당신의 거북목 위험도는
                <br />
                <S.Percent>{pointRef.current * 10}%</S.Percent>입니다!
              </S.SubTitle1>
            </S.TextBox>
          </div>
        </S.ResultBox>

        <S.RecommendBox>
          <S.SubTitle2>
            <S.BoldLetter>CHAIR COACH</S.BoldLetter>의{" "}
            <S.BoldLetter>정밀진단</S.BoldLetter>을 받아볼까요?
          </S.SubTitle2>
          <S.BtnBox>
            <B.CheckBtn
              onClick={() => {
                navigate("/");
              }}
              size="small"
              check="false"
            >
              아니오
            </B.CheckBtn>

            <B.CheckBtn
              check="true"
              onClick={() => {
                navigate("/neckguide");
              }}
              size="small"
            >
              네
            </B.CheckBtn>
          </S.BtnBox>
        </S.RecommendBox>
      </div>
    </S.ResultContainer>
  );
};

export default SurveyResult;
