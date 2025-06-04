import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography, IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import CertificationCard from "@/components/CertificationCardComponets/CertificationCard";
import { fetchSimilarCertifications } from "@/api/certification-exam-details";
import styles from "./SimilarExamsByProviderSection.module.css"; // Use your custom styles

interface CertificationData {
  id: string;
  providerName: string;
  certificationName: string;
  level: string;
  tags: string[];
  officialLink: string;
}

const SimilarCertifications = ({ providerName, currentId, onCardClick }: { providerName: string; currentId: string; onCardClick: (id: string) => void }) => {
  const [similarCertifications, setSimilarCertifications] = useState<CertificationData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const certs = await fetchSimilarCertifications(providerName);
        setSimilarCertifications(certs.filter((cert) => cert.id !== currentId));  // Exclude current cert
      } catch (error) {
        console.error("Error fetching similar certifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertifications();
  }, [providerName, currentId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  // Capitalizing and bolding the provider name's first letter
  const formattedProviderName = providerName.charAt(0).toUpperCase() + providerName.slice(1);

  return (
    <Box className={styles.container}>
      {/* Title Section */}
      <Box className={styles.header}>
        <Typography variant="h6" className={styles.title}>
          More certifications from <strong>{formattedProviderName}</strong>
        </Typography>
      </Box>

      {/* Cards Container */}
      <Box className={styles.cardsContainer}>
        {similarCertifications.length === 0 ? (
          <Box className={styles.noCertMessageContainer}>
            <IconButton>
              <InfoIcon />
            </IconButton>
            <Typography variant="h6" align="center" color="textSecondary" className={styles.noCertMessage}>
              No similar certifications available
            </Typography>
          </Box>
        ) : (
          similarCertifications.map((cert) => (
            <div key={cert.id} className={styles.cardWrapper} onClick={() => onCardClick(cert.id)}>
              <CertificationCard
                id={parseInt(cert.id)}
                providerName={cert.providerName}
                certificationName={cert.certificationName}
                level={cert.level}
                tags={cert.tags}
              />
            </div>
          ))
        )}
      </Box>
    </Box>
  );
};

export default SimilarCertifications;
