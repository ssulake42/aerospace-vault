
import React from 'react';
import Layout from '../components/layout/Layout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  User,
  UserPlus,
  Edit,
  Trash,
  Search,
  X,
  CheckCircle,
  ShieldAlert,
  Package,
  FileText,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Admin = () => {
  // Dummy users for demonstration
  const users = [
    {
      id: '1',
      name: 'Admin User',
      email: 'admin@aerospace.com',
      role: 'admin',
      status: 'active',
    },
    {
      id: '2',
      name: 'Approve Authority',
      email: 'approver@aerospace.com',
      role: 'approveAuthority',
      status: 'active',
    },
    {
      id: '3',
      name: 'Store Manager',
      email: 'store@aerospace.com',
      role: 'storeUser',
      status: 'active',
    },
    {
      id: '4',
      name: 'Project Engineer',
      email: 'project@aerospace.com',
      role: 'projectUser',
      status: 'active',
    },
    {
      id: '5',
      name: 'Jane Smith',
      email: 'jane.smith@aerospace.com',
      role: 'projectUser',
      status: 'inactive',
    },
  ];

  const getRoleBadge = (role) => {
    const styles = {
      admin: 'bg-purple-100 text-purple-800 border-purple-200',
      approveAuthority: 'bg-blue-100 text-blue-800 border-blue-200',
      storeUser: 'bg-green-100 text-green-800 border-green-200',
      projectUser: 'bg-amber-100 text-amber-800 border-amber-200',
    };

    const labels = {
      admin: 'Administrator',
      approveAuthority: 'Approve Authority',
      storeUser: 'Store User',
      projectUser: 'Project User',
    };

    return (
      <Badge variant="outline" className={cn(styles[role])}>
        {labels[role]}
      </Badge>
    );
  };

  const getStatusBadge = (status) => {
    return (
      <Badge
        variant="outline"
        className={
          status === 'active'
            ? 'bg-green-100 text-green-800 border-green-200'
            : 'bg-red-100 text-red-800 border-red-200'
        }
      >
        {status}
      </Badge>
    );
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin':
        return <ShieldAlert className="h-4 w-4 text-purple-600" />;
      case 'approveAuthority':
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
      case 'storeUser':
        return <Package className="h-4 w-4 text-green-600" />;
      case 'projectUser':
        return <FileText className="h-4 w-4 text-amber-600" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  return (
    <Layout requiredRoles={['admin']}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">User Management</h1>

          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>System Users</CardTitle>
            <CardDescription>
              Manage user accounts and access permissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-6">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search users..."
                  className="pl-8"
                />
              </div>

              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Administrators</SelectItem>
                  <SelectItem value="approveAuthority">
                    Approve Authorities
                  </SelectItem>
                  <SelectItem value="storeUser">Store Users</SelectItem>
                  <SelectItem value="projectUser">Project Users</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id} className="group">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {getRoleIcon(user.role)}
                          {user.name}
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive/90"
                          >
                            <Trash className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Add New User</CardTitle>
              <CardDescription>
                Create a new user account in the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter full name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <Select>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrator</SelectItem>
                      <SelectItem value="approveAuthority">
                        Approve Authority
                      </SelectItem>
                      <SelectItem value="storeUser">Store User</SelectItem>
                      <SelectItem value="projectUser">Project User</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                  />
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" className="mr-2">
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Create User
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Role Permissions</CardTitle>
              <CardDescription>
                Configure access control for different user roles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="h-4 w-4 text-purple-600" />
                      <span className="font-medium">Administrator</span>
                    </div>
                    <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
                      Full Access
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">Approve Authority</span>
                    </div>
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                      Approval Rights
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-green-600" />
                      <span className="font-medium">Store User</span>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                      Inventory Management
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-amber-600" />
                      <span className="font-medium">Project User</span>
                    </div>
                    <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                      Limited Access
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Edit className="mr-2 h-4 w-4" />
                Manage Permissions
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
