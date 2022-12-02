import { useNavigate, Link } from 'react-router-dom';
import logo from '../../assets/img/logo.svg'
import * as S from './FooterStyle';

const Footer = () => {
  const navigate = useNavigate(); 

  return (
    <S.FooterLayout>
      <div className='inner'>
        <S.TopContent>
          <h1 onClick={()=>navigate('/')}><img  src={logo} alt="chair coach" /></h1>
          <ul>
            <li><Link to='/chaircoach'>체어코치</Link></li>
            <li><Link to='/necksurvey'>거북목진단</Link></li>
          </ul>
        </S.TopContent>

        <S.CopyRightText>&copy; 2022. CHAIRCOACH all rights reserved.</S.CopyRightText>
      </div>
    </S.FooterLayout>
  )
}

export default Footer
