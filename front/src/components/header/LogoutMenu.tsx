import { Link } from 'react-router-dom';

// style
import { LogoutMenuCon } from './HeaderStyle';


const LogoutMenu = () => {
  return (
    <LogoutMenuCon>
        <ul>
          <li><Link to='/login'>로그인</Link></li>
          <li><Link to='/register'>회원가입</Link></li>
      </ul>
    </LogoutMenuCon>
  );
};

export default LogoutMenu;