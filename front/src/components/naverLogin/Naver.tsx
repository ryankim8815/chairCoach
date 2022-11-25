import React from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const { naver }= window as any;



const Naver = (props:any) => {
  const location=useLocation();
    const initializeNaverLogin = () => {
        const naverLogin = new naver.LoginWithNaverId({
          clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
          callbackUrl: process.env.REACT_APP_NAVER_REDIRECT_URL,
          isPopup: false, // popup 형식으로 띄울것인지 설정
          loginButton: { color: 'white', type: 1, height: '60' }, //버튼의 스타일, 타입, 크기를 지정
        });
        naverLogin.init();
      };
      const getNaverToken=()=>{
        if(!location.hash) return;
        const token=location.hash.split('='[1].split('&')[0]);
        console.log('네이버토큰',token)
      }
        
      useEffect(() => {
        initializeNaverLogin();
        getNaverToken();
      }, []);
  return (
    <div id='naverIdLogin'>
      네이버로그인중
    </div>
  )
}

export default Naver
