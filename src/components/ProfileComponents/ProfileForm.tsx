import React, { useState, useEffect } from "react";
import { Grid, TextField, Button } from "@mui/material";
import ManagerSearch from "./ManagerEmailSearch";
import DepartmentHeadSearch from "./DepartmentHeadEmailSearch";

interface ProfileFormProps {
  userData: any;
  onSave: (updatedData: any) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ userData, onSave }) => {
  const [formData, setFormData] = useState<any>(userData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handling manager email change
  const handleManagerEmailChange = (email: string) => {
    setFormData({ ...formData, managerEmail: email });
  };

  // Handling department head email change
  const handleDepartmentHeadEmailChange = (email: string) => {
    setFormData({ ...formData, departmentHeadEmail: email });
  };


  useEffect(() => {
    setFormData(userData);
  }, [userData]);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName || ""}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName || ""}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Designation"
            name="designation"
            value={formData.designation || ""}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Department"
            name="department"
            value={formData.department || ""}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        {/* Manager Email - This field should be editable, but only show the list of options */}
        <Grid item xs={12} md={6}>
          <ManagerSearch
            value={formData.managerEmail || ""}
            onChange={handleManagerEmailChange}
            disabled={false} // Allow the user to select and update the manager email
          />
        </Grid>

        {/* Department Head Email - This field should be editable, but only show the list of options */}
        <Grid item xs={12} md={6}>
          <DepartmentHeadSearch
            value={formData.departmentHeadEmail || ""}
            onChange={handleDepartmentHeadEmailChange}
            disabled={false} // Allow the user to select and update the department head email
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfileForm;
