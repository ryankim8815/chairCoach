import React from 'react';
import * as B from "../../styles/BtnStyle";
import * as S from "./AlamStyle";

const Alarm = () => {
  return (
    <S.AlarmCon>
    <S.AlarmTextWrap>
      <h2>
      안심하고 일하세요!<br />
      정해진 시간 마다 <span>CHAIR COACH</span>가 알려드릴게요!
      </h2>
      <p>
      설정하신 시간마다 CHAIR COACH가 알람형태로 고객님께 스트레칭 시간을 알려드려요!<br />
      설정은 ON/OFF로 변경이 가능합니다.
      </p>
    </S.AlarmTextWrap>

    <S.AlarmSettingsWrap>
      <div>
        <p>알람 설정</p>

        <S.ToggleBtnBox>
          <input type="checkbox" id='toggle' hidden />
          <label htmlFor="toggle">
            <span></span>
          </label>
        </S.ToggleBtnBox>
      </div>

      <ul>
        <li>
          <B.AlarmBtn check='true'>15분</B.AlarmBtn>
        </li>
        <li>
          <B.AlarmBtn check='false'>30분</B.AlarmBtn>
        </li>
        <li>
          <B.AlarmBtn check='false'>60분</B.AlarmBtn>
        </li>
      </ul>
    </S.AlarmSettingsWrap>
  </S.AlarmCon>
  );
};

export default Alarm;