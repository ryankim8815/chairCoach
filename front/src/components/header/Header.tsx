import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userState from "./../../atoms/user";

import Nav from "./Nav";
import LogoutMenu from "./LogoutMenu";
import LoginMenu from "./LoginMenu";

import logo from "../../assets/img/logo.svg";
import * as S from "./HeaderStyle";

const Header = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  return (
    <S.HeaderLayout>
      <div className="inner">
        <div className="left">
          <h1 onClick={() => navigate("/")}>
            <img src={logo} alt="chair coach" />
          </h1>
          <Nav />
        </div>

        {user ? <LoginMenu /> : <LogoutMenu />}
      </div>
    </S.HeaderLayout>
  );
};

export default Header;
