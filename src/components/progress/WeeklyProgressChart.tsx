import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useProgress } from '@/hooks/useProgress';
import { useStudyStore } from '@/store/useStudyStore';

export function WeeklyProgressChart() {
  const { weeklyData } = useProgress();
  const { currentUser } = useStudyStore();

  const chartData = weeklyData.map(week => ({
    week: `W${week.week}`,
    completed: week.completed,
    total: week.total,
    percentage: week.percentage,
  }));

  const primaryColor = currentUser === 'ram' ? '#60A5FA' : '#A78BFA';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Weekly Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ left: 0, right: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="week" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-popover border rounded-lg p-3 shadow-lg">
                        <p className="font-medium">Week {data.week.replace('W', '')}</p>
                        <p className="text-sm text-muted-foreground">
                          {data.completed}/{data.total} tasks ({data.percentage}%)
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="completed"
                stroke={primaryColor}
                fill={primaryColor}
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
