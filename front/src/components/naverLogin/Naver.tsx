import React from 'react'
import { useEffect } from 'react';

const { naver }= window as any;


const Naver = (props:any) => {
    const initializeNaverLogin = () => {
        const naverLogin = new naver.LoginWithNaverId({
          clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
          callbackUrl: process.env.REACT_APP_NAVER_REDIRECT_URL,
          isPopup: false, // popup 형식으로 띄울것인지 설정
          loginButton: { color: 'white', type: 1, height: '60' }, //버튼의 스타일, 타입, 크기를 지정
        });
        naverLogin.init();
      };
        
      useEffect(() => {
        initializeNaverLogin();
      }, []);
  return (
    <div id='naverIdLogin'>
      
    </div>
  )
}

export default Naver
