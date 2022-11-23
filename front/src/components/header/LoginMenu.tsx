import { useState } from 'react';
import { Link } from 'react-router-dom';

// style
import { LoginMenuCon } from './HeaderStyle';

// react-icons
import { AiFillCaretDown } from "react-icons/ai";
import { AiFillCaretUp } from "react-icons/ai";

const LoginMenu = () => {
  const [userMenu, setUserMenu] = useState(false);
  
  return (
    <LoginMenuCon>
      <button onClick={()=>setUserMenu(!userMenu)}>누구님 {userMenu ? <AiFillCaretUp/> : <AiFillCaretDown/>}</button>
      {
        userMenu &&
        <ul>
          <li><Link to='/userInfoChange'>회원정보 변경</Link></li>
          <li><Link to='/'>로그아웃</Link></li>
          <li><Link to='/'>회원 탈퇴</Link></li>
        </ul>
      }
    </LoginMenuCon>
  );
};

export default LoginMenu;