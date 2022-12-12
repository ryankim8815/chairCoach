import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

import { userState } from "./../../atoms/user";
import * as Api from "../../api/api";
import * as FixModal from "../../utils/FixModalScroll";
import * as B from "../../styles/BtnStyle";
import * as F from "../../styles/InputStyle";
import * as S from "./ResignMembershipStyle";

interface ResignMembershipType {
  isResignMembership: boolean;
  setIsResignMembership: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResignMembership = ({
  isResignMembership,
  setIsResignMembership,
}: ResignMembershipType) => {
  const navigate = useNavigate();

  useEffect(() => {
    FixModal.disableScroll();
    return () => FixModal.enableScroll();
  }, []);

  const [user, setUser] = useRecoilState(userState);
  const [currentPw, setCurrentPw] = useState("");

  const handlerResignMembershipClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    if (!user) return;
    // try {
    //   const res = await Api.delete(`users/${user.id}`, {
    //     password: currentPw,
    //   });
    //   console.log(res);

    //   if (res.data.result) {
    //     setUser(null);
    //     sessionStorage.removeItem("userToken");
    //     navigate("/");
    //   }
    // } catch (err) {
    //   alert(
    //     "입력하신 비밀번호가 일치하지 않습니다.\n다시 한 번 확인해 주세요."
    //   );
    //   setCurrentPw("");
    // }
    try {
      await Api.delete(`users/${user.id}`, {
        password: currentPw,
      }).then((res) => {
        sessionStorage.removeItem("userToken");
        window.location.replace("/");
      });
    } catch (err) {
      alert(
        "입력하신 비밀번호가 일치하지 않습니다.\n다시 한 번 확인해 주세요."
      );
      setCurrentPw("");
    }
  };

  return (
    <S.ResignMembershipLayout>
      <S.ResignMembershipContent>
        <h3>
          <span>{user?.nickname}</span>님의 몸을 위해
          <br />
          한번만 더 생각해주세요!
        </h3>
        <p>
          탈퇴하시면 지금껏 운동한 데이터가 다 사라지고
          <br />
          복구도 불가능 합니다.
        </p>

        <S.InputWrap>
          <p>현재 비밀번호</p>
          <F.InputText
            type="password"
            value={currentPw}
            placeholder="현재 비밀번호를 입력해주세요."
            onChange={(e) => setCurrentPw(e.target.value)}
          />
        </S.InputWrap>

        <strong>정말로 탈퇴하시겠습니까?</strong>
        <S.btnWrap>
          <B.CheckBtn onClick={() => setIsResignMembership(false)}>
            아니오
          </B.CheckBtn>
          <B.CheckBtn check="true" onClick={handlerResignMembershipClick}>
            탈퇴하기
          </B.CheckBtn>
        </S.btnWrap>
      </S.ResignMembershipContent>
    </S.ResignMembershipLayout>
  );
};

export default ResignMembership;
