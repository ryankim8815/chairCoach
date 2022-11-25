import GlobalStyles from "./styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import theme from './styles/Theme';

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/header/Header';
import Footer from "./components/footer/Footer";
import Main from "./pages/Amain/Main";
import Login from './pages/Alogin/Login';
import Register from './pages/Aregister/Register';
import NeckSurvey from "./pages/AneckSurvey/NeckSurvey";
import ChairCoach from "./pages/AchairCoach/ChairCoach";
import SurveyResult from "./pages/AsurveyResult/SurveyResult";
import AboutNeck from "./pages/AaboutNeck/AboutNeck";
import NeckGuide from "./pages/AneckGuide/NeckGuide";
import NeckInspection from "./pages/AneckInspection/NeckInspection";
import InspectionResult from "./pages/AinspectionResult/InspectionResult";
import SingUp from './pages/AsingUp/SingUp';
import UserInfoChange from "./pages/AuserInfoChange/UserInfoChange";
import KakaoAuth from "./components/kakaoLogin/KakaoAuth";




function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalStyles />
        <ThemeProvider theme={theme}>
          <Header/>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/singup' element={<SingUp/>}/>
            <Route path='/necksurvey' element={<NeckSurvey/>}/>
            <Route path='/chaircoach' element={<ChairCoach/>}/>
            <Route path="/surveyresult" element={<SurveyResult />} />
            <Route path="/aboutneck" element={<AboutNeck />} />
            <Route path="/neckguide" element={<NeckGuide/>}/>
            <Route path="/neckinspection" element={<NeckInspection/>}/>
            <Route path='/inspectionresult' element={<InspectionResult/>}/>
            <Route path="/userInfoChange" element={<UserInfoChange />} />
            <Route path="login/oauth2/code/kakao" element={<KakaoAuth />} />

          </Routes>
          <Footer/>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
