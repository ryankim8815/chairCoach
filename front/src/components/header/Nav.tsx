import { useNavigate, Link } from 'react-router-dom';

// style
import * as S from '../../styles/BtnStyle';
import { NavLayout } from './HeaderStyle'

const Nav = () => {
  const navigate = useNavigate(); 

  return (
    <NavLayout>
      <ul>
        <li><Link to='/chaircoach'>체어코치</Link></li>
        <li><Link to='/aboutneck'>거북목진단</Link></li>
        <li><S.SmallBtn onClick={()=>navigate('/')}>마이페이지</S.SmallBtn></li>
      </ul>
    </NavLayout>
  );
};

export default Nav;