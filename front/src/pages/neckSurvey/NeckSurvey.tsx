import { useEffect, useRef, useState } from "react";
import * as S from "./NeckSurveyStyle";
import * as B from "../../styles/BtnStyle";
import { useNavigate } from "react-router-dom";
import { Data } from "./Data";

const NeckSurvey = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const pointRef = useRef(0);
  const increasePage = () => {
    setPage((prev) => prev + 1);
  };
  const increasePointRef = () => {
    pointRef.current = pointRef.current + 1;
  };
  useEffect(() => {
    if (page === 10) {
      navigate("/surveyresult", {
        state: {
          pointRef: pointRef.current,
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
          <S.Page>{page + 1}/10</S.Page>
        </S.TitleBox>
        <S.ContentBox>
          <S.SubTitle>
            Q{page + 1}. {page === 10 ? null : Data[page].questions}
          </S.SubTitle>
          {page === 10 ? null : <S.Img src={Data[page].img} />}

          <S.BtnWrap>
            <B.CheckBtn
              size="big"
              onClick={() => {
                increasePointRef();
                increasePage();
              }}
            >
              네
            </B.CheckBtn>
            <B.CheckBtn
              size="big"
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
