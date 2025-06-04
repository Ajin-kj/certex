// /api/UserProfileApi.ts

export const fetchUserProfile = async () => {
    return new Promise<any>((resolve) =>
      setTimeout(() => {
        resolve({
          firstName: "John",
          lastName: "Doe",
          designation: "Software Engineer",
          department: "Engineering",
          managerEmail: "manager@company.com",
          departmentHeadEmail: "depthead@company.com",
        });
      }, 1000)
    );
  };
  
  export const saveUserProfile = async (updatedData: any) => {
    return new Promise<void>((resolve) =>
      setTimeout(() => {
        console.log("Saved data:", updatedData);
        resolve();
      }, 1000)
    );
  };
  
  export const fetchManagerEmails = async () => {
    return new Promise<string[]>((resolve) =>
      setTimeout(() => {
        resolve(["manager@company.com", "jane@company.com", "bob@company.com"]);
      }, 1000)
    );
  };
  
  export const fetchDepartmentHeadEmails = async () => {
    return new Promise<string[]>((resolve) =>
      setTimeout(() => {
        resolve(["depthead@company.com", "michael@company.com", "lisa@company.com"]);
      }, 1000)
    );
  };
  