import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import userState from "./../../atoms/user";
import ResignMembership from "./ResignMembership";

import * as S from "./HeaderStyle";
import { AiFillCaretDown } from "react-icons/ai";
import { AiFillCaretUp } from "react-icons/ai";

const LoginMenu = () => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);

  const [isResignMembership, setIsResignMembership] = useState(false);

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
    sessionStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsMenuVisible(!isMenuVisible);
    navigate("/");
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
            <button onClick={() => setIsResignMembership(true)}>
              회원 탈퇴
            </button>
          </li>
        </ul>
      )}

      {isResignMembership && (
        <ResignMembership
          isResignMembership={isResignMembership}
          setIsResignMembership={setIsResignMembership}
        />
      )}
    </S.LoginMenuContent>
  );
};

export default LoginMenu;
