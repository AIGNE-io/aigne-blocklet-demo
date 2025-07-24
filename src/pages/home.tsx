import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Skeleton from '@mui/material/Skeleton';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';

import aigneLogo from '../assets/aigne-hub.svg';
import blockletLogo from '../assets/blocklet.svg';
import api from '../libs/api';
import './home.css';

function Home() {
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [connected, setConnected] = useState(false);
  const [result, setResult] = useState<{
    type: 'info' | 'error' | 'success';
    message: string;
  }>({
    type: 'info',
    message: '',
  });

  const checkAigneConnection = async () => {
    try {
      const response = await api.get('/api/check');
      setConnected(response.data.connected);
    } catch (error) {
      setConnected(false);
    }
  };

  useEffect(() => {
    checkAigneConnection();
  }, []);

  async function getChatData(message: string) {
    try {
      setLoading(true);
      const response = await api.post('/api/chat', { message });
      setResult({
        type: 'success',
        message: response.data.result.text,
      });
    } catch (error) {
      const errorResponse = error?.response?.data?.error;
      setResult({
        type: 'error',
        message: errorResponse || 'Error fetching chat data',
      });
    } finally {
      setLoading(false);
    }
  }

  const handleSend = () => {
    const value = inputValue.trim();
    if (value) {
      getChatData(value);
      setInputValue(''); // 清空输入框
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSend();
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
      <Box className="card" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', width: '500px' }}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder="请输入测试消息..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={loading}
          />
          <Button variant="contained" onClick={handleSend} disabled={loading || !inputValue.trim()}>
            发送
          </Button>
        </Box>
        <Alert icon={false} severity={connected ? 'success' : 'error'} sx={{ width: '500px', textAlign: 'left' }}>
          {connected ? (
            'Aigne Hub 连接成功, 您可以使用 AI 助手了'
          ) : (
            <>
              Aigne Hub 连接失败, 请前往{' '}
              <Link href=".well-known/service/admin/aigne" target="_blank" rel="noreferrer">
                配置页面
              </Link>{' '}
              进行配置
            </>
          )}
        </Alert>
        {loading && <Skeleton variant="text" sx={{ fontSize: '1rem', width: '300px' }} animation="wave" />}
        {result.message && !loading && (
          <Alert icon={false} severity={loading ? 'info' : result.type} sx={{ width: '500px', textAlign: 'left' }}>
            {result.message}
          </Alert>
        )}
      </Box>
    </>
  );
}

export default Home;
