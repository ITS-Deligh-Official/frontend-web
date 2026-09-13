# Deligh Campus — Backend API Requirements for Frontend Integration

**Document purpose:** Backend team ko clearly define karna ki kaunsi API chahiye, kyun chahiye, frontend mein kahan use hogi, expected request/response kya hoga, aur acceptance criteria kya honge.

**Frontend:** Next.js 15, React, TypeScript, Tailwind CSS  
**Backend:** Spring Boot, Spring Security, Spring Data JPA  
**Database:** PostgreSQL  
**API base path:** `/api/v1`  
**Authentication:** JWT access token + rotating refresh token + RBAC

---

## 1. Architecture and integration flow

```text
Browser
  → Next.js same-origin BFF (/api/auth/* and /api/backend/*)
  → Spring Boot (/api/v1/*)
  → PostgreSQL / approved file storage
```

- Browser ko JWT directly expose nahi kiya jayega.
- Next.js access token aur refresh token ko Secure, HttpOnly cookies mein store karega.
- Spring Boot authentication aur authorization ka final source of truth hoga.
- Student, Trainer, Admin ya Super Admin ID request body/query se trust nahi karni. Current user ki identity validated JWT se derive hogi.
- Progress, ranking, dashboard count, certificate eligibility, assessment status aur financial totals PostgreSQL ke real records se calculate honge.
- Backend unavailable hone par frontend empty/error state dikhayega; fake fallback data render nahi karega.

---

## 2. Common API standards

### 2.1 Success response

```json
{
  "success": true,
  "message": "Request completed successfully",
  "data": {},
  "timestamp": "ISO-8601 timestamp",
  "traceId": "request trace identifier"
}
```

### 2.2 Error response

```json
{
  "success": false,
  "message": "Human-readable error message",
  "errors": {
    "fieldName": ["Validation message"]
  },
  "timestamp": "ISO-8601 timestamp",
  "traceId": "request trace identifier"
}
```

### 2.3 Pagination

List APIs should support:

```text
page      zero-based page number
size      requested page size with a backend maximum
search    sanitized search text
sort      approvedField,asc|desc
```

Response data:

```json
{
  "items": [],
  "page": 0,
  "size": 20,
  "totalItems": 0,
  "totalPages": 0
}
```

### 2.4 HTTP status rules

| Status | Use                                        |
| ------ | ------------------------------------------ |
| `200`  | Successful read/update                     |
| `201`  | Resource successfully created              |
| `204`  | Successful deletion without body           |
| `400`  | Invalid request or validation failure      |
| `401`  | Missing, expired or invalid authentication |
| `403`  | Authenticated but insufficient permission  |
| `404`  | Resource not found or not visible to user  |
| `409`  | Duplicate/conflicting state                |
| `413`  | Uploaded file exceeds limit                |
| `415`  | Unsupported file/content type              |
| `429`  | Rate limit exceeded                        |
| `500`  | Unexpected server error                    |

### 2.5 Security requirements for every protected API

- Validate JWT and derive `userId`, roles and `organizationId` server-side.
- Enforce RBAC using Spring Security; frontend permission checks security nahi hain.
- Validate tenant/organization ownership for every resource.
- Use DTO validation with `@Valid`; entities directly return na karein.
- Parameterized JPA queries/repositories use karein.
- Sensitive mutations ke audit logs create karein.
- Password, JWT, refresh token, reset token aur secrets ko logs mein record na karein.
- All dates ISO 8601 mein return karein, preferably UTC with timezone.
- UUID identifiers use karein.

---

# 3. Authentication and account APIs — Priority P0

Frontend locations:

```text
components/auth/SignupForm.tsx
components/auth/LoginForm.tsx
components/auth/ForgotPasswordForm.tsx
components/auth/ResetPasswordForm.tsx
app/(auth)/verify-email/page.tsx
services/auth.service.ts
app/api/auth/session/route.ts
app/api/auth/register/route.ts
```

## 3.1 Create account

### `POST /api/v1/auth/signup`

**Why needed:** Student, Trainer, Recruiter ya Institution ka account create karne ke liye.  
**Where used:** Signup page → `services/auth.service.ts` → Next.js `/api/auth/register` gateway.

Request:

