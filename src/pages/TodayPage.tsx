import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DayTaskList } from '@/components/tasks/DayTaskList';
import { useProgress } from '@/hooks/useProgress';
import { useSchedule } from '@/hooks/useSchedule';

export function TodayPage() {
  const { currentDay } = useProgress();
  const { totalDays } = useSchedule();
  const [viewDay, setViewDay] = useState(currentDay);

  const goToPrevDay = () => {
    setViewDay(Math.max(1, viewDay - 1));
  };

  const goToNextDay = () => {
    setViewDay(Math.min(totalDays, viewDay + 1));
  };

  const goToToday = () => {
    setViewDay(currentDay);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Daily Tasks</h1>
          <p className="text-muted-foreground">
            {viewDay === currentDay ? "Today's" : `Day ${viewDay}`} study plan
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrevDay}
            disabled={viewDay <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium min-w-[80px] text-center">
            Day {viewDay}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={goToNextDay}
            disabled={viewDay >= totalDays}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          {viewDay !== currentDay && (
            <Button variant="outline" onClick={goToToday}>
              <Calendar className="mr-2 h-4 w-4" />
              Go to Today
            </Button>
          )}
        </div>
      </div>

      <DayTaskList day={viewDay} />
    </div>
  );
}
