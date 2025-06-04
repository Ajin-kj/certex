"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    // Only check if the user is authenticated when MSAL is initialized and user data is set
    if (user !== null) {
      setCheckingAuth(false); // Done checking authentication
    } else {
      router.push("/login"); // Redirect to login page if not authenticated
    }
  }, [user, router]);

  // Prevent rendering the page until authentication is checked
  if (checkingAuth) {
    return null; // Optionally, you can show a loading indicator here
  }

  return <>{children}</>;
};

export default AuthGuard;
