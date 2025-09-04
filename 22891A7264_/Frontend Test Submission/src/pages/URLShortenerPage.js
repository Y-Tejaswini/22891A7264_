import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Grid, TextField, Button, Chip } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { shortenURL } from '../api/api';
import { Log } from '../utils/logger';

export default function URLShortenerPage(){
  const [rows, setRows] = useState([{ longUrl:'', mins:'30', code:'' }]);
  const [links, setLinks] = useState([]);

  useEffect(()=>{
    const stored = JSON.parse(localStorage.getItem('url_mappings_v1')||'[]');
    setLinks(stored);
  },[]);

  const addRow = ()=> {
    if(rows.length>=5) return;
    setRows([...rows, { longUrl:'', mins:'30', code:'' }]);
  };

  const updateRow = (i, field, val)=>{
    const next = rows.slice();
    next[i][field]=val;
    setRows(next);
  };

  const handleShorten = async ()=>{
    try {
      for(const r of rows){
        if(!r.longUrl || !(r.longUrl.startsWith('http://')||r.longUrl.startsWith('https://'))) {
          await Log('frontend','error','component','Invalid URL entered by user');
          alert('Please enter valid http/https URLs');
          return;
        }
      }
      const created=[];
      for(const r of rows){
        const payload = { id: uuidv4(), longUrl: r.longUrl, mins: Number(r.mins)||30, custom: r.code||'' };
        const res = await shortenURL(payload);
        const map = { ...res, createdAt: new Date().toISOString(), expiresAt: new Date(Date.now()+ (payload.mins*60000)).toISOString(), clicks: [] };
        created.push(map);
      }
      const all = [...links, ...created];
      localStorage.setItem('url_mappings_v1', JSON.stringify(all));
      setLinks(all);
      await Log('frontend','info','page',`Created ${created.length} short url(s)`);
      alert('Short links created successfully');
    } catch(e){
      await Log('frontend','fatal','page','Shorten action failed');
      alert('Operation failed');
    }
  };

  return (
    <Box>
      <Card sx={{ borderRadius:3, boxShadow:6 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>🔗 Shorten URLs</Typography>
          <Typography variant="body2" sx={{ mb:2 }}>Add up to 5 URLs. Provide optional validity (minutes) and shortcode.</Typography>
          <Grid container spacing={2}>
            {rows.map((r,i)=>(
              <React.Fragment key={i}>
                <Grid item xs={12} md={6}>
                  <TextField label={`Long URL #${i+1}`} fullWidth value={r.longUrl} onChange={(e)=>updateRow(i,'longUrl',e.target.value)} />
                </Grid>
                <Grid item xs={6} md={3}>
                  <TextField label="Validity (min)" fullWidth value={r.mins} onChange={(e)=>updateRow(i,'mins',e.target.value)} />
                </Grid>
                <Grid item xs={6} md={3}>
                  <TextField label="Shortcode (opt)" fullWidth value={r.code} onChange={(e)=>updateRow(i,'code',e.target.value)} />
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
          <Box mt={2} display="flex" gap={2}>
            <Button variant="outlined" onClick={addRow} disabled={rows.length>=5}>+ Add Row</Button>
            <Button variant="contained" onClick={handleShorten}>🚀 Create Short Links</Button>
          </Box>
        </CardContent>
      </Card>

      <Box mt={3}>
        <Typography variant="h6">Created Links</Typography>
        {links.length===0 && <Typography variant="body2">No links yet</Typography>}
        {links.map(l=>(
          <Card key={l.id} sx={{ mt:1, p:1 }}>
            <CardContent>
              <Chip label={`Clicks: ${l.clicks.length}`} />
              <Typography sx={{ mt:1 }}><strong>Short:</strong> <a href={l.shortUrl}>{l.shortUrl}</a></Typography>
              <Typography><strong>Original:</strong> <a href={l.longUrl} target="_blank" rel="noreferrer">{l.longUrl}</a></Typography>
              <Typography variant="caption">Expires: {new Date(l.expiresAt).toLocaleString()}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
