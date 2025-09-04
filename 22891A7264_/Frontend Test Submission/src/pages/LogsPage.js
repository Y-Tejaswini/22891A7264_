import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { motion } from 'framer-motion';

function levelColor(level){
  if(level==='info') return 'success';
  if(level==='debug') return 'primary';
  if(level==='warn') return 'warning';
  if(level==='error' || level==='fatal') return 'error';
  return 'default';
}

export default function LogsPage(){
  const [logs, setLogs] = useState([]);

  useEffect(()=>{
    const stored = JSON.parse(localStorage.getItem('appLogs')||'[]');
    setLogs(stored.slice().reverse());
  },[]);

  return (
    <div>
      <Typography variant="h5" sx={{ mb:2 }}>📝 Application Logs</Typography>
      <Box display="grid" gap={2}>
        {logs.map((log)=>(
          <motion.div key={log.id} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:0.25}}>
            <Card sx={{ borderRadius:2, boxShadow:3 }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Chip label={log.level.toUpperCase()} color={levelColor(log.level)} size="small" sx={{ mr:1 }} />
                    <Typography variant="subtitle2" component="span" sx={{ ml:1 }}>{log.package} • {log.stack}</Typography>
                  </Box>
                  <Typography variant="caption">{new Date(log.time).toLocaleString()}</Typography>
                </Box>
                <Typography sx={{ mt:1 }}>{log.message}</Typography>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Box>
    </div>
  );
}
