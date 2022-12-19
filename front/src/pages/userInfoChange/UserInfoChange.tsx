import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";

import userState from "./../../atoms/user";
import LoginChairCoach from "../../components/userInfoChange/LoginChairCoach";
import LoginSNS from "../../components/userInfoChange/LoginSNS";
import * as S from "../signUp/SignUpStyle";
import * as Api from "../../api/api";

const UserInfoChange = () => {
  const [user, setUser] = useRecoilState(userState);
  const [provider, setProvider] = useState("");

  useEffect(() => {
    const getApi = async () => {
      if (!user) return;
      const res = await Api.get(`users/${user.id}`);
      setProvider(res.data.provider);
    };
    getApi();
  }, []);

  return (
    <S.SignUpLayout>
      <h2>회원정보 변경</h2>

      {user && provider === "chairCoach" && (
        <LoginChairCoach user={user} setUser={setUser} />
      )}

      {user && provider !== "chairCoach" && (
        <LoginSNS user={user} setUser={setUser} provider={provider} />
      )}
    </S.SignUpLayout>
  );
};

export default UserInfoChange;
