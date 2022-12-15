import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";

import GlobalStyles from "./styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import theme from "./styles/Theme";
import * as Api from "./api/api";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Main from "./pages/main/Main";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import NeckSurvey from "./pages/neckSurvey/NeckSurvey";
import ChairCoach from "./pages/chairCoach/ChairCoach";
import SurveyResult from "./pages/surveyResult/SurveyResult";
import AboutNeck from "./pages/aboutNeck/AboutNeck";
import NeckGuide from "./pages/neckGuide/NeckGuide";
import NeckInspection from "./pages/neckInspection/NeckInspection";
import InspectionResult from "./pages/inspectionResult/InspectionResult";
import SignUp from "./pages/signUp/SignUp";
import UserInfoChange from "./pages/userInfoChange/UserInfoChange";
import KakaoAuth from "./components/kakaoLogin/KakaoAuth";
import NaverLogin from "./components/naverLogin/Naver";
import MyPage from "./pages/myPage/MyPage";
import GoogleLogin from "./components/googleLogin/GoogleLogin";
import AiStretching from "./pages/aiStretching/AiStretching";
import StretchingGuide from "./pages/stretchingGuide/StretchingGuide";
import userState from "./atoms/user";
import { useEffect, useState } from "react";

function App() {
  const setUser = useSetRecoilState(userState);
  const user = useRecoilValue(userState);
  const handleStorageChange = async function () {
    let refreshToken = await localStorage.getItem("refreshToken");
    let accessToken = await sessionStorage.getItem("accessToken");
    if (!refreshToken && !accessToken) {
      setUser(null);
    } else if (refreshToken && user != null) {
    }
  };

  // 아래의 fetchCurrentUser 함수가 실행된 다음에 컴포넌트가 구현되도록 함.
  // 아래 코드를 보면 isFetchCompleted 가 true여야 컴포넌트가 구현됨.
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  const fetchCurrentUser = async () => {
    try {
      // 이전에 발급받은 토큰이 있다면, 이를 가지고 유저 정보를 받아옴.
      await Api.updateToken();
    } catch {
      console.log("%c SessionStorage에 토큰 없음.", "color: #d93d1a;");
    }
    // fetchCurrentUser 과정이 끝났으므로, isFetchCompleted 상태를 true로 바꿔줌
    setIsFetchCompleted(true);
  };
  // useEffect함수를 통해 fetchCurrentUser 함수를 실행함.
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  if (!isFetchCompleted) {
    handleStorageChange();
    return "loading...";
  }
  return (
    <RecoilRoot>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/necksurvey" element={<NeckSurvey />} />
            <Route path="/chaircoach" element={<ChairCoach />} />
            <Route path="/surveyresult" element={<SurveyResult />} />
            <Route path="/aboutneck" element={<AboutNeck />} />
            <Route path="/neckguide" element={<NeckGuide />} />
            <Route path="/neckinspection" element={<NeckInspection />} />
            <Route path="/inspectionresult" element={<InspectionResult />} />
            <Route path="/userInfoChange" element={<UserInfoChange />} />
            <Route path="/login/oauth2/code/kakao" element={<KakaoAuth />} />
            <Route path="/login/oauth2/code/naver" element={<NaverLogin />} />
            <Route path="/login/oauth2/code/google" element={<GoogleLogin />} />
            <Route path="/aistretching/:id" element={<AiStretching />} />
            <Route path="/stretchingguide/:id" element={<StretchingGuide />} />
          </Routes>
          <Footer />
        </ThemeProvider>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
