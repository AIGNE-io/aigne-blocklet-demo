import { ThemeProvider } from '@arcblock/ux/lib/Theme';
import { useMemo } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Layout from './layout';
import { SessionProvider, useSessionContext } from './libs/session';
import Home from './pages/home';
import Login from './pages/login';

function App() {
  const { session } = useSessionContext() as { session: any };

  const isLogin = useMemo(() => {
    return !!session?.user;
  }, [session]);

  if (!isLogin) {
    return <Login />;
  }

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default function WrappedApp() {
  // While the blocklet is deploy to a sub path, this will be work properly.
  const basename = window?.blocklet?.prefix || '/';

  return (
    <ThemeProvider>
      <SessionProvider>
        <Layout>
          <Router basename={basename}>
            <App />
          </Router>
        </Layout>
      </SessionProvider>
    </ThemeProvider>
  );
}
