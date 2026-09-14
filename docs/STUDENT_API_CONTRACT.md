# Student API contract

All Student screens render the authenticated learner's data returned by Spring Boot. The frontend never submits or trusts a student ID for personalized endpoints; Spring Security derives the identity from the validated access token.

Required endpoints:

- `GET /student/dashboard` — learner name, calculated weekly progress, summary cards, top performers and rank list.
- `GET /student/schedule` — only sessions visible to the authenticated learner.
- `GET /student/courses` — assigned and available courses, categories and enrollment state.
- `POST /student/courses/{courseId}/enroll` — enroll the authenticated learner.
- `GET /student/assessments` — learner-specific assignments and attempt status.
- `GET /student/assessments/{assessmentId}` — authorized assessment detail.
- `POST /student/assessments/{assessmentId}/start` — create or resume the learner's attempt.
- `POST /student/assessments/{assessmentId}/submit` — persist the learner's submission.
- `GET /student/career` — calculated readiness and completion totals.
- `GET /student/profile` and `PUT /student/profile` — authenticated learner profile.
- `GET /student/notifications` — authenticated learner notifications.

Progress, rankings, due dates, enrollment, certificates and career readiness must be calculated from PostgreSQL records by Spring Boot. Empty arrays are valid and render empty states; the frontend must never replace unavailable data with sample records.
