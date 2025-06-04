// /utils/fetchPendingActions.ts
export const fetchPendingActions = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            certificationName: "AWS Certified Solutions Architect – Associate",
            remarks: "Approval Pending",
            provider: "Amazon Web Services (AWS)",
          },
          {
            id: 2,
            certificationName: "Microsoft Certified: Azure Solutions Architect Expert",
            remarks: "Upload Invoice",
            provider: "Microsoft",
          },
         
        ]);
      }, 1000); // Simulated API delay
    });
  };
  