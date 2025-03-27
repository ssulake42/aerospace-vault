
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  InventoryItem,
  VoucherRequest,
} from '../../data/dummyData';
import { useAuth } from '../../context/AuthContext';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { CalendarIcon, Loader2, MinusCircle, Plus, Trash } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface VoucherFormProps {
  availableItems: InventoryItem[];
  initialItem?: InventoryItem;
  onSubmit?: (voucher: Partial<VoucherRequest>) => void;
}

const VoucherForm: React.FC<VoucherFormProps> = ({ 
  availableItems, 
  initialItem, 
  onSubmit
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedItems, setSelectedItems] = useState<
    Array<{ item: InventoryItem; quantity: number }>
  >(initialItem ? [{ item: initialItem, quantity: 1 }] : []);
  const [projectName, setProjectName] = useState('');
  const [notes, setNotes] = useState('');
  const [voucherType, setVoucherType] = useState<'withdrawal' | 'return'>('withdrawal');
  const [expectedReturnDate, setExpectedReturnDate] = useState<Date | undefined>(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Default to 1 week from now
  );
  
  const handleAddItem = () => {
    setSelectedItems([...selectedItems, { item: availableItems[0], quantity: 1 }]);
  };
  
  const handleRemoveItem = (index: number) => {
    const newItems = [...selectedItems];
    newItems.splice(index, 1);
    setSelectedItems(newItems);
  };
  
  const handleItemChange = (index: number, itemId: string) => {
    const selectedItem = availableItems.find(item => item.id === itemId);
    if (!selectedItem) return;
    
    const newItems = [...selectedItems];
    newItems[index] = { ...newItems[index], item: selectedItem };
    setSelectedItems(newItems);
  };
  
  const handleQuantityChange = (index: number, quantity: number) => {
    const newItems = [...selectedItems];
    newItems[index] = { ...newItems[index], quantity };
    setSelectedItems(newItems);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedItems.length === 0) {
      toast.error('Please select at least one item');
      return;
    }
    
    if (!projectName) {
      toast.error('Please enter a project name');
      return;
    }
    
    setIsSubmitting(true);
    
    // Generate a random voucher number
    const voucherNum = `MV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    
    const voucherData: Partial<VoucherRequest> = {
      requestNumber: voucherNum,
      type: voucherType,
      status: 'pending',
      requestedBy: user ? {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      } : undefined,
      approvedBy: null,
      items: selectedItems.map(({ item, quantity }) => ({
        itemId: item.id,
        name: item.name,
        serialNumber: item.serialNumber,
        quantity,
      })),
      projectName,
      requestDate: new Date().toISOString().split('T')[0],
      approvalDate: null,
      issueDate: null,
      expectedReturnDate: expectedReturnDate?.toISOString().split('T')[0] || null,
      actualReturnDate: null,
      notes,
    };
    
    // Simulate API delay
    setTimeout(() => {
      if (onSubmit) {
        onSubmit(voucherData);
      } else {
        toast.success('Voucher created successfully!');
        navigate('/vouchers');
      }
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Create Material Voucher</CardTitle>
        <CardDescription>
          Request for material withdrawal or return
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <FormItem>
              <FormLabel>Voucher Type</FormLabel>
              <Select
                value={voucherType}
                onValueChange={(value) => setVoucherType(value as 'withdrawal' | 'return')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select voucher type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="withdrawal">Material Withdrawal</SelectItem>
                  <SelectItem value="return">Material Return</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
            
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <Input
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter project name"
                required
              />
            </FormItem>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <FormLabel>Selected Items</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddItem}
                  className="h-7 px-2"
                >
                  <Plus className="h-3.5 w-3.5 mr-1" />
                  Add Item
                </Button>
              </div>
              
              {selectedItems.length === 0 ? (
                <div className="text-sm text-muted-foreground border rounded-md p-4 text-center">
                  No items selected. Click 'Add Item' to select materials.
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedItems.map((selectedItem, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 border rounded-md bg-background">
                      <div className="flex-1">
                        <FormItem className="mb-3">
                          <FormLabel className="text-xs">Item</FormLabel>
                          <Select
                            value={selectedItem.item.id}
                            onValueChange={(value) => handleItemChange(index, value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select an item" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableItems.map((item) => (
                                <SelectItem key={item.id} value={item.id}>
                                  {item.name} ({item.serialNumber})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                        
                        <FormItem>
                          <FormLabel className="text-xs">Quantity</FormLabel>
                          <div className="flex items-center gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleQuantityChange(index, Math.max(1, selectedItem.quantity - 1))}
                            >
                              <MinusCircle className="h-4 w-4" />
                            </Button>
                            <Input
                              type="number"
                              min="1"
                              max={selectedItem.item.quantity}
                              value={selectedItem.quantity}
                              onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 1)}
                              className="w-16 text-center"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleQuantityChange(index, Math.min(selectedItem.item.quantity, selectedItem.quantity + 1))}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                            <span className="text-xs text-muted-foreground ml-2">
                              Available: {selectedItem.item.quantity}
                            </span>
                          </div>
                        </FormItem>
                      </div>
                      
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => handleRemoveItem(index)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {voucherType === 'withdrawal' && (
              <FormItem>
                <FormLabel>Expected Return Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !expectedReturnDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {expectedReturnDate ? (
                        format(expectedReturnDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={expectedReturnDate}
                      onSelect={setExpectedReturnDate}
                      initialFocus
                      disabled={(date) => date < new Date()}
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  When do you expect to return the materials?
                </FormDescription>
              </FormItem>
            )}
            
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <Textarea
                placeholder="Add any additional notes or requirements"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </FormItem>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting || selectedItems.length === 0}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Generate Voucher
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default VoucherForm;
