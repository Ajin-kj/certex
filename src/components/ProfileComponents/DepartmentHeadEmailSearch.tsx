import React, { useState, useEffect } from "react";
import { TextField, Autocomplete } from "@mui/material";
import { fetchDepartmentHeadEmails } from "@/api/UserProfileApi"; // Mock API function

interface DepartmentHeadEmailSearchProps {
  value: string;
  onChange: (email: string) => void;
  disabled: boolean;
}

const DepartmentHeadEmailSearch: React.FC<DepartmentHeadEmailSearchProps> = ({ value, onChange, disabled }) => {
  const [emails, setEmails] = useState<string[]>([]);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const fetchedEmails = await fetchDepartmentHeadEmails(); // Fetch department head email suggestions
        setEmails(fetchedEmails);
      } catch (error) {
        console.error("Error fetching department head emails:", error);
      }
    };

    fetchEmails();
  }, []);

  return (
    <Autocomplete
      value={value || ""} // If no email provided, keep it empty
      onChange={(_, newValue) => onChange(newValue || "")}
      options={emails}
      renderInput={(params) => (
        <TextField {...params} label="Department Head Email" variant="outlined" fullWidth disabled={disabled} />
      )}
      disableClearable={disabled} // Prevent clearable icon when disabled
    />
  );
};

export default DepartmentHeadEmailSearch;
