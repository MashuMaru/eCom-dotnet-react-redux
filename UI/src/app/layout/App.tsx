import './styles.css'
import Header from "./Header.tsx";
import {Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {useEffect, useState} from "react";
import {Outlet} from "react-router-dom";
import {useStoreContext} from "../context/Context.tsx";
import getCookie from "../util/util.ts";
import agent from "../api/agent.ts";
import Loading from "./Loading.tsx";

function App() {
  const { setBasket } = useStoreContext();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const buyerId = getCookie('buyerId');
    if (buyerId) {
      agent.Basket.get()
        .then(basket => setBasket(basket))
        .catch(error => console.log(error))
        .finally(() => setLoading(false))
    }
  }, [setBasket]);
  
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
  
  if (loading) return <Loading message="Initialising..." />
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header handleDarkMode={(value: boolean) => setDarkMode(value)} />
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  )
}

export default App
