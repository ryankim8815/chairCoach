import { useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

import userState from './../../atoms/user';
import * as S from "../signUp/SignUpStyle";
import * as B from "../../styles/BtnStyle";
import * as F from "../../styles/InputStyle";
import * as RegExp from "../signUp/RegExp"
import * as Api from "../../api/api";


const UserInfoChange = () => {
  const navigate = useNavigate(); 
  const [user, setUser]:any = useRecoilState(userState);

  const [nickname, setNickname] = useState(user);
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [checkNewPw, setCheckNewPw] = useState("");

  const [checkNickname, setCheckNickname] = useState(false); // 닉네임 중복체크버튼 클릭시 판별
  const [newPwDisabled, setNewPwDisabled] = useState(true);

  const isNicknameValid = RegExp.validateNickname(nickname);

  // 닉네임 중복 확인
  const handlerCheckNicknameClick = async(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // 닉네임 형식이 아닐 경우
    if(!isNicknameValid){
      alert('닉네임을 다시 입력해주세요.');
      return;
    }

    // 중복된 닉네임일 경우
    const res = await Api.get(`signup/nickname/${nickname}`);
    res.data.result ? setCheckNickname(true) : alert('중복된 닉네임 입니다.');
  }

  // 비밀번호 확인
  const handlerCheckCurrentPwClick = async(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = await Api.post("user/password", {
      password: currentPw,
    });

    res.data.result ? setNewPwDisabled(false) : alert('입력하신 password가 일치하지 않습니다.\n다시 한 번 확인해 주세요.');
  }

  const handlerInfoChangeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await Api.put("user", {
      password: newPw,
      currentPassword: currentPw,
      nickname: nickname
    })

    console.log(res.data.result);
    if(res.data.result){
      navigate('/');
      setUser(nickname);
    }
  };

  const nicknameSame = nickname.length > 0 && user === nickname ? true : false;
  const currentPwDisabled = (checkNickname || nicknameSame) ? false : true;
  const newPwSame = checkNewPw.length > 0 && newPw === checkNewPw ? true : false;

  return (
    <S.SignUpLayout>
      <h2>회원정보 변경</h2>

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
                  value={nickname}
                  placeholder="닉네임을 입력해주세요."
                  onChange={(e) => {
                    setNickname(e.target.value);
                    setCheckNickname(false);
                  }}
                />
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
              {
                (!nicknameSame && isNicknameValid && currentPwDisabled) ?
                <F.WarningText>닉네임 중복 확인을 해주세요.</F.WarningText>
                :null
              }
            </S.InputWrap>

            <S.InputWrap>
              <p>현재 비밀번호</p>
              <F.CheckInputCon>
                <F.InputText
                  length="small"
                  type="password"
                  value={currentPw}
                  placeholder="현재 비밀번호를 입력해주세요."
                  disabled={currentPwDisabled}
                  onChange={(e)=>{
                    setCurrentPw(e.target.value);
                  }}
                />
                <B.InputCheckBtn onClick={handlerCheckCurrentPwClick}>
                  비밀번호 확인
                </B.InputCheckBtn>
              </F.CheckInputCon>
              {currentPw.length === 0 || RegExp.validatePwd(currentPw) ? null : (
                <F.WarningText lineHeight="true">
                  영어 대문자, 소문자, 숫자, 특수문자를 포함한<br />
                  8글자 이상이여야 합니다.
                </F.WarningText>
              )}
              {
                (RegExp.validatePwd(currentPw) && newPwDisabled) ?
                <F.WarningText>비밀번호 확인을 해주세요.</F.WarningText>
                :null
              }
            </S.InputWrap>

            <S.InputWrap>
              <div>
                <p>새 비밀번호</p>
                <F.InputText
                  type="password"
                  value={newPw}
                  placeholder="새로운 비밀번호를 입력해주세요."
                  disabled={newPwDisabled}
                  onChange={(e)=>setNewPw(e.target.value)}
                />
                {newPw.length === 0 || RegExp.validatePwd(newPw) ? null : (
                <F.WarningText lineHeight="true">
                  영어 대문자, 소문자, 숫자, 특수문자를 포함한<br />
                  8글자 이상이여야 합니다.
                </F.WarningText>
                )}
              </div>

              <div>
                <p>새 비밀번호 확인</p>
                <F.InputText
                  type="password"
                  value={checkNewPw}
                  placeholder="비밀번호를 다시 입력해주세요."
                  disabled={!RegExp.validatePwd(newPw)}
                  onChange={(e)=>setCheckNewPw(e.target.value)}
                />
                {checkNewPw.length === 0 || newPw === checkNewPw ? null : (
                  <F.WarningText style={{paddingTop: '4px'}}>비밀번호를 다시 확인해주세요.</F.WarningText>
                )}
              </div>
            </S.InputWrap>

            <B.InputBtn
              type="submit"
              disabled={!newPwSame}
              check={String(newPwSame)}
            >변경하기</B.InputBtn>
          </fieldset>
        </form>
      </S.FormCon>
    </S.SignUpLayout>
  );
};

export default UserInfoChange;
