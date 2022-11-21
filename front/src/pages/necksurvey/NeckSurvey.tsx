import React, { useEffect, useState } from "react";
import * as S from "./NeckSurveyStyle";
import survey1 from "../../assets/img/survey1.png";
import survey2 from "../../assets/img/survey2.png";
import survey3 from "../../assets/img/survey3.png";
import survey4 from "../../assets/img/survey4.png";
import survey5 from "../../assets/img/survey5.png";
import survey6 from "../../assets/img/survey6.png";
import survey7 from "../../assets/img/survey7.png";
import survey8 from "../../assets/img/survey8.png";
import survey9 from "../../assets/img/survey9.png";
import survey10 from "../../assets/img/survey10.png";
import { useNavigate } from "react-router-dom";

const NeckSurvey = () => {
  const question = [
    "사무실에서 컴퓨터를 하루 6시간 이상 사용한다.",
    "목을 뒤로 젖히면 아프다",
    "자주 목과 어깨가 결리고 딱딱하게 굳는다.",
    "등이 굽었다",
    "목을 움직이면 각도에 따라 아프다",
    "잠버릇이 나쁘다는 말을 자주 듣는다",
    "어떤 베개를 사용해도 편하지 않다.",
    "팔을 올리고 자는 버릇이 있다.",
    "사진을 보면 언제나 목이 기울어 있다.",
    "목,어깨를 비틀면 똑똑 소리가 난다.",
  ];
  const navigate = useNavigate();
  const imgContents = [
    survey1,
    survey2,
    survey3,
    survey4,
    survey5,
    survey6,
    survey7,
    survey8,
    survey9,
    survey10,
  ];
  const [page, setPage] = useState(1);
  const [point, setPoint] = useState(0);
  const handlePage = () => {
    setPage(page + 1);
  };
  const handlePoint = () => {
    setPoint(point + 1);
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
      <S.TitleBox>
        <S.Title>거북목증후군 자가진단 테스트</S.Title>
        <S.Page>{page}/10</S.Page>
      </S.TitleBox>
      <S.ContentBox>
        <S.TextBox>
          <S.SubTitle>Q{page}</S.SubTitle>
          <S.SubTitle style={{ fontWeight: 400, marginTop: 16 }}>
            {question[page - 1]}
          </S.SubTitle>
        </S.TextBox>
        <S.Img src={imgContents[page - 1]} />
        <S.Btn
          onClick={() => {
            handlePoint();
            handlePage();
          }}
        >
          네
        </S.Btn>
        <S.Btn
          onClick={() => {
            handlePage();
          }}
          style={{ marginTop: 24 }}
        >
          아니오
        </S.Btn>
      </S.ContentBox>
    </S.SurveyContainer>
  );
};

export default NeckSurvey;