```json
{
  "fullName": "User-entered full name",
  "email": "user-entered email",
  "mobile": "user-entered mobile number",
  "password": "user-entered password",
  "role": "STUDENT | TRAINER | RECRUITER | INSTITUTION"
}
```

Backend responsibilities:

- Email normalize and unique-check kare.
- Password BCrypt/Argon2 se hash kare.
- Public signup se `ADMIN` aur `SUPER_ADMIN` reject kare.
- Email verification token create kare.
- Verification email asynchronously send kare.
- Duplicate email par `409` return kare.

Response data:

```json
{
  "userId": "UUID",
  "email": "normalized email",
  "verificationRequired": true
}
```

Acceptance criteria:

- Duplicate account create na ho.
- Raw password database/log mein save na ho.
- Invalid role rejected ho.
- Success ke baad frontend verification page open kar sake.

## 3.2 Login

### `POST /api/v1/auth/login`

**Why needed:** Credentials verify karke role-based authenticated session start karna.  
**Where used:** Login page and Next.js `app/api/auth/session/route.ts`.

Request:

```json
{
  "email": "registered email",
  "password": "password"
}
```

Response data:

```json
{
  "accessToken": "short-lived JWT",
  "refreshToken": "rotating refresh token",
  "userId": "UUID",
  "fullName": "Current user name",
  "email": "Current user email",
  "roles": ["STUDENT"]
}
```

Backend responsibilities:

- Disabled/locked/unverified account policy enforce kare.
- Failed login rate-limit and audit kare.
- Access token short-lived rakhe.
- Refresh token identifier/hash persist kare.

## 3.3 Refresh access token

### `POST /api/v1/auth/refresh`

**Why needed:** Access token expire hone ke baad user ko repeatedly login na karna pade.  
**Where used:** Next.js backend proxy automatically `401` ke baad call karta hai.

Request:

```json
{
  "refreshToken": "current refresh token"
}
```

Response data:

```json
{
  "accessToken": "new access token",
  "refreshToken": "new rotated refresh token"
}
```

Acceptance criteria:

- Old refresh token successful rotation ke baad revoke ho.
- Reused/revoked/expired token reject ho.
- Token family reuse detect hone par related sessions revoke hon.

## 3.4 Logout

### `POST /api/v1/auth/logout`

**Why needed:** Current refresh token ko server-side revoke karna.  
**Where used:** Dashboard logout button → Next.js `/api/auth/logout`.

Request:

```json
{
  "refreshToken": "current refresh token"
}
```

Response: success acknowledgement. Logout idempotent hona chahiye.

## 3.5 Current user

### `GET /api/v1/users/me`

**Why needed:** Page refresh ke baad authenticated user profile aur roles restore karna.  
**Where used:** Auth bootstrap, profile menu and authorization-aware UI.

Response data should contain:

```text
id, fullName, email, mobile, roles, emailVerified,
profileComplete, organizationId, accountStatus
```

## 3.6 Verify email

### `POST /api/v1/auth/verify-email`

**Why needed:** Signup email ownership verify karna.  
**Where used:** `/verify-email` page.

Request: `{ "token": "verification token" }`

- Token single-use and expiring hona chahiye.
- Already-used token safe/idempotent response de sakta hai.

## 3.7 Resend verification

### `POST /api/v1/auth/resend-verification`

**Why needed:** Verification email receive/expire hone par new link dena.  
**Where used:** Verify-email page.

Request: `{ "email": "account email" }`

- Rate limit required.
- Response account existence disclose na kare.

## 3.8 Forgot password

### `POST /api/v1/auth/forgot-password`

**Why needed:** Password reset email request karna.  
**Where used:** Forgot-password page.

Request: `{ "email": "account email" }`

- Enumeration-safe generic response return kare.
- Reset token hashed, expiring and single-use ho.

## 3.9 Reset password

### `POST /api/v1/auth/reset-password`

**Why needed:** Valid reset token se new password set karna.  
**Where used:** Reset-password page.

Request:

```json
{
  "token": "reset token",
  "password": "new validated password"
}
```

- Password hash update kare.
- Token consume kare.
- Existing sessions revoke karne ki approved policy implement kare.

## 3.10 Complete profile

### `POST /api/v1/auth/complete-profile`

**Why needed:** Role-specific required profile fields save karna.  
**Where used:** `/complete-profile` page after authenticated login.

