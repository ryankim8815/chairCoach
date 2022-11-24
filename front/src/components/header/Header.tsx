import { useNavigate } from 'react-router-dom';
import logo from '../../assets/img/logo.svg'

import Nav from './Nav';
import LogoutMenu from './LogoutMenu';
import LoginMenu from './LoginMenu';

// style
import { HeaderLayout } from './HeaderStyle';


const Header = () => {
  const navigate = useNavigate(); 
  return (
    <HeaderLayout>
      <div className='inner'>
        <div className='left'>
          <h1 onClick={()=>navigate('/')}><img  src={logo} alt="chair coach" /></h1>
          <Nav/>
        </div>

        <LoginMenu/>
        <LogoutMenu/>
      </div>
    </HeaderLayout>
  )
}

export default Header
