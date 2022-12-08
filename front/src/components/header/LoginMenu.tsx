import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import userState from './../../atoms/user';
import * as Api from "../../api/api";
import * as S from './HeaderStyle';

import { AiFillCaretDown } from "react-icons/ai";
import { AiFillCaretUp } from "react-icons/ai";

const LoginMenu = () => {
  const navigate = useNavigate(); 
  const [user, setUser] = useRecoilState(userState);
  const [isMenuVisible, setIsMenuVisible ] = useState(false);

  const handleruserInfoChangeClick = () => {
    navigate('/userInfoChange');
    setIsMenuVisible(!isMenuVisible);
  }

  const handlerlogoutClick = () => {
    setUser(null);
    sessionStorage.removeItem('userToken');
    setIsMenuVisible(!isMenuVisible);
    navigate('/');
  }

  // 회원탈퇴
  const handlerResignMembershipClick = async(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const resignMembership = window.confirm('정말로 탈퇴하시겠습니까?');

    if(resignMembership){
      if(user){
        const res = await Api.get(`users/${user.id}`);

        if(res.data.result){
          setUser(null);
          sessionStorage.removeItem('userToken');
          navigate('/');
        }
      }
    }

    setIsMenuVisible(!isMenuVisible);
  }
  
  return (
    <S.LoginMenuContent>
      <button onClick={()=>setIsMenuVisible(!isMenuVisible)}>
        <span>{user?.nickname}</span>님
        {isMenuVisible ? <AiFillCaretUp/> : <AiFillCaretDown/>}
      </button>
      {
        isMenuVisible &&
        <ul>
          <li><button onClick={handleruserInfoChangeClick}>회원정보 변경</button></li>
          <li><button onClick={handlerlogoutClick}>로그아웃</button></li>
          <li><button onClick={handlerResignMembershipClick}>회원 탈퇴</button></li>
        </ul>
      }
    </S.LoginMenuContent>
  );
};

export default LoginMenu;