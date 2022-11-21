import GlobalStyles from './styles/GlobalStyle';
import { ThemeProvider } from "styled-components";
import theme from './styles/Theme';


import Header from './components/header/Header';


import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from './pages/mainpage/MainPage';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import NeckSurvey from './pages/necksurvey/NeckSurvey';

function App() {
  return (
    <>
    <BrowserRouter>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <Header/>
        <Routes>
          <Route path='/' element={<MainPage/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/necksurvey' element={<NeckSurvey/>}/>
          <Route path='/' element={<MainPage/>}/>
          <Route path='/' element={<MainPage/>}/>
        </Routes>
      </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
