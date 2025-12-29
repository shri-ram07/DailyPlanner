import { useState } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStudyStore } from '@/store/useStudyStore';
import { useSchedule } from '@/hooks/useSchedule';
import { CalendarDay } from './CalendarDay';
import { USERS } from '@/data/users';

export function StudyCalendar() {
  const { startDate, totalDays, getDateForDay, getDayForDate } = useSchedule();
  const { currentUser, setSelectedDay } = useStudyStore();
  const user = USERS[currentUser];

  const endDate = getDateForDay(totalDays);
  const [currentMonth, setCurrentMonth] = useState(startDate);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const canGoPrev = currentMonth > startOfMonth(startDate);
  const canGoNext = currentMonth < startOfMonth(endDate);

  const handleDayClick = (date: Date) => {
    const dayNumber = getDayForDate(date);
    if (dayNumber) {
      setSelectedDay(dayNumber);
    }
  };

  return (
    <div className="bg-card rounded-lg border p-4">
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          disabled={!canGoPrev}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-semibold">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          disabled={!canGoNext}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map(date => (
          <CalendarDay
            key={date.toISOString()}
            date={date}
            isCurrentMonth={isSameMonth(date, currentMonth)}
            onClick={() => handleDayClick(date)}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t">
        <div className="flex flex-wrap gap-4 text-xs">
          {user.subjects.map(subject => (
            <div key={subject.id} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded"
                style={{ backgroundColor: subject.color }}
              />
              <span>{subject.name}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 text-xs mt-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-green-500/50" />
            <span>Complete</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-yellow-500/50" />
            <span>In Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-muted" />
            <span>Not Started</span>
          </div>
        </div>
      </div>
    </div>
  );
}
