# Vision Handbook alignment

This frontend uses the approved **ITS Deligh Vision Handbook v1.0** as a product and engineering reference. The source document is stored at `docs/ITS_Deligh_Vision_Handbook.pdf` for internal use.

## Product principles reflected in code

- **Trust and transparency:** signed role routing, verified outcomes language, explicit empty states, and no fabricated Admin/Super Admin metrics.
- **Learner first:** existing learner navigation follows learning, practice, assessment, verification, certificates, and career readiness.
- **Security:** credentials remain in Secure/HttpOnly cookies; Spring Security is the final authorization authority.
- **Scalability and modularity:** routes, permissions, environment values, API endpoints, and role navigation are centralized.
- **Maintainability:** Admin and Super Admin have typed service boundaries before final dashboard designs arrive.
- **Accessibility:** visible focus states, responsive navigation, semantic labels, minimum touch targets, and reduced-motion support.
- **Responsible innovation:** AI and analytics are not represented as complete until a reviewed backend contract exists.

## Current phase

The handbook defines Phase 1 as learning, assessment, certification, and administration. The current implementation therefore provides:

1. Existing learning and assessment foundations.
2. Secure authentication and RBAC-aware routing.
3. Admin operational navigation and typed API contracts.
4. Super Admin governance navigation and typed API contracts.
5. API-ready placeholders until approved dashboard designs and response schemas are supplied.

## API ownership

- Frontend endpoint paths are centralized in `lib/config/shared.ts`.
- Admin calls are centralized in `services/admin/admin.service.ts`.
- Super Admin calls are centralized in `services/super-admin/super-admin.service.ts`.
- PostgreSQL and Google Drive remain behind Spring Boot.
- Every sensitive mutation must be authorized and audited by Spring Boot.
