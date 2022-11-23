import GlobalStyles from "./styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import theme from './styles/Theme';

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/header/Header';
import Footer from "./components/footer/Footer";
import Main from "./pages/main/Main";
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import NeckSurvey from "./pages/necksurvey/NeckSurvey";
import ChairCoach from "./pages/chaircoach/ChairCoach";
import SurveyResult from "./pages/surveyresult/SurveyResult";
import AboutNeck from "./pages/aboutneck/AboutNeck";
import NeckGuide from "./pages/neckGuide/NeckGuide";
import NeckInspection from "./pages/neckInspection/NeckInspection";
import SingUp from './pages/singUp/SingUp';
import UserInfoChange from "./pages/userInfoChange/UserInfoChange";

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
            <Route path="/userInfoChange" element={<UserInfoChange />} />
          </Routes>
          <Footer/>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
