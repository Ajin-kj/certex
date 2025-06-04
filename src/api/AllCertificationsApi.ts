export const fetchCertifications = async () => {
    // Simulating an API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          // Microsoft Certifications
          {
            id: "2",
            providerName: "Microsoft",
            certificationName: "Microsoft Certified: Azure Fundamentals",
            level: "Beginner",
            description:
              "Gain foundational knowledge of cloud services and how those services are provided with Microsoft Azure.",
            tags: ["Azure", "cloud", "Blockchain", "fundamentals"],
            official_link: "https://learn.microsoft.com/en-us/certifications/azure-fundamentals/",
            critical: "Medium",
            views: 350,
            requiredCount: "",
            currentCount: "",
            nomination_status: "Not Accepting",
            nomination_open_date: "2024-06-30",
            nomination_close_date: "2025-06-30",
          },
          {
            id: "3",
            providerName: "Microsoft",
            certificationName: "Microsoft Certified: Azure Solutions Architect Expert",
            level: "Advanced",
            description:
              "This certification validates your skills in designing and implementing solutions on Microsoft Azure, including infrastructure and cloud services.",
            tags: ["Azure", "cloud", "Solutions Architect", "Expert"],
            official_link: "https://learn.microsoft.com/en-us/certifications/azure-solutions-architect-expert/",
            critical: "High",
            views: 500,
            requiredCount: "",
            currentCount: "",
            nomination_status: "Not Accepting",
            nomination_open_date: "2024-06-30",
            nomination_close_date: "2025-06-30",
          },

          // Google Certifications
          {
            id: "4",
            providerName: "Google",
            certificationName: "Google Cloud Certified - Associate Cloud Engineer",
            level: "Intermediate",
            description:
              "Learn the fundamentals of Google Cloud, with hands-on experience on Google Cloud Platform (GCP).",
            tags: ["Google Cloud", "GCP", "Cloud Engineer", "Intermediate"],
            official_link: "https://cloud.google.com/certification/cloud-engineer",
            critical: "High",
            views: 350,
            requiredCount: "",
            currentCount: "",
            nomination_status: "Not Accepting",
            nomination_open_date: "2024-06-30",
            nomination_close_date: "2025-06-30",
          },
          {
            id: "5",
            providerName: "Google",
            certificationName: "Google Cloud Certified - Professional Cloud Architect",
            level: "Advanced",
            description:
              "This certification validates your expertise in designing, developing, and managing dynamic solutions using Google Cloud technologies.",
            tags: ["Google Cloud", "GCP", "Cloud Architect", "Advanced"],
            official_link: "https://cloud.google.com/certification/cloud-architect",
            critical: "High",
            views: 400,
            requiredCount: "",
            currentCount: "",
            nomination_status: "Not Accepting",
            nomination_open_date: "2024-06-30",
            nomination_close_date: "2025-06-30",
          },

          // AWS Certifications
          {
            id: "6",
            providerName: "AWS",
            certificationName: "AWS Certified Solutions Architect – Associate",
            level: "Intermediate",
            description:
              "Validate your expertise in designing and deploying scalable systems on Amazon Web Services.",
            tags: ["AWS", "Solutions Architect", "cloud", "intermediate"],
            official_link: "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
            critical: "High",
            views: 350,
            requiredCount: "",
            currentCount: "",
            nomination_status: "Not Accepting",
            nomination_open_date: "2024-06-30",
            nomination_close_date: "2025-06-30",
          },
          {
            id: "7",
            providerName: "AWS",
            certificationName: "AWS Certified DevOps Engineer – Professional",
            level: "Advanced",
            description:
              "This certification is for experienced DevOps professionals who want to validate their ability to automate the testing and deployment of AWS infrastructure and applications.",
            tags: ["AWS", "DevOps", "Automation", "Advanced"],
            official_link: "https://aws.amazon.com/certification/certified-devops-engineer-professional/",
            critical: "High",
            views: 450,
            requiredCount: "",
            currentCount: "",
            nomination_status: "Not Accepting",
            nomination_open_date: "2024-06-30",
            nomination_close_date: "2025-06-30",
          },

          // Cisco Certifications
          {
            id: "8",
            providerName: "Cisco",
            certificationName: "Cisco Certified Network Associate (CCNA)",
            level: "Beginner",
            description:
              "Cisco's CCNA certification is an entry-level certification designed to validate your skills with networking fundamentals.",
            tags: ["Cisco", "Networking", "CCNA", "Beginner"],
            official_link: "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications.html",
            critical: "Medium",
            views: 350,
            requiredCount: "",
            currentCount: "",
            nomination_status: "Not Accepting",
            nomination_open_date: "2024-06-30",
            nomination_close_date: "2025-06-30",
          },
          {
            id: "9",
            providerName: "Cisco",
            certificationName: "Cisco Certified Network Professional (CCNP)",
            level: "Intermediate",
            description:
              "The CCNP certification validates your ability to manage and troubleshoot enterprise networks, as well as understand security and automation.",
            tags: ["Cisco", "Networking", "CCNP", "Intermediate"],
            official_link: "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications.html",
            critical: "Medium",
            views: 400,
            requiredCount: "",
            currentCount: "",
            nomination_status: "Not Accepting",
            nomination_open_date: "2024-06-30",
            nomination_close_date: "2025-06-30",
          },

          // Oracle Certifications
          {
            id: "10",
            providerName: "Oracle",
            certificationName: "Oracle Certified Professional (OCP) – Java SE 11 Developer",
            level: "Advanced",
            description:
              "The OCP certification is for Java professionals and validates your skills in Java programming, including Java SE 11.",
            tags: ["Oracle", "Java", "OCP", "Advanced"],
            official_link: "https://education.oracle.com/java-se-11-developer/pexam_1Z0-819",
            critical: "High",
            views: 350,
            requiredCount: "",
            currentCount: "",
            nomination_status: "Not Accepting",
            nomination_open_date: "2024-06-30",
            nomination_close_date: "2025-06-30",
          },
          {
            id: "11",
            providerName: "Oracle",
            certificationName: "Oracle Certified Master, Java SE 11 Developer",
            level: "Advanced",
            description:
              "This master-level certification demonstrates your advanced knowledge in designing, developing, and troubleshooting Java-based applications.",
            tags: ["Oracle", "Java", "Java SE", "Master"],
            official_link: "https://education.oracle.com/oracle-certified-master-java-se-11-developer/pexam_1Z0-822",
            critical: "High",
            views: 380,
            requiredCount: "",
            currentCount: "",
            nomination_status: "Not Accepting",
            nomination_open_date: "2024-06-30",
            nomination_close_date: "2025-06-30",
          },
        ]);
      }, 1000); // Simulated API call delay of 1 second
    });
  };
