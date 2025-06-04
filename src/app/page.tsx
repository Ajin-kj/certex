"use client";

import React, { useEffect, useState } from "react";
import { Typography, Box, CircularProgress } from "@mui/material"; // Import Box and CircularProgress from MUI
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import useFilterCertifications from "../hooks/useFilterCertifications";
import {
  SortOption,
  CertificationLevel,
  CertificationData,
} from "../types/AllCertifications.types";
import CertificationCard from "@/components/CertificationCardComponets/CertificationCard";
import FilterChips from "@/components/FilterComponents/FilterChips";
import TopFilter from "@/components/FilterComponents/TopFilter";
import LeftFilter from "@/components/FilterComponents/LeftFilter";
import PendingActionsTable from "@/components/PendingActionsComponets/PendingActions";
import { fetchCertifications } from "@/api/AllCertificationsApi";
import AuthGuard from "@/AuthGuard/AuthGard";

const AllCertifications: React.FC = () => {
  const [data, setData] = useState<CertificationData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<CertificationLevel | "all">(
    "all"
  );
  const [sortOption, setSortOption] = useState<SortOption>("latest");
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const certifications = await fetchCertifications();
        setData(certifications);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = useFilterCertifications({
    data,
    searchQuery,
    selectedLevel,
    sortOption,
    selectedProviders,
    selectedCategories,
  });

  const removeFilter = (filterType: string, value: string) => {
    switch (filterType) {
      case "searchQuery":
        setSearchQuery("");
        break;
      case "selectedLevel":
        setSelectedLevel("all");
        break;
      case "sortOption":
        setSortOption("latest");
        break;
      case "selectedProviders":
        setSelectedProviders((prev) =>
          prev.filter((provider) => provider !== value)
        );
        break;
      case "selectedCategories":
        setSelectedCategories((prev) =>
          prev.filter((category) => category !== value)
        );
        break;
      default:
        break;
    }
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedLevel("all");
    setSortOption("latest");
    setSelectedProviders([]);
    setSelectedCategories([]);
  };

  const handleCardClick = (certification: CertificationData) => {
    router.push(`/certification-exam/${certification.providerName.toLowerCase()}-${certification.id}`);
  };

  return (
    <AuthGuard>
      <div className={styles.container}>
        <div className={styles.LeftSection}>
          <LeftFilter
            selectedProviders={selectedProviders}
            setSelectedProviders={setSelectedProviders}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            clearAllFilters={clearAllFilters}
          />
        </div>

        <div className={styles.MiddleSection}>
          <div className={styles.TopFilter}>
            <TopFilter
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedLevel={selectedLevel}
              setSelectedLevel={setSelectedLevel}
              sortOption={sortOption}
              setSortOption={setSortOption}
            />
          </div>
          <div className={styles.CardsSection}>
            <div className={styles.FilterChipsDisplay}>
              <FilterChips
                searchQuery={searchQuery}
                selectedLevel={selectedLevel}
                sortOption={sortOption}
                selectedProviders={selectedProviders}
                selectedCategories={selectedCategories}
                removeFilter={removeFilter}
              />
            </div>

            {/* Conditionally rendering loading spinner or message */}
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "50vh", // Adjust this value as needed to center vertically
                }}
              >
                <CircularProgress />
              </Box>
            ) : filteredData.length === 0 ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "50vh", // Adjust this value as needed to center vertically
                }}
              >
                <Typography variant="h6" color="textSecondary">
                  No certifications available
                </Typography>
              </Box>
            ) : (
              <div className={styles.cardDisplay}>
                {filteredData.map((cert) => (
                  <CertificationCard
                    key={cert.id}
                    {...cert}
                    onClick={() => handleCardClick(cert)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={styles.RightSection}>
          <PendingActionsTable />
        </div>
      </div>
    </AuthGuard>
  );
};

export default AllCertifications;
