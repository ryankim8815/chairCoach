import { useNavigate, Link } from 'react-router-dom';
import * as S from '../../styles/BtnStyle';
import NavStyle from './NavStyle';



const Nav = () => {
  const navigate = useNavigate(); 

  return (
    <NavStyle>
      <ul>
        <li><Link to='/chaircoach'>체어코치</Link></li>
        <li><Link to='/necksurvey'>거북목진단</Link></li>
        <li><S.SmallBtn onClick={()=>navigate('/')}>마이페이지</S.SmallBtn></li>
      </ul>
    </NavStyle>
  );
};

export default Nav;