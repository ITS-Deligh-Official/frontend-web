import { get, post } from "../api";
import { API_ENDPOINTS } from "@/lib/constants";
import { USE_MOCK } from "@/lib/mock";
import { MOCK_ASSESSMENTS, MOCK_ASSESSMENT_DETAIL } from "@/data/mock/student.mock";
import type { Assessment, AssessmentDetail, AssessmentStatus } from "@/types/student";

export const studentAssessmentService = {
  /** Spring Boot: GET /api/student/assessments?status=all|upcoming|in_progress|completed */
  getAssessments: async (status?: AssessmentStatus | "all"): Promise<Assessment[]> => {
    if (USE_MOCK) {
      if (!status || status === "all") return MOCK_ASSESSMENTS;
      return MOCK_ASSESSMENTS.filter((a) => a.status === status);
    }
    return get<Assessment[]>(API_ENDPOINTS.studentAssessments, { status });
  },

  /** Spring Boot: GET /api/student/assessments/{assessmentId} */
  getAssessmentDetail: async (assessmentId: string): Promise<AssessmentDetail | undefined> => {
    if (USE_MOCK) return MOCK_ASSESSMENT_DETAIL[assessmentId];
    return get<AssessmentDetail>(API_ENDPOINTS.studentAssessmentDetail(assessmentId));
  },

  /** Spring Boot: POST /api/student/assessments/{assessmentId}/start → { attemptId } */
  start: async (assessmentId: string): Promise<{ attemptId: string }> => {
    if (USE_MOCK) return { attemptId: "mock-attempt" };
    return post<{ attemptId: string }>(API_ENDPOINTS.studentAssessmentStart(assessmentId));
  },

  /**
   * Spring Boot: POST /api/student/assessments/{assessmentId}/submit
   * Content-Type: multipart/form-data — send the file as "file" and any
   * notes as "comments". Use fetch/axios directly here (not the JSON `post`
   * helper) because this is a file upload, not a JSON body.
   */
  submitWork: async (assessmentId: string, file: File, comments?: string): Promise<{ submitted: boolean }> => {
    if (USE_MOCK) return { submitted: true };
    const formData = new FormData();
    formData.append("file", file);
    if (comments) formData.append("comments", comments);
    const { api } = await import("@/lib/axios");
    const { data } = await api.post(API_ENDPOINTS.studentAssessmentSubmit(assessmentId), formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data.data;
  },
};
