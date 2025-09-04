import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableHead, TableRow, Chip } from '@mui/material';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export default function URLStatisticsPage(){
  const [list,setList] = useState([]);
  useEffect(()=>{
    setList(JSON.parse(localStorage.getItem('url_mappings_v1')||'[]'));
  },[]);

  const data = list.map(l=>({ name: l.shortUrl.split('/').pop(), clicks: l.clicks.length }));

  return (
    <div>
      <Card sx={{ borderRadius:3, boxShadow:6 }}>
        <CardContent>
          <Typography variant="h5">📊 URL Statistics</Typography>
          <Table sx={{ mt:2 }}>
            <TableHead>
              <TableRow><TableCell>Short</TableCell><TableCell>Original</TableCell><TableCell>Created</TableCell><TableCell>Expires</TableCell><TableCell>Clicks</TableCell></TableRow>
            </TableHead>
            <TableBody>
              {list.map(l=>(
                <TableRow key={l.id}>
                  <TableCell>{l.shortUrl}</TableCell>
                  <TableCell style={{maxWidth:250, overflow:'hidden', textOverflow:'ellipsis'}}>{l.longUrl}</TableCell>
                  <TableCell>{new Date(l.createdAt).toLocaleString()}</TableCell>
                  <TableCell>{new Date(l.expiresAt).toLocaleString()}</TableCell>
                  <TableCell>{l.clicks.length}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="clicks" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
