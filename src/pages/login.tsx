import { Box, Button, Typography } from '@mui/material';

import aigneLogo from '../assets/aigne-hub.svg';
import { useSessionContext } from '../libs/session';

export default function Login() {
  const { session } = useSessionContext() as { session: any };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        height: '100vh',
      }}>
      <img src={aigneLogo} className="aigne" alt="Aigne logo" width={100} />
      <Typography variant="h1">You are not logged in, please click to login</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          session.login();
        }}>
        Login
      </Button>
    </Box>
  );
}
