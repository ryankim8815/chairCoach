import React, { useEffect, useState } from "react";

import * as S from "../../pages/signUp/SignUpStyle";
import * as B from "../../styles/BtnStyle";
import * as F from "../../styles/InputStyle";
import * as RegExp from "../../utils/RegExp";
import * as Api from "../../api/api";
import { FaCheck } from "react-icons/fa";

type User = {
  id: string | null;
  nickname: string | null;
};

interface LoginChairCoachType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const LoginChairCoach = ({ user, setUser }: LoginChairCoachType) => {
  const [nickname, setNickname] = useState(String(user?.nickname));
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmNewPw, setConfirmNewPw] = useState("");

  const [checkNickname, setCheckNickname] = useState(true);
  const [checkCurrentPw, setCheckCurrentPw] = useState(false);
  const [checkNewPw, setCheckNewPw] = useState(false);
  const [checkConfirmNewPw, setCheckConfirmNewPw] = useState(false);

  useEffect(() => {
    // 기존 닉네임이랑 같은지 비교
    setCheckNickname(nickname === String(user?.nickname) ? true : false);
  }, [nickname]);

  useEffect(() => {
    setCheckCurrentPw(false);
  }, [currentPw]);

  useEffect(() => {
    setCheckNewPw(RegExp.validatePwd(newPw) ? true : false);
  }, [newPw]);

  useEffect(() => {
    setCheckConfirmNewPw(newPw === confirmNewPw ? true : false);
  }, [confirmNewPw]);

  const handlerCheckNicknameClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    // 닉네임 형식이 아닐 경우
    if (!RegExp.validateNickname(nickname)) {
      alert("닉네임을 다시 입력해주세요.");
      return;
    }

    try {
      const res = await Api.get(`signup/nickname/${nickname}`);

      if (res.data.result) {
        alert("사용가능한 닉네임 입니다.");
        setCheckNickname(true);
      }
    } catch (err) {
      alert("중복된 닉네임 입니다.");
      setNickname("");
    }
  };

  const handlerCheckCurrentPwClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    // 비밀번호 형식이 아닐 경우
    if (RegExp.validatePwd(currentPw)) {
      alert("비밀번호을 다시 입력해주세요.");
      return;
    }

    if (!user) return;
    try {
      const res = await Api.post(`users/${user.id}/password`, {
        password: currentPw,
      });

      if (res.data.result) {
        setCheckCurrentPw(true);
      }
    } catch (err) {
      alert(
        "입력하신 비밀번호가 일치하지 않습니다.\n다시 한 번 확인해 주세요."
      );
      setCurrentPw("");
    }
  };

  const handlerInfoChangeSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!user) return;
    try {
      const res = await Api.put(`users/${user.id}`, {
        password: newPw,
        nickname: nickname,
      });

      if (res.data.result) {
        alert("회원정보가 변경되었습니다.");
        setUser({
          id: user.id,
          nickname: nickname,
        });
        window.location.replace("/");
      }
    } catch (err) {
      alert("회원정보를 다시 수정해주세요.");
    }
  };

  return (
    <S.FormCon>
      <form onSubmit={handlerInfoChangeSubmit}>
        <fieldset>
          <legend>회원정보 변경</legend>

          <S.InputWrap>
            <p>닉네임</p>
            <F.CheckInputCon>
              <F.InputText
                length="small"
                type="text"
                value={String(nickname)}
                placeholder="닉네임을 입력해주세요."
                onChange={(e) => {
                  setNickname(e.target.value);
                  setCheckNickname(false);
                }}
              />
              {checkNickname && <FaCheck />}
              <B.InputCheckBtn onClick={handlerCheckNicknameClick}>
                중복 확인
              </B.InputCheckBtn>
            </F.CheckInputCon>

            {nickname.length > 0 && !RegExp.validateNickname(nickname) && (
              <F.WarningText lineHeight="true">
                영어, 영어+숫자로 2~12자 구성 <br />
                한글, 한글+숫자로 2~8자 구성 (초성 및 모음은 허가하지 않음)
              </F.WarningText>
            )}
            {RegExp.validateNickname(nickname) && !checkNickname && (
              <F.WarningText>닉네임 중복 확인을 해주세요.</F.WarningText>
            )}
          </S.InputWrap>

          <S.InputWrap>
            <p>현재 비밀번호</p>
            <F.CheckInputCon>
              <F.InputText
                length="small"
                type="password"
                value={currentPw}
                placeholder="현재 비밀번호를 입력해주세요."
                disabled={!checkNickname}
                onChange={(e) => setCurrentPw(e.target.value)}
              />
              {checkCurrentPw && <FaCheck />}
              <B.InputCheckBtn onClick={handlerCheckCurrentPwClick}>
                비밀번호 확인
              </B.InputCheckBtn>
            </F.CheckInputCon>
            {currentPw.length > 0 && !RegExp.validatePwd(currentPw) && (
              <F.WarningText lineHeight="true">
                영어 대문자, 소문자, 숫자, 특수문자를 포함한
                <br />
                8글자 이상이여야 합니다.
              </F.WarningText>
            )}
            {RegExp.validatePwd(currentPw) && !checkCurrentPw && (
              <F.WarningText>비밀번호 확인을 해주세요.</F.WarningText>
            )}
          </S.InputWrap>

          <S.InputWrap>
            <div>
              <p>새 비밀번호</p>
              <F.Inputcontent>
                <F.InputText
                  type="password"
                  value={newPw}
                  placeholder="새로운 비밀번호를 입력해주세요."
                  disabled={!checkCurrentPw}
                  onChange={(e) => setNewPw(e.target.value)}
                />
                {checkNewPw && <FaCheck />}
              </F.Inputcontent>

              {newPw.length > 0 && !checkNewPw && (
                <F.WarningText lineHeight="true">
                  영어 대문자, 소문자, 숫자, 특수문자를 포함한
                  <br />
                  8글자 이상이여야 합니다.
                </F.WarningText>
              )}
            </div>

            <div>
              <p>새 비밀번호 확인</p>
              <F.Inputcontent>
                <F.InputText
                  type="password"
                  value={confirmNewPw}
                  placeholder="비밀번호를 다시 입력해주세요."
                  disabled={!checkNewPw}
                  onChange={(e) => setConfirmNewPw(e.target.value)}
                />
                {confirmNewPw.length > 0 && checkConfirmNewPw && <FaCheck />}
              </F.Inputcontent>

              {confirmNewPw.length > 0 && !checkConfirmNewPw && (
                <F.WarningText>비밀번호를 다시 확인해주세요.</F.WarningText>
              )}
            </div>
          </S.InputWrap>

          <B.InputBtn
            type="submit"
            disabled={
              checkNickname && checkCurrentPw && checkNewPw && checkConfirmNewPw
                ? false
                : true
            }
            check={String(
              checkNickname &&
                checkCurrentPw &&
                checkNewPw &&
                checkConfirmNewPw &&
                true
            )}
          >
            변경하기
          </B.InputBtn>
        </fieldset>
      </form>
    </S.FormCon>
  );
};

export default LoginChairCoach;
