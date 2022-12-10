import { RecoilRoot } from "recoil";

import GlobalStyles from "./styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import theme from "./styles/Theme";

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

function App() {
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
            <Route path="login/oauth2/code/kakao" element={<KakaoAuth />} />
            <Route path="login/oauth2/code/naver" element={<NaverLogin />} />
            <Route path="login/oauth2/code/google" element={<GoogleLogin />} />
            <Route path="/aistretching" element={<AiStretching />} />
          </Routes>
          <Footer />
        </ThemeProvider>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
