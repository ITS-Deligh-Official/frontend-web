# Trainer API contract

The supplied Trainer screens are implemented as API-driven views. No student names, course names, batches, class times, percentages, counts, scores, schedules, recordings, assessment rows, activities, or report records are stored in frontend code.

Spring Security must derive the Trainer identity and organization from the validated JWT. Every query must be restricted to batches, courses, sessions, assessments, and learners assigned to that Trainer.

## Required endpoints

- `GET /trainer/dashboard` — personalized Trainer name, today schedule, upcoming classes, Student metrics, assessment metrics, and recent activities.
- `GET /trainer/batches` — paginated assigned batches.
- `GET /trainer/batches/{batchId}` — batch information, enrolled students, calculated attendance/score summary, and schedule.
- `POST /trainer/batches` and `PUT /trainer/batches/{batchId}` — permitted batch management.
- `GET /trainer/courses` — paginated Trainer courses with real Student and batch counts.
- `POST /trainer/courses` and `PUT /trainer/courses/{courseId}` — permitted course management.
- `GET /trainer/live-classes` — current class, upcoming schedule, recordings, and calculated report metrics.
- `GET /trainer/students` — assigned students, available batch filters, and calculated aggregate metrics.
- `GET /trainer/students/{studentId}` — authorized learner detail.
- `GET /trainer/assessments` — assessment summary, types, and assessment rows.
- `POST /trainer/assessments` and `PUT /trainer/assessments/{assessmentId}` — assessment creation/update.
- `GET /trainer/reports` — report catalog and available batch filters.
- `POST /trainer/reports/export` — generate an authorized report export.
- `POST /trainer/announcements` — create an announcement for an assigned audience.
- `POST /trainer/attendance` — persist attendance for an assigned session.

Empty arrays are valid. The frontend renders explicit empty states and never substitutes sample records. All percentages and counts must be calculated by Spring Boot from PostgreSQL records.
