import logo from '../../assets/img/logo.svg'

// style
import * as S from '../../styles/BtnStyle';
import * as F from '../../styles/InputStyle'
import { LoginLayout, TopCon, BottomCon } from './LoginStyle';

const Login = () => {
  return (
    <LoginLayout>
      <section>
        <div className='inner'>
          <TopCon>
            <img  src={logo} alt="chair coach" />
            <form action="">
                <F.InputText type="text" name="" id="" placeholder='이메일' />
                <F.InputText type="text" name="" id="" placeholder='비밀번호' />
                
                <F.WarningText lineHeight='true'>
                  이메일 또는 비밀번호를 잘못 입력했습니다.<br/>
                  입력하신 내용을 다시 확인해주세요.
                </F.WarningText>

              <S.LoginBtn>로그인</S.LoginBtn>
            </form>
          </TopCon>

          <BottomCon>
            <p>간편로그인</p>
            <ul>
              <li>
                <button>구글</button>
                <span>구글</span>
              </li>
              <li>
                <button>카카오</button>
                <span>카카오</span>
              </li>
              <li>
                <button>네이버</button>
                <span>네이버</span>
              </li>
            </ul>
          </BottomCon>
        </div>
      </section>

      
    </LoginLayout>
  )
}

export default Login
