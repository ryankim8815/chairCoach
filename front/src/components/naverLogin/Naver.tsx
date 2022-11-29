import axios from 'axios';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as Api from '../../api/api'
const NaverLogin = () => {
    const getNaverToken = async () => {
        const params = new URL(window.location.href).searchParams;
        const code = params.get('code')
        const state= params.get('state')
        console.log('네이버코드',code);
        console.log('보낼스테이트',state);
        console.log('req',{
          code:code
        })
       const res=await Api.post('naver',{
        code:code,
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
