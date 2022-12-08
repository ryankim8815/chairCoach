import { useEffect, useState } from "react";
import * as S from "./NeckSurveyStyle";
import * as B from "../../styles/BtnStyle"
import { useNavigate } from "react-router-dom";
import { Data } from "./Data";

const NeckSurvey = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [point, setPoint] = useState(0);
  const increasePage = () => {
    setPage((prev) => prev + 1);
  };
  const increasePoint = () => {
    setPoint((prev) => prev + 1);
  };
  useEffect(() => {
    if (page === 11) {
      navigate("/surveyresult", {
        state: {
          point: point,
        },
      });
    }
  }, [page]);
  console.log(page);
  return (
    <S.SurveyContainer>
      <div className="inner">
        <S.TitleBox>
          <S.Title>거북목증후군 자가진단 테스트</S.Title>
          <S.Page>{page}/10</S.Page>
        </S.TitleBox>
        <S.ContentBox>
            <S.SubTitle>Q{page}. {page === 11 ? null : Data[page - 1].questions}</S.SubTitle>
          {page === 11 ? null : <S.Img src={Data[page - 1].img} />}

          <S.BtnWrap>
            <B.CheckBtn size='big'
              onClick={() => {
                increasePoint();
                increasePage();
              }}
            >
              네
            </B.CheckBtn>
            <B.CheckBtn size='big'
              onClick={() => {
                increasePage();
              }}
            >
              아니오
            </B.CheckBtn>
          </S.BtnWrap>
          
        </S.ContentBox>
      </div>
    </S.SurveyContainer>
  );
};

export default NeckSurvey;