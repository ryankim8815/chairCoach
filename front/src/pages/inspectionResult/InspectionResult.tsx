import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as B from "../../styles/BtnStyle";
import * as S from "../surveyResult/ResultStyle";
import * as Api from "../../api/api";
import { useRecoilState } from "recoil";
import userState from "../../atoms/user";

const InspectionResult = () => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const [data, setData] = useState(null);
  console.log(user?.id);
  useEffect(() => {
    Api.get(`necks/${user?.id}`).then((res) =>
      setData(res.data.list[res.data.list.length - 1])
    );
  }, []);
  console.log(data);
  console.log("이미지url", `http://localhost:5003/${(data as any)?.filename}`);
  return (
    <S.ResultContainer>
      <div className="inner">
        <S.Title>거북목증후군 자가진단 테스트 결과</S.Title>

        <S.InspectionResultWrap>
          <img
            // src={`http://localhost:5003/${(data as any)?.filename}`}
            src={`http://kdt-ai5-team04.elicecoding.com:5003/${
              (data as any)?.filename
            }`}
            alt="사진들어갈 곳"
          />

          <S.SubTitle1>
            목과 어깨의 각도가{" "}
            <S.PointText>
              {data !== null &&
                (
                  data as {
                    result: number;
                  }
                ).result}
              도
            </S.PointText>
            로,
            <br /> 거북목{" "}
            <S.PointText>
              {data !== null && (data as { score: number }).score >= 70
                ? "안전"
                : data !== null && (data as { score: number }).score >= 30
                ? "보통"
                : "위험"}
            </S.PointText>{" "}
            단계입니다.
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
