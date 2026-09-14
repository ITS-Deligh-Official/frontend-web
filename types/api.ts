export interface ApiResponse<T> { success: boolean; message?: string; data: T | null; }
export interface ApiErrorShape { success: false; message: string; errors?: Record<string, string[]>; traceId?: string; }
