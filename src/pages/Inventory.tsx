
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import InventoryTable from '../components/inventory/InventoryTable';
import StatsCard from '../components/dashboard/StatsCard';
import { inventoryItems, getInventoryStats } from '../data/dummyData';
import { Package, ArchiveRestore, ArchiveX, Archive } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

const Inventory = () => {
  const navigate = useNavigate();
  const { hasPermission } = useAuth();
  const inventoryStats = getInventoryStats();
  
  const handleCreateVoucher = (item) => {
    navigate('/vouchers/new', { state: { initialItem: item } });
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Inventory Management</h1>
          <div className="flex gap-2">
            {hasPermission(['admin', 'storeUser']) && (
              <Button variant="outline">
                <Archive className="mr-2 h-4 w-4" />
                Export
              </Button>
            )}
            {hasPermission(['admin', 'storeUser']) && (
              <Button>
                <Package className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Items"
            value={inventoryStats.totalItems}
            icon={<Package className="h-4 w-4" />}
          />
          <StatsCard
            title="Available"
            value={inventoryStats.availableItems}
            icon={<Archive className="h-4 w-4" />}
          />
          <StatsCard
            title="Assigned"
            value={inventoryStats.assignedItems}
            icon={<ArchiveRestore className="h-4 w-4" />}
          />
          <StatsCard
            title="In Maintenance"
            value={inventoryStats.maintenanceItems}
            icon={<ArchiveX className="h-4 w-4" />}
          />
        </div>
        
        <div className="bg-white rounded-lg border shadow-sm">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6">Inventory Items</h2>
            <InventoryTable 
              items={inventoryItems} 
              onVoucher={hasPermission(['projectUser', 'admin']) ? handleCreateVoucher : undefined}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Inventory;
