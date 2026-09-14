import { get } from "../api";
import { API_ENDPOINTS } from "@/lib/constants";
import { USE_MOCK } from "@/lib/mock";
import { MOCK_DASHBOARD } from "@/data/mock/student.mock";
import type { StudentDashboardData } from "@/types/student";

export const studentDashboardService = {
  /**
   * Spring Boot: GET /api/student/dashboard
   * Suggested controller: StudentDashboardController#getDashboard()
   * Auth: requires a valid student JWT (read the student id off the token,
   * don't trust an id from the client).
   */
  getDashboard: async (): Promise<StudentDashboardData> => {
    if (USE_MOCK) return MOCK_DASHBOARD;
    return get<StudentDashboardData>(API_ENDPOINTS.studentDashboard);
  },
};
