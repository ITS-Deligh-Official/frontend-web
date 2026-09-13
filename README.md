# Deligh Campus frontend

Production-oriented Next.js frontend for the Deligh Campus soft-skills platform. The repository includes branded learner experiences plus API-ready Admin and Super Admin workspaces.

> Product decisions follow the approved ITS Deligh Vision Handbook v1.0. See `docs/VISION_ALIGNMENT.md`; the internal source PDF is included under `docs/`.

## Stack

- Next.js App Router, React, TypeScript, Tailwind CSS
- Spring Boot backend through a same-origin BFF proxy
- PostgreSQL remains behind Spring Boot; the browser never connects to the database

## Security model

- Access tokens are stored only in `Secure`, `HttpOnly`, `SameSite=Lax` cookies.
- The browser calls `/api/backend/*`; server route handlers attach the bearer token upstream.
- Middleware verifies a signed role cookie before entering role-specific workspaces.
- Admin and Super Admin cannot be selected during public signup.
- Frontend guards improve UX only. Spring Security must enforce every permission and tenant boundary.
- Security headers, request timeouts, safe redirect validation, encoded path parameters, and production env validation are included.

## Configuration

1. Copy `.env.example` to `.env.local`.
2. Set `BACKEND_API_URL` to the Spring Boot API root.
3. Generate `ROLE_COOKIE_SECRET` with a secure random secret (32+ characters).
4. Keep `NEXT_PUBLIC_USE_MOCK_DATA=false` for production.

No business records or dashboard metrics are embedded in Admin/Super Admin components. Navigation, routes, permissions, API paths, brand tokens, and runtime values are centralized.

## Commands

```bash
npm ci
npm run check
npm run dev
npm run build
npm run start
```

## Spring Boot contract

Login should return `{ success, message, data: { accessToken, refreshToken, userId, fullName, email, roles } }`. The required refresh contract is `POST /auth/refresh { refreshToken }`; logout revocation is `POST /auth/logout { refreshToken }`. Role values may use uppercase backend names such as `SUPER_ADMIN`; they are normalized by the BFF. Configure CORS for the Next.js server origin only if the services run on separate origins. Enforce authorization with Spring Security annotations/policies and use parameterized persistence through JPA/repositories.

## Dashboard routes

- `/admin` — admin operational modules
- `/super-admin` — platform governance modules

Module pages intentionally render secure empty states until their specific backend contracts and final dashboard designs are supplied.
