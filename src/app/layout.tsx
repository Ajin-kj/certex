'use client';

import React from 'react';
import { AuthProvider } from '@/context/AuthContext';
import './globals.css';
import NavBar from '@/components/NavBar/NavBar';
import { usePathname } from 'next/navigation';
import Footer from '@/components/Footer/Footer';
import { ToastContainer } from 'react-toastify';
import ErrorBoundary from '@/components/ErrorBoundary';
import 'react-toastify/dist/ReactToastify.css';

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  return (
    <html lang="en">
      <body
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          margin: 0,
        }}
      >
        <ErrorBoundary>
          <AuthProvider>
            {!isLoginPage && <NavBar />}
            <main style={{ flexGrow: 1 }}>{children}</main>
            {!isLoginPage && <Footer />}
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
};

export default RootLayout;