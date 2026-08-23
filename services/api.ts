import { api } from "@/lib/axios";
import type { ApiResponse } from "@/types/api";

export async function get<T>(url: string, params?: Record<string, unknown>) {
  const { data } = await api.get<ApiResponse<T>>(url, { params });
  return data.data;
}

export async function post<T>(url: string, body?: unknown) {
  const { data } = await api.post<ApiResponse<T>>(url, body);
  return data.data;
}

export async function put<T>(url: string, body?: unknown) {
  const { data } = await api.put<ApiResponse<T>>(url, body);
  return data.data;
}

export async function del<T>(url: string) {
  const { data } = await api.delete<ApiResponse<T>>(url);
  return data.data;
}

export async function patch<T>(url: string, body?: unknown) {
  const { data } = await api.patch<ApiResponse<T>>(url, body);
  return data.data;
}
