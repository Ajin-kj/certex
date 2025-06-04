// src/hooks/useFilterCertifications.ts
import { useState, useEffect, useCallback } from "react";
import { CertificationData } from "../types/AllCertifications.types";
import { CertificationLevel, SortOption } from "../types/AllCertifications.types";

interface UseFilterCertificationsProps {
  data: CertificationData[];
  searchQuery: string;
  selectedLevel: CertificationLevel | "all";
  sortOption: SortOption;
  selectedProviders: string[];
  selectedCategories: string[];
}

const useFilterCertifications = ({
  data,
  searchQuery,
  selectedLevel,
  sortOption,
  selectedProviders,
  selectedCategories,
}: UseFilterCertificationsProps) => {
  const [filteredData, setFilteredData] = useState<CertificationData[]>(data);

  const applyFilters = useCallback(() => {
    let result = data;

    // Filtering based on search query
    if (searchQuery) {
      result = result.filter((item) =>
        item.certificationName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtering based on level
    if (selectedLevel !== "all") {
      result = result.filter((item) => item.level === selectedLevel);
    }

    // Filtering based on selected providers
    if (selectedProviders.length > 0) {
      result = result.filter((item) =>
        selectedProviders.includes(item.providerName)
      );
    }

    // Filtering based on selected categories
    if (selectedCategories.length > 0) {
      result = result.filter((item) =>
        item.tags.some((tag) => selectedCategories.includes(tag))
      );
    }

    // Sorting based on selected sort option
    switch (sortOption) {
      case "latest":
        // No need to sort since data is assumed to be in the latest order already
        break;
      case "A-Z":
        result = result.sort((a, b) =>
          a.certificationName.localeCompare(b.certificationName)
        );
        break;
      case "Z-A":
        result = result.sort((a, b) =>
          b.certificationName.localeCompare(a.certificationName)
        );
        break;
      default:
        break;
    }

    setFilteredData(result);
  }, [
    data,
    searchQuery,
    selectedLevel,
    sortOption,
    selectedProviders,
    selectedCategories,
  ]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  return filteredData;
};

export default useFilterCertifications;