- Required fields role ke according validate hon.
- Authenticated user ID JWT se derive ho.

---

# 4. Student APIs — Priority P0

**Core rule:** Student ID browser se mat maangiye. Current Student JWT se resolve hoga. Every value real PostgreSQL data se aayegi.

Frontend locations:

```text
app/student/dashboard/page.tsx
app/student/learning/page.tsx
app/student/assessment/*
app/student/career/page.tsx
services/student/*
types/student.ts
```

## 4.1 Personalized Student dashboard

### `GET /api/v1/student/dashboard`

**Why needed:** User-specific greeting, weekly progress, summary cards, performers and rank list render karna.  
**Where used:** `/student/dashboard`.

Response data:

```text
welcomeName
weekProgressPercent
summaryCards[]: id, title, description, href, icon
 topPerformers[]: id, name, track, rank, avatarUrl
rankList[]: rank, name, course
```

Backend calculation rules:

- `welcomeName`: authenticated user's profile.
- Weekly progress: approved formula based on real lesson/activity completion.
- Upcoming classes: assigned batches/sessions.
- Upcoming assessments: assignment and attempt records.
- Achievements: approved achievement rules.
- Ranking: approved batch/course/organization scope and scoring formula.

Do not return fabricated default totals. No data ho to empty arrays/zero calculated value return karein.

## 4.2 Student schedule

### `GET /api/v1/student/schedule`

**Why needed:** Schedule dialog mein current learner ki live classes dikhana.  
**Where used:** Student dashboard `ScheduleDialog`.

Each item:

```text
id, title, trainerName, startsAt, durationMinutes,
status, meetingUrl/location when authorized
```

Only enrolled/assigned learner sessions return hon.

## 4.3 Browse courses

### `GET /api/v1/student/courses`

**Why needed:** Real course catalog, categories aur current enrollment state render karna.  
**Where used:** `/student/learning`.

Query params:

```text
search, category, level, page, size, sort
```

Each course should include:

```text
id, title, category, level, rating, reviewCount,
description, imageUrl, learningOutcomes[], chapterCount,
duration, certificateEta/eligibility, enrolled, progressPercent
```

Backend current user's organization, eligibility and enrollment apply kare.

## 4.4 Course details

### `GET /api/v1/student/courses/{courseId}`

**Why needed:** Selected course ka full curriculum/details render karna.  
**Where used:** Learning details interaction.

Authorization: unpublished, unauthorized ya unrelated organization course expose na ho.

## 4.5 Enroll in course

### `POST /api/v1/student/courses/{courseId}/enroll`

**Why needed:** Student ko course mein enroll karna.  
**Where used:** Course card `Enroll` action.

Response: `{ "enrolled": true }`

- Enrollment idempotent ho.
- Student identity JWT se aaye.
- Capacity/prerequisite/subscription checks backend kare.

## 4.6 List assessments

### `GET /api/v1/student/assessments`

**Why needed:** Current learner ke upcoming, in-progress and completed assessments list karna.  
**Where used:** `/student/assessment`.

Query: `status=all|upcoming|in_progress|completed`

Each assessment:

```text
id, title, status, questionCount, durationMinutes, dueAt, imageUrl
```

## 4.7 Assessment detail

### `GET /api/v1/student/assessments/{assessmentId}`

**Why needed:** Instructions, sections, question totals and allowed attempt state render karna.  
**Where used:** `/student/assessment/{id}`.

Do not expose answer keys. Verify learner assignment and release window.

## 4.8 Start/resume assessment

### `POST /api/v1/student/assessments/{assessmentId}/start`

**Why needed:** Transactionally attempt create ya approved existing attempt resume karna.  
**Where used:** Assessment Continue/Start action.

Response: `{ "attemptId": "UUID" }`

Backend timer, start window, attempt limit and duplicate attempt enforce kare.

## 4.9 Submit assessment work

### `POST /api/v1/student/assessments/{assessmentId}/submit`

**Why needed:** Answers/file/comments submit karna.  
**Where used:** Student assessment upload panel/runner.

Content type: `multipart/form-data`

```text
file        optional/required according to assessment
comments    optional text
attemptId   when contract requires it
answers     structured JSON when question-based assessment
```

- File extension ke saath actual MIME/content validate kare.
- Maximum size backend-configured ho.
- Duplicate/late submission policy enforce ho.
- File PostgreSQL blob mein na rakhein; secure storage reference save karein.

