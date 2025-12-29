import { useMemo } from 'react';
import { useStudyStore } from '@/store/useStudyStore';
import { useSchedule } from './useSchedule';
import { USERS } from '@/data/users';
import type { SubjectId } from '@/types';

export function useProgress() {
  const { currentUser, progress } = useStudyStore();
  const { allTasks, getDaySchedule, getCurrentDay } = useSchedule();
  const userProgress = progress[currentUser];
  const user = USERS[currentUser];

  // Overall completion percentage
  const overallCompletion = useMemo(() => {
    const totalTasks = allTasks.length;
    const completedTasks = Object.values(userProgress.tasksCompleted).filter(Boolean).length;
    return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  }, [allTasks, userProgress.tasksCompleted]);

  // Total tasks count
  const totalTasks = allTasks.length;
  const completedTasks = Object.values(userProgress.tasksCompleted).filter(Boolean).length;

  // Subject progress
  const subjectProgress = useMemo(() => {
    const subjects = new Map<SubjectId, { total: number; completed: number; percentage: number }>();

    // Initialize all user subjects
    user.subjects.forEach(subject => {
      subjects.set(subject.id, { total: 0, completed: 0, percentage: 0 });
    });

    // Count tasks per subject
    allTasks.forEach(task => {
      const current = subjects.get(task.subject);
      if (current) {
        current.total++;
        if (userProgress.tasksCompleted[task.id]) {
          current.completed++;
        }
      }
    });

    // Calculate percentages
    subjects.forEach((value) => {
      value.percentage = value.total > 0
        ? Math.round((value.completed / value.total) * 100)
        : 0;
    });

    return Object.fromEntries(subjects) as Record<SubjectId, { total: number; completed: number; percentage: number }>;
  }, [allTasks, userProgress.tasksCompleted, user.subjects]);

  // LeetCode problems solved
  const leetcodeSolved = useMemo(() => {
    return allTasks
      .filter(task => task.subject === 'dsa' && task.leetcode)
      .filter(task => userProgress.tasksCompleted[task.id])
      .length;
  }, [allTasks, userProgress.tasksCompleted]);

  // Calculate streak
  const streakData = useMemo(() => {
    const currentDay = getCurrentDay();
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    // Check each day for completion
    for (let day = 1; day <= currentDay; day++) {
      const daySchedule = getDaySchedule(day);
      const isComplete = daySchedule.completed;

      if (isComplete) {
        tempStreak++;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        tempStreak = 0;
      }
    }

    // Calculate current streak (consecutive days from today backwards)
    for (let day = currentDay; day >= 1; day--) {
      const daySchedule = getDaySchedule(day);
      if (daySchedule.completed) {
        currentStreak++;
      } else {
        break;
      }
    }

    return { current: currentStreak, longest: longestStreak };
  }, [getCurrentDay, getDaySchedule]);

  // Weekly data for charts
  const weeklyData = useMemo(() => {
    const weeks: { week: number; completed: number; total: number; percentage: number }[] = [];

    for (let w = 1; w <= 12; w++) {
      const startDay = (w - 1) * 7 + 1;
      const endDay = Math.min(w * 7, 84);

      let total = 0;
      let completed = 0;

      allTasks.forEach(task => {
        if (task.day >= startDay && task.day <= endDay) {
          total++;
          if (userProgress.tasksCompleted[task.id]) completed++;
        }
      });

      weeks.push({
        week: w,
        completed,
        total,
        percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
      });
    }

    return weeks;
  }, [allTasks, userProgress.tasksCompleted]);

  // Days completed
  const daysCompleted = useMemo(() => {
    let count = 0;
    for (let day = 1; day <= 84; day++) {
      const daySchedule = getDaySchedule(day);
      if (daySchedule.completed) count++;
    }
    return count;
  }, [getDaySchedule]);

  return {
    overallCompletion,
    totalTasks,
    completedTasks,
    subjectProgress,
    streakData,
    weeklyData,
    leetcodeSolved,
    leetcodeTotal: user.totalLeetcode,
    daysCompleted,
    currentDay: getCurrentDay(),
  };
}
