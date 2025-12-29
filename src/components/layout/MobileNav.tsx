import { Link, useLocation } from 'react-router-dom';
import { Calendar, Home, BookOpen, BarChart3, Folder } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useStudyStore } from '@/store/useStudyStore';

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Calendar, label: 'Calendar', path: '/calendar' },
  { icon: BookOpen, label: 'Today', path: '/today' },
  { icon: BarChart3, label: 'Progress', path: '/progress' },
  { icon: Folder, label: 'Resources', path: '/resources' },
];

export function MobileNav() {
  const location = useLocation();
  const { currentUser } = useStudyStore();

  const activeColor = currentUser === 'ram' ? 'text-blue-400' : 'text-purple-400';

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t z-50 pb-safe">
      <div className="flex justify-around py-2">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-lg transition-colors min-w-[60px]",
                isActive ? activeColor : 'text-muted-foreground'
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
