import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import * as Api from "../../api/api";
import userState from "../../atoms/user";

interface LoginData {
    email: string;
    password: string;
    nickname: string;
  
    [key: string]: string;
  }
  

const KakaoAuth = () => {
    const navigate = useNavigate();
    const setUser=useSetRecoilState(userState);
    const [code, setCode] = useState("");

    const kakaoLogin = async (_code:any) => {
        console.log(_code)
            if (!_code) return;
            const res = await Api.post("kakao", {code: _code});
            
            const kakaoUser = res.data;
            const kakaoToken = kakaoUser.token;

            sessionStorage.setItem("userToken", kakaoToken);
            setUser(kakaoUser);
            navigate("/");
        };
        const getPermissonCode = () => {
            console.log(1)
            const params = new URL(window.location.href).searchParams;
            console.log(params)
            const _code:any = params.get("code");
            if (!code) {
                kakaoLogin(_code);
            }
            setCode(_code);
        }
      
        useEffect(()=> {
          getPermissonCode();
        }, [])


    return (
        <div>로그인</div>
    )
}

export default KakaoAuth;
