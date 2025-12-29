import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useSchedule } from '@/hooks/useSchedule';
import { format } from 'date-fns';

export function StreakCalendar() {
  const { getDaySchedule, getDateForDay, totalDays } = useSchedule();

  const getColorClass = (percentage: number) => {
    if (percentage === 0) return 'bg-muted/30';
    if (percentage < 50) return 'bg-yellow-500/40';
    if (percentage < 100) return 'bg-green-500/40';
    return 'bg-green-500';
  };

  // Create array of all 84 days
  const days = Array.from({ length: totalDays }, (_, i) => {
    const day = i + 1;
    const schedule = getDaySchedule(day);
    const date = getDateForDay(day);
    return {
      day,
      date,
      completed: schedule.completedCount,
      total: schedule.totalCount,
      percentage: schedule.progress,
    };
  });

  // Group by weeks (7 days each)
  const weeks: typeof days[] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Activity Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {/* Week labels */}
          <div className="flex gap-1 mb-2 text-xs text-muted-foreground">
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} className="w-[calc((100%-44px)/12)] text-center">
                W{i + 1}
              </div>
            ))}
          </div>

          {/* Calendar grid - transposed (days of week as rows) */}
          <div className="flex gap-1">
            {/* Day labels */}
            <div className="flex flex-col gap-1 text-xs text-muted-foreground pr-1">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                <div key={i} className="h-4 flex items-center">{d}</div>
              ))}
            </div>

            {/* Calendar cells - 12 weeks x 7 days */}
            <div className="flex gap-1 flex-1">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1 flex-1">
                  {week.map((dayData) => (
                    <Tooltip key={dayData.day}>
                      <TooltipTrigger asChild>
                        <div
                          className={cn(
                            "h-4 rounded-sm cursor-pointer transition-colors hover:ring-1 hover:ring-primary",
                            getColorClass(dayData.percentage)
                          )}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="font-medium">Day {dayData.day}</p>
                        <p className="text-xs">{format(dayData.date, 'MMM d, yyyy')}</p>
                        <p className="text-xs text-muted-foreground">
                          {dayData.completed}/{dayData.total} tasks ({dayData.percentage}%)
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground justify-end">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-sm bg-muted/30" />
            <div className="w-3 h-3 rounded-sm bg-yellow-500/40" />
            <div className="w-3 h-3 rounded-sm bg-green-500/40" />
            <div className="w-3 h-3 rounded-sm bg-green-500" />
          </div>
          <span>More</span>
        </div>
      </CardContent>
    </Card>
  );
}
