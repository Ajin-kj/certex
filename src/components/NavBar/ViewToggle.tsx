"use client";

import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useRouter } from "next/navigation";

interface ViewToggleProps {
  view: string;
  setView: (newView: string) => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ view, setView }) => {
  const router = useRouter();

  const handleViewChange = (_: React.MouseEvent<HTMLElement>, newView: string | null) => {
    if (newView) {
      setView(newView);
      router.push(newView === "admin" ? "/AdminDashboard" : "/");
    }
  };

  return (
    <ToggleButtonGroup
      value={view}
      exclusive
      onChange={handleViewChange}
      sx={{
        "& .MuiToggleButton-root": {
          textTransform: "none",
          fontSize: "14px",
          padding: "5px 15px",
          height: "32px",
          border: "1px solid #d0d0d0",
          color: "#4a4a4a", // Neutral text color for all buttons
          "&:hover": {
            backgroundColor: "#f5f5f5", // Slight hover effect
          },
        },
        "& .Mui-selected": {
          border: "1px solid #b0b0b0", // Neutral gray outline for selected state
          backgroundColor: "#e8e8e8", // Subtle background for selected state
          color: "#333", // Darker text color for selected state
          fontWeight: "bold", // Add bold text for selected state
        },
      }}
    >
      <ToggleButton value="user">
        <PersonIcon fontSize="small" sx={{ mr: 0.5 }} />
        User
      </ToggleButton>
      <ToggleButton value="admin">
        <AdminPanelSettingsIcon fontSize="small" sx={{ mr: 0.5 }} />
        Admin
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ViewToggle;
