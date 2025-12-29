import { format } from 'date-fns';
import { Calendar, Clock, Target, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { TaskCard } from './TaskCard';
import { useStudyStore } from '@/store/useStudyStore';
import { useSchedule } from '@/hooks/useSchedule';
import { USERS } from '@/data/users';
import { cn } from '@/lib/utils';

interface DayTaskListProps {
  day: number;
}

export function DayTaskList({ day }: DayTaskListProps) {
  const { getDaySchedule } = useSchedule();
  const { updateDailyNote, currentUser } = useStudyStore();
  const user = USERS[currentUser];

  const daySchedule = getDaySchedule(day);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calendar className={cn(
                "h-5 w-5",
                currentUser === 'ram' ? 'text-blue-500' : 'text-purple-500'
              )} />
              Day {day}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {format(daySchedule.date, 'EEEE, MMMM d, yyyy')}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-2 text-sm">
              <Target className="h-4 w-4 text-muted-foreground" />
              <span>{daySchedule.completedCount}/{daySchedule.totalCount} tasks</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{user.dailyHours} hours</span>
            </div>
            <Progress value={daySchedule.progress} className="w-32 h-2" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Tasks grouped by subject */}
        <div className="space-y-3">
          {daySchedule.tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>

        {/* Daily Reflection */}
        <div className="pt-4 border-t">
          <label className="text-sm font-medium flex items-center gap-2 mb-2">
            <BookOpen className="h-4 w-4" />
            Daily Reflection
          </label>
          <Textarea
            placeholder="How did today go? What did you learn? Any challenges?"
            value={daySchedule.dailyNote}
            onChange={(e) => updateDailyNote(day, e.target.value)}
            className="min-h-[100px]"
          />
        </div>
      </CardContent>
    </Card>
  );
}
