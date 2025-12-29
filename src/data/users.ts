import type { User, Subject } from '@/types';

export const RAM_SUBJECTS: Subject[] = [
  { id: 'genai', name: 'GenAI/Transformers', color: '#60A5FA', hoursPerDay: 1.5 },
  { id: 'mlops', name: 'MLOps', color: '#34D399', hoursPerDay: 1.5 },
  { id: 'dsa', name: 'DSA (LeetCode)', color: '#F87171', hoursPerDay: 2 },
];

export const ANANYA_SUBJECTS: Subject[] = [
  { id: 'python', name: 'Python', color: '#FB923C', hoursPerDay: 1 },
  { id: 'mldl', name: 'ML/DL', color: '#2DD4BF', hoursPerDay: 2 },
  { id: 'dsa', name: 'DSA (LeetCode)', color: '#F87171', hoursPerDay: 2 },
];

export const USERS: Record<string, User> = {
  ram: {
    id: 'ram',
    name: 'RAM',
    displayName: 'RAM (Advanced)',
    dailyHours: 5,
    level: 'advanced',
    subjects: RAM_SUBJECTS,
    leetcodePerDay: 2,
    totalLeetcode: 168,
    themeColor: 'blue',
  },
  ananya: {
    id: 'ananya',
    name: 'ANANYA SHAHI',
    displayName: 'ANANYA SHAHI (Beginner)',
    dailyHours: 5,
    level: 'beginner',
    subjects: ANANYA_SUBJECTS,
    leetcodePerDay: 1,
    totalLeetcode: 84,
    themeColor: 'purple',
  },
};

// Start date: December 30, 2025
export const START_DATE = new Date(2025, 11, 30);
export const TOTAL_DAYS = 84;
