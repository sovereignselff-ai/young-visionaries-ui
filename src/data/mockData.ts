export interface Student {
  id: string;
  name: string;
  grade: string;
  level: number;
  xp: number;
  xpToNext: number;
  avatarFallback: string;
  lastStruggledWith: string;
  aiRecommendedAction: string;
}

export interface AIArtifact {
  id: string;
  title: string;
  type: "PDF" | "Game" | "Outline";
  subject: string;
  icon: string;
  createdAt: string;
}

export interface HomeworkTask {
  id: string;
  title: string;
  subject: string;
  description: string;
  status: "completed" | "active" | "locked";
  xpReward: number;
  dueDate: string;
}

export interface ShopProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  grade: string;
  subject: string;
}

export interface RosterStudent {
  id: string;
  name: string;
  focusSubject: string;
  assignmentsCompleted: number;
  assignmentsTotal: number;
  currentGrade: string;
  xp: number;
}

export const students: Student[] = [
  {
    id: "s1",
    name: "Marcus Johnson",
    grade: "7th",
    level: 4,
    xp: 720,
    xpToNext: 1000,
    avatarFallback: "MJ",
    lastStruggledWith: "Dividing Fractions",
    aiRecommendedAction: "Assign Fractions Mastery Game + 1:1 check-in Thursday",
  },
  {
    id: "s2",
    name: "Aisha Patel",
    grade: "5th",
    level: 2,
    xp: 340,
    xpToNext: 500,
    avatarFallback: "AP",
    lastStruggledWith: "Multi-digit Multiplication",
    aiRecommendedAction: "Generate visual multiplication flashcards, 15 min daily",
  },
  {
    id: "s3",
    name: "Tyler Brooks",
    grade: "8th",
    level: 6,
    xp: 1450,
    xpToNext: 2000,
    avatarFallback: "TB",
    lastStruggledWith: "Linear Equations (slope-intercept form)",
    aiRecommendedAction: "Create slope-intercept practice set with real-world examples",
  },
];

export const marcus = students[0];

export const olivier: Student = {
  id: "olivier",
  name: "Olivier",
  grade: "8th",
  level: 5,
  xp: 1200,
  xpToNext: 1500,
  avatarFallback: "OL",
  lastStruggledWith: "Quadratic Equations",
  aiRecommendedAction: "Master advanced algebra with interactive problem sets",
};

export const aiArtifacts: AIArtifact[] = [
  {
    id: "a1",
    title: "Day 1 Fractions Revision",
    type: "PDF",
    subject: "Mathematics",
    icon: "FileText",
    createdAt: "2 hours ago",
  },
  {
    id: "a2",
    title: "Leadership & Confidence Building Module",
    type: "Game",
    subject: "Life Skills",
    icon: "Gamepad2",
    createdAt: "Yesterday",
  },
  {
    id: "a3",
    title: "Lesson Outline: Cell Biology",
    type: "Outline",
    subject: "Science",
    icon: "BookOpen",
    createdAt: "2 days ago",
  },
];

export const marcusHomework: HomeworkTask[] = [
  {
    id: "h1",
    title: "Fractions Mastery Game",
    subject: "Mathematics",
    description: "Interactive game covering dividing fractions with visual models and step-by-step hints.",
    status: "active",
    xpReward: 150,
    dueDate: "May 9, 2026",
  },
  {
    id: "h2",
    title: "Decimal Operations Quiz",
    subject: "Mathematics",
    description: "Practice adding, subtracting, multiplying, and dividing decimals to the hundredths place.",
    status: "completed",
    xpReward: 100,
    dueDate: "May 5, 2026",
  },
  {
    id: "h3",
    title: "Scientific Method Reading",
    subject: "Science",
    description: "Read Chapter 4 and answer guided questions on the steps of the scientific method.",
    status: "locked",
    xpReward: 80,
    dueDate: "May 12, 2026",
  },
];

export const olivierHomework: HomeworkTask[] = [
  {
    id: "oh1",
    title: "Quadratic Equations Mastery",
    subject: "Mathematics",
    description: "Advanced practice set on solving quadratic equations using multiple methods including factoring, completing the square, and the quadratic formula.",
    status: "active",
    xpReward: 200,
    dueDate: "May 10, 2026",
  },
  {
    id: "oh2",
    title: "Function Analysis Challenge",
    subject: "Mathematics",
    description: "Analyze polynomial and exponential functions with detailed graphing exercises and real-world applications.",
    status: "completed",
    xpReward: 150,
    dueDate: "May 6, 2026",
  },
  {
    id: "oh3",
    title: "Calculus Fundamentals Preview",
    subject: "Mathematics",
    description: "Introduction to limits and derivatives with interactive visualization tools.",
    status: "locked",
    xpReward: 180,
    dueDate: "May 15, 2026",
  },
];

export const rosterStudents: RosterStudent[] = [
  {
    id: "s1",
    name: "Marcus Johnson",
    focusSubject: "Mathematics",
    assignmentsCompleted: 4,
    assignmentsTotal: 5,
    currentGrade: "B+",
    xp: 720,
  },
  {
    id: "s2",
    name: "Aisha Patel",
    focusSubject: "Science",
    assignmentsCompleted: 3,
    assignmentsTotal: 5,
    currentGrade: "A-",
    xp: 340,
  },
  {
    id: "s3",
    name: "Tyler Brooks",
    focusSubject: "Mathematics",
    assignmentsCompleted: 5,
    assignmentsTotal: 5,
    currentGrade: "A",
    xp: 1450,
  },
];

export const shopProducts: ShopProduct[] = [
  {
    id: "p1",
    title: "Middle School Life Skills & Communication Bundle",
    description:
      "Master public speaking, active listening, emotional intelligence, and conflict resolution. 8-week interactive program with real-world scenarios, role-play guides, and confidence-building exercises.",
    price: 15.0,
    rating: 4.8,
    reviewCount: 124,
    grade: "6th - 8th Grade",
    subject: "Life Skills",
  },
  {
    id: "p2",
    title: "High School Prep Essentials",
    description:
      "Bridge the gap to high school with study skills, time management, digital citizenship, and navigating academic expectations. Includes planning templates and mentor checklists.",
    price: 19.0,
    rating: 4.9,
    reviewCount: 87,
    grade: "8th Grade",
    subject: "Future Readiness",
  },
  {
    id: "p3",
    title: "Pre-Algebra Power-Up",
    description:
      "Master integers, equations, and graphing before 8th-grade algebra. Includes 3 AI-generated practice games and a printable formula reference sheet.",
    price: 12.0,
    rating: 4.7,
    reviewCount: 203,
    grade: "8th Grade",
    subject: "Mathematics",
  },
];
