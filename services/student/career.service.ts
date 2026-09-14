import { get } from "../api";
import { API_ENDPOINTS } from "@/lib/constants";
import { USE_MOCK } from "@/lib/mock";
import { MOCK_CAREER } from "@/data/mock/student.mock";
import type { CareerProgress } from "@/types/student";

export const studentCareerService = {
  /** Spring Boot: GET /api/student/career */
  getCareerProgress: async (): Promise<CareerProgress> => {
    if (USE_MOCK) return MOCK_CAREER;
    return get<CareerProgress>(API_ENDPOINTS.studentCareer);
  },
};
