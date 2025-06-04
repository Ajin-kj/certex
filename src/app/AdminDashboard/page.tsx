"use client";

import React from "react";
import AuthGuard from "@/AuthGuard/AuthGard";

const AdminDashboard: React.FC = () => {
  return (
    <>
    <AuthGuard>
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1>Admin Dashboard</h1>
        <p>Welcome to the Admin Dashboard!</p>
      </div>
      </AuthGuard>
    </>
  );
};

export default AdminDashboard;
