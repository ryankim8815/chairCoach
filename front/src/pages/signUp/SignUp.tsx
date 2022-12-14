import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import * as S from "./SignUpStyle";
import * as B from "../../styles/BtnStyle";
import * as F from "../../styles/InputStyle";
import * as RegExp from "../../utils/RegExp";
import * as Api from "../../api/api";

interface SignUp {
  email: string;
  password: string;
  nickname: string;
  code: string;
}

const BASIC_TIME = 30;

const SingUp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const [codeDisabled, setCodeDisabled] = useState(true);
  const [pwDisabled, setPwDisabled] = useState(true);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const isEmailValid = RegExp.validateEmail(email);
  const isPwdValid = RegExp.validatePwd(password);
  const isNicknameValid = RegExp.validateNickname(nickname);

  // 인증번호 확인 타이머
  const [time, setTime] = useState(BASIC_TIME);
  const intervalId: any = useRef(null);

  const startTimer = () => {
    setTime(BASIC_TIME);

    intervalId.current = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalId.current);
  };

  // time이 0일 경우
  if (!time) {
    clearInterval(intervalId.current);
    alert("인증번호 유효시간이 지났습니다. \n인증번호를 다시 발급해주세요.");
    setTime(BASIC_TIME);
  }

  // 인증번호 요청
  const handlerCodeClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    stopTimer();

    // 이메일 형식이 아닐 경우
    if (!isEmailValid) {
      alert("이메일을 다시 입력해주세요.");
      setCodeDisabled(true);
      return;
    }

    // 중복된 이메일일 경우
    const res = await Api.post("signup/email", {
      email: email,
    });

    if (res.data.result) {
      setCodeDisabled(false);
      setCode(res.data.result);
      startTimer();
    } else {
      alert("중복된 이메일 입니다.");
      setCodeDisabled(true);
    }
  };

  // 인증번호 확인
  const handlerCheckCodeClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    const res = await Api.get(`signup/email/${email}/code/${code}`);
    res.data.result ? setPwDisabled(false) : alert("인증번호가 틀렸습니다.");

    if (res.data.result) {
      setPwDisabled(false);
      stopTimer();
    } else {
      alert("인증번호가 틀렸습니다.");
    }
  };

  // 닉네임 disabled 해제여부
  const nicknameDisabled =
    confirmPassword.length > 0 && password === confirmPassword ? false : true;

  // 닉네임 중복 확인
  const handlerCheckNicknameClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    // 닉네임 형식이 아닐 경우
    if (!isNicknameValid) {
      alert("닉네임을 다시 입력해주세요.");
      setSubmitDisabled(true);
      return;
    }

    // 중복된 닉네임일 경우
    const res = await Api.get(`signup/nickname/${nickname}`);
    res.data.result ? setSubmitDisabled(false) : alert("중복된 닉네임 입니다.");
  };

  // 가입하기
  const handlerSignUpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await Api.post("signup", {
      email: email,
      password: password,
      nickname: nickname,
    });
    if (res.data.result) {
      alert("회원가입을 축하합니다.\n로그인하신 후 시작하세요! ");
      navigate("/login");
    }
  };

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
                <span className="time">
                  {Math.floor(time / 60)}:
                  {time % 60 < 10 ? `0${time % 60}` : time % 60}
                </span>
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
                    영어 대문자, 소문자, 숫자, 특수문자를 포함한
                    <br />
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
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {confirmPassword.length === 0 ||
                password === confirmPassword ? null : (
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
                  onChange={(e) => {
                    setNickname(e.target.value);
                    setSubmitDisabled(true);
                  }}
                />
                <B.InputCheckBtn onClick={handlerCheckNicknameClick}>
                  중복 확인
                </B.InputCheckBtn>
              </F.CheckInputCon>
              {nickname.length === 0 || isNicknameValid ? null : (
                <F.WarningText lineHeight="true" style={{ paddingTop: "4px" }}>
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
