import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserId, UserProgress } from '@/types';

interface StudyState {
  // Current user
  currentUser: UserId;
  setCurrentUser: (userId: UserId) => void;

  // Progress per user
  progress: Record<UserId, UserProgress>;

  // Actions
  toggleTaskCompletion: (taskId: string) => void;
  updateTaskNote: (taskId: string, note: string) => void;
  updateDailyNote: (day: number, note: string) => void;

  // Theme
  theme: 'dark' | 'light';
  toggleTheme: () => void;

  // Selected date for calendar
  selectedDay: number | null;
  setSelectedDay: (day: number | null) => void;
}

const createInitialProgress = (): UserProgress => ({
  tasksCompleted: {},
  taskNotes: {},
  dailyNotes: {},
  currentStreak: 0,
  longestStreak: 0,
  lastActiveDate: '',
});

export const useStudyStore = create<StudyState>()(
  persist(
    (set, get) => ({
      currentUser: 'ram',
      setCurrentUser: (userId) => set({ currentUser: userId, selectedDay: null }),

      progress: {
        ram: createInitialProgress(),
        ananya: createInitialProgress(),
      },

      toggleTaskCompletion: (taskId) => {
        const { currentUser, progress } = get();
        const userProgress = progress[currentUser];
        const isCompleted = !userProgress.tasksCompleted[taskId];
        const today = new Date().toISOString().split('T')[0];

        set({
          progress: {
            ...progress,
            [currentUser]: {
              ...userProgress,
              tasksCompleted: {
                ...userProgress.tasksCompleted,
                [taskId]: isCompleted,
              },
              lastActiveDate: today,
            },
          },
        });
      },

      updateTaskNote: (taskId, note) => {
        const { currentUser, progress } = get();
        set({
          progress: {
            ...progress,
            [currentUser]: {
              ...progress[currentUser],
              taskNotes: {
                ...progress[currentUser].taskNotes,
                [taskId]: note,
              },
            },
          },
        });
      },

      updateDailyNote: (day, note) => {
        const { currentUser, progress } = get();
        set({
          progress: {
            ...progress,
            [currentUser]: {
              ...progress[currentUser],
              dailyNotes: {
                ...progress[currentUser].dailyNotes,
                [day]: note,
              },
            },
          },
        });
      },

      theme: 'dark',
      toggleTheme: () => set((state) => ({
        theme: state.theme === 'dark' ? 'light' : 'dark'
      })),

      selectedDay: null,
      setSelectedDay: (day) => set({ selectedDay: day }),
    }),
    {
      name: 'study-tracker-storage',
      partialize: (state) => ({
        progress: state.progress,
        theme: state.theme,
        currentUser: state.currentUser,
      }),
    }
  )
);
