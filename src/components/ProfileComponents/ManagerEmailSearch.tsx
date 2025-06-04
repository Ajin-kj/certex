import React, { useState, useEffect } from "react";
import { TextField, Autocomplete } from "@mui/material";
import { fetchManagerEmails } from "@/api/UserProfileApi"; // Mock API function

interface ManagerEmailSearchProps {
  value: string;
  onChange: (email: string) => void;
  disabled: boolean;
}

const ManagerEmailSearch: React.FC<ManagerEmailSearchProps> = ({ value, onChange, disabled }) => {
  const [emails, setEmails] = useState<string[]>([]);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const fetchedEmails = await fetchManagerEmails(); // Fetch manager email suggestions
        setEmails(fetchedEmails);
      } catch (error) {
        console.error("Error fetching manager emails:", error);
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
        <TextField {...params} label="Manager Email" variant="outlined" fullWidth disabled={disabled} />
      )}
      disableClearable={disabled} // Prevent clearable icon when disabled
    />
  );
};

export default ManagerEmailSearch;
