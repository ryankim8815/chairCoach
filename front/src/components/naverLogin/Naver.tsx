import axios from 'axios';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as Api from '../../api/api'
const NaverLogin = () => {
  
	const { naver } = window as any;

	const initializeNaverLogin = () => {
		const naverLogin = new naver.LoginWithNaverId({
			clientId:process.env.REACT_APP_NAVER_CLIENT_ID,
			callbackUrl: process.env.REACT_APP_NAVER_REDIRECT_URL,
          // 팝업창으로 로그인을 진행할 건지?           
			isPopup: false,
			loginButton: { color: 'white', type: 1, height: 45, width: 45 },
			callbackHandle: true,
		});
		naverLogin.init();
	};

    //이렇게 하면 토큰 추출 가능하고 리다이렉션 페이지가 빠르고 깨끗하게 처리된다고 해서 추가함 이 토큰 갖고 네이버 기능 완성하면 됨
    //네이버는 유저 정보를 클라이언트에 직접 주지 않는다. 백엔드에 엑세스 토큰을 넘기고 백엔드가 유저 api를 만들어주면 거기서 따로 호출해야 한다. 
    const location = useLocation();

    const getNaverToken = async () => {
        if (!location.hash) return;
        const token = window.location.href.split('=')[1].split('&')[0];
        const state= window.location.href.split('=')[2].split('&')[0];
        console.log(token);
        console.log(state);
        //api 쓸 곳
       const res=await Api.post('naver',{
        token:token,
        state:state,
       })
       console.log('제발2',res)
    };

    useEffect(() => {
        initializeNaverLogin();
        getNaverToken();
    }, []);


	return (
        <>
			<div id="naverIdLogin"></div>
        </>
	)
}

export default NaverLogin;
