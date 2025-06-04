export const fetchCertificationDetails = async (id: string) => {
  // Simulate a one-second delay before returning data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        providerName: "Microsoft",
        certificationName: "Microsoft Certified: Azure Fundamentals AI engineer associate.",
        level: "Beginner",
        description: "Learn the basics of cloud services with Microsoft Azure. Learn the basics of cloud services with Microsoft Azure. Learn the basics of cloud services with Microsoft Azure.",
        tags: ["Cloud", "Azure", "Beginner"],
        officialLink: "https://learn.microsoft.com/en-us/certifications/azure-fundamentals/",
        critical: "High",
        views: 1234,
        requiredCount: "100",
        currentCount: "50",
        nomination_status: "open",
        nomination_open_date: "2025-01-01",
        nomination_close_date: "2025-05-05",
        examSelectableMonthFrom: "2025-02", // example value
        examSelectableMonthTo: "2025-04",   // example value
      });
    }, 3000); // 1 second delay
  });
};


export const fetchSimilarCertifications = async (providerName: string) => {
  // Simulate a one-second delay before returning similar certifications
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1",
          providerName,
          certificationName: "Microsoft Certified: Azure Solutions Architect Expert",
          level: "Advanced",
          tags: ["Cloud", "Azure", "Advanced"],
          officialLink: "https://learn.microsoft.com/en-us/certifications/azure-solutions-architect/",
        },
        {
          id: "2",
          providerName,
          certificationName: "Microsoft Certified: Azure AI Engineer Associate",
          level: "Intermediate",
          tags: ["AI", "Azure", "Intermediate"],
          officialLink: "https://learn.microsoft.com/en-us/certifications/azure-ai-engineer/",
        },
        {
          id: "3",
          providerName,
          certificationName: "Microsoft Certified: Azure AI Engineer Associate",
          level: "Intermediate",
          tags: ["AI", "Azure", "Intermediate"],
          officialLink: "https://learn.microsoft.com/en-us/certifications/azure-ai-engineer/",
        },
        {
          id: "4",
          providerName,
          certificationName: "Microsoft Certified: Azure AI Engineer Associate",
          level: "Intermediate",
          tags: ["AI", "Azure", "Intermediate"],
          officialLink: "https://learn.microsoft.com/en-us/certifications/azure-ai-engineer/",
        },
      ]);
    }, 1000); // 1 second delay
  });
};
