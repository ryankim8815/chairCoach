import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// style
import NavLoginStyle from './NavLoginStyle';

// react-icons
import { AiFillCaretDown } from "react-icons/ai";
import { AiFillCaretUp } from "react-icons/ai";

const NavLogin = () => {
  const [userMenu, setUserMenu] = useState(false);
  
  return (
    <NavLoginStyle>
      <button onClick={()=>setUserMenu(!userMenu)}>누구님 {userMenu ? <AiFillCaretUp/> : <AiFillCaretDown/>}</button>
      {
        userMenu &&
        <ul>
          <li><Link to='/'>회원정보 변경</Link></li>
          <li><Link to='/'>로그아웃</Link></li>
          <li><Link to='/'>회원 탈퇴</Link></li>
        </ul>
      }
    </NavLoginStyle>
  );
};

export default NavLogin;