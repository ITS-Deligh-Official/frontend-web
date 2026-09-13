/** API-neutral records until final dashboard contracts are supplied. */
export type ApiRecord = Readonly<Record<string, unknown>>;
export type Identifier = string;
export type PageRequest = Readonly<
  Record<string, string | number | boolean | undefined>
>;
export interface PageResult<T> {
  items: T[];
  page: number;
  size: number;
  totalItems: number;
  totalPages: number;
}
export interface StatusUpdate {
  status: string;
  reason?: string;
}
export interface DecisionPayload {
  decision: "approve" | "reject";
  reason?: string;
}
export interface PermissionAssignment {
  permissionIds: Identifier[];
}
export interface RoleAssignment {
  roleIds: Identifier[];
}
export interface ExportRequest {
  format: "csv" | "xlsx" | "pdf";
  filters?: Record<string, unknown>;
}
