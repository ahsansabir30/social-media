import React from "react";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home';
import Auth from "./components/Auth/Auth";
import Chat from "./components/Chat/Chat";
// import useStyles from './styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Sono',
      'cursive',
    ].join(','),
  },});

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));

    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
            <Container maxidth="xl">
                <Navbar />
                <Routes>
                    <Route path="/" exact element={<Navigate replace to="/posts" />} />
                    <Route path="/posts" exact element={<Home />} />
                    <Route path="/posts/search" exact element={<Home />} />
                    <Route path="/posts/:id" exact element={<Chat />} />
                    <Route path="/auth" exact element={!user ? <Auth /> : <Navigate replace to="/posts"/>}/>
                </Routes>
            </Container>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;