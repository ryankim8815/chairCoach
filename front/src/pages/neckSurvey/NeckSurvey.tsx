import { useEffect, useState } from "react";
import * as S from "./NeckSurveyStyle";
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
          <S.TextBox>
            <S.SubTitle style={{ fontWeight: 700 }}>Q{page}</S.SubTitle>
            <S.SubTitle style={{ marginTop: 16 }}>
              {page === 11 ? null : Data[page - 1].questions}
            </S.SubTitle>
          </S.TextBox>
          {page === 11 ? null : <S.Img src={Data[page - 1].img} />}
          <S.Btn
            onClick={() => {
              increasePoint();
              increasePage();
            }}
          >
            네
          </S.Btn>
          <S.Btn
            onClick={() => {
              increasePage();
            }}
            style={{ marginTop: 24 }}
          >
            아니오
          </S.Btn>
        </S.ContentBox>
      </div>
    </S.SurveyContainer>
  );
};

export default NeckSurvey;