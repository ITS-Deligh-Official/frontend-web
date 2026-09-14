import { get, post } from "../api";
import { API_ENDPOINTS } from "@/lib/constants";
import { USE_MOCK } from "@/lib/mock";
import { MOCK_COURSES } from "@/data/mock/student.mock";
import type { Course } from "@/types/student";

export const studentLearningService = {
  /** Spring Boot: GET /api/student/courses?category=&search= */
  getCourses: async (params?: { category?: string; search?: string }): Promise<Course[]> => {
    if (USE_MOCK) return MOCK_COURSES;
    return get<Course[]>(API_ENDPOINTS.studentCourses, params);
  },

  /** Spring Boot: GET /api/student/courses/{courseId} */
  getCourseDetail: async (courseId: string): Promise<Course | undefined> => {
    if (USE_MOCK) return MOCK_COURSES.find((c) => c.id === courseId);
    return get<Course>(API_ENDPOINTS.studentCourseDetail(courseId));
  },

  /** Spring Boot: POST /api/student/courses/{courseId}/enroll */
  enroll: async (courseId: string): Promise<{ enrolled: boolean }> => {
    if (USE_MOCK) return { enrolled: true };
    return post<{ enrolled: boolean }>(API_ENDPOINTS.studentCourseEnroll(courseId));
  },
};
