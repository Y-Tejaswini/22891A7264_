import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import URLShortenerPage from './pages/URLShortenerPage';
import URLStatisticsPage from './pages/URLStatisticsPage';
import LogsPage from './pages/LogsPage';
import Redirector from './pages/Redirector';

export default function App(){
  return (
    <>
      <AppBar position="static" sx={{ background: 'linear-gradient(90deg,#1565c0,#1976d2)' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>URL Shortener Pro</Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/stats">Stats</Button>
          <Button color="inherit" component={Link} to="/logs">Logs</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<URLShortenerPage/>} />
          <Route path="/stats" element={<URLStatisticsPage/>} />
          <Route path="/logs" element={<LogsPage/>} />
          <Route path="/:code" element={<Redirector/>} />
        </Routes>
      </Container>
    </>
  );
}
