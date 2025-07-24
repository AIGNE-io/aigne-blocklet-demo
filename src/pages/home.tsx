import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

import aigneLogo from '../assets/aigne-hub.svg';
import blockletLogo from '../assets/blocklet.svg';
import api from '../libs/api';
import './home.css';

function Home() {
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState<{
    type: 'info' | 'error' | 'success';
    message: string;
  }>({
    type: 'info',
    message: '',
  });

  async function getChatData(message: string) {
    try {
      setLoading(true);
      const response = await api.post('/api/chat', { message });
      setResult({
        type: 'success',
        message: response.data.result.text,
      });
    } catch (error) {
      console.error('error', error);
      setResult({
        type: 'error',
        message: 'Error fetching chat data',
      });
    } finally {
      setLoading(false);
    }
  }

  const handleSend = () => {
    if (inputValue.trim()) {
      getChatData(inputValue);
      setInputValue(''); // 清空输入框
    }
  };

  return (
    <>
      <div>
        <a href="https://www.arcblock.io/docs/blocklet-developer/getting-started" target="_blank" rel="noreferrer">
          <img src={blockletLogo} className="logo blocklet" alt="Blocklet logo" />
        </a>
        <a href="https://hub.aigne.io" target="_blank" rel="noreferrer">
          <img src={aigneLogo} className="logo aigne" alt="Aigne logo" />
        </a>
      </div>
      <h1>Blocklet + AIGNE Hub</h1>
      <Box className="card" sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', width: '500px' }}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder="请输入测试消息..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={loading}
          />
          <Button variant="contained" onClick={handleSend} disabled={loading || !inputValue.trim()}>
            发送
          </Button>
        </Box>
        {loading && <Skeleton variant="text" sx={{ fontSize: '1rem', width: '300px' }} animation="wave" />}
        {result.message && (
          <Alert icon={false} severity={loading ? 'info' : result.type} sx={{ width: '500px' }}>
            {result.message}
          </Alert>
        )}
      </Box>
    </>
  );
}

export default Home;
