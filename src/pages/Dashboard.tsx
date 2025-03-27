import React from 'react';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/layout/Layout';
import { 
  getInventoryStats, 
  getRequestStats,
  voucherRequests,
  inventoryItems,
  maintenanceEvents
} from '../data/dummyData';
import StatsCard from '../components/dashboard/StatsCard';
import DashboardCard from '../components/dashboard/DashboardCard';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import {
  Package,
  BadgeCheck,
  FileText,
  ClipboardList,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Wrench, // Replaced Tool with Wrench icon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Dashboard = () => {
  const { user } = useAuth();
  const inventoryStats = getInventoryStats();
  const requestStats = getRequestStats();
  
  const COLORS = ['#4f46e5', '#22c55e', '#f59e0b', '#ef4444'];
  
  const pendingVouchers = voucherRequests.filter(req => 
    req.status === 'pending'
  ).slice(0, 5);
  
  const recentMaintenanceEvents = maintenanceEvents
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
    .slice(0, 3);
  
  const criticalItems = inventoryItems
    .filter(item => item.quantity <= 3)
    .slice(0, 5);
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Inventory Items"
            value={inventoryStats.totalItems}
            description="Across all categories"
            icon={<Package />}
          />
          <StatsCard
            title="Available Items"
            value={inventoryStats.availableItems}
            description={`${Math.round((inventoryStats.availableItems / inventoryStats.totalItems) * 100)}% of total inventory`}
            icon={<BadgeCheck />}
            trend={{
              value: 12,
              isPositive: true,
            }}
          />
          <StatsCard
            title="Open Requests"
            value={requestStats.pendingRequests + requestStats.approvedRequests}
            description="Pending & approved vouchers"
            icon={<FileText />}
          />
          <StatsCard
            title="Items in Maintenance"
            value={inventoryStats.maintenanceItems}
            description="Currently under service"
            icon={<Wrench />} {/* Changed from Tool to Wrench icon */}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard
            title="Inventory Distribution"
            description="By category"
            actionLink="/inventory"
            className="lg:col-span-1"
          >
            <div className="h-[240px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={inventoryStats.categoryDistribution.slice(0, 4)}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {inventoryStats.categoryDistribution.slice(0, 4).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name) => [`${value} items`, name]}
                    contentStyle={{ 
                      borderRadius: '0.5rem', 
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {inventoryStats.categoryDistribution.slice(0, 4).map((category, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="truncate">{category.name}</span>
                </div>
              ))}
            </div>
          </DashboardCard>
          
          <DashboardCard
            title="Request Status"
            description="Current voucher distribution"
            actionLink="/vouchers"
            className="lg:col-span-1"
          >
            <div className="h-[240px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={requestStats.requestDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {requestStats.requestDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name) => [`${value} requests`, name]}
                    contentStyle={{ 
                      borderRadius: '0.5rem', 
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-3">
              {requestStats.requestDistribution.map((status, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="truncate">{status.name}</span>
                </div>
              ))}
            </div>
          </DashboardCard>
          
          <DashboardCard
            title="Pending Approval"
            description="Awaiting authorization"
            actionLink="/vouchers"
            className="lg:col-span-1"
          >
            <ScrollArea className="h-[300px] pr-4">
              {pendingVouchers.length > 0 ? (
                <div className="space-y-3">
                  {pendingVouchers.map((voucher) => (
                    <div key={voucher.id} className="border rounded-md p-3 flex flex-col">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium">{voucher.requestNumber}</div>
                          <div className="text-sm text-muted-foreground">
                            {voucher.projectName}
                          </div>
                        </div>
                        <Badge variant="outline" className={
                          voucher.type === 'withdrawal'
                            ? 'bg-blue-100 text-blue-800 border-blue-200'
                            : 'bg-green-100 text-green-800 border-green-200'
                        }>
                          {voucher.type}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">
                        {voucher.requestDate} • {voucher.items.length} items
                      </div>
                      <div className="mt-2 flex justify-end">
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/vouchers/${voucher.id}`}>
                            View
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <ClipboardList className="h-12 w-12 text-muted-foreground/40 mb-2" />
                  <p className="text-muted-foreground text-sm">No pending vouchers</p>
                </div>
              )}
            </ScrollArea>
          </DashboardCard>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DashboardCard
            title="Low Stock Items"
            description="Inventory at critical levels"
            actionLink="/inventory"
            className="lg:col-span-1"
          >
            {criticalItems.length > 0 ? (
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-3">
                  {criticalItems.map((item) => (
                    <div key={item.id} className="flex items-start border rounded-md p-3">
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <div className="flex gap-4 mt-1">
                          <div className="text-sm">
                            <span className="text-muted-foreground">Serial: </span>
                            {item.serialNumber}
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Category: </span>
                            {item.category}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <Badge variant={item.quantity <= 1 ? "destructive" : "outline"} className={
                          item.quantity <= 1 
                            ? '' 
                            : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                        }>
                          {item.quantity} left
                        </Badge>
                        <Button variant="ghost" size="sm" className="h-8 mt-1" asChild>
                          <Link to={`/inventory`}>
                            Details
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="flex flex-col items-center justify-center h-[200px]">
                <BadgeCheck className="h-12 w-12 text-muted-foreground/40 mb-2" />
                <p className="text-muted-foreground text-sm">All items at adequate stock levels</p>
              </div>
            )}
          </DashboardCard>
          
          <DashboardCard
            title="Recent Maintenance"
            description="Latest service activities"
            actionLink="/calendar"
            className="lg:col-span-1"
          >
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-3">
                {recentMaintenanceEvents.map((event) => (
                  <div key={event.id} className="border rounded-md p-3">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{event.itemName}</h4>
                      <Badge variant="outline" className={cn(
                        event.status === 'scheduled' 
                          ? 'bg-blue-100 text-blue-800 border-blue-200'
                          : event.status === 'in-progress'
                            ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                            : 'bg-green-100 text-green-800 border-green-200'
                      )}>
                        {event.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {event.serialNumber}
                    </p>
                    <div className="flex justify-between items-center">
                      <Badge variant="outline" className={cn(
                        event.maintenanceType === 'calibration'
                          ? 'bg-purple-100 text-purple-800 border-purple-200'
                          : event.maintenanceType === 'repair'
                            ? 'bg-red-100 text-red-800 border-red-200'
                            : 'bg-cyan-100 text-cyan-800 border-cyan-200'
                      )}>
                        {event.maintenanceType}
                      </Badge>
                      <div className="text-xs text-muted-foreground">
                        {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </DashboardCard>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
