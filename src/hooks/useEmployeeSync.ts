import apiClient from "@/api/baseApi";

export async function syncEmployeeData(employeeDto: any) {
  try {
    const response = await apiClient.post("employee/sync", employeeDto);
    // Expected response: { dbEmployee: { ... }, token: string }
    return response.data;
  } catch (error) {
    console.error("Error syncing employee data:", error);
    throw error;
  }
}
