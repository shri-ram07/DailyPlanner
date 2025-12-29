import { format } from 'date-fns';
import { StudyCalendar } from '@/components/calendar/StudyCalendar';
import { DayTaskList } from '@/components/tasks/DayTaskList';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useStudyStore } from '@/store/useStudyStore';
import { useSchedule } from '@/hooks/useSchedule';
import { useIsMobile } from '@/hooks/use-mobile';

export function CalendarPage() {
  const { selectedDay, setSelectedDay } = useStudyStore();
  const { getDateForDay } = useSchedule();
  const isMobile = useIsMobile();

  const selectedDate = selectedDay ? getDateForDay(selectedDay) : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Calendar</h1>
        <p className="text-muted-foreground">
          December 30, 2025 - March 28, 2026 | 84 Days
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <StudyCalendar />
        </div>

        {/* Desktop: Side panel for selected day */}
        {!isMobile && selectedDay && (
          <div>
            <DayTaskList day={selectedDay} />
          </div>
        )}

        {/* Desktop: Placeholder when no day selected */}
        {!isMobile && !selectedDay && (
          <div className="flex items-center justify-center h-64 border rounded-lg bg-muted/20">
            <p className="text-muted-foreground text-center">
              Click on a day to view tasks
            </p>
          </div>
        )}
      </div>

      {/* Mobile: Sheet for selected day */}
      {isMobile && (
        <Sheet open={!!selectedDay} onOpenChange={() => setSelectedDay(null)}>
          <SheetContent side="bottom" className="h-[85vh] overflow-auto">
            <SheetHeader className="mb-4">
              <SheetTitle>
                Day {selectedDay} - {selectedDate && format(selectedDate, 'MMM d, yyyy')}
              </SheetTitle>
            </SheetHeader>
            {selectedDay && <DayTaskList day={selectedDay} />}
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}
