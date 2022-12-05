import React, { forwardRef } from "react";
import * as S from "./MainStyle";

const ExplainLayout = forwardRef((props, ref:any) => {

  return (
    <S.ExplainLayout>
      <div className="inner">
        <S.ExplainContent ref={elem => ref.current[2] = elem}>
          <div>
            <S.ExplainTextWrap>
              <p>STRETCH</p>
              <h3>
                AI 실시간 자세 교정을 통해<br />
                정확한 자세를 알려드려요.
              </h3>
            </S.ExplainTextWrap>
          </div>
          <S.ExplainImage1/>
        </S.ExplainContent>

        <S.ExplainContent id="1" ref={elem => ref.current[3] = elem}>
          <div>
            <S.ExplainTextWrap>
              <p>DIAGNOSE</p>
              <h3>
              당신의 거북목 여부를<br />
              체크해줍니다.
              </h3>
            </S.ExplainTextWrap>
          </div>
          <S.ExplainImage2/>
        </S.ExplainContent>

        <S.ExplainContent ref={elem => ref.current[4] = elem}>
          <div>
            <S.ExplainTextWrap>
              <p>ALARM</p>
              <h3>
              주기적으로<br />
              스트레칭 시간을 알려드려요!
              </h3>
            </S.ExplainTextWrap>
          </div>
          <S.ExplainImage3/>
        </S.ExplainContent>
      </div>
    </S.ExplainLayout>
  );
});

export default ExplainLayout;
