// Dummy API function: fetchPendingActionForCertification

interface PendingActionResponse {
    status: string;
    pendingActionId?: string; // Optional, only returned if there's a pending action
  }
  
  export const fetchPendingActionForCertification = async (
    employeeId: string,
    certificationId: string
  ): Promise<PendingActionResponse> => {
    // Mock API response - Replace with actual logic in a real scenario.
    const dummyData = [
      { employeeId: "1", certificationId: "101", pendingActionId: "abc123" }, // Mock applied data
      { employeeId: "2", certificationId: "102", pendingActionId: null }, // Mock not applied data
    ];
  
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
    // Check if there's an application for the certification by the employee
    const application = dummyData.find(
      (data) => data.employeeId === employeeId && data.certificationId === certificationId
    );
  
    if (application && application.pendingActionId) {
      return { status: "success", pendingActionId: application.pendingActionId };
    }
  
    return { status: "no-application" };
  };
  