import { Target, Flame, TrendingUp, CheckCircle2, Code } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useProgress } from '@/hooks/useProgress';
import { useStudyStore } from '@/store/useStudyStore';
import { cn } from '@/lib/utils';

export function ProgressOverview() {
  const { currentUser } = useStudyStore();
  const {
    overallCompletion,
    streakData,
    completedTasks,
    totalTasks,
    leetcodeSolved,
    leetcodeTotal,
    daysCompleted,
  } = useProgress();

  const stats = [
    {
      label: 'Overall Progress',
      value: `${overallCompletion}%`,
      icon: Target,
      color: currentUser === 'ram' ? 'text-blue-500' : 'text-purple-500',
    },
    {
      label: 'Current Streak',
      value: `${streakData.current} days`,
      icon: Flame,
      color: 'text-orange-500',
    },
    {
      label: 'Longest Streak',
      value: `${streakData.longest} days`,
      icon: TrendingUp,
      color: 'text-green-500',
    },
    {
      label: 'Tasks Completed',
      value: `${completedTasks}/${totalTasks}`,
      icon: CheckCircle2,
      color: 'text-blue-500',
    },
    {
      label: 'LeetCode Solved',
      value: `${leetcodeSolved}/${leetcodeTotal}`,
      icon: Code,
      color: 'text-red-500',
    },
    {
      label: 'Days Completed',
      value: `${daysCompleted}/84`,
      icon: Target,
      color: 'text-teal-500',
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {stats.map(({ label, value, icon: Icon, color }) => (
        <Card key={label}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              {label}
            </CardTitle>
            <Icon className={cn("h-4 w-4", color)} />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
