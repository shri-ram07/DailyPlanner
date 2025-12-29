import { format, isToday } from 'date-fns';
import { cn } from '@/lib/utils';
import { useStudyStore } from '@/store/useStudyStore';
import { useSchedule } from '@/hooks/useSchedule';

interface CalendarDayProps {
  date: Date;
  isCurrentMonth: boolean;
  onClick: () => void;
}

export function CalendarDay({ date, isCurrentMonth, onClick }: CalendarDayProps) {
  const { currentUser, selectedDay } = useStudyStore();
  const { getDayForDate, getDaySchedule } = useSchedule();

  const dayNumber = getDayForDate(date);
  const isInSchedule = dayNumber !== null;
  const daySchedule = isInSchedule ? getDaySchedule(dayNumber) : null;
  const isSelected = selectedDay === dayNumber;
  const isTodayDate = isToday(date);

  // Get completion status
  const completedCount = daySchedule?.completedCount || 0;
  const totalCount = daySchedule?.totalCount || 0;
  const isComplete = daySchedule?.completed || false;
  const hasProgress = completedCount > 0;

  // Subject colors for dots
  const getSubjectDots = () => {
    if (!daySchedule) return [];
    const subjects = [...new Set(daySchedule.tasks.map(t => t.subject))];
    return subjects.map(subject => {
      switch (subject) {
        case 'genai': return '#60A5FA';
        case 'mlops': return '#34D399';
        case 'dsa': return '#F87171';
        case 'python': return '#FB923C';
        case 'mldl': return '#2DD4BF';
        default: return '#888';
      }
    });
  };

  const subjectDots = getSubjectDots();

  if (!isInSchedule) {
    return (
      <div className={cn(
        "aspect-square p-1 text-center flex flex-col items-center justify-center",
        !isCurrentMonth && "text-muted-foreground/30"
      )}>
        <span className="text-sm">{format(date, 'd')}</span>
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "aspect-square p-1 rounded-lg transition-all hover:scale-105 flex flex-col items-center justify-center relative",
        isSelected && (currentUser === 'ram' ? 'ring-2 ring-blue-500' : 'ring-2 ring-purple-500'),
        isTodayDate && 'ring-2 ring-yellow-500',
        isComplete && 'bg-green-500/20',
        hasProgress && !isComplete && 'bg-yellow-500/20',
        !hasProgress && 'bg-muted/50',
        !isCurrentMonth && 'opacity-50'
      )}
    >
      <span className={cn(
        "text-sm font-medium",
        isTodayDate && 'text-yellow-500'
      )}>
        {format(date, 'd')}
      </span>
      <span className="text-[10px] text-muted-foreground">
        Day {dayNumber}
      </span>

      {/* Subject indicators */}
      <div className="flex gap-0.5 mt-0.5">
        {subjectDots.map((color, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      {/* Completion indicator */}
      <span className="text-[9px] text-muted-foreground">
        {completedCount}/{totalCount}
      </span>
    </button>
  );
}
