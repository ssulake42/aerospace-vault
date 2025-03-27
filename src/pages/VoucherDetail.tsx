
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import PDFGenerator from '../components/vouchers/PDFGenerator';
import { voucherRequests } from '../data/dummyData';
import { useAuth } from '../context/AuthContext';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { 
  ArrowLeft, 
  FileText, 
  CheckCircle, 
  XCircle, 
  FileOutput,
  Loader2,
  Clock,
  CalendarIcon,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const VoucherDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { hasPermission } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmationDialog, setConfirmationDialog] = useState<{
    open: boolean;
    action: 'approve' | 'reject' | 'issue' | null;
    title: string;
    description: string;
  }>({
    open: false,
    action: null,
    title: '',
    description: '',
  });
  
  const voucher = voucherRequests.find(v => v.id === id);
  
  if (!voucher) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-96">
          <FileText className="h-16 w-16 text-muted-foreground/40 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Voucher Not Found</h2>
          <p className="text-muted-foreground mb-4">
            The voucher you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate('/vouchers')}>
            Back to Vouchers
          </Button>
        </div>
      </Layout>
    );
  }
  
  const handleActionConfirm = () => {
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      switch (confirmationDialog.action) {
        case 'approve':
          toast.success('Voucher approved successfully');
          break;
        case 'reject':
          toast.success('Voucher rejected successfully');
          break;
        case 'issue':
          toast.success('Materials issued successfully');
          break;
      }
      
      setIsProcessing(false);
      setConfirmationDialog({ ...confirmationDialog, open: false });
      
      // In a real app, we would update the voucher status here
      // For demo, just navigate back to the vouchers list
      setTimeout(() => navigate('/vouchers'), 1000);
    }, 1500);
  };
  
  const openConfirmDialog = (action: 'approve' | 'reject' | 'issue') => {
    let title = '';
    let description = '';
    
    switch (action) {
      case 'approve':
        title = 'Approve Voucher';
        description = 'This will approve the voucher and allow materials to be issued. Are you sure?';
        break;
      case 'reject':
        title = 'Reject Voucher';
        description = 'This will reject the voucher request. Are you sure?';
        break;
      case 'issue':
        title = 'Issue Materials';
        description = 'This will issue the materials and update inventory levels. Are you sure?';
        break;
    }
    
    setConfirmationDialog({
      open: true,
      action,
      title,
      description,
    });
  };
  
  const getActionButtons = () => {
    if (voucher.status === 'pending' && hasPermission(['approveAuthority', 'admin'])) {
      return (
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => openConfirmDialog('reject')}>
            <XCircle className="mr-2 h-4 w-4" />
            Reject
          </Button>
          <Button onClick={() => openConfirmDialog('approve')}>
            <CheckCircle className="mr-2 h-4 w-4" />
            Approve
          </Button>
        </div>
      );
    }
    
    if (voucher.status === 'approved' && hasPermission(['storeUser', 'admin'])) {
      return (
        <Button onClick={() => openConfirmDialog('issue')}>
          <FileOutput className="mr-2 h-4 w-4" />
          Issue Materials
        </Button>
      );
    }
    
    return null;
  };
  
  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      approved: 'bg-blue-100 text-blue-800 border-blue-200',
      rejected: 'bg-red-100 text-red-800 border-red-200',
      issued: 'bg-purple-100 text-purple-800 border-purple-200',
      completed: 'bg-green-100 text-green-800 border-green-200',
    };
    
    return (
      <Badge variant="outline" className={cn('uppercase text-xs font-semibold', styles[status as keyof typeof styles])}>
        {status}
      </Badge>
    );
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate('/vouchers')}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">{voucher.requestNumber}</h1>
                {getStatusBadge(voucher.status)}
              </div>
              <p className="text-muted-foreground">
                {voucher.type === 'withdrawal' ? 'Material Withdrawal' : 'Material Return'} Voucher
              </p>
            </div>
          </div>
          
          {getActionButtons()}
        </div>
        
        <div className="bg-white rounded-lg border shadow-sm">
          <Tabs defaultValue="details">
            <div className="border-b px-6 py-3">
              <TabsList>
                <TabsTrigger value="details" className="flex gap-2 items-center">
                  <FileText className="h-4 w-4" />
                  Voucher Details
                </TabsTrigger>
                <TabsTrigger value="pdf" className="flex gap-2 items-center">
                  <FileText className="h-4 w-4" />
                  PDF Preview
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="details" className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Request Information</h3>
                  <dl className="grid grid-cols-2 gap-3 text-sm">
                    <div className="space-y-1">
                      <dt className="text-muted-foreground">Voucher Type</dt>
                      <dd className="font-medium capitalize">{voucher.type}</dd>
                    </div>
                    <div className="space-y-1">
                      <dt className="text-muted-foreground">Project Name</dt>
                      <dd className="font-medium">{voucher.projectName}</dd>
                    </div>
                    <div className="space-y-1">
                      <dt className="text-muted-foreground">Requested By</dt>
                      <dd className="font-medium">{voucher.requestedBy.name}</dd>
                    </div>
                    <div className="space-y-1">
                      <dt className="text-muted-foreground">Request Date</dt>
                      <dd className="font-medium">{voucher.requestDate}</dd>
                    </div>
                    <div className="space-y-1">
                      <dt className="text-muted-foreground">Status</dt>
                      <dd>{getStatusBadge(voucher.status)}</dd>
                    </div>
                    {voucher.expectedReturnDate && (
                      <div className="space-y-1">
                        <dt className="text-muted-foreground">Expected Return</dt>
                        <dd className="font-medium flex items-center">
                          <CalendarIcon className="mr-1 h-3 w-3" />
                          {voucher.expectedReturnDate}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Approval Information</h3>
                  <dl className="grid grid-cols-2 gap-3 text-sm">
                    <div className="space-y-1">
                      <dt className="text-muted-foreground">Approved By</dt>
                      <dd className="font-medium">
                        {voucher.approvedBy?.name || (
                          <span className="flex items-center text-yellow-600">
                            <Clock className="mr-1 h-3 w-3" />
                            Pending Approval
                          </span>
                        )}
                      </dd>
                    </div>
                    <div className="space-y-1">
                      <dt className="text-muted-foreground">Approval Date</dt>
                      <dd className="font-medium">
                        {voucher.approvalDate || 'Pending'}
                      </dd>
                    </div>
                    <div className="space-y-1">
                      <dt className="text-muted-foreground">Issued By</dt>
                      <dd className="font-medium">
                        {voucher.issueDate ? 'Store User' : 'Pending'}
                      </dd>
                    </div>
                    <div className="space-y-1">
                      <dt className="text-muted-foreground">Issue Date</dt>
                      <dd className="font-medium">
                        {voucher.issueDate || 'Pending'}
                      </dd>
                    </div>
                    {voucher.type === 'return' && (
                      <div className="space-y-1">
                        <dt className="text-muted-foreground">Return Date</dt>
                        <dd className="font-medium">
                          {voucher.actualReturnDate || 'Pending'}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Items Requested</h3>
                <div className="overflow-hidden rounded-md border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="px-4 py-3 text-left font-medium">Item Name</th>
                        <th className="px-4 py-3 text-left font-medium">Serial Number</th>
                        <th className="px-4 py-3 text-left font-medium">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {voucher.items.map((item, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-muted/30'}>
                          <td className="px-4 py-3">{item.name}</td>
                          <td className="px-4 py-3">{item.serialNumber}</td>
                          <td className="px-4 py-3">{item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {voucher.notes && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-2">Notes</h3>
                  <div className="border rounded-md p-4 bg-muted/20">
                    {voucher.notes}
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="pdf" className="p-6">
              <PDFGenerator voucherData={voucher} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <AlertDialog open={confirmationDialog.open} onOpenChange={(open) => setConfirmationDialog({ ...confirmationDialog, open })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{confirmationDialog.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {confirmationDialog.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isProcessing}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleActionConfirm} disabled={isProcessing}>
              {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

export default VoucherDetail;
