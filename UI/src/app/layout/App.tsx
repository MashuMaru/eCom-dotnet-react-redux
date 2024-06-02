import './styles.css'
import Header from "./Header.tsx";
import {Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {useEffect, useState} from "react";
import {Outlet} from "react-router-dom";
import agent from "../api/agent.ts";
import Loading from "./Loading.tsx";
import {getCookie} from "../util/util.ts";
import {useAppDispatch} from "../store/configureStore.ts";
import {setBasket} from "../../features/basket/basketSlice.ts";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const buyerId = getCookie('buyerId');
    if (buyerId) {
      agent.Basket.get()
        .then(basket => dispatch(setBasket(basket)))
        .catch(error => console.log(error))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
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
      <Container sx={{ mb: 5 }}>
        <Outlet />
      </Container>
    </ThemeProvider>
  )
}

export default App