## 4.10 Career progress

### `GET /api/v1/student/career`

**Why needed:** Real career-readiness progress bars/ring render karna.  
**Where used:** `/student/career`.

Response data:

```text
readinessPercent
skill: done, total
experience: done, total
certificates: done, total
goals: done, total
```

Every percentage approved documented formula se calculate ho. Frontend fixed percentage use nahi karega.

## 4.11 Notifications

### `GET /api/v1/student/notifications`

**Why needed:** Current learner notifications render karna.  
**Where used:** Student notification page/topbar.

### `PATCH /api/v1/student/notifications/{notificationId}/read`

**Why needed:** Read state persist karna.

### `DELETE /api/v1/student/notifications/{notificationId}`

**Why needed:** Current user's notification remove/archive karna.

Notification ownership every mutation par validate karein.

## 4.12 Student profile

### `GET /api/v1/student/profile`

**Why needed:** Authenticated Student profile load karna.  
**Where used:** `/student/profile`.

### `PUT /api/v1/student/profile`

**Why needed:** Editable profile fields save karna.

Allowed-field DTO use karein; role, status, organization ya verified fields mass-update na hone dein.

---

# 5. Trainer APIs — Priority P1

Frontend locations:

```text
app/trainer/*
components/dashboard/trainer/TrainerOverview.tsx
services/trainer/trainer.service.ts
```

All Trainer queries assigned organization, batches and learners tak scoped hon.

| Method and endpoint                       | Why needed                         | Frontend location/use  |
| ----------------------------------------- | ---------------------------------- | ---------------------- |
| `GET /trainer/dashboard`                  | Real batch/session/review summary  | Trainer dashboard      |
| `GET /trainer/batches`                    | Assigned batches list              | `/trainer/batches`     |
| `POST /trainer/batches`                   | Authorized batch creation          | Batch create flow      |
| `GET /trainer/batches/{batchId}`          | Batch detail and learners          | Batch details          |
| `PUT /trainer/batches/{batchId}`          | Batch configuration update         | Batch edit flow        |
| `GET /trainer/sessions`                   | Upcoming/past sessions             | `/trainer/sessions`    |
| `POST /trainer/sessions`                  | Schedule session                   | Session form           |
| `PUT /trainer/sessions/{sessionId}`       | Reschedule/update session          | Session edit           |
| `GET /trainer/learners`                   | Assigned learners                  | `/trainer/learners`    |
| `GET /trainer/learners/{learnerId}`       | Authorized learner progress        | Learner detail         |
| `GET /trainer/assessments`                | Trainer-owned/assigned assessments | `/trainer/assessments` |
| `POST /trainer/assessments`               | Create assessment draft            | Assessment form        |
| `PUT /trainer/assessments/{assessmentId}` | Update permitted draft             | Assessment edit        |
| `GET /trainer/feedback`                   | Feedback history/action queue      | `/trainer/feedback`    |
| `POST /trainer/feedback`                  | Add mentoring feedback             | Feedback form          |
| `PATCH /trainer/feedback/{feedbackId}`    | Correct permitted feedback         | Feedback edit          |
| `GET /trainer/profile`                    | Trainer profile                    | `/trainer/profile`     |
| `PUT /trainer/profile`                    | Update allowed profile fields      | Profile form           |
| `GET /trainer/notifications`              | Trainer alerts                     | Trainer notifications  |

Trainer dashboard data must be calculated from real assigned records. Learners from another Trainer/organization visible nahi hone chahiye.

---

# 6. Admin APIs — Priority P1

Frontend locations:

```text
app/admin/*
services/admin/admin.service.ts
```

Admin access organization-scoped hoga. Admin platform-level Super Admin permissions grant nahi kar sakta.

