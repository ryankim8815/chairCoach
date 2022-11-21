import GlobalStyles from './styles/GlobalStyle';
import { ThemeProvider } from "styled-components";
import theme from './styles/Theme';

function App() {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <div>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
