import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import * as RegExp from "./RegExp"

// style
import * as S from "./SignUpStyle";
import * as B from "../../styles/BtnStyle";
import * as F from "../../styles/InputStyle";
import * as Api from "../../api/api";

interface SignUp {
  email: string;
  password: string;
  nickname: string;
}

const SingUp = () => {
  const navigate = useNavigate(); 

  const [email, setEmail] = useState("");
  const [codeDisabled, setCodeDisabled] = useState(true);
  const [code, setCode] = useState(0);
  const [code2, setCode2] = useState(0);
  const [checkCode, setCheckCode] = useState(true);

  const [pwDisabled, setpwDisabled] = useState(true);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [nickname, setNickname] = useState("");

  const [submitDisabled, setSubmitDisabled] = useState(true);

  
  const isEmailValid = RegExp.validateEmail(email);
  const isPwdValid = RegExp.validatePwd(password);
  const isNicknameValid = RegExp.validateNickname(nickname);  


  // useEffect(() => {
  //   Api.get("users")
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  useEffect(()=> {
    Api.get(`signup/nickname/${nickname}`).then(res => {
      console.log(res);
      const data:any = res;
      
      if(!data.result) alert('중복된 닉네임 입니다.')
      data.result && isNicknameValid ? setSubmitDisabled(false) : setSubmitDisabled(true);

    }).catch((err)=> {
      console.log(err);
    });
  }, [nickname])
  
  // 인증번호 요청
  const handlerCodeClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res: any = await Api.post("signup/email", {
      email: email,
    });
    console.log(res.code);

    res.result ? setCodeDisabled(false) : alert('중복된 이메일 입니다.');
    setCode(res.code);
  };

  // 인증번호 확인
  const handlerCheckCodeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (code === code2) {
      setCheckCode(true);
      setpwDisabled(false);
    } else setCheckCode(false);

    console.log(code === code2 ? "Yes" : "No");
  };

  // 가입하기
  const handlerSignUpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res:any = await Api.post("signup", {
      email: email,
      password: password,
      nickname: nickname,
    });

    console.log(res);
    console.log(res.result);
    if(res.result) navigate('/login');
  };

  // 닉네임 disabled 해제여부
  const nicknameDisabled = password2.length > 0 && password === password2 ? false : true;

  return (
    <S.SignUpLayout>
      <h2>회원가입</h2>

      <S.FormCon>
        <form onSubmit={handlerSignUpSubmit}>
          <fieldset>
            <legend>회원가입</legend>

            <S.InputWrap>
              <p>이메일</p>
              <F.CheckInputCon>
                <F.InputText
                  length="small"
                  type="email"
                  value={email}
                  placeholder="이메일을 입력해주세요."
                  onChange={(e) => setEmail(e.target.value)}
                />
                <B.InputCheckBtn onClick={handlerCodeClick}>
                  인증번호 요청
                </B.InputCheckBtn>
                {email.length === 0 || isEmailValid ? null : (
                  <F.WarningText>이메일 형식이 아닙니다.</F.WarningText>
                )}
              </F.CheckInputCon>

              <F.CheckInputCon>
                <F.InputText
                  length="small"
                  type="text"
                  disabled={codeDisabled}
                  placeholder="인증번호를 입력해주세요."
                  onChange={(e) => setCode2(Number(e.target.value))}
                />
                <B.InputCheckBtn onClick={handlerCheckCodeClick}>
                  인증번호 확인
                </B.InputCheckBtn>
                {checkCode ? null : (
                  <F.WarningText>인증번호가 틀렸습니다.</F.WarningText>
                )}
              </F.CheckInputCon>
            </S.InputWrap>

            <S.InputWrap>
              <div>
                <p>비밀번호</p>
                <F.InputText
                  type="password"
                  value={password}
                  disabled={pwDisabled}
                  placeholder="비밀번호를 입력해주세요."
                  onChange={(e) => setPassword(e.target.value)}
                />
                {password.length === 0 || isPwdValid ? null : (
                  <F.WarningText lineHeight="true">
                    영어 대문자, 소문자, 숫자, 특수문자를 포함한<br />
                    8글자 이상이여야 합니다.
                  </F.WarningText>
                )}
              </div>

              <div>
                <p>비밀번호 확인</p>
                <F.InputText
                  type="password"
                  disabled={!isPwdValid}
                  placeholder="비밀번호를 다시 입력해주세요."
                  onChange={(e) => setPassword2(e.target.value)}
                />
                {password2.length === 0 || password === password2 ? null : (
                  <F.WarningText>비밀번호를 다시 확인해주세요.</F.WarningText>
                )}
              </div>
            </S.InputWrap>

            <S.InputWrap>
              <p>닉네임</p>
              <F.InputText
                type="text"
                value={nickname}
                disabled={nicknameDisabled}
                placeholder="닉네임을 입력해주세요."
                onChange={(e) => setNickname(e.target.value)}
              />
              {nickname.length === 0 || isNicknameValid ? null : (
                <F.WarningText lineHeight="true" style={{paddingTop: '4px'}}>
                  영어+숫자로 2~12자 구성 <br />
                  한글, 한글+숫자로 2~8자 구성 (초성 및 모음은 허가하지 않음)
                </F.WarningText>
              )}
            </S.InputWrap>

            <B.InputBtn
              type="submit"
              disabled={submitDisabled}
              check={String(!submitDisabled)}
            >
              가입하기
            </B.InputBtn>
          </fieldset>
        </form>
      </S.FormCon>
    </S.SignUpLayout>
  );
};

export default SingUp;
