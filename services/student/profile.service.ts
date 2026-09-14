import { get, put } from "../api";
import { API_ENDPOINTS } from "@/lib/constants";
import { USE_MOCK } from "@/lib/mock";
import { MOCK_PROFILE } from "@/data/mock/student.mock";
import type { StudentProfile } from "@/types/student";

export const studentProfileService = {
  /** Spring Boot: GET /api/student/profile */
  getProfile: async (): Promise<StudentProfile> => {
    if (USE_MOCK) return MOCK_PROFILE;
    return get<StudentProfile>(API_ENDPOINTS.studentProfile);
  },

  /** Spring Boot: PUT /api/student/profile */
  updateProfile: async (payload: Partial<StudentProfile>): Promise<StudentProfile> => {
    if (USE_MOCK) return { ...MOCK_PROFILE, ...payload };
    return put<StudentProfile>(API_ENDPOINTS.studentProfile, payload);
  },
};
