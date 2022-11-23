import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Auth from "./components/Auth/Auth";
// import useStyles from './styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Sono',
      'cursive',
    ].join(','),
  },});

const App = () => {
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
            <Container maxidth="lg">
                <Navbar />
                <Routes>
                    <Route path="/" exact element={<Home />}/>
                    <Route path="/auth" exact element={<Auth />}/>
                </Routes>
            </Container>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;