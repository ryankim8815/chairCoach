import { useLocation, useNavigate } from "react-router-dom";
import * as B from "../../styles/BtnStyle";
import * as S from "./ResultStyle";
import result1 from "../../assets/img/result1.png";
import result2 from "../../assets/img/result2.png";
import result3 from "../../assets/img/result3.png";
import { MutableRefObject } from "react";

const SurveyResult = () => {
  const location = useLocation();
  const point: number = location.state.pointRef;
  const navigate = useNavigate();
  return (
    <S.ResultContainer>
      <div className="inner">
        <S.Title>거북목증후군 자가진단 테스트 결과</S.Title>

        <S.ResultBox>
          {point >= 7 ? (
            <img src={result3} alt="위험" />
          ) : point >= 4 ? (
            <img src={result2} alt="보통" />
          ) : (
            <img src={result1} alt="좋음" />
          )}

          <S.SubTitle1>
            당신의 거북목 위험도는
            <br />
            <S.PointText>{point * 10}%</S.PointText>입니다!
          </S.SubTitle1>
        </S.ResultBox>

        <S.RecommendBox>
          <S.SubTitle2>
            <span>CHAIR COACH</span>의 <span>정밀진단</span>을 받아볼까요?
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
