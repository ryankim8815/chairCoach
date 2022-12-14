import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import userState from "./../../atoms/user";
import * as Api from "../../api/api";
import * as S from "./HeaderStyle";

import { AiFillCaretDown } from "react-icons/ai";
import { AiFillCaretUp } from "react-icons/ai";

const LoginMenu = () => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);

  const menuRef = useRef<HTMLButtonElement>(null);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleCloseModal = (e: any) => {
    if (menuRef.current) {
      const target = menuRef.current.contains(e.target);

      if (!target) {
        setIsMenuVisible(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleCloseModal);

    return () => {
      window.removeEventListener("click", handleCloseModal);
    };
  }, []);

  const handleruserInfoChangeClick = () => {
    navigate("/userInfoChange");
    setIsMenuVisible(!isMenuVisible);
  };

  const handlerlogoutClick = () => {
    setUser(null);
    sessionStorage.removeItem("userToken");
    setIsMenuVisible(!isMenuVisible);
    navigate("/");
  };

  // 회원탈퇴
  const handlerResignMembershipClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    const resignMembership = window.confirm("정말로 탈퇴하시겠습니까?");

    if (resignMembership) {
      if (!user) return;

      const res = await Api.delete(`users/${user.id}`); // 모달창 만들고 다시 수정하기

      if (res.data.result) {
        setUser(null);
        sessionStorage.removeItem("userToken");
        navigate("/");
      }
    }

    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <S.LoginMenuContent>
      <button ref={menuRef} onClick={() => setIsMenuVisible(!isMenuVisible)}>
        <span>{user?.nickname}</span>님
        {isMenuVisible ? <AiFillCaretUp /> : <AiFillCaretDown />}
      </button>
      {isMenuVisible && (
        <ul>
          <li>
            <button onClick={handleruserInfoChangeClick}>회원정보 변경</button>
          </li>
          <li>
            <button onClick={handlerlogoutClick}>로그아웃</button>
          </li>
          <li>
            <button onClick={handlerResignMembershipClick}>회원 탈퇴</button>
          </li>
        </ul>
      )}
    </S.LoginMenuContent>
  );
};

export default LoginMenu;
