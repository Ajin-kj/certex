import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation"; // Using Next.js useRouter hook

interface CertificationCardProps {
  id: number; // Added id prop for certification ID
  providerName: string;
  certificationName: string;
  level: string;
  tags: string[];
  officialLink: string;
  onClick: () => void; // Function to handle click event
}

const CertificationCard: React.FC<CertificationCardProps> = ({
  id, // Destructure id to use it in the component
  providerName,
  certificationName,
  level,
  tags,
  onClick,
}) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "green";
      case "Intermediate":
        return "blue";
      case "Advanced":
        return "red";
      default:
        return "grey";
    }
  };

  const router = useRouter();

  // Handle Card Click to Open Popup and Update URL without navigation
  const handleCardClick = () => {
    onClick(); // Trigger the modal to show
  };

  return (
    <Card
      sx={{
        width: "26.5vw", // Slightly increased card width
        borderRadius: "8px", // Reduced radius for a cleaner look
        border: "1px solid #dcdcdc", // Outline for better visibility
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        cursor: "pointer",
        transition: "transform 0.3s ease-in-out",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          transform: "scale(1.01)",
          boxShadow: "0 2px 2px rgba(0, 0, 0, 0.15)",
        },
      }}
      onClick={handleCardClick}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "6px", // Reduced gap to decrease card height
          padding: "12px", // Adjusted padding for tighter spacing
        }}
      >
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{ fontWeight: "bold", fontSize: "14px" }}
        >
          {providerName}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "text.primary",
            fontSize: "16px", // Adjust font size to balance space
          }}
        >
          {certificationName}
        </Typography>
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: "bold",
            color: getLevelColor(level),
          }}
        >
          {level}
        </Typography>
        <Box display="flex" flexWrap="wrap" gap="6px" mt="0.5rem">
          {tags.map((tag, index) => (
            <Typography
              key={index}
              variant="caption"
              sx={{
                fontWeight: "bold",
                color: "grey", // Retained the original color for tags
                fontSize: "12px", // Adjusted tag font size
              }}
            >
              {tag}
              {index < tags.length - 1 && (
                <span style={{ margin: "0.3rem" }}>•</span>
              )}
            </Typography>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default CertificationCard;
