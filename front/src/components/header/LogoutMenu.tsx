import { Link } from 'react-router-dom';
import * as S from './HeaderStyle';

const LogoutMenu = () => {
  return (
    <S.LogoutMenuContent>
        <ul>
          <li><Link to='/login'>로그인</Link></li>
          <li><Link to='/register'>회원가입</Link></li>
      </ul>
    </S.LogoutMenuContent>
  );
};

export default LogoutMenu;