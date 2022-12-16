import React, { useState } from "react";

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

interface LoginSNSType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  provider: string;
}

const LoginSNS = ({ user, setUser, provider }: LoginSNSType) => {
  const [nickname, setNickname] = useState(String(user?.nickname));
  const isNicknameValid = nickname ? RegExp.validateNickname(nickname) : false;
  const [checkNickname, setCheckNickname] = useState(false);

  // 닉네임 중복 확인
  const handlerCheckNicknameClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    // 닉네임 형식이 아닐 경우
    if (!isNicknameValid) {
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

  const handlerInfoChangeSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!user) return;
    try {
      const res = await Api.put(`users/${user.id}/provider/${provider}`, {
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
            {isNicknameValid ? null : (
              <F.WarningText lineHeight="true">
                영어, 영어+숫자로 2~12자 구성 <br />
                한글, 한글+숫자로 2~8자 구성 (초성 및 모음은 허가하지 않음)
              </F.WarningText>
            )}
            {!checkNickname && isNicknameValid ? (
              <F.WarningText>닉네임 중복 확인을 해주세요.</F.WarningText>
            ) : null}
          </S.InputWrap>

          <B.InputBtn
            type="submit"
            disabled={!checkNickname}
            check={String(checkNickname)}
          >
            변경하기
          </B.InputBtn>
        </fieldset>
      </form>
    </S.FormCon>
  );
};

export default LoginSNS;
