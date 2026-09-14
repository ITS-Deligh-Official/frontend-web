import axios, { type AxiosRequestConfig } from "axios";
import { api } from "@/lib/axios";
import { API_BASE_URL } from "@/lib/constants";
import type { ApiResponse } from "@/types/api";
async function request<T>(method: AxiosRequestConfig["method"], url: string, body?: unknown, params?: Record<string, unknown>): Promise<T> {
  if (typeof window !== "undefined") {
    const { data } = await api.request<ApiResponse<T>>({ method, url, data: body, params });
    if (!data.success) throw new Error(data.message || "Request failed");
    return data.data as T;
  }
  const { headers } = await import("next/headers"); const incoming = await headers();
  const host = incoming.get("host"); if (!host) throw new Error("Unable to resolve application host");
  const protocol = incoming.get("x-forwarded-proto") === "https" ? "https" : "http";
  const { data } = await axios.request<ApiResponse<T>>({ method, url: `${protocol}://${host}${API_BASE_URL}${url}`, data: body, params, timeout: Number(process.env.BACKEND_REQUEST_TIMEOUT_MS ?? "15000"), headers: { Accept: "application/json", Cookie: incoming.get("cookie") ?? "" } });
  if (!data.success) throw new Error(data.message || "Request failed"); return data.data as T;
}
export const get=<T>(u:string,p?:Record<string,unknown>)=>request<T>("GET",u,undefined,p);
export const post=<T>(u:string,b?:unknown)=>request<T>("POST",u,b);
export const put=<T>(u:string,b?:unknown)=>request<T>("PUT",u,b);
export const patch=<T>(u:string,b?:unknown)=>request<T>("PATCH",u,b);
export const del=<T>(u:string)=>request<T>("DELETE",u);
export async function download(url:string,body?:unknown):Promise<Blob>{const response=await api.post(url,body,{responseType:"blob"});return response.data as Blob;}
