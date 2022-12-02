import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import userState from './../../atoms/user';
import * as S from './HeaderStyle';
import { AiFillCaretDown } from "react-icons/ai";
import { AiFillCaretUp } from "react-icons/ai";

const LoginMenu = () => {
  const [user, setUser] = useRecoilState(userState);
  const [isMenuVisible, setIsMenuVisible ] = useState(false);

  const handlerlogoutClick = async() => {
    setUser(null);
    sessionStorage.removeItem('userToken');
  }
  
  return (
    <S.LoginMenuContent>
      <button onClick={()=>setIsMenuVisible(!isMenuVisible)}>
        <span>{String(user)}</span>님
        {isMenuVisible ? <AiFillCaretUp/> : <AiFillCaretDown/>}
      </button>
      {
        isMenuVisible &&
        <ul>
          <li><Link to='/userInfoChange'>회원정보 변경</Link></li>
          <li><Link to='/' onClick={handlerlogoutClick}>로그아웃</Link></li>
          <li><Link to='/'>회원 탈퇴</Link></li>
        </ul>
      }
    </S.LoginMenuContent>
  );
};

export default LoginMenu;