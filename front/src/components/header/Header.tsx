import { useNavigate } from 'react-router-dom';
import logo from '../../assets/img/logo.svg'

import Nav from './Nav';
import NavLogout from './NavLogout';
import NavLogin from './NavLogin';

// style
import HeaderStyle from './HeaderStyle'


const Header = () => {
  const navigate = useNavigate(); 
  return (
    <HeaderStyle>
      <div className='inner'>
        <div className='left'>
          <h1 onClick={()=>navigate('/')}><img  src={logo} alt="chair coach" /></h1>
          <Nav/>
        </div>

        {/* <NavLogin/> */}
        <NavLogout/>
      </div>
    </HeaderStyle>
  )
}

export default Header
