// User Types
export type UserId = 'ram' | 'ananya';

export interface User {
  id: UserId;
  name: string;
  displayName: string;
  dailyHours: number;
  level: 'advanced' | 'beginner';
  subjects: Subject[];
  leetcodePerDay: number;
  totalLeetcode: number;
  themeColor: 'blue' | 'purple';
}

// Subject Types
export type SubjectId = 'genai' | 'mlops' | 'dsa' | 'python' | 'mldl';

export interface Subject {
  id: SubjectId;
  name: string;
  color: string;
  hoursPerDay: number;
}

// Task Types
export interface ScheduleTask {
  day: number;
  topic: string;
  resource: string;
  leetcode?: string;
}

export interface DailyTask {
  id: string;
  day: number;
  date: Date;
  subject: SubjectId;
  topic: string;
  resource: string;
  leetcode?: string;
}

export interface DaySchedule {
  day: number;
  date: Date;
  tasks: DailyTask[];
  dailyNote: string;
  completed: boolean;
}

// Progress Types
export interface UserProgress {
  tasksCompleted: Record<string, boolean>;
  taskNotes: Record<string, string>;
  dailyNotes: Record<number, string>;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
}

// Weekly Summary
export interface WeeklySummary {
  weekNumber: number;
  startDay: number;
  endDay: number;
  startDate: Date;
  endDate: Date;
  totalTasks: number;
  completedTasks: number;
  subjectBreakdown: Record<SubjectId, { total: number; completed: number }>;
  milestone?: string;
}

// Resource Types
export interface Resource {
  id: string;
  title: string;
  url: string;
  description: string;
  subject: SubjectId;
  type: 'video' | 'article' | 'course' | 'documentation' | 'practice';
}
