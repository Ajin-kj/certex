import React from "react";
import { Box, Typography } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed", // Fixed position at the bottom
        bottom: 0,
        backgroundColor: "#ffff",
        borderTop: "1px solid #e0e0e0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "5px 0", // Padding for better spacing
        zIndex: 10, // Make sure it's above other content
      }}
    >
      <Typography variant="body2" sx={{ color: "#333", fontSize: "10px" }}>
        @Copyright Experion
      </Typography>
    </Box>
  );
};

export default Footer;
