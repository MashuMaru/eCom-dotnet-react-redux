import './styles.css'
import Catalog from '../../features/catalog/Catalog';
import Header from "./Header.tsx";
import {Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {useState} from "react";

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const paletteType = darkMode ? 'dark' : 'light'
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  });
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header handleDarkMode={(value: boolean) => setDarkMode(value)} />
      <Container>
          <Catalog />
      </Container>
    </ThemeProvider>
  )
}

export default App
