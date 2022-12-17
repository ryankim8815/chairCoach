import React from "react";
import { useRecoilValue } from "recoil";
import userState from "./../../atoms/user";
import * as S from "./StretchingStyle";

import { BsFillClockFill } from "react-icons/bs";
import { BsFillLightningFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Stretching = () => {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  return (
    <S.ChairCoachCon>
      <h2>CHAIR COACH</h2>
      <p>체어코치의 AI 가이드와 함께 스트레칭을 시작해보세요.</p>

      <S.StretchingCon>
        <ul>
          <S.StretchingItem
            onClick={() => {
              navigate("/stretchingguide/beginner");
            }}
          >
            <dl>
              <dt>간단 스트레칭</dt>
              <dd>
                <span>
                  <BsFillClockFill />
                  50초
                </span>
                <span>
                  <BsFillLightningFill />5 동작
                </span>
              </dd>
            </dl>
          </S.StretchingItem>

          <S.StretchingItem
            onClick={() => {
              navigate("/stretchingguide/middleclass");
            }}
            className={user ? "" : "lock"}
          >
            <dl>
              <dt>기본 스트레칭</dt>
              <dd>
                <span>
                  <BsFillClockFill />
                  1분 40초
                </span>
                <span>
                  <BsFillLightningFill />
                  10 동작
                </span>
              </dd>
            </dl>
          </S.StretchingItem>

          <S.StretchingItem
            onClick={() => {
              navigate("/stretchingguide/highclass");
            }}
            className={user ? "" : "lock"}
          >
            <dl>
              <dt>심화 스트레칭</dt>
              <dd>
                <span>
                  <BsFillClockFill />
                  2분 10초
                </span>
                <span>
                  <BsFillLightningFill />
                  13 동작
                </span>
              </dd>
            </dl>
          </S.StretchingItem>
        </ul>
      </S.StretchingCon>
    </S.ChairCoachCon>
  );
};

export default Stretching;
