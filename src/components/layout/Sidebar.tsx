
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth, UserRole } from '../../context/AuthContext';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Package,
  FileText,
  Calendar,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
  isActive?: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ 
  to, 
  icon, 
  label, 
  isCollapsed,
  isActive 
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
        "hover:bg-secondary hover:text-secondary-foreground",
        isActive 
          ? "bg-primary text-primary-foreground" 
          : "text-foreground"
      )}
    >
      <div className="flex-shrink-0">{icon}</div>
      {!isCollapsed && <span className="animate-fade-in">{label}</span>}
    </NavLink>
  );
};

const Sidebar: React.FC = () => {
  const { hasPermission } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const links = [
    {
      to: '/dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: 'Dashboard',
      roles: ['admin', 'approveAuthority', 'storeUser', 'projectUser'] as UserRole[],
    },
    {
      to: '/inventory',
      icon: <Package className="h-5 w-5" />,
      label: 'Inventory',
      roles: ['admin', 'approveAuthority', 'storeUser', 'projectUser'] as UserRole[],
    },
    {
      to: '/vouchers',
      icon: <FileText className="h-5 w-5" />,
      label: 'Vouchers',
      roles: ['admin', 'approveAuthority', 'storeUser', 'projectUser'] as UserRole[],
    },
    {
      to: '/calendar',
      icon: <Calendar className="h-5 w-5" />,
      label: 'Calendar',
      roles: ['admin', 'approveAuthority', 'storeUser', 'projectUser'] as UserRole[],
    },
    {
      to: '/admin',
      icon: <Users className="h-5 w-5" />,
      label: 'User Management',
      roles: ['admin'] as UserRole[],
    },
    {
      to: '/settings',
      icon: <Settings className="h-5 w-5" />,
      label: 'Settings',
      roles: ['admin'] as UserRole[],
    },
  ];

  return (
    <aside 
      className={cn(
        "bg-white border-r h-full transition-all duration-300 flex flex-col",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className={cn(
        "h-16 flex items-center px-4 border-b",
        isCollapsed ? "justify-center" : "justify-between"
      )}>
        {!isCollapsed && (
          <div className="font-bold text-lg text-primary animate-fade-in">
            AeroSpace IMS
          </div>
        )}
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 h-8 w-8"
        >
          {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>

      <nav className="flex-1 py-6 space-y-2 px-3">
        {links.map((link) => 
          hasPermission(link.roles) && (
            <SidebarLink
              key={link.to}
              to={link.to}
              icon={link.icon}
              label={link.label}
              isCollapsed={isCollapsed}
              isActive={location.pathname === link.to}
            />
          )
        )}
      </nav>

      <div className="p-4 border-t">
        <div className={cn(
          "text-xs text-muted-foreground text-center",
          isCollapsed && "hidden"
        )}>
          Aerospace IMS v1.0.0
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
