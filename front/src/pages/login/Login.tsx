import logo from "../../assets/img/logo.svg";

import * as B from "../../styles/BtnStyle";
import * as F from "../../styles/InputStyle";
import * as S from "./LoginStyle";
import { useState } from "react";
import Naver from "../../components/naverLogin/Naver";
import NaverLogin from "../../components/naverLogin/Naver";

import * as RegExp from "../../utils/RegExp";

import { useSetRecoilState } from "recoil";
import userState from "./../../atoms/user";
import * as Api from "../../api/api";

const Login = () => {
  const setUser = useSetRecoilState(userState);
  const KAKAO_AUTH_URL = process.env.REACT_APP_KAKAO_URL;
  const naverUrl = process.env.REACT_APP_NAVER_URL;
  const googleUrl = process.env.REACT_APP_GOOGLE;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWaring] = useState("");
  const isEmailValid = RegExp.validateEmail(email);
  const isPwdValid = RegExp.validatePwd(password);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.length) {
      setWaring("email");
      return;
    } else if (!password.length) {
      setWaring("password");
      return;
    } else if (!(isEmailValid && isPwdValid)) {
      setWaring("invalidInput");
      return;
    }
    try {
      const res = await Api.post("signin", {
        email: email,
        password: password,
      });

      if (res.data.result) {
        // 토큰 저장
        const jwtToken = res.data.accessToken;
        const refreshToken = res.data.refreshToken;
        sessionStorage.setItem("accessToken", jwtToken);
        localStorage.setItem("refreshToken", refreshToken);
        const newUser = {
          id: res.data.user_id,
          nickname: res.data.nickname,
        };
        setUser(newUser);
        window.location.replace("/");
      }
    } catch (err) {
      setWaring("invalidInput");
      setUser(null);
    }
  };
  return (
    <S.LoginLayout>
      <div className="inner">
        <S.TopCon>
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

            {warning === "email" && (
              <F.WarningText>이메일을 입력해주세요.</F.WarningText>
            )}

            {warning === "password" && (
              <F.WarningText>비밀번호를 입력해주세요.</F.WarningText>
            )}

            {warning === "invalidInput" && (
              <F.WarningText lineHeight="true">
                이메일 또는 비밀번호를 잘못 입력했습니다.
                <br />
                입력하신 내용을 다시 확인해주세요.
              </F.WarningText>
            )}

            <B.LoginBtn type="submit">로그인</B.LoginBtn>
          </form>
        </S.TopCon>

        <S.BottomCon>
          <p>간편 로그인</p>
          <ul>
            <li>
              <a href={googleUrl}>구글</a>
              <span>구글</span>
            </li>
            <li>
              <a href={KAKAO_AUTH_URL}>카카오</a>
              <span>카카오</span>
            </li>
            <li>
              <a href={naverUrl}>네이버</a>
              <span>네이버</span>
            </li>
          </ul>
        </S.BottomCon>
      </div>
    </S.LoginLayout>
  );
};

export default Login;
