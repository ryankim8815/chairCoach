import { AxiosResponse } from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import * as Api from "../../api/api";
import userState from "../../atoms/user";

const KakaoAuth = () => {
  const navigate = useNavigate();
  const getPermissonCode = async () => {
    const params = new URL(window.location.href).searchParams;
    const code: string | null = params.get("code");
    console.log("코드", code);
    const res = await Api.post("kakao", {
      code: code,
    });
    console.log("res", res);
    navigate("/");
  };

  useEffect(() => {
    getPermissonCode();
  }, []);

  return <div>로그인</div>;
};

export default KakaoAuth;
