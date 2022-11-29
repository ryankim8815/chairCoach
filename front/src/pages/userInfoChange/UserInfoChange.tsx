import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import * as S from "../signUp/SignUpStyle";
import * as B from "../../styles/BtnStyle";
import * as F from "../../styles/InputStyle";
import * as RegExp from "../signUp/RegExp"
import * as Api from "../../api/api";

import userState from './../../atoms/user';


const UserInfoChange = () => {
  const currentNickname = String(useRecoilValue(userState));

  const [nickname, setNickname] = useState(currentNickname);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [checkNickname, setCheckNickname] = useState(true); // 중복체크버튼 클릭시 판별

  const [submitDisabled, setSubmitDisabled] = useState(true);

  const isPwdValid = RegExp.validatePwd(password);
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
    // res.data.result ? setCheckNickname(true) : alert('중복된 닉네임 입니다.');
    console.log('닉네임중복여부', res.data.result)

    if(res.data.result){
      setCheckNickname(true);
      alert('사용가능한 닉네임 입니다.');
    }else alert('중복된 닉네임 입니다.');
  }

  // console.log('trueNickname:',trueNickname, 'checkNickname', checkNickname);
  console.log('checkNickname', checkNickname);
  return (
    <S.SignUpLayout>
      <h2>회원정보 변경</h2>

      <S.FormCon>
        <form action="">
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
              {nickname.length === 0 || isNicknameValid ? null : (
                <F.WarningText lineHeight="true">
                  영어+숫자로 2~12자 구성 <br />
                  한글, 한글+숫자로 2~8자 구성 (초성 및 모음은 허가하지 않음)
                </F.WarningText>
              )}
              {
                ((currentNickname !== nickname && isNicknameValid)) ?
                <F.WarningText>닉네임 중복 확인을 해주세요.</F.WarningText>
                :null
              }

            </S.InputWrap>

            <S.InputWrap>
                <p>현재 비밀번호</p>
                <F.InputText
                  type="text"
                  placeholder="현재 비밀번호를 입력해주세요."
                />
                {/* <F.WarningText lineHeight="true">
                  영어 대문자, 소문자, 숫자, 특수문자를 포함한<br />
                  8글자 이상이여야 합니다.
                </F.WarningText> */}
            </S.InputWrap>

            <S.InputWrap>
              <div>
                <p>새 비밀번호</p>
                <F.InputText
                  type="text"
                  placeholder="새로운 비밀번호를 입력해주세요."
                  disabled={true}
                />
                <F.WarningText lineHeight="true">
                  영어 대문자, 소문자, 숫자, 특수문자를 포함한<br />
                  8글자 이상이여야 합니다.
                </F.WarningText>
              </div>

              <div>
                <p>새 비밀번호 확인</p>
                <F.InputText
                  type="text"
                  placeholder="비밀번호를 다시 입력해주세요."
                  disabled={true}
                />
                <F.WarningText>비밀번호를 다시 확인해주세요.</F.WarningText>
              </div>
            </S.InputWrap>

            <B.InputBtn
              type="submit"
              disabled={submitDisabled}
              check={String(!submitDisabled)}
            >변경하기</B.InputBtn>
          </fieldset>
        </form>
      </S.FormCon>
    </S.SignUpLayout>
  );
};

export default UserInfoChange;
