// src/pages/login.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Box, Typography, Button } from "@mui/material";
import { FaMicrosoft } from "react-icons/fa6";

const LoginPage: React.FC = () => {
  const { user, setUser } = useAuth();
  const [msalInstance, setMsalInstance] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const initializeMsal = async () => {
      const msalModule = await import("@azure/msal-browser");
      const { PublicClientApplication } = msalModule;

      const instance = new PublicClientApplication({
        auth: {
          clientId: "1810b0e7-735e-4da2-86f7-066a37307c1d", // Replace with your Azure AD App client ID
          authority: "https://login.microsoftonline.com/5b751804-232f-410d-bb2f-714e3bb466eb", // Replace with your tenant ID
          redirectUri: "http://localhost:5173",
        },
      });

      await instance.initialize();
      setMsalInstance(instance);
    };

    initializeMsal();
  }, []);

  const handleLogin = async () => {
    if (!msalInstance) {
      console.error("MSAL instance is not initialized yet.");
      return;
    }

    try {
      const loginResponse = await msalInstance.loginPopup({
        scopes: ["user.read"],
      });
      setUser(loginResponse.account); // Store user data
      router.push("/"); // Redirect to home or dashboard
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/"); // Redirect to home if user is logged in
    }
  }, [user, router]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "94vh",
        backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/025/695/429/non_2x/abstract-white-background-for-design-brochure-website-flyer-minimal-white-wallpaper-for-certificate-presentation-vector.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "1rem",
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: "3rem",
          borderRadius: "12px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          maxWidth: "500px",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#1976d2", // Branding primary color
            marginBottom: "1.5rem",
          }}
        >
          Welcome to CertEx
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<FaMicrosoft />}
          onClick={handleLogin}
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            fontSize: "1rem",
            padding: "0.75rem 2rem",
            borderRadius: "24px",
          }}
        >
          Sign in with Microsoft
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
