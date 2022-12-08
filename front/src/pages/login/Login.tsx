
import { useNavigate } from 'react-router-dom';

import logo from "../../assets/img/logo.svg";


import * as S from "../../styles/BtnStyle";
import * as F from "../../styles/InputStyle";
import { LoginLayout, TopCon, BottomCon } from "./LoginStyle";
import { useState } from "react";
import Naver from "../../components/naverLogin/Naver";
import NaverLogin from "../../components/naverLogin/Naver";

import * as RegExp from "../../utils/RegExp"

import { useSetRecoilState } from "recoil";
import userState from './../../atoms/user';
import * as Api from "../../api/api";


// interface LoginData {
//   email: string;
//   password: string;
//   [key: string]: string;
// }

const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
const REDIRECT_URL = process.env.REACT_APP_KAKAO_REDIRECT_URL;
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URL}&response_type=code`;

const Login = () => {
  const navigate = useNavigate(); 
  const setUser = useSetRecoilState(userState);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWaring] = useState("");

  const isEmailValid = RegExp.validateEmail(email);
  const isPwdValid = RegExp.validatePwd(password);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.length) setWaring("email");
    else if (!password.length) setWaring("password");
    else if (!(isEmailValid && isPwdValid)) setWaring("invalidInput");

    try{
      const res = await Api.post("signin", {
        email: email,
        password: password,
      });
      console.log(res.data);
      console.log(res.data.user_id);
      
      const jwtToken = res.data.token;
      if(res.data.result){
        // 토큰 저장
        sessionStorage.setItem("userToken", jwtToken);

        const newUser = {
          id: res.data.user_id,
          nickname: res.data.nickname,
        }
        setUser(newUser);
        navigate('/');
      }else{
        setWaring("invalidInput");
        setUser(null);
      }
    }catch(err){
      console.log(err)
    }
  };

  const naverUrl=process.env.REACT_APP_NAVER_URL
  const googleUrl=process.env.REACT_APP_GOOGLE_URL
 
 
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

            <S.LoginBtn type="submit">로그인</S.LoginBtn>
          </form>
        </TopCon>

        <BottomCon>
          <p>간편 로그인</p>
          <ul>
            <li>
              <a href={googleUrl}>
              <button>구글</button>
              </a>
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
