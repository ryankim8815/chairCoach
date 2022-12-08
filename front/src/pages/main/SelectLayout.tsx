import React, { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./MainStyle";

const SelectLayout = forwardRef<HTMLDivElement>((props, ref) => {
  const navigate = useNavigate();

  return (
    <S.SelectLayout ref={ref}>
      <div className="inner">
        <S.TitleText>오늘부터 <span>CHAIR COACH</span>를 시작해보세요!</S.TitleText>

        <S.SelectContent>
          <S.SelectWrap className="stretching" onClick={() => navigate("/chaircoach")}>
            <dl>
              <dt>
                <h3>체어코치와 함께하는 AI 스트레칭</h3>
              </dt>
              <dd>
                <p>
                  목, 어깨, 허리, 올인원 총 4가지의 코스를 <br />
                  AI와 함께 경험할 수 있습니다.
                </p>
              </dd>
            </dl>
          </S.SelectWrap>

          <S.SelectWrap className="neck" onClick={() => navigate("/aboutneck")}>
            <dl>
              <dt>
                <h3>체어코치와 함께하는 AI 스트레칭</h3>
              </dt>
              <dd>
                <p>
                  목, 어깨, 허리, 올인원 총 4가지의 코스를 <br />
                  AI와 함께 경험할 수 있습니다.
                </p>
              </dd>
            </dl>
          </S.SelectWrap>
        </S.SelectContent>
      </div>
    </S.SelectLayout>
  );
});

export default SelectLayout;
