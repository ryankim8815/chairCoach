import { useNavigate, Link } from 'react-router-dom';
import logo from '../../assets/img/logo.svg'
import { FooterLayout, TopCon, CopyRightText } from './FooterStyle';

const Footer = () => {
  const navigate = useNavigate(); 

  return (
    <FooterLayout>
      <div className='inner'>
        <TopCon>
          <h1 onClick={()=>navigate('/')}><img  src={logo} alt="chair coach" /></h1>
          <ul>
            <li><Link to='/chaircoach'>체어코치</Link></li>
            <li><Link to='/necksurvey'>거북목진단</Link></li>
          </ul>
        </TopCon>

        <CopyRightText>&copy; 2022. CHAIRCOACH all rights reserved.</CopyRightText>
      </div>
    </FooterLayout>
  )
}

export default Footer
