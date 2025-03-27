
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { voucherRequests, inventoryItems } from '../data/dummyData';
import { useAuth } from '../context/AuthContext';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { FileText, MoreHorizontal, CheckCircle, XCircle, FileOutput, Eye, ChevronLeft, ChevronRight, Clock, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

const Vouchers = () => {
  const [page, setPage] = useState(1);
  const { user, hasPermission } = useAuth();
  const navigate = useNavigate();
  
  const itemsPerPage = 10;
  
  const filterVouchersByRole = () => {
    if (!user) return [];
    
    // Admin and approveAuthority can see all vouchers
    if (user.role === 'admin' || user.role === 'approveAuthority') {
      return voucherRequests;
    }
    
    // Store user can see approved and issued vouchers
    if (user.role === 'storeUser') {
      return voucherRequests.filter(
        voucher => ['approved', 'issued', 'completed'].includes(voucher.status)
      );
    }
    
    // Project user can only see their own vouchers
    return voucherRequests.filter(
      voucher => voucher.requestedBy.id === user.id
    );
  };
  
  const filteredVouchers = filterVouchersByRole();
  const pendingVouchers = filteredVouchers.filter(v => v.status === 'pending');
  const approvedVouchers = filteredVouchers.filter(v => v.status === 'approved');
  const issuedVouchers = filteredVouchers.filter(v => v.status === 'issued');
  const completedVouchers = filteredVouchers.filter(v => ['completed', 'rejected'].includes(v.status));
  
  const getPaginatedVouchers = (voucherList) => {
    const start = (page - 1) * itemsPerPage;
    return voucherList.slice(start, start + itemsPerPage);
  };
  
  const totalPages = (voucherList) => Math.ceil(voucherList.length / itemsPerPage);
  
  const handleApprove = (voucherId) => {
    toast.success('Voucher approved successfully');
  };
  
  const handleReject = (voucherId) => {
    toast.success('Voucher rejected successfully');
  };
  
  const handleIssue = (voucherId) => {
    toast.success('Materials issued successfully');
  };
  
  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      approved: 'bg-blue-100 text-blue-800 border-blue-200',
      rejected: 'bg-red-100 text-red-800 border-red-200',
      issued: 'bg-purple-100 text-purple-800 border-purple-200',
      completed: 'bg-green-100 text-green-800 border-green-200',
    };
    
    return (
      <Badge variant="outline" className={cn(styles[status])}>
        {status}
      </Badge>
    );
  };
  
  const getTypeBadge = (type) => {
    return (
      <Badge variant="outline" className={
        type === 'withdrawal'
          ? 'bg-blue-100 text-blue-800 border-blue-200'
          : 'bg-green-100 text-green-800 border-green-200'
      }>
        {type}
      </Badge>
    );
  };
  
  const renderVoucherTable = (vouchers) => {
    const displayedVouchers = getPaginatedVouchers(vouchers);
    
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Voucher Number</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedVouchers.length > 0 ? (
              displayedVouchers.map((voucher) => (
                <TableRow key={voucher.id} className="group">
                  <TableCell className="font-medium">{voucher.requestNumber}</TableCell>
                  <TableCell>{voucher.projectName}</TableCell>
                  <TableCell>{getTypeBadge(voucher.type)}</TableCell>
                  <TableCell>{voucher.requestDate}</TableCell>
                  <TableCell>{getStatusBadge(voucher.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => navigate(`/vouchers/${voucher.id}`)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        
                        {voucher.status === 'pending' && hasPermission(['approveAuthority', 'admin']) && (
                          <>
                            <DropdownMenuItem onClick={() => handleApprove(voucher.id)}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleReject(voucher.id)}>
                              <XCircle className="mr-2 h-4 w-4" />
                              Reject
                            </DropdownMenuItem>
                          </>
                        )}
                        
                        {voucher.status === 'approved' && hasPermission(['storeUser', 'admin']) && (
                          <DropdownMenuItem onClick={() => handleIssue(voucher.id)}>
                            <FileOutput className="mr-2 h-4 w-4" />
                            Issue Materials
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No vouchers found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    );
  };
  
  const renderPagination = (voucherList) => {
    const pages = totalPages(voucherList);
    
    if (pages <= 1) return null;
    
    return (
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous Page</span>
        </Button>
        <div className="text-sm text-muted-foreground">
          Page {page} of {pages}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(p => Math.min(pages, p + 1))}
          disabled={page === pages}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next Page</span>
        </Button>
      </div>
    );
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Material Vouchers</h1>
          
          {hasPermission(['projectUser', 'admin']) && (
            <Button onClick={() => navigate('/vouchers/new')}>
              <FileText className="mr-2 h-4 w-4" />
              New Voucher
            </Button>
          )}
        </div>
        
        <div className="bg-white rounded-lg border shadow-sm">
          <Tabs defaultValue="pending" className="p-6">
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="pending" className="flex gap-2 items-center">
                  <Clock className="h-4 w-4" />
                  Pending
                  {pendingVouchers.length > 0 && (
                    <Badge variant="secondary" className="ml-1">
                      {pendingVouchers.length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="approved" className="flex gap-2 items-center">
                  <CheckCircle className="h-4 w-4" />
                  Approved
                  {approvedVouchers.length > 0 && (
                    <Badge variant="secondary" className="ml-1">
                      {approvedVouchers.length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="issued" className="flex gap-2 items-center">
                  <FileOutput className="h-4 w-4" />
                  Issued
                  {issuedVouchers.length > 0 && (
                    <Badge variant="secondary" className="ml-1">
                      {issuedVouchers.length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="completed" className="flex gap-2 items-center">
                  <FileText className="h-4 w-4" />
                  Completed
                </TabsTrigger>
              </TabsList>
              
              <div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
            
            <TabsContent value="pending" className="space-y-4">
              {renderVoucherTable(pendingVouchers)}
              {renderPagination(pendingVouchers)}
            </TabsContent>
            
            <TabsContent value="approved" className="space-y-4">
              {renderVoucherTable(approvedVouchers)}
              {renderPagination(approvedVouchers)}
            </TabsContent>
            
            <TabsContent value="issued" className="space-y-4">
              {renderVoucherTable(issuedVouchers)}
              {renderPagination(issuedVouchers)}
            </TabsContent>
            
            <TabsContent value="completed" className="space-y-4">
              {renderVoucherTable(completedVouchers)}
              {renderPagination(completedVouchers)}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Vouchers;
