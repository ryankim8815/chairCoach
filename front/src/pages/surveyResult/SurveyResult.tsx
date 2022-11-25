import { useLocation, useNavigate } from "react-router-dom";
import * as S from "./SurveyResultStyle";
import result1 from "../../assets/img/result1.png";
import result2 from "../../assets/img/result2.png";
import result3 from "../../assets/img/result3.png";
import * as CS from "../../styles/BtnStyle";
import styled from "styled-components";

const SurveyResult = () => {
  const location = useLocation();
  const point: number = location.state.point;
  const navigate = useNavigate();
  const RecommendButton = styled(CS.CheckBtn)`
    &:hover {
      background: ${({ theme }) => theme.colors.main};
      color: #ffffff;
    }
  `;
  return (
    <S.ResultContainer>
      <div className="inner">
        <S.TitleBox>
          <S.Title>자가진단 결과</S.Title>
        </S.TitleBox>
        <S.ResultBox>
          <S.HalfBox>
            <S.TextBox>
              <S.SubTitle>
                설문 조항 결과에 따르면, abcdefghijkl님의 거북목 위험도는{" "}
                <S.Percent>{point * 10}%</S.Percent>
                입니다!
              </S.SubTitle>
            </S.TextBox>
          </S.HalfBox>
          <S.HalfBox style={{ marginRight: 129 }}>
            {point >= 7 ? (
              <S.IconImg src={result3} />
            ) : point >= 4 ? (
              <S.IconImg src={result2} />
            ) : (
              <S.IconImg src={result1} />
            )}
          </S.HalfBox>
        </S.ResultBox>
        <S.RecommendBox>
          <S.SubTitle>
            <S.BoldLetter>CHAIR COACH</S.BoldLetter>의{" "}
            <S.BoldLetter>정밀진단</S.BoldLetter>을 받아볼까요?
          </S.SubTitle>
          <S.BtnBox>
            <RecommendButton
              onClick={() => {
                navigate("/neckguide");
              }}
              size="small"
              check="false"
            >
              네
            </RecommendButton>
            <RecommendButton
              onClick={() => {
                navigate("/");
              }}
              size="small"
              check="false"
            >
              아니오
            </RecommendButton>
          </S.BtnBox>
        </S.RecommendBox>
      </div>
    </S.ResultContainer>
  );
};

export default SurveyResult;
