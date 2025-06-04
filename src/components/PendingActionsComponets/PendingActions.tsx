// PendingActionsTable.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useRouter } from "next/navigation"; // For navigation to the pending-action page
import { fetchPendingActions } from "../../api/pendingactions"; // Import the simulated fetch function
import PendingActionCard from "./PendingActionCard"; // Import the new card component
import styles from "./PendingActionsTable.module.css"; // Import the CSS module for styling
import InfoIcon from '@mui/icons-material/Info'; // Import the Info icon from Material UI

interface PendingAction {
  id: number;
  certificationName: string;
  remarks: string;
  provider: string;
}

const PendingActionsTable: React.FC = () => {
  const [pendingActions, setPendingActions] = useState<PendingAction[]>([]);
  const router = useRouter();

  // Fetching pending actions from the simulated API
  useEffect(() => {
    const getPendingActions = async () => {
      try {
        const data = await fetchPendingActions();
        setPendingActions(data);
      } catch (error) {
        console.error("Error fetching pending actions:", error);
      }
    };

    getPendingActions();
  }, []);

  // Handle card click to navigate to the pending-action details page
  const handleCardClick = (id: number) => {
    router.push(`/pending-action/${id}`); // Navigate to the pending-action page with the corresponding ID as the slug
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Typography variant="h6" className={styles.title}>
          Pending Actions ({pendingActions.length})
        </Typography>
      </div>

      <div className={styles.cardsContainer}>
        {pendingActions.length === 0 ? (
          <div className={styles.noPendingActionsContainer}>
            <InfoIcon className={styles.noPendingActionsIcon} />
            <Typography variant="body2" color="textSecondary" className={styles.noPendingActionsText}>
              No pending actions
            </Typography>
          </div>
        ) : (
          pendingActions.map((action) => (
            <PendingActionCard
              key={action.id}
              id={action.id}
              certificationName={action.certificationName}
              remarks={action.remarks}
              provider={action.provider}
              onClick={handleCardClick} // Pass click handler to card component
            />
          ))
        )}
      </div>
    </div>
  );
};

export default PendingActionsTable;
