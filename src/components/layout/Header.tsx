
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Bell, User, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  const renderRoleBadge = () => {
    const roleColors = {
      admin: 'bg-purple-100 text-purple-800 border-purple-200',
      approveAuthority: 'bg-blue-100 text-blue-800 border-blue-200',
      storeUser: 'bg-green-100 text-green-800 border-green-200',
      projectUser: 'bg-amber-100 text-amber-800 border-amber-200',
    };

    const roleLabels = {
      admin: 'Administrator',
      approveAuthority: 'Approve Authority',
      storeUser: 'Store User',
      projectUser: 'Project User',
    };

    if (!user) return null;

    return (
      <span className={`text-xs px-2 py-1 rounded-full border ${roleColors[user.role]}`}>
        {roleLabels[user.role]}
      </span>
    );
  };

  return (
    <header className="h-16 px-6 flex items-center justify-between border-b bg-white/70 backdrop-blur-sm sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold text-gray-800">
          {user ? `Welcome, ${user.name}` : 'Aerospace Inventory System'}
        </h1>
        {renderRoleBadge()}
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
