import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Paper, Typography, Button } from '@mui/material';
import { Log } from '../utils/logger';

export default function Redirector(){
  const { code } = useParams();
  useEffect(()=>{
    const mappings = JSON.parse(localStorage.getItem('url_mappings_v1')||'[]');
    const found = mappings.find(m => m.shortcode===code || (m.shortUrl && m.shortUrl.endsWith('/'+code)));
    if(!found){
      Log('frontend','warn','page',`Redirect attempted for missing code ${code}`);
      return;
    }
    const now = new Date();
    if(new Date(found.expiresAt) < now){
      Log('frontend','warn','page',`Redirect attempted for expired code ${code}`);
      return;
    }
    found.clicks = found.clicks || [];
    found.clicks.push({ ts: new Date().toISOString(), referrer: document.referrer || '', userAgent: navigator.userAgent || '' });
    localStorage.setItem('url_mappings_v1', JSON.stringify(mappings));
    Log('frontend','info','page',`Redirect recorded for ${code}`);
    window.location.replace(found.longUrl);
  },[code]);

  return (
    <Box sx={{ mt:6 }}>
      <Paper sx={{ p:4, textAlign:'center' }}>
        <Typography variant="h6">Redirecting...</Typography>
        <Button variant="contained" component={Link} to="/">Go Home</Button>
      </Paper>
    </Box>
  );
}
