import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useProgress } from '@/hooks/useProgress';
import { useStudyStore } from '@/store/useStudyStore';
import { USERS } from '@/data/users';

export function SubjectProgressChart() {
  const { subjectProgress } = useProgress();
  const { currentUser } = useStudyStore();
  const user = USERS[currentUser];

  const data = user.subjects.map(subject => ({
    name: subject.name,
    id: subject.id,
    color: subject.color,
    completed: subjectProgress[subject.id]?.completed || 0,
    total: subjectProgress[subject.id]?.total || 0,
    percentage: subjectProgress[subject.id]?.percentage || 0,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Subject Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ left: 10, right: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} />
              <YAxis
                dataKey="name"
                type="category"
                width={100}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-popover border rounded-lg p-3 shadow-lg">
                        <p className="font-medium">{data.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {data.completed}/{data.total} completed ({data.percentage}%)
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="percentage" radius={[0, 4, 4, 0]}>
                {data.map((entry) => (
                  <Cell key={entry.id} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
