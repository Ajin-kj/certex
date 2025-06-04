"use client";

import React from "react";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";
import NavBar from "@/components/NavBar/NavBar";
import { usePathname } from "next/navigation";
import Footer from "@/components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh", // Full viewport height
        }}
      >
        <AuthProvider>
          {/* Conditionally render NavBar */}
          {pathname !== "/login" && <NavBar />}
          
          <div style={{ flexGrow: 1 }}>
            {children}
          </div>
          
          {pathname !== "/login" && <Footer />}

          {/* Toast Container for toast notifications */}
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
      </body>
    </html>
  );
};

export default RootLayout;
