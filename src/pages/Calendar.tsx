
import React from 'react';
import Layout from '../components/layout/Layout';
import MaintenanceCalendar from '../components/calendar/MaintenanceCalendar';
import { maintenanceEvents } from '../data/dummyData';

const Calendar = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Maintenance Calendar</h1>
        </div>
        
        <div className="bg-white rounded-lg border shadow-sm">
          <div className="p-6">
            <MaintenanceCalendar events={maintenanceEvents} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Calendar;