| Method and endpoint                                | Why needed                        | Where used            |
| -------------------------------------------------- | --------------------------------- | --------------------- |
| `GET /admin/dashboard`                             | Organization operational summary  | Admin overview        |
| `GET /admin/users`                                 | Search/filter users               | User Management       |
| `GET /admin/users/{userId}`                        | User details                      | User drawer/page      |
| `PUT /admin/users/{userId}`                        | Allowed user update               | User edit             |
| `PATCH /admin/users/{userId}/status`               | Activate/suspend user             | Status action         |
| `PUT /admin/users/{userId}/roles`                  | Assign allowed organization roles | Role action           |
| `GET /admin/courses`                               | Organization course list          | Course Management     |
| `POST /admin/courses`                              | Create course draft               | Course creation       |
| `PUT /admin/courses/{courseId}`                    | Update course                     | Course editor         |
| `DELETE /admin/courses/{courseId}`                 | Archive/delete allowed course     | Course action         |
| `GET /admin/batches`                               | Monitor batches                   | Batch Monitoring      |
| `GET /admin/batches/{batchId}`                     | Batch detail/progress             | Batch detail          |
| `GET /admin/course-approvals`                      | Pending approval queue            | Course Approval       |
| `POST /admin/course-approvals/{courseId}/decision` | Approve/reject with reason        | Approval action       |
| `GET /admin/assessments`                           | Assessment monitoring             | Assessment Monitoring |
| `GET /admin/assessments/{assessmentId}`            | Assessment detail                 | Monitoring detail     |
| `GET /admin/appeals`                               | Appeal queue                      | Appeal Review         |
| `POST /admin/appeals/{appealId}/decision`          | Resolve appeal with reason        | Appeal action         |
| `GET /admin/reports`                               | Real organization analytics       | Reports & Analytics   |
| `POST /admin/reports/export`                       | Generate CSV/XLSX/PDF export      | Export action         |
| `GET /admin/finance`                               | Finance summary                   | Finance Management    |
| `GET /admin/finance/transactions`                  | Paginated transactions            | Finance table         |
| `GET /admin/content`                               | CMS items                         | Content Management    |
| `POST /admin/content`                              | Create content                    | Content form          |
| `PUT /admin/content/{contentId}`                   | Update content                    | Content editor        |
| `DELETE /admin/content/{contentId}`                | Archive content                   | Content action        |
| `GET /admin/settings`                              | Organization settings             | System Settings       |
| `PUT /admin/settings`                              | Update allowed settings           | Settings form         |

Required audit events: user status, role assignment, course approval, assessment change, appeal decision, report export, finance mutation and settings change.

---

# 7. Super Admin APIs — Priority P1/P2

Frontend locations:

```text
app/super-admin/*
services/super-admin/super-admin.service.ts
```

| Method and endpoint                            | Why needed                         | Where used              |
| ---------------------------------------------- | ---------------------------------- | ----------------------- |
| `GET /super-admin/dashboard`                   | Platform-wide verified summary     | Super Admin overview    |
| `GET /super-admin/organizations`               | Organization directory             | Organizations           |
| `POST /super-admin/organizations`              | Create organization                | Organization form       |
| `GET /super-admin/organizations/{id}`          | Organization details               | Organization page       |
| `PUT /super-admin/organizations/{id}`          | Update organization                | Organization edit       |
| `PATCH /super-admin/organizations/{id}/status` | Activate/suspend organization      | Status action           |
| `GET /super-admin/roles`                       | Platform role list                 | Roles & Permissions     |
| `POST /super-admin/roles`                      | Create custom role                 | Role form               |
| `PUT /super-admin/roles/{roleId}`              | Update role                        | Role editor             |
| `DELETE /super-admin/roles/{roleId}`           | Delete permitted unused role       | Role action             |
| `GET /super-admin/permissions`                 | Permission catalog                 | Permission matrix       |
| `PUT /super-admin/roles/{roleId}/permissions`  | Assign permissions                 | Permission save         |
| `GET /super-admin/admins`                      | Platform/organization admins       | Manage Admins           |
| `POST /super-admin/admins`                     | Securely provision Admin           | Admin create            |
| `PUT /super-admin/admins/{adminId}`            | Update Admin                       | Admin edit              |
| `PATCH /super-admin/admins/{adminId}/status`   | Activate/suspend Admin             | Status action           |
| `GET /super-admin/subscriptions`               | Subscription records               | Subscription Management |
| `PUT /super-admin/subscriptions/{id}`          | Update approved subscription state | Subscription action     |
| `GET /super-admin/analytics`                   | Platform analytics                 | Platform Analytics      |
| `GET /super-admin/audit-logs`                  | Search security/operation events   | Audit Logs              |
| `GET /super-admin/system-configuration`        | Non-secret system configuration    | System Configuration    |
| `PUT /super-admin/system-configuration`        | Update allowed system config       | System config form      |
| `GET /super-admin/platform-configuration`      | Platform behavior configuration    | Platform Configuration  |
| `PUT /super-admin/platform-configuration`      | Update approved platform behavior  | Platform config form    |

