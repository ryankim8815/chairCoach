import GlobalStyles from './styles/GlobalStyle';
import { ThemeProvider } from "styled-components";
import theme from './styles/Theme';

import Header from './components/header/Header';

function App() {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <Header/>
      </ThemeProvider>
    </>
  );
}

export default App;
