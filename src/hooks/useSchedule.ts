import { useMemo } from 'react';
import { addDays } from 'date-fns';
import { useStudyStore } from '@/store/useStudyStore';
import { RAM_GENAI, RAM_MLOPS, RAM_DSA } from '@/data/schedule-ram';
import { ANANYA_PYTHON, ANANYA_MLDL, ANANYA_DSA } from '@/data/schedule-ananya';
import { START_DATE, TOTAL_DAYS } from '@/data/users';
import type { DailyTask, SubjectId } from '@/types';

export function useSchedule() {
  const { currentUser, progress } = useStudyStore();
  const userProgress = progress[currentUser];

  // Generate all tasks for the current user
  const allTasks = useMemo(() => {
    const tasks: DailyTask[] = [];

    if (currentUser === 'ram') {
      // RAM's tasks: GenAI, MLOps, 2 DSA problems per day
      for (let day = 1; day <= TOTAL_DAYS; day++) {
        const date = addDays(START_DATE, day - 1);
        const genai = RAM_GENAI[day - 1];
        const mlops = RAM_MLOPS[day - 1];
        const dsa = RAM_DSA[day - 1];

        // GenAI task
        tasks.push({
          id: `ram-${day}-genai`,
          day,
          date,
          subject: 'genai' as SubjectId,
          topic: genai.topic,
          resource: genai.resource,
        });

        // MLOps task
        tasks.push({
          id: `ram-${day}-mlops`,
          day,
          date,
          subject: 'mlops' as SubjectId,
          topic: mlops.topic,
          resource: mlops.resource,
        });

        // DSA task (includes leetcode problem)
        tasks.push({
          id: `ram-${day}-dsa`,
          day,
          date,
          subject: 'dsa' as SubjectId,
          topic: dsa.topic,
          resource: dsa.resource,
          leetcode: dsa.leetcode,
        });
      }
    } else {
      // ANANYA's tasks: Python, ML/DL, 1 DSA problem per day
      for (let day = 1; day <= TOTAL_DAYS; day++) {
        const date = addDays(START_DATE, day - 1);
        const python = ANANYA_PYTHON[day - 1];
        const mldl = ANANYA_MLDL[day - 1];
        const dsa = ANANYA_DSA[day - 1];

        // Python task
        tasks.push({
          id: `ananya-${day}-python`,
          day,
          date,
          subject: 'python' as SubjectId,
          topic: python.topic,
          resource: python.resource,
        });

        // ML/DL task
        tasks.push({
          id: `ananya-${day}-mldl`,
          day,
          date,
          subject: 'mldl' as SubjectId,
          topic: mldl.topic,
          resource: mldl.resource,
        });

        // DSA task
        tasks.push({
          id: `ananya-${day}-dsa`,
          day,
          date,
          subject: 'dsa' as SubjectId,
          topic: dsa.topic,
          resource: dsa.resource,
          leetcode: dsa.leetcode,
        });
      }
    }

    return tasks;
  }, [currentUser]);

  // Get tasks for a specific day
  const getTasksForDay = (day: number) => {
    return allTasks.filter(task => task.day === day);
  };

  // Get day schedule with completion status
  const getDaySchedule = (day: number) => {
    const tasks = getTasksForDay(day);
    const tasksWithStatus = tasks.map(task => ({
      ...task,
      completed: userProgress.tasksCompleted[task.id] || false,
      notes: userProgress.taskNotes[task.id] || '',
    }));

    const completedCount = tasksWithStatus.filter(t => t.completed).length;
    const totalCount = tasksWithStatus.length;

    return {
      day,
      date: tasks[0]?.date || addDays(START_DATE, day - 1),
      tasks: tasksWithStatus,
      dailyNote: userProgress.dailyNotes[day] || '',
      completed: completedCount === totalCount && totalCount > 0,
      completedCount,
      totalCount,
      progress: totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0,
    };
  };

  // Get date for a specific day number
  const getDateForDay = (day: number) => {
    return addDays(START_DATE, day - 1);
  };

  // Get day number for a specific date
  const getDayForDate = (date: Date) => {
    const diffTime = date.getTime() - START_DATE.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    if (diffDays < 1 || diffDays > TOTAL_DAYS) return null;
    return diffDays;
  };

  // Get current day based on today's date
  const getCurrentDay = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffTime = today.getTime() - START_DATE.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return Math.min(Math.max(diffDays, 1), TOTAL_DAYS);
  };

  return {
    allTasks,
    getTasksForDay,
    getDaySchedule,
    getDateForDay,
    getDayForDate,
    getCurrentDay,
    totalDays: TOTAL_DAYS,
    startDate: START_DATE,
  };
}
