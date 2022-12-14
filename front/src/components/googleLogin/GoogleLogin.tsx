import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import * as Api from "../../api/api";
import userState from "../../atoms/user";
const GoogleLogin = () => {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);
  const getGoogleToken = async () => {
    const params = new URL(window.location.href).searchParams;
    const code = params.get("code");
    if (code === null) return;
    const res = await Api.post("google", {
      code: code,
    });
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
    getGoogleToken();
  }, []);

  return <div>googleLogin</div>;
};

export default GoogleLogin;
