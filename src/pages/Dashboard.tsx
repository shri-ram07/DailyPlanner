import { format } from 'date-fns';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ProgressOverview } from '@/components/progress/ProgressOverview';
import { SubjectProgressChart } from '@/components/progress/SubjectProgressChart';
import { DayTaskList } from '@/components/tasks/DayTaskList';
import { useStudyStore } from '@/store/useStudyStore';
import { useProgress } from '@/hooks/useProgress';
import { USERS } from '@/data/users';

export function Dashboard() {
  const { currentUser } = useStudyStore();
  const { currentDay } = useProgress();
  const user = USERS[currentUser];

  const today = new Date();

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            Welcome back, {user.name}!
          </h1>
          <p className="text-muted-foreground">
            Day {currentDay} of 84 | {format(today, 'EEEE, MMMM d, yyyy')}
          </p>
        </div>
        <Link to="/calendar">
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            View Calendar
          </Button>
        </Link>
      </div>

      {/* Progress Overview */}
      <ProgressOverview />

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Today's Tasks */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Today's Tasks</h2>
            <Link to="/today">
              <Button variant="ghost" size="sm">
                View All Days <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <DayTaskList day={currentDay} />
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          <SubjectProgressChart />
        </div>
      </div>
    </div>
  );
}
