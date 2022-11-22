import { Link } from 'react-router-dom';

// style
import { RegisterLayout, LeftCon, TopWrap, BottomWrap, RightCon } from './RegisterStyle'
import * as S from '../../styles/BtnStyle';

const Register = () => {
  return (
    <RegisterLayout>
      <section>
        <div className='inner'>
          <LeftCon>
            <TopWrap>
              <p>회원 가입</p>

              <h2>
                오늘부터,<br />
                <span>CHAIR COACH</span>
              </h2>

              <S.MiddleBtn>이메일로 시작하기</S.MiddleBtn>
            </TopWrap>

            <BottomWrap>
              <p>간편가입</p>

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

              <p className='loginText'>이미 회원이시라면, <Link to='/login'>로그인</Link> 하세요!</p>
            </BottomWrap>
          </LeftCon>

          <RightCon>
            이미지
          </RightCon>
        </div>
      </section>
    </RegisterLayout>
  )
}

export default Register
