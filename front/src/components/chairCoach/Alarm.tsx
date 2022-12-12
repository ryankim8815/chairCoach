import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import userState from "./../../atoms/user";
import * as B from "../../styles/BtnStyle";
import * as S from "./AlamStyle";
import * as Api from "../../api/api";
const Alarm = () => {
  const user = useRecoilValue(userState);
  const [isChecked, setIsChecked] = useState(false);
  const [alarmState, setAlarmState] = useState<{
    timer: number;
    alert: number;
  } | null>(null);
  const [alarmTimer, setAlarmTimer] = useState(0);
  const checkHandler = () => {
    setIsChecked(!isChecked);
  };
  useEffect(() => {
    Api.get(`users/${user?.id}`).then((res) => setAlarmState(res.data));
  }, []);
  //이중삼항연산자를 사용하시라는 말씀이실까..? (A?(B?C:D):E) 이런 느낌인거 같긴 한데... 더 복잡해보일거같은... 아닌가.. 여쭤봐야지..
  useEffect(() => {
    alarmState !== null &&
      setAlarmTimer((alarmState as { timer: number; alert: number })?.timer);
    alarmState != null && alarmState.alert === 1
      ? setIsChecked(true)
      : setIsChecked(false);
  }, [alarmState]);
  console.log(!isChecked);
  return (
    <S.AlarmCon className={user ? "" : "lock"}>
      <S.AlarmTextWrap>
        <h2>
          안심하고 일하세요!
          <br />
          정해진 시간 마다 <span>CHAIR COACH</span>가 알려드릴게요!
        </h2>
        <p>
          설정하신 시간마다 CHAIR COACH가 알람형태로 고객님께 스트레칭 시간을
          알려드려요!
          <br />
          설정은 ON/OFF로 변경이 가능합니다.
        </p>
      </S.AlarmTextWrap>

      <S.AlarmSettingsWrap>
        <div>
          <p>알람 설정</p>

          <S.ToggleBtnBox>
            <input
              type="checkbox"
              id="toggle"
              checked={isChecked}
              hidden
              onChange={async () => {
                checkHandler();
                const res = await Api.patch(`users/${user?.id}/alert`, {
                  alert: !isChecked,
                  timer: 15,
                });
                console.log(res);
              }}
            />
            <label htmlFor="toggle">
              <span></span>
            </label>
          </S.ToggleBtnBox>
        </div>

        <ul>
          <li>
            <B.AlarmBtn
              check={alarmTimer === 15 && isChecked === true ? "true" : "false"}
              onClick={async () => {
                setAlarmTimer(15);
                await Api.patch(`users/${user?.id}/alert`, {
                  alert: isChecked,
                  timer: 15,
                });
              }}
            >
              15분
            </B.AlarmBtn>
          </li>
          <li>
            <B.AlarmBtn
              check={alarmTimer === 30 && isChecked === true ? "true" : "false"}
              onClick={async () => {
                setAlarmTimer(30);
                await Api.patch(`users/${user?.id}/alert`, {
                  alert: isChecked,
                  timer: 30,
                });
              }}
            >
              30분
            </B.AlarmBtn>
          </li>
          <li>
            <B.AlarmBtn
              check={alarmTimer === 60 && isChecked === true ? "true" : "false"}
              onClick={async () => {
                setAlarmTimer(60);
                await Api.patch(`users/${user?.id}/alert`, {
                  alert: isChecked,
                  timer: 60,
                });
              }}
            >
              60분
            </B.AlarmBtn>
          </li>
        </ul>
      </S.AlarmSettingsWrap>
    </S.AlarmCon>
  );
};

export default Alarm;
