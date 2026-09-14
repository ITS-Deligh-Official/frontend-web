import { get, patch, del } from "../api";
import { API_ENDPOINTS } from "@/lib/constants";
import { USE_MOCK } from "@/lib/mock";
import { MOCK_NOTIFICATIONS } from "@/data/mock/student.mock";
import type { AppNotification } from "@/types/student";

export const studentNotificationService = {
  /** Spring Boot: GET /api/student/notifications */
  getAll: async (): Promise<AppNotification[]> => {
    if (USE_MOCK) return MOCK_NOTIFICATIONS;
    return get<AppNotification[]>(API_ENDPOINTS.studentNotifications);
  },

  /** Spring Boot: PATCH /api/student/notifications/{id}/read */
  markRead: async (id: string): Promise<void> => {
    if (USE_MOCK) return;
    await patch(API_ENDPOINTS.studentNotificationRead(id));
  },

  /** Spring Boot: DELETE /api/student/notifications/{id} */
  remove: async (id: string): Promise<void> => {
    if (USE_MOCK) return;
    await del(API_ENDPOINTS.studentNotificationDelete(id));
  },
};
