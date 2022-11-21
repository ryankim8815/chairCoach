import GlobalStyles from './../styles/InputSytle';
import { ThemeProvider } from "styled-components";
import theme from './../styles/Theme';

function App() {
  return (
      <ThemeProvider theme={theme}>
        <div>
          <GlobalStyles />
        </div>
      </ThemeProvider>
  );
}

export default App;
