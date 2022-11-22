import { useNavigate, Link } from 'react-router-dom';
import NavLogoutStyle from './NavLogoutStyle';


const NavLogout = () => {
  return (
    <NavLogoutStyle>
        <ul>
          <li><Link to='/login'>로그인</Link></li>
          <li><Link to='/register'>회원가입</Link></li>
      </ul>
    </NavLogoutStyle>
  );
};

export default NavLogout;