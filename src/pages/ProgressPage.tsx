import { ProgressOverview } from '@/components/progress/ProgressOverview';
import { SubjectProgressChart } from '@/components/progress/SubjectProgressChart';
import { WeeklyProgressChart } from '@/components/progress/WeeklyProgressChart';
import { StreakCalendar } from '@/components/progress/StreakCalendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function ProgressPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Progress</h1>
        <p className="text-muted-foreground">
          Track your study progress and achievements
        </p>
      </div>

      <ProgressOverview />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="subjects">By Subject</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <SubjectProgressChart />
            <WeeklyProgressChart />
          </div>
          <StreakCalendar />
        </TabsContent>

        <TabsContent value="subjects">
          <SubjectProgressChart />
        </TabsContent>

        <TabsContent value="weekly">
          <WeeklyProgressChart />
        </TabsContent>

        <TabsContent value="activity">
          <StreakCalendar />
        </TabsContent>
      </Tabs>
    </div>
  );
}
