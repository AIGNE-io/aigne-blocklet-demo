import Footer from '@blocklet/ui-react/lib/Footer';
import Header from '@blocklet/ui-react/lib/Header';
import { Box, Container } from '@mui/material';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box display="flex" flexDirection="column" height="100vh" overflow="hidden">
      <Header maxWidth="lg" />
      <Container maxWidth="lg">{children}</Container>
      <Footer />
    </Box>
  );
}
