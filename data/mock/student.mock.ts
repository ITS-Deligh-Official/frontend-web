// Deligh Campus is a soft-skills learning platform — course tracks,
// assessments, and career-readiness content all revolve around
// workplace/interpersonal skills (Communication, Leadership, Teamwork,
// Problem Solving, Confidence — per the brand guide's own imagery), not
// technical subjects. Keep new mock entries on-theme.

import type {
  StudentDashboardData,
  Course,
  Assessment,
  AssessmentDetail,
  CareerProgress,
  AppNotification,
  StudentProfile,
} from "@/types/student";

export const MOCK_DASHBOARD: StudentDashboardData = {
  welcomeName: "Sandeep",
  weekProgressPercent: 75,
  summaryCards: [
    { id: "1", title: "My Learning Process", description: "Pick up your current module where you left off.", href: "/student/learning", icon: "learning" },
    { id: "2", title: "Upcoming Classes", description: "2 live sessions scheduled this week.", href: "/student/learning", icon: "classes" },
    { id: "3", title: "Upcoming Assessment", description: "Soft Skills Assessment due in 3 days.", href: "/student/assessment", icon: "assessment" },
    { id: "4", title: "Recent Activity", description: "You completed Communication Skills — Module 4.", href: "/student/dashboard", icon: "activity" },
    { id: "5", title: "Achievements", description: "3 badges earned this month.", href: "/student/career", icon: "achievements" },
    { id: "6", title: "Recommended for You", description: "Based on your Communication & Leadership track.", href: "/student/learning", icon: "recommended" },
  ],
  topPerformers: [
    { id: "p1", name: "Liza", track: "Leadership", rank: 1 },
    { id: "p2", name: "Riya", track: "Communication", rank: 2 },
    { id: "p3", name: "Sanjay", track: "Problem Solving", rank: 3 },
  ],
  rankList: [
    { rank: 1, name: "Akhil", course: "Communication Skills" },
    { rank: 2, name: "Priya", course: "Communication Skills" },
    { rank: 3, name: "Rohit", course: "Communication Skills" },
    { rank: 4, name: "Neha", course: "Communication Skills" },
    { rank: 5, name: "Karan", course: "Communication Skills" },
  ],
};

export const MOCK_COURSES: Course[] = [
  {
    id: "c1",
    title: "Communication Skills",
    level: "Beginner to Advanced",
    rating: 4.8,
    reviewCount: 2500,
    description:
      "Communication is the foundation of every workplace interaction. This track covers speaking clearly, listening actively, and getting your ideas across with confidence — in meetings, interviews, and everyday collaboration.",
    learningOutcomes: [
      "Active Listening",
      "Public Speaking",
      "Written Communication",
      "Non-verbal Cues",
      "Giving & Receiving Feedback",
      "Persuasive Communication",
      "Cross-team Collaboration",
    ],
    chapterCount: 24,
    duration: "2 months",
    certificateEta: "2 months",
    enrolled: true,
  },
  {
    id: "c2",
    title: "Leadership & Teamwork",
    level: "Intermediate",
    rating: 4.7,
    reviewCount: 1800,
    description:
      "Learn to inspire, guide, and achieve more together. This track builds the people-management and collaboration skills that turn individual contributors into team leads.",
    learningOutcomes: [
      "Delegation",
      "Conflict Resolution",
      "Motivating a Team",
      "Decision Making",
      "Accountability",
    ],
    chapterCount: 18,
    duration: "6 weeks",
    certificateEta: "6 weeks",
    enrolled: false,
  },
  {
    id: "c3",
    title: "Problem Solving & Critical Thinking",
    level: "Beginner to Advanced",
    rating: 4.6,
    reviewCount: 1420,
    description:
      "Think critically and find better solutions under pressure. Covers structured problem-solving frameworks, root-cause analysis, and decision-making under ambiguity.",
    learningOutcomes: [
      "Root Cause Analysis",
      "Structured Thinking",
      "Creative Problem Solving",
      "Decision Frameworks",
    ],
    chapterCount: 20,
    duration: "2 months",
    certificateEta: "2 months",
    enrolled: false,
  },
];

export const MOCK_ASSESSMENTS: Assessment[] = [
  { id: "a1", title: "Soft Skills Assessment", status: "in_progress", questionCount: 20, durationMinutes: 30, dueAt: "2026-10-25T23:59:00" },
  { id: "a2", title: "Communication Skills Quiz", status: "in_progress", questionCount: 20, durationMinutes: 30, dueAt: "2026-10-25T23:59:00" },
  { id: "a3", title: "Problem Solving Test", status: "in_progress", questionCount: 20, durationMinutes: 30, dueAt: "2026-10-25T23:59:00" },
  { id: "a4", title: "Work Ethic Evaluation", status: "in_progress", questionCount: 20, durationMinutes: 30, dueAt: "2026-10-25T23:59:00" },
];

export const MOCK_ASSESSMENT_DETAIL: Record<string, AssessmentDetail> = {
  a1: {
    ...MOCK_ASSESSMENTS[0],
    sections: [
      { label: "Adaptability", description: "How you respond to change and new situations.", questionCount: 5 },
      { label: "Communication", description: "Clarity and effectiveness in conveying ideas.", questionCount: 5 },
      { label: "Problem Solving", description: "How you approach and resolve challenges.", questionCount: 5 },
      { label: "Work Ethic", description: "Reliability, ownership, and follow-through.", questionCount: 5 },
    ],
    tips: [
      { title: "Manage Your Time", description: "Pace yourself — 50 minutes for 20 questions." },
      { title: "Read Carefully", description: "Each question has one best answer." },
      { title: "Be Honest", description: "There's no reward for guessing what sounds good." },
      { title: "Review Your Answers", description: "Use any remaining time to double-check." },
    ],
    timeRemainingMinutes: 50,
    questionsAttempted: 8,
    questionsTotal: 20,
    skillCoverage: [
      { label: "Adaptability", percent: 75 },
      { label: "Communication", percent: 60 },
      { label: "Problem Solving", percent: 40 },
      { label: "Work Ethic", percent: 70 },
    ],
  },
};

export const MOCK_CAREER: CareerProgress = {
  readinessPercent: 75,
  skill: { done: 8, total: 12 },
  experience: { done: 2, total: 6 },
  certificates: { done: 1, total: 4 },
  goals: { done: 3, total: 5 },
};

export const MOCK_NOTIFICATIONS: AppNotification[] = [
  { id: "n1", title: "Assignment Due Tomorrow", body: "Communication Skills Roleplay Assignment is due tomorrow by 9 PM.", createdAt: "2026-08-22T11:34:00", read: false, actionLabel: "View Assignment", actionHref: "/student/assessment" },
  { id: "n2", title: "Assignment Due Tomorrow", body: "Communication Skills Roleplay Assignment is due tomorrow by 9 PM.", createdAt: "2026-08-22T10:54:00", read: false, actionLabel: "View Assignment", actionHref: "/student/assessment" },
];

export const MOCK_PROFILE: StudentProfile = {
  fullName: "Sandeep S",
  roleTitle: "Soft Skills Learner",
  about:
    "Working on communication, leadership, and problem-solving through Deligh Campus's soft-skills tracks — turning classroom confidence into workplace readiness.",
  phone: "+91 9605250412",
  email: "sandeep@example.com",
  gender: "Male",
};
