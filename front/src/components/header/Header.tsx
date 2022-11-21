import logo from '../../assets/img/logo.svg'
import { HeaderCon } from './HeaderStyle'

const Header = () => {
  return (
    <HeaderCon>
      <div className='inner'>
        <h1><img src={logo} alt="chair coach" /></h1>
        <nav>
          <ul>
            <li>체어코치</li>
            <li>거북목진단</li>
            <li><button>마이페이지</button></li>
          </ul>
        </nav>

        <div className='login'>
          <ul>
            <li>로그인</li>
            <li>회원가입</li>
          </ul>
        </div>
      </div>
    </HeaderCon>
  )
}

export default Header