Critical rules:

- Secrets configuration response mein kabhi return na hon.
- Last active Super Admin accidentally disable/delete na ho.
- Role escalation prevent ho.
- Every mutation before/after safe change summary ke saath audit ho.

---

# 8. Additional backend services required

## 8.1 File storage

Needed for assessment submissions, course files and certificates.

- Storage provider ko service interface ke behind rakhein.
- PostgreSQL mein metadata and secure object reference save karein.
- Public raw file URL return na karein.
- Authorized download/signed URL endpoint provide karein.
- File size, MIME type and malware policy enforce karein.

## 8.2 Email service

Needed for:

```text
email verification
password reset
account invitation
assessment assignment/due reminder
session reminder
result publication
certificate issuance
appeal decision
```

Email asynchronously send ho; API request ko SMTP completion tak block na karein.

## 8.3 Audit service

Audit fields:

```text
id, actorId, actorRole, organizationId,
action, entityType, entityId, timestamp,
traceId, safeChangeSummary, sourceIp when legally approved
```

## 8.4 Scheduled jobs

Likely required for:

- Expired token cleanup.
- Assessment due reminders.
- Session reminders.
- Certificate generation queues.
- Report exports.
- Inactive session/token cleanup.

---

# 9. API implementation priority and dependency order

## Sprint/Phase 1 — Frontend unblockers

1. Common response/error contract.
2. Database migrations and base roles.
3. Signup, login, refresh, logout.
4. Email verification and password reset.
5. `/users/me`.
6. `GET /student/dashboard`.
7. `GET /student/schedule`.
8. Student courses.
9. Student assessments.
10. Student career progress.

## Phase 2 — Trainer workflow

1. Trainer dashboard.
2. Batches and learners.
3. Sessions and attendance.
4. Assessments and reviews.
5. Feedback and notifications.

## Phase 3 — Governance

1. Admin user/course/batch management.
2. Approvals, appeals and reporting.
3. Super Admin organizations and Admin provisioning.
4. Roles, permissions and subscriptions.
5. Audit logs and platform configuration.

---

# 10. Definition of Done for each backend API

An API is complete only when:

- OpenAPI/Swagger contract updated hai.
- Request and response DTOs finalized hain.
- Validation implemented hai.
- Authentication and RBAC implemented hai.
- Organization/ownership test implemented hai.
- Success and error responses common format follow karte hain.
- Unit tests added hain.
- PostgreSQL integration test added hai.
- Empty-state response verified hai.
- Audit requirement implemented hai where applicable.
- Postman example added hai.
- Frontend integration locally verified hai.
- No hardcoded business records, metrics, user IDs, role bypasses or secrets hain.

---

# 11. Frontend ↔ Backend handoff checklist

Backend team frontend team ko provide kare:

- Swagger/OpenAPI URL.
- Postman collection/environment.
- Development backend base URL.
- Required environment-variable list without secret values.
- Database migration instructions.
- Test accounts through approved seed/admin workflow.
- Role and permission mapping.
- Progress and ranking formula document.
- File limits and accepted MIME types.
- Authentication token-expiry policy.
- Known API limitations and versioning notes.

Frontend team verify kare:

- Field names TypeScript types ke saath match karte hain.
- API success/error format consistent hai.
- No user-specific data frontend mein hardcoded hai.
- Loading, empty, unauthorized and error states work karte hain.
- Student sees only own data.
- Trainer sees only assigned data.
- Admin sees only own organization.
- Super Admin permissions backend-enforced hain.

---

# 12. Current frontend contract source files

Backend implementation ke time in files ko reference karein:

```text
lib/config/shared.ts
services/auth.service.ts
services/student/*
services/trainer/trainer.service.ts
services/admin/admin.service.ts
services/super-admin/super-admin.service.ts
types/auth.ts
types/student.ts
types/administration.ts
docs/STUDENT_API_CONTRACT.md
```

If backend contract change hota hai, pehle OpenAPI contract update karein, phir frontend endpoint/type update karein. Silent field-name changes avoid karein.
