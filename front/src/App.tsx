import GlobalStyles from "./styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import theme from './styles/Theme';

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/header/Header';
import Footer from "./components/footer/Footer";

import Main from "./pages/main/Main";
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import NeckSurvey from './pages/necksurvey/NeckSurvey';
import ChairCoach from './pages/chaircoach/ChairCoach';
import SurveyResult from "./pages/surveyresult/SurveyResult";

import styled from "styled-components";
const ContentLayout = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  min-height: calc(100vh - 64px - 172px);
  margin-top: 64px;
`;

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalStyles />
        <ThemeProvider theme={theme}>
          <Header/>
          <ContentLayout>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/necksurvey' element={<NeckSurvey/>}/>
              <Route path='/chaircoach' element={<ChairCoach/>}/>
              <Route path="/surveyresult" element={<SurveyResult />} />
            </Routes>
          </ContentLayout>
          <Footer/>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
