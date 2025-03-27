
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { MaintenanceEvent } from '../../data/dummyData';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronLeft, ChevronRight, Clock, ArrowRight } from 'lucide-react';
import { format, isEqual, isSameDay, isSameMonth, addMonths, subMonths } from 'date-fns';
import { cn } from '@/lib/utils';

interface MaintenanceCalendarProps {
  events: MaintenanceEvent[];
}

interface DateWithEvents {
  date: Date;
  events: MaintenanceEvent[];
}

const MaintenanceCalendar: React.FC<MaintenanceCalendarProps> = ({ events }) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedEvent, setSelectedEvent] = useState<MaintenanceEvent | null>(null);
  const [openEventDialog, setOpenEventDialog] = useState(false);
  
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  
  const eventsForDate = (date: Date) => {
    return events.filter(event => {
      const startDate = new Date(event.startDate);
      const endDate = new Date(event.endDate);
      
      // Check if the date is between start and end dates (inclusive)
      return (date >= startDate && date <= endDate);
    });
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  const getMaintenanceTypeColor = (type: string) => {
    switch (type) {
      case 'calibration':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'repair':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'inspection':
        return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  // Get current month dates with events
  const currentMonthDates: Array<DateWithEvents> = [];
  const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  
  for (let day = firstDay; day <= lastDay; day = new Date(day.setDate(day.getDate() + 1))) {
    currentMonthDates.push({
      date: new Date(day),
      events: eventsForDate(day),
    });
  }
  
  const handleEventDetails = (event: MaintenanceEvent) => {
    setSelectedEvent(event);
    setOpenEventDialog(true);
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Maintenance Calendar</CardTitle>
            <CardDescription>
              View scheduled maintenance activities
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">
              {format(currentMonth, 'MMMM yyyy')}
            </span>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={undefined}
            month={currentMonth}
            onMonthChange={setCurrentMonth}
            className="rounded-md border"
            components={{
              Day: ({ day, selected }) => {
                const date = day.date;
                const dayEvents = eventsForDate(date);
                const isCurrentMonth = isSameMonth(date, currentMonth);
                
                return (
                  <Popover>
                    <PopoverTrigger asChild>
                      <div
                        className={cn(
                          "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                          !isCurrentMonth && "text-muted-foreground",
                          "relative",
                          dayEvents.length > 0 && "font-semibold"
                        )}
                      >
                        <div className={
                          cn(
                            "flex h-9 w-9 items-center justify-center rounded-md",
                            dayEvents.length > 0 && "border border-primary/20 ring-1 ring-primary/5"
                          )
                        }>
                          <time dateTime={format(date, 'yyyy-MM-dd')}>
                            {format(date, 'd')}
                          </time>
                        </div>
                        {dayEvents.length > 0 && (
                          <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                        )}
                      </div>
                    </PopoverTrigger>
                    {dayEvents.length > 0 && (
                      <PopoverContent className="w-80 p-0" align="start">
                        <div className="p-4 border-b">
                          <h3 className="font-medium">{format(date, 'EEEE, MMMM d, yyyy')}</h3>
                          <p className="text-sm text-muted-foreground">
                            {dayEvents.length} maintenance {dayEvents.length === 1 ? 'event' : 'events'}
                          </p>
                        </div>
                        <ScrollArea className="h-[240px] p-4">
                          <div className="space-y-3">
                            {dayEvents.map((event) => (
                              <div 
                                key={event.id} 
                                className="border rounded-md p-3 hover:bg-muted/50 cursor-pointer transition-colors"
                                onClick={() => handleEventDetails(event)}
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <div className="font-medium">{event.itemName}</div>
                                  <Badge variant="outline" className={cn(getStatusColor(event.status))}>
                                    {event.status}
                                  </Badge>
                                </div>
                                <div className="text-sm flex items-center text-muted-foreground mb-2">
                                  <Clock className="mr-1 h-3 w-3" />
                                  {format(new Date(event.startDate), 'MMM d')} 
                                  <ArrowRight className="mx-1 h-3 w-3" /> 
                                  {format(new Date(event.endDate), 'MMM d')}
                                </div>
                                <Badge variant="outline" className={cn(getMaintenanceTypeColor(event.maintenanceType))}>
                                  {event.maintenanceType}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </PopoverContent>
                    )}
                  </Popover>
                );
              },
            }}
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Maintenance</CardTitle>
          <CardDescription>
            Next 5 scheduled maintenance activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px]">
            <div className="space-y-3">
              {events
                .filter(event => new Date(event.startDate) >= new Date())
                .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
                .slice(0, 5)
                .map(event => (
                  <div 
                    key={event.id} 
                    className="border rounded-md p-3 hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => handleEventDetails(event)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium">{event.itemName}</div>
                      <Badge variant="outline" className={cn(getStatusColor(event.status))}>
                        {event.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      {event.serialNumber}
                    </div>
                    <div className="flex justify-between items-center">
                      <Badge variant="outline" className={cn(getMaintenanceTypeColor(event.maintenanceType))}>
                        {event.maintenanceType}
                      </Badge>
                      <div className="text-sm flex items-center text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        {format(new Date(event.startDate), 'MMM d')}
                      </div>
                    </div>
                  </div>
                ))}
              
              {events.filter(event => new Date(event.startDate) >= new Date()).length === 0 && (
                <div className="text-center py-6 text-muted-foreground">
                  No upcoming maintenance events scheduled
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
      
      <Dialog open={openEventDialog} onOpenChange={setOpenEventDialog}>
        {selectedEvent && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Maintenance Details</DialogTitle>
              <DialogDescription>
                Information about this maintenance event
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{selectedEvent.itemName}</h3>
                  <p className="text-sm text-muted-foreground">{selectedEvent.serialNumber}</p>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className={cn(getStatusColor(selectedEvent.status))}>
                    {selectedEvent.status}
                  </Badge>
                  <Badge variant="outline" className={cn(getMaintenanceTypeColor(selectedEvent.maintenanceType))}>
                    {selectedEvent.maintenanceType}
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <p className="text-sm font-medium">Start Date</p>
                  <p className="text-sm">{format(new Date(selectedEvent.startDate), 'PPP')}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">End Date</p>
                  <p className="text-sm">{format(new Date(selectedEvent.endDate), 'PPP')}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Technician</p>
                  <p className="text-sm">{selectedEvent.technician}</p>
                </div>
              </div>
              
              <div className="pt-2">
                <p className="text-sm font-medium">Notes</p>
                <p className="text-sm mt-1 p-3 bg-muted rounded-md">{selectedEvent.notes}</p>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default MaintenanceCalendar;
