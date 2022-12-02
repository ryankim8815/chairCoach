import React from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./MainStyle";
import * as B from "../../styles/BtnStyle";


const ExplainLayout = () => {
  const navigate = useNavigate();

  return (
    <S.ExplainLayout>
      <div className="inner">
        <S.ExplainContent>
          <div>
            <S.ExplainTextWrap>
              <p>STRETCH</p>
              <h3>
                AI 실시간 자세 교정을 통해<br />
                정확한 자세를 알려드려요.
              </h3>
            </S.ExplainTextWrap>
            {/* <B.MiddleBtn hover="true" onClick={() => navigate("/chaircoach")}>
              체어코치 하러가기
            </B.MiddleBtn> */}
          </div>
          <S.ExplainImage1/>
        </S.ExplainContent>

        <S.ExplainContent>
          <div>
            <S.ExplainTextWrap>
              <p>DIAGNOSE</p>
              <h3>
              당신의 거북목 여부를<br />
              체크해줍니다.
              </h3>
            </S.ExplainTextWrap>
            {/* <B.MiddleBtn hover="true" onClick={() => navigate("/aboutneck")}>
              거북목 진단하러 가기
            </B.MiddleBtn> */}
          </div>
          <S.ExplainImage2/>
        </S.ExplainContent>

        <S.ExplainContent>
          <div>
            <S.ExplainTextWrap>
              <p>ALARM</p>
              <h3>
              주기적으로<br />
              스트레칭 시간을 알려드려요!
              </h3>
            </S.ExplainTextWrap>
            {/* <B.MiddleBtn hover="true" onClick={() => navigate("/chaircoach")}>
              알람설정하러 가기
            </B.MiddleBtn> */}
          </div>
          <S.ExplainImage3/>
        </S.ExplainContent>
      </div>
    </S.ExplainLayout>
  );
};

export default ExplainLayout;
