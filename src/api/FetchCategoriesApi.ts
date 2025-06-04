export const fetchCategories = async () => {
    // Simulating an API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: "1", categoryTagName: "Azure" },
          { id: "2", categoryTagName: "Cloud" },
          { id: "3", categoryTagName: "Blockchain" },
          { id: "4", categoryTagName: "DevOps" },
          { id: "5", categoryTagName: "Data" },
          { id: "6", categoryTagName: "Security" },
          { id: "7", categoryTagName: "Machine Learning" },
          { id: "8", categoryTagName: "Artificial Intelligence" },
          { id: "9", categoryTagName: "Networking" },
          { id: "10", categoryTagName: "IoT" },
          { id: "11", categoryTagName: "Business" },
        ]);
      }, 1000); // Simulated API call delay of 1 second
    });
};
