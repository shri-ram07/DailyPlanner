import { Moon, Sun, User, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useStudyStore } from '@/store/useStudyStore';
import { USERS } from '@/data/users';
import { cn } from '@/lib/utils';

export function Header() {
  const { currentUser, setCurrentUser, theme, toggleTheme } = useStudyStore();
  const user = USERS[currentUser];

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
      currentUser === 'ram' ? 'border-blue-500/20' : 'border-purple-500/20'
    )}>
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <BookOpen className={cn(
              "h-6 w-6",
              currentUser === 'ram' ? 'text-blue-500' : 'text-purple-500'
            )} />
            <h1 className="text-xl font-bold hidden sm:block">Study Tracker</h1>
          </div>
          <span className={cn(
            "text-sm px-3 py-1 rounded-full font-medium",
            currentUser === 'ram'
              ? 'bg-blue-500/20 text-blue-400'
              : 'bg-purple-500/20 text-purple-400'
          )}>
            {user.displayName}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* User Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => setCurrentUser('ram')}
                className={cn(currentUser === 'ram' && 'bg-accent')}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  RAM (Advanced)
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setCurrentUser('ananya')}
                className={cn(currentUser === 'ananya' && 'bg-accent')}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  ANANYA SHAHI (Beginner)
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <Button variant="outline" size="icon" onClick={toggleTheme}>
            {theme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
