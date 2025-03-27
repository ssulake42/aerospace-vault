
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import VoucherForm from '../components/vouchers/VoucherForm';
import { inventoryItems, voucherRequests } from '../data/dummyData';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const NewVoucher = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialItem = location.state?.initialItem;
  
  // Filter only available items
  const availableItems = inventoryItems.filter(
    item => item.status === 'available' && item.quantity > 0
  );
  
  const handleSubmit = (voucherData) => {
    // In a real application, this would send data to the server
    // For this demo, we'll just show a success message and redirect
    
    toast.success('Voucher created successfully!');
    
    // Simulate redirect after API call
    setTimeout(() => {
      navigate('/vouchers');
    }, 1000);
  };
  
  return (
    <Layout requiredRoles={['admin', 'projectUser']}>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">New Material Voucher</h1>
        </div>
        
        <VoucherForm 
          availableItems={availableItems}
          initialItem={initialItem}
          onSubmit={handleSubmit}
        />
      </div>
    </Layout>
  );
};

export default NewVoucher;
