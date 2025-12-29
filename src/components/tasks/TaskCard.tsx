import { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, MessageSquare } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { useStudyStore } from '@/store/useStudyStore';
import type { DailyTask } from '@/types';

interface TaskCardProps {
  task: DailyTask & { completed: boolean; notes: string };
}

const subjectConfig: Record<string, { bg: string; text: string; border: string }> = {
  genai: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30' },
  mlops: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30' },
  dsa: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' },
  python: { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/30' },
  mldl: { bg: 'bg-teal-500/20', text: 'text-teal-400', border: 'border-teal-500/30' },
};

const subjectNames: Record<string, string> = {
  genai: 'GenAI',
  mlops: 'MLOps',
  dsa: 'DSA',
  python: 'Python',
  mldl: 'ML/DL',
};

export function TaskCard({ task }: TaskCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { toggleTaskCompletion, updateTaskNote } = useStudyStore();

  const config = subjectConfig[task.subject] || subjectConfig.dsa;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className={cn(
        "border rounded-lg p-4 transition-all",
        task.completed && "bg-green-500/5 border-green-500/20"
      )}>
        <div className="flex items-start gap-3">
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => toggleTaskCompletion(task.id)}
            className="mt-1"
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge
                variant="outline"
                className={cn("text-xs", config.bg, config.text, config.border)}
              >
                {subjectNames[task.subject]}
              </Badge>
              {task.leetcode && (
                <Badge variant="secondary" className="text-xs">
                  LC: {task.leetcode}
                </Badge>
              )}
            </div>

            <h4 className={cn(
              "font-medium mt-1",
              task.completed && "line-through text-muted-foreground"
            )}>
              {task.topic}
            </h4>

            <p className="text-sm text-muted-foreground mt-1">
              {task.resource}
            </p>
          </div>

          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent className="mt-4">
          <div className="space-y-3 pl-7">
            {/* LeetCode Link */}
            {task.leetcode && (
              <a
                href={`https://leetcode.com/problems/`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
              >
                Open on LeetCode <ExternalLink className="h-3 w-3" />
              </a>
            )}

            {/* Notes Section */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Notes
              </label>
              <Textarea
                placeholder="Add your notes here..."
                value={task.notes}
                onChange={(e) => updateTaskNote(task.id, e.target.value)}
                className="min-h-[80px]"
              />
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
