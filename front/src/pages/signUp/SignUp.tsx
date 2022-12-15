import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import * as S from "./SignUpStyle";
import * as B from "../../styles/BtnStyle";
import * as F from "../../styles/InputStyle";
import * as RegExp from "../../utils/RegExp";
import * as Api from "../../api/api";
import { FaCheck } from "react-icons/fa";

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
    setCodeDisabled(true);
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

    try {
      const res = await Api.post("signup/email", {
        email: email,
      });

      if (res.data.result) {
        setCodeDisabled(false);
        setCode(res.data.result);
        startTimer();
      }
    } catch (err) {
      // 중복된 이메일일 경우
      alert("중복된 이메일 입니다.");
      setCodeDisabled(true);
    }
  };

  // 인증번호 확인
  const handlerCheckCodeClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    try {
      const res = await Api.get(`signup/email/${email}/code/${code}`);
      if (res.data.result) {
        setPwDisabled(false);
        stopTimer();
      }
    } catch (err) {
      alert("인증번호가 틀렸습니다.");
    }
  };

  useEffect(() => {
    setCodeDisabled(true);
  }, [email]);

  useEffect(() => {
    setPwDisabled(true);
  }, [code]);

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
    try {
      const res = await Api.get(`signup/nickname/${nickname}`);
      if (res.data.result) {
        setSubmitDisabled(false);
      }
    } catch (err) {
      alert("중복된 닉네임 입니다.");
    }
  };

  // 가입하기
  const handlerSignUpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await Api.post("signup", {
        email: email,
        password: password,
        nickname: nickname,
      });

      if (res.data.result) {
        alert("회원가입을 축하합니다.\n로그인하신 후 시작하세요!");
        navigate("/login");
      }
    } catch (err) {
      alert("다시 확인해주세요.");
    }
  };

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
                {!codeDisabled && <FaCheck />}
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
                {pwDisabled ? (
                  <span className="time">
                    {Math.floor(time / 60)}:
                    {time % 60 < 10 ? `0${time % 60}` : time % 60}
                  </span>
                ) : (
                  <FaCheck />
                )}
                <B.InputCheckBtn onClick={handlerCheckCodeClick}>
                  인증번호 확인
                </B.InputCheckBtn>
              </F.CheckInputCon>
            </S.InputWrap>

            <S.InputWrap>
              <div>
                <p>비밀번호</p>
                <F.Inputcontent>
                  <F.InputText
                    type="password"
                    value={password}
                    disabled={pwDisabled}
                    placeholder="비밀번호를 입력해주세요."
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {isPwdValid && <FaCheck />}
                </F.Inputcontent>

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
                <F.Inputcontent>
                  <F.InputText
                    type="password"
                    disabled={!isPwdValid}
                    placeholder="비밀번호를 다시 입력해주세요."
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {!nicknameDisabled && <FaCheck />}
                </F.Inputcontent>

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
                {!submitDisabled && <FaCheck />}
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
