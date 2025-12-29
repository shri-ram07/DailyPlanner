import { Link, useLocation } from 'react-router-dom';
import { Calendar, Home, BookOpen, BarChart3, Folder } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useStudyStore } from '@/store/useStudyStore';

const navItems = [
  { icon: Home, label: 'Dashboard', path: '/' },
  { icon: Calendar, label: 'Calendar', path: '/calendar' },
  { icon: BookOpen, label: 'Today', path: '/today' },
  { icon: BarChart3, label: 'Progress', path: '/progress' },
  { icon: Folder, label: 'Resources', path: '/resources' },
];

export function Sidebar() {
  const location = useLocation();
  const { currentUser } = useStudyStore();

  const activeColor = currentUser === 'ram'
    ? 'bg-blue-500/20 text-blue-400 border-blue-500'
    : 'bg-purple-500/20 text-purple-400 border-purple-500';

  return (
    <aside className="hidden md:flex w-64 flex-col border-r bg-card">
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 border border-transparent",
                isActive
                  ? activeColor
                  : 'hover:bg-muted text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer info */}
      <div className="p-4 border-t">
        <div className="text-xs text-muted-foreground">
          <p>Dec 30, 2025 - Mar 28, 2026</p>
          <p>84 Days | 12 Weeks</p>
        </div>
      </div>
    </aside>
  );
}
