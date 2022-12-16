import { AxiosResponse } from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import * as Api from "../../api/api";
import userState from "../../atoms/user";

const KakaoAuth = () => {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);
  const getPermissonCode = async () => {
    const params = new URL(window.location.href).searchParams;
    const code: string | null = params.get("code");
    const res = await Api.post("kakao", {
      code: code,
    });
    const accessToken = res.data.accessToken;
    const refreshToken = res.data.refreshToken;
    sessionStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    const newUser = {
      id: res.data.user_id,
      nickname: res.data.nickname,
    };
    setUser(newUser);
    navigate("/");
  };

  useEffect(() => {
    getPermissonCode();
  }, []);

  return <div>로그인</div>;
};

export default KakaoAuth;
