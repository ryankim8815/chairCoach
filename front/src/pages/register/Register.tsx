import { useNavigate, Link } from "react-router-dom";

// style
import {
  RegisterLayout,
  LeftCon,
  TopWrap,
  BottomWrap,
  RightCon,
} from "./RegisterStyle";
import * as S from "../../styles/BtnStyle";

const Register = () => {
  const navigate = useNavigate();
  const KAKAO_AUTH_URL = process.env.REACT_APP_KAKAO_URL;
  const naverUrl = process.env.REACT_APP_NAVER_URL;
  const googleUrl = process.env.REACT_APP_GOOGLE;
  return (
    <RegisterLayout>
      <div className="inner">
        <LeftCon>
          <TopWrap>
            <p>회원 가입</p>

            <h2>
              오늘부터,
              <br />
              <span>CHAIR COACH</span>
            </h2>

            <S.MiddleBtn onClick={() => navigate("/signup")}>
              이메일로 시작하기
            </S.MiddleBtn>
          </TopWrap>

          <BottomWrap>
            <p>간편가입</p>

            <ul>
              <li>
                <a href={googleUrl}>구글</a>
                <span>구글</span>
              </li>
              <li>
                <a href={KAKAO_AUTH_URL}>카카오</a>
                <span>카카오</span>
              </li>
              <li>
                <a href={naverUrl}>네이버</a>
                <span>네이버</span>
              </li>
            </ul>

            <p className="loginText">
              이미 회원이시라면, <Link to="/login">로그인</Link> 하세요!
            </p>
          </BottomWrap>
        </LeftCon>

        <RightCon>이미지</RightCon>
      </div>
    </RegisterLayout>
  );
};

export default Register;
