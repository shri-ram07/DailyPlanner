import { ExternalLink, Book, Video, FileText, Code } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RESOURCES } from '@/data/resources';
import { useStudyStore } from '@/store/useStudyStore';
import { USERS } from '@/data/users';
import type { Resource } from '@/types';

const typeIcons: Record<string, typeof Book> = {
  video: Video,
  article: FileText,
  course: Book,
  documentation: FileText,
  practice: Code,
};

const typeColors: Record<string, string> = {
  video: 'bg-red-500/20 text-red-400 border-red-500/30',
  article: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  course: 'bg-green-500/20 text-green-400 border-green-500/30',
  documentation: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  practice: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
};

function ResourceCard({ resource }: { resource: Resource }) {
  const Icon = typeIcons[resource.type] || FileText;

  return (
    <Card className="hover:border-primary/50 transition-colors">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <Icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <CardTitle className="text-base truncate">{resource.title}</CardTitle>
          </div>
          <Badge variant="outline" className={`text-xs flex-shrink-0 ${typeColors[resource.type]}`}>
            {resource.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-3">
          {resource.description}
        </p>
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
        >
          Open Resource <ExternalLink className="h-3 w-3" />
        </a>
      </CardContent>
    </Card>
  );
}

export function ResourcesPage() {
  const { currentUser } = useStudyStore();
  const user = USERS[currentUser];

  // Filter resources based on user's subjects
  const userSubjectIds = user.subjects.map(s => s.id);
  const relevantResources = RESOURCES.filter(r =>
    userSubjectIds.includes(r.subject)
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Resources</h1>
        <p className="text-muted-foreground">
          Curated learning resources for your study plan
        </p>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="flex-wrap h-auto gap-1">
          <TabsTrigger value="all">All</TabsTrigger>
          {user.subjects.map(subject => (
            <TabsTrigger key={subject.id} value={subject.id}>
              {subject.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relevantResources.map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </TabsContent>

        {user.subjects.map(subject => (
          <TabsContent key={subject.id} value={subject.id}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relevantResources
                .filter(r => r.subject === subject.id)
                .map(resource => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
