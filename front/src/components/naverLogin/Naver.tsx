import axios from 'axios';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as Api from '../../api/api'
const NaverLogin = () => {
    const getNaverToken = async () => {
      console.log(1)
        const token = window.location.href.split('=')[1].split('&')[0];
        const state= window.location.href.split('=')[2]
        console.log('네이버코드',token);
        console.log('보낼스테이트',state);
        console.log('req',{
          code:token,
          state:state
        })
       const res=await Api.post('naver',{
        code:token,
        state:state
       })
       console.log('res',res)
    };

    useEffect(() => {
        getNaverToken();
    }, []);


	return (
        <div>
			네이버로그인
        </div>
	)
}

export default NaverLogin;
