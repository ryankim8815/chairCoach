import logo from "../../assets/img/logo.svg";

// style
import * as S from "../../styles/BtnStyle";
import * as F from "../../styles/InputStyle";
import { LoginLayout, TopCon, BottomCon } from "./LoginStyle";
import { useState } from "react";
import Naver from "../../components/naverLogin/Naver";
import NaverLogin from "../../components/naverLogin/Naver";


interface LoginData {
  email: string;
  password: string;
  // nickname: string;
  [key: string]: string;
}

// 이메일 : regex(정규식) 확인 (예시: abc@example.com).
const validateEmail = (email: string) => {
  return email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

// 비밀번호 : 숫자+영문자+특수문자 조합으로 8자리 이상 입력
const validatePwd = (password: string) => {
  return password
    .toLowerCase()
    .match(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/);
};
const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
const REDIRECT_URL = process.env.REACT_APP_KAKAO_REDIRECT_URL;
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URL}&response_type=code`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [nickname, setNickname] = useState("");
  const [warning, setWaring] = useState(0);

  const isEmailValid = validateEmail(email);
  const isPwdValid = validatePwd(password);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.length) setWaring(1);
    else if (!password.length) setWaring(2);
    else if (!(isEmailValid && isPwdValid)) setWaring(3);
  };
  const naverUrl=process.env.REACT_APP_NAVER_URL

 
 
  return (
    <LoginLayout>
      <div className="inner">
        <TopCon>
          <img src={logo} alt="chair coach" />
          <form onSubmit={handleSubmit}>
            <F.InputText
              type="text"
              value={email}
              placeholder="이메일"
              onChange={(e) => setEmail(e.target.value)}
            />
            <F.InputText
              type="password"
              value={password}
              placeholder="비밀번호"
              onChange={(e) => setPassword(e.target.value)}
            />

            {warning === 1 && (
              <F.WarningText>이메일을 입력해주세요.</F.WarningText>
            )}

            {warning === 2 && (
              <F.WarningText>비밀번호를 입력해주세요.</F.WarningText>
            )}

            {warning === 3 && (
              <F.WarningText lineHeight="true">
                이메일 또는 비밀번호를 잘못 입력했습니다.
                <br />
                입력하신 내용을 다시 확인해주세요.
              </F.WarningText>
            )}

            <S.LoginBtn type="submit">로그인</S.LoginBtn>
          </form>
        </TopCon>

        <BottomCon>
          <p>간편로그인</p>
          <ul>
            <li>
              <button>구글</button>
              <span>구글</span>
            </li>
            <li>
              <a href={KAKAO_AUTH_URL}>
                <button>카카오</button>
                </a>
                <span>카카오</span>
              
            </li>
            <li>
              <a href={naverUrl}>
              <button>네이버</button>
              </a>
              
          
              <span>네이버</span>
            </li>
          </ul>
        </BottomCon>
      </div>
    </LoginLayout>
  );
};

export default Login;
