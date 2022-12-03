import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import userState from './../../atoms/user';

// style
import { LoginMenuCon } from './HeaderStyle';

// react-icons
import { AiFillCaretDown } from "react-icons/ai";
import { AiFillCaretUp } from "react-icons/ai";

const LoginMenu = () => {
  const [user, setUser] = useRecoilState(userState);
  const [userMenu, setUserMenu] = useState(false);

  const handlerlogoutClick = async() => {
    setUser(null);
    sessionStorage.removeItem('userToken');
  }
  
  return (
    <LoginMenuCon>
      <button onClick={()=>setUserMenu(!userMenu)}>
        <span>{String(user)}</span>님
        {userMenu ? <AiFillCaretUp/> : <AiFillCaretDown/>}
      </button>
      {
        userMenu &&
        <ul>
          <li><Link to='/userInfoChange'>회원정보 변경</Link></li>
          <li><Link to='/' onClick={handlerlogoutClick}>로그아웃</Link></li>
          <li><Link to='/'>회원 탈퇴</Link></li>
        </ul>
      }
    </LoginMenuCon>
  );
};

export default LoginMenu;