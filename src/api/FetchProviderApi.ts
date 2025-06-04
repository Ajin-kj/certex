export const fetchProviders = async () => {
    // Simulating an API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: "1", providerName: "AWS" },
          { id: "2", providerName: "Azure" },
          { id: "3", providerName: "Google" },
          { id: "4", providerName: "IBM" },
          { id: "5", providerName: "Oracle" },
          { id: "6", providerName: "Cisco" },
          { id: "7", providerName: "CompTIA" },
          { id: "8", providerName: "Palo Alto Networks" },
          { id: "9", providerName: "VMware" },
          { id: "10", providerName: "Red Hat" },
          { id: "11", providerName: "Salesforce" },
          { id: "12", providerName: "SAP" },
          { id: "13", providerName: "Huawei" },
        ]);
      }, 1000); // Simulated API call delay of 1 second
    });
};
