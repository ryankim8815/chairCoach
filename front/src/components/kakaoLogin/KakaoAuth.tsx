import { AxiosResponse } from "axios";
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
  const getPermissonCode = async () => {
    const params = new URL(window.location.href).searchParams;
    const code: string | null = params.get("code");
    const res = await Api.post("kakao", {
      code: code,
    });
    console.log("res", res);
  };

  useEffect(() => {
    getPermissonCode();
  }, []);

  return <div>로그인</div>;
};

export default KakaoAuth;
