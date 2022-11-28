import { useState, useRef  } from "react";
import { useNavigate } from 'react-router-dom';

import * as RegExp from "./RegExp"

import * as S from "./SignUpStyle";
import * as B from "../../styles/BtnStyle";
import * as F from "../../styles/InputStyle";
import * as Api from "../../api/api";

interface SignUp {
  email: string;
  password: string;
  nickname: string;
  code: string;
}

const SingUp = () => {
  const navigate = useNavigate(); 

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [nickname, setNickname] = useState("");
  
  const [codeDisabled, setCodeDisabled] = useState(true);
  const [pwDisabled, setpwDisabled] = useState(true);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const isEmailValid = RegExp.validateEmail(email);
  const isPwdValid = RegExp.validatePwd(password);
  const isNicknameValid = RegExp.validateNickname(nickname);

  // 인증번호 확인 타이머
  const [time, setTime] = useState(0);
  const intervalId:any = useRef(null);

  const startTimer = () => {
    setTime(30);

    intervalId.current = setInterval(() => {
      setTime((time) => time - 1);
    },1000);
    setTimeout(()=> {
      clearInterval(intervalId.current);
      alert('인증번호 유효시간이 지났습니다. \n인증번호를 다시 발급해주세요.');
    }, 30000);
  };

  const stopTimer = () => {
    clearInterval(intervalId.current);
  };
  
  // 인증번호 요청
  const handlerCodeClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    stopTimer();

    if(email.length===0) alert('이메일을 입력해주세요.')

    const res: any = await Api.post("signup/email", {
      email: email,
    });

    if(res.result){
      setCodeDisabled(false)
      setCode(res.result);
      startTimer();
    }else{
      alert('중복된 이메일 입니다.');
      setCodeDisabled(true);
    }
  };

  // 인증번호 확인
  const handlerCheckCodeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    Api.get(`signup/email/${email}/code/${code}`).then(res => {
      console.log(res);
      const data:any = res;
      data.result ? setpwDisabled(false) : alert('인증번호가 틀렸습니다.');

      if(data.result){
        setpwDisabled(false);
        stopTimer();
      }else alert('인증번호가 틀렸습니다.');
    }).catch((err)=> {
      console.log(err);
    });
  };

  // 닉네임 중복 확인
  const handlerCheckNicknameClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    Api.get(`signup/nickname/${nickname}`).then(res => {
      console.log(res);
      const data:any = res;
      
      if(!data.result) alert('중복된 닉네임 입니다.')
      data.result && isNicknameValid ? setSubmitDisabled(false) : setSubmitDisabled(true);

    }).catch((err)=> {
      console.log(err);
    });
  }

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
            <span></span>

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
                  onChange={(e) => setCode(e.target.value)}
                />
                <span className="time">{Math.floor(time/60)}:{time%60 < 10 ? `0${time%60}` : time%60}</span>
                <B.InputCheckBtn onClick={handlerCheckCodeClick}>
                  인증번호 확인
                </B.InputCheckBtn>
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
              <F.CheckInputCon>
                <F.InputText
                  length="small"
                  type="text"
                  value={nickname}
                  disabled={nicknameDisabled}
                  placeholder="닉네임을 입력해주세요."
                  onChange={(e) => setNickname(e.target.value)}
                />
                <B.InputCheckBtn onClick={handlerCheckNicknameClick}>
                  중복 확인
                </B.InputCheckBtn>
              </F.CheckInputCon>
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
