// PendingActionCard.tsx
import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import styles from "./PendingActionsTable.module.css"; // Import the same CSS module for styling

interface PendingActionCardProps {
  id: number;
  certificationName: string;
  remarks: string;
  provider: string;
  onClick: (id: number) => void;
}

const PendingActionCard: React.FC<PendingActionCardProps> = ({ id, certificationName, remarks, provider, onClick }) => {
  return (
    <Card
      key={id}
      className={styles.card}
      onClick={() => onClick(id)} // Handle click to navigate
    >
      <CardContent>
        <Typography variant="subtitle1" className={styles.cardTitle}>
          {certificationName}
        </Typography>
        <Typography variant="body2" color="textSecondary" className={styles.cardRemarks}>
          {remarks}
        </Typography>
        <Typography variant="body2" color="textSecondary" className={styles.cardProvider}>
          Provider: {provider}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PendingActionCard;
