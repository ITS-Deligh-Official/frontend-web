<<<<<<< HEAD
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
# ITS Deligh — Auth & App Scaffold

A complete Next.js (App Router) + TypeScript + Tailwind CSS scaffold for the
ITS Deligh authentication flow — login, signup, forgot/reset password, email
verification and profile completion — plus the surrounding project
structure (state, services, types, hooks) to build the rest of the platform
on top of.

## Getting started

```bash
npm install
npm run dev
```

Then visit:
- `/login`
- `/signup`
- `/forgot-password`
- `/reset-password?token=...`
- `/verify-email?token=...`
- `/complete-profile`
- `/dashboard` (protected — redirects to `/login` if not authenticated)

Configure your backend URL in `.env.local` (`NEXT_PUBLIC_API_URL`). By
default it points at `http://localhost:8080/api`, matching the Spring Boot
backend described in the ITS Deligh Vision Handbook.

## Folder guide

| Folder | What lives here |
|---|---|
| `app/(auth)/*` | Route pages for each auth screen, sharing `app/(auth)/layout.tsx` (the split-screen shell) |
| `app/dashboard` | Placeholder authenticated landing page |
| `components/auth` | Everything auth-specific: layout pieces (`AuthLayout`, `LeftSidebar`, `AuthCard`...), form controls (`PasswordInput`, `RoleSelector`, `RememberMe`...), and the four form components (`LoginForm`, `SignupForm`, `ForgotPasswordForm`, `ResetPasswordForm`) |
| `components/ui` | Small shadcn/ui-style primitives (`button`, `input`, `card`, `checkbox`, `dialog`, `avatar`, `badge`, `separator`, `label`, `sonner`) built on Radix + `class-variance-authority` |
| `components/common` | Generic app-wide bits: `Loading`, `Spinner`, `ErrorMessage`, `PageContainer`, `MaxWidthWrapper`, `ThemeToggle` |
| `hooks` | `useLogin`, `useSignup`, `useForgotPassword`, `usePasswordStrength`, `useTheme` |
| `lib` | `utils.ts` (the `cn()` helper), `axios.ts` (API client with auth interceptor), `auth.ts` (token storage), `validators.ts` (shared regex/password-strength helpers), `constants.ts` |
| `schemas` | `zod` schemas for every auth form, used with `react-hook-form` + `@hookform/resolvers/zod` |
| `services` | `auth.service.ts` / `user.service.ts` — typed wrappers around the API endpoints; `api.ts` is the generic get/post/put/delete helper |
| `store` | `zustand` stores: `authStore` (session, token, login/logout) and `userStore` (profile) |
| `types` | Shared TypeScript types: `auth.ts`, `user.ts`, `api.ts` |
| `data` | Static content arrays: `features.ts` (sidebar feature list), `roles.ts` (signup role options), `testimonials.ts` (placeholder copy, not yet wired into a component) |
| `assets` | Empty folders (`illustrations`, `icons`, `backgrounds`) for custom art you add later |
| `public` | `logo/` (generated from your uploaded logo — see below), `images/` (a generated gradient background + simple placeholder SVGs), `fonts/` (empty, for self-hosted fonts) |

## Validation

All rules live in `lib/validators.ts` (raw regex/logic) and `schemas/*.ts`
(zod wrappers used by the forms):

- Email — required, valid format
- Full name — required, 2+ characters, letters/spaces only
- Mobile — required, exactly 10 digits
- Password (signup/reset) — 8+ chars, 1 uppercase, 1 lowercase, 1 number,
  1 special character, shown live via `PasswordStrength`
- Confirm password — must match
- Role — must pick one (Student / Trainer / Recruiter / Institution)
- Terms — must be checked

## Wiring up your real backend

Two `TODO`-free integration points to check before shipping:

1. **`lib/constants.ts`** — `API_ENDPOINTS` maps to your backend routes.
   Adjust the paths to match your Spring Boot controllers.
2. **`services/auth.service.ts` / `user.service.ts`** — thin functions
   calling those endpoints via `services/api.ts`. Nothing else needs to
   change; `hooks/useLogin.ts` etc. already call these.

`middleware.ts` protects `/dashboard` and `/complete-profile` and keeps
logged-in users out of the auth pages, based on a cookie set by
`lib/auth.ts` when a session is established.

## Assets — please review before shipping

- `public/logo/logo.png` and `favicon.ico`/`app/favicon.ico` were generated
  directly from the logo you uploaded — good to go.
- `public/logo/logo-white.png` is currently just a copy of the same logo.
  Replace it with a true white/monochrome variant for use on dark
  backgrounds if you need one elsewhere in the app (the auth sidebar itself
  uses the full-color logo, which already reads fine on the dark gradient).
- `public/images/auth-bg.png`, `auth-pattern.svg`, `login.svg`, `signup.svg`
  are simple generated placeholders (a gradient, a dot pattern, two
  abstract line-art scenes) — not currently referenced by any component.
  Swap in real illustrations/photography and wire them into `LeftSidebar`
  or `AuthCard` as you like.
- `assets/illustrations`, `assets/icons`, `assets/backgrounds`, and
  `public/fonts` are intentionally empty (`.gitkeep` only) — drop your own
  files in as the design system grows.
>>>>>>> 023ac8b (Initial commit)
# fix
# fix
