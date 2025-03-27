
import React from 'react';
import { Button } from '@/components/ui/button';
import { VoucherRequest } from '../../data/dummyData';
import { Download, Printer } from 'lucide-react';

interface PDFGeneratorProps {
  voucherData: Partial<VoucherRequest>;
}

const PDFGenerator: React.FC<PDFGeneratorProps> = ({ voucherData }) => {
  const handleDownload = () => {
    // In a real application, this would generate a PDF file
    // For demonstration, we'll just show a toast message
    alert('PDF Downloaded. In a real application, this would generate and download a PDF file.');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end gap-2 print:hidden">
        <Button variant="outline" onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" />
          Print
        </Button>
        <Button onClick={handleDownload}>
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </div>

      <div className="border rounded-lg p-6 bg-white" id="pdf-content">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-1">Material {voucherData.type === 'withdrawal' ? 'Withdrawal' : 'Return'} Voucher</h1>
            <p className="text-muted-foreground text-sm">Voucher Number: {voucherData.requestNumber}</p>
          </div>
          <div className="text-right">
            <p className="font-bold">Aerospace Inventory Management System</p>
            <p className="text-sm text-muted-foreground">123 Aviation Way</p>
            <p className="text-sm text-muted-foreground">Houston, TX 77001</p>
            <p className="text-sm text-muted-foreground">Tel: (123) 456-7890</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <h2 className="text-sm font-semibold uppercase text-muted-foreground mb-2">Request Information</h2>
            <div className="space-y-1">
              <p><span className="font-medium">Project Name:</span> {voucherData.projectName}</p>
              <p><span className="font-medium">Requested By:</span> {voucherData.requestedBy?.name}</p>
              <p><span className="font-medium">Request Date:</span> {voucherData.requestDate}</p>
              {voucherData.type === 'withdrawal' && (
                <p><span className="font-medium">Expected Return:</span> {voucherData.expectedReturnDate || 'Not specified'}</p>
              )}
            </div>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase text-muted-foreground mb-2">Status Information</h2>
            <div className="space-y-1">
              <p><span className="font-medium">Status:</span> {voucherData.status?.toUpperCase()}</p>
              <p><span className="font-medium">Approved By:</span> {voucherData.approvedBy?.name || 'Pending Approval'}</p>
              <p><span className="font-medium">Approval Date:</span> {voucherData.approvalDate || 'Pending'}</p>
              <p><span className="font-medium">Issue Date:</span> {voucherData.issueDate || 'Pending'}</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-sm font-semibold uppercase text-muted-foreground mb-2">Items</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted">
                <th className="text-left py-2 px-3 border-b">Item Name</th>
                <th className="text-left py-2 px-3 border-b">Serial Number</th>
                <th className="text-right py-2 px-3 border-b">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {voucherData.items?.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-muted/30'}>
                  <td className="py-2 px-3 border-b">{item.name}</td>
                  <td className="py-2 px-3 border-b">{item.serialNumber}</td>
                  <td className="py-2 px-3 text-right border-b">{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {voucherData.notes && (
          <div className="mb-8">
            <h2 className="text-sm font-semibold uppercase text-muted-foreground mb-2">Notes</h2>
            <p className="text-sm p-3 bg-muted/20 rounded">{voucherData.notes}</p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-6 mt-12">
          <div className="border-t pt-4">
            <p className="text-center">Requested By</p>
            <p className="text-center text-sm text-muted-foreground mt-6">{voucherData.requestedBy?.name}</p>
          </div>
          <div className="border-t pt-4">
            <p className="text-center">Approved By</p>
            <p className="text-center text-sm text-muted-foreground mt-6">{voucherData.approvedBy?.name || '________________'}</p>
          </div>
          <div className="border-t pt-4">
            <p className="text-center">Issued By</p>
            <p className="text-center text-sm text-muted-foreground mt-6">________________</p>
          </div>
        </div>

        <div className="mt-12 pt-4 border-t text-center text-xs text-muted-foreground">
          <p>This document was automatically generated on {new Date().toLocaleString()}</p>
          <p>Aerospace Inventory Management System &copy; {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
};

export default PDFGenerator;
