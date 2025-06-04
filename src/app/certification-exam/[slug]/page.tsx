"use client"
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Box, CircularProgress, Typography, Button, Chip, Paper, Divider, Alert, Link } from "@mui/material";
import { Calendar, ExternalLink } from "lucide-react";
import SimilarCertifications from "@/components/ExamDetailsComponets/SimilarExamsByProviderSection";
import NominationFormModal from "@/components/ExamDetailsComponets/NominationFormModal"; // Import Modal
import styles from "./page.module.css";
import { fetchCertificationDetails } from "@/api/certification-exam-details";
import { fetchPendingActionForCertification } from "@/api/fetchPendingActionForCertification"; // Import the new dummy API

interface CertificationData {
  id: string;
  providerName: string;
  certificationName: string;
  level: string;
  description: string;
  tags: string[];
  officialLink: string;
  critical: string;
  views: number;
  requiredCount: string;
  currentCount: string;
  nomination_status: string;
  nomination_open_date: string;
  nomination_close_date: string;
  examSelectableMonthFrom: string;
  examSelectableMonthTo: string;
}

const CertificationExamPage = () => {
  const params = useParams();
  const [certificationData, setCertificationData] = useState<CertificationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false); // Manage modal open state
  const [pendingActionId, setPendingActionId] = useState<string | null>(null); // Store pending action ID
  const [hasApplied, setHasApplied] = useState(false); // Track if user has already applied

  const [provider, id] = (params.slug as string).split("-");

  useEffect(() => {
    const fetchCertificationDetailsFromAPI = async () => {
      try {
        const certDetails = await fetchCertificationDetails(id);
        setCertificationData(certDetails);

        // Check if the employee has already applied for this certification
        const employeeId = "2"; // Mock employee ID, replace with actual logic to get employee ID
        const certId= "101";
        const response = await fetchPendingActionForCertification(employeeId, certId);

        if (response.status === "success") {
          setHasApplied(true);
          setPendingActionId(response.pendingActionId || null);
        }
      } catch (error) {
        console.error("Error fetching certification details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificationDetailsFromAPI();
  }, [id]);

  const handleCardClick = (id: string) => {
    window.location.href = `/certification-exam/${provider}-${id}`;
  };

  const handleNominateClick = () => {
    setModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setModalOpen(false); // Close the modal
  };

  if (loading) {
    return (
      <Box className={styles.loadingContainer}>
  <CircularProgress color="primary" />
  <Typography variant="h6" className={styles.loadingText}>
    Loading certification details...
  </Typography>
</Box>
    );
  }

  if (!certificationData) {
    return (
      <Box className={styles.errorContainer}>
        <Typography variant="h6">Certification not found</Typography>
      </Box>
    );
  }

  const isNominationClosed = new Date(certificationData.nomination_close_date) < new Date();

  // Limit description to 50 words
  const description = certificationData.description.split(" ").slice(0, 50).join(" ") + (certificationData.description.split(" ").length > 50 ? "..." : "");

  return (
    <Box className={styles.container}>
      <Box className={styles.mainSection}>
        <Paper elevation={0} className={styles.certificationDetails}>
          <Box className={styles.header}>
            <Typography variant="h5" component="h1" className={styles.certificationName}>
              {certificationData.certificationName}
            </Typography>
            <Chip
              label={certificationData.level}
              color={certificationData.level === "Expert" ? "error" : certificationData.level === "Intermediate" ? "primary" : "success"}
              className={styles.levelChip}
            />
          </Box>

          <Box className={styles.providerInfo}>
            <Typography variant="h6" color="text.secondary" className={styles.providerName}>
              {certificationData.providerName}
            </Typography>
          </Box>

          <Box className={styles.description}>
            <Typography variant="body1">{description}</Typography>
          </Box>

          <Box className={styles.tags}>
            {certificationData.tags.map((tag, index) => (
              <Chip key={index} label={tag} variant="outlined" size="small" className={styles.tag} />
            ))}
          </Box>

          <Divider className={styles.divider} />

          <Box className={styles.nominationInfo}>
            <Box className={styles.infoItem}>
              <Calendar className={styles.icon} />
              {hasApplied ? (
                <Typography variant="body2">
                  You have already applied for this certification, for more details{" "}
                  <Link href={`/pending-action/${pendingActionId}`} color="primary">
                    click here
                  </Link>.
                </Typography>
              ) : (
                <Typography variant="body2">
                  Nomination Open until {new Date(certificationData.nomination_close_date).toLocaleDateString()}
                </Typography>
              )}
            </Box>
          </Box>

          <Box className={styles.actions}>
            <Button variant="contained" color="primary" disabled={isNominationClosed || hasApplied} onClick={handleNominateClick} className={styles.nominateButton}>
              Nominate for Certification
            </Button>
            <Button variant="outlined" startIcon={<ExternalLink size={16} />} href={certificationData.officialLink} target="_blank" rel="noopener noreferrer">
              Visit Official Page
            </Button>
          </Box>

          {isNominationClosed && (
            <Alert severity="warning" className={styles.alert}>
              Nominations for this certification have been closed. Contact L&D for help.
            </Alert>
          )}
        </Paper>
      </Box>

      <Box className={styles.similarSection}>
        <SimilarCertifications providerName={provider} currentId={id} onCardClick={handleCardClick} />
      </Box>

      {/* Add Nomination Modal here */}
      <NominationFormModal
        open={modalOpen}
        onClose={handleCloseModal}
        id={certificationData.id}
        certificationName={certificationData.certificationName}
        examSelectableMonthFrom={certificationData.examSelectableMonthFrom}
        examSelectableMonthTo={certificationData.examSelectableMonthTo}
      />
    </Box>
  );
};

export default CertificationExamPage;
