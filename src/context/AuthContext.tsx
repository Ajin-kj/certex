"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { PublicClientApplication, EventType, AccountInfo } from "@azure/msal-browser";
import { msalConfig } from "../config/msalConfig";
import { fetchExtendedUserData } from "../lib/graphApi";
import { syncEmployeeData } from "@/hooks/useEmployeeSync";
import { fetchProfilePicture } from "@/hooks/useProfilePicture";
import { useRouter } from "next/navigation";

let msalInstance: PublicClientApplication;

interface AuthContextType {
  user: AccountInfo | null;
  dbUser: any; // Employee details from the backend
  token: string | null;
  profilePic: string | null;
  setUser: React.Dispatch<React.SetStateAction<AccountInfo | null>>;
  setDbUser: React.Dispatch<React.SetStateAction<any>>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  dbUser: null,
  token: null,
  profilePic: null,
  setUser: () => {},
  setDbUser: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AccountInfo | null>(null);
  const [dbUser, setDbUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const initMsal = async () => {
      msalInstance = new PublicClientApplication(msalConfig);
      await msalInstance.initialize();

      // Retrieve existing account from local storage or cache
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        msalInstance.setActiveAccount(parsedUser);
        setUser(parsedUser);
      } else {
        const accounts = msalInstance.getAllAccounts();
        if (accounts.length > 0) {
          const account = accounts[0];
          msalInstance.setActiveAccount(account);
          setUser(account);
        }
      }

      msalInstance.addEventCallback((event) => {
        if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
          const account = event.payload as AccountInfo;
          msalInstance.setActiveAccount(account);
          setUser(account);
          localStorage.setItem("user", JSON.stringify(account));
        }
      });

      if (msalInstance.getActiveAccount()) {
        // Retrieve extended data from Graph API
        const graphData = await fetchExtendedUserData(msalInstance);
        console.log("Graph Data Retrieved:", graphData);
        
        // Prepare employee DTO based on available Graph data
        const employeeDto = {
          FirstName: graphData.userProfile.givenName,
          LastName: graphData.userProfile.surname,
          Email: graphData.userProfile.mail || graphData.userProfile.userPrincipalName,
          SSOEmployeeId: graphData.userProfile.id,
          Designation: graphData.userProfile.jobTitle || "",
          Department: graphData.userProfile.department || "",
          // Include manager info if available
          ManagerSSOEmployeeId: graphData.managerProfile?.id || null,
        };

        // Sync employee data with the backend (this will also create/update manager if needed)
        try {
          const syncResponse = await syncEmployeeData(employeeDto);
          // Expecting: { dbEmployee, token }
          setDbUser(syncResponse.dbEmployee);
          setToken(syncResponse.token);
          localStorage.setItem("authToken", syncResponse.token);
        } catch (syncError) {
          console.error("Error syncing employee data", syncError);
        }

        // Fetch and set the user’s profile picture from Azure AD
        const picUrl = await fetchProfilePicture(msalInstance);
        setProfilePic(picUrl);
      }

      setLoading(false);
    };

    initMsal();

    return () => {
      msalInstance?.getActiveAccount();
    };
  }, []);

  const logout = async () => {
    try {
      if (!msalInstance) {
        throw new Error("MSAL is not initialized");
      }
      await msalInstance.logoutPopup();
      setUser(null);
      setDbUser(null);
      setToken(null);
      setProfilePic(null);
      localStorage.removeItem("user");
      localStorage.removeItem("authToken");
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, dbUser, token, profilePic, setUser, setDbUser, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
