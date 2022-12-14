import axios from "axios";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import * as Api from "../../api/api";
import userState from "../../atoms/user";
const NaverLogin = () => {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);
  const getNaverToken = async () => {
    const params = new URL(window.location.href).searchParams;
    const code = params.get("code");
    const state = params.get("state");
    console.log("네이버코드", code);
    console.log("보낼스테이트", state);
    console.log("req", {
      code: code,
    });
    const res = await Api.post("naver", {
      code: code,
    });
    console.log("res", res);
    const userToken = res.data.token;
    sessionStorage.setItem("userToken", userToken);
    const newUser = {
      id: res.data.user_id,
      nickname: res.data.nickname,
    };
    setUser(newUser);
    navigate("/");
  };

  useEffect(() => {
    getNaverToken();
  }, []);

  return <div>네이버로그인</div>;
};

export default NaverLogin;
