"use client";
import React, { useState, useEffect } from "react";
import { Button, Typography, Box, CircularProgress } from "@mui/material";
import { fetchUserProfile, saveUserProfile } from "@/api/UserProfileApi"; // Mock API functions
import ProfileForm from "@/components/ProfileComponents/ProfileForm";

const ProfilePage: React.FC = () => {
  const [userData, setUserData] = useState<any>(null); // Stores the user data
  const [loading, setLoading] = useState(true); // Loading state
  const [saveStatus, setSaveStatus] = useState<string>(""); // Save status ("", "saving", "success")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUserProfile(); // Fetch user profile data
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSave = async (updatedData: any) => {
    try {
      setSaveStatus("saving"); // Show "saving" message
      await saveUserProfile(updatedData); // Save updated profile data via API
      setUserData(updatedData); // Update the displayed user data
      setSaveStatus("success"); // Show "success" message after saving
    } catch (error) {
      console.error("Error saving profile:", error);
      setSaveStatus("error"); // Handle error (optional)
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" gutterBottom>
          User Profile
        </Typography>
      </Box>

      <ProfileForm
        userData={userData}
        onSave={handleSave}
      />

      {/* Save button and save status message */}
      <Box display="flex" justifyContent="flex-start" alignItems="center" marginTop={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleSave(userData)}
        >
          Save
        </Button>

        {/* Conditional message display based on save status */}
        {saveStatus === "saving" && (
          <Typography variant="body1" color="textSecondary" style={{ marginLeft: "10px" }}>
            Saving...
          </Typography>
        )}
        {saveStatus === "success" && (
          <Typography variant="body1" color="primary" style={{ marginLeft: "10px" }}>
            Profile updated successfully
          </Typography>
        )}
        {saveStatus === "error" && (
          <Typography variant="body1" color="error" style={{ marginLeft: "10px" }}>
            Error Saving Data
          </Typography>
        )}
      </Box>
    </div>
  );
};

export default ProfilePage;
