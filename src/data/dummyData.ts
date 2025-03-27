
import { UserRole } from '../context/AuthContext';

// Types
export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  serialNumber: string;
  status: 'available' | 'assigned' | 'maintenance' | 'retired';
  location: string;
  lastCalibration: string | null;
  nextCalibration: string | null;
  purchaseDate: string;
  price: number;
  manufacturer: string;
  description: string;
  quantity: number;
  assignedTo: string | null;
  imageUrl?: string;
}

export interface VoucherRequest {
  id: string;
  requestNumber: string;
  type: 'withdrawal' | 'return';
  status: 'pending' | 'approved' | 'rejected' | 'issued' | 'completed';
  requestedBy: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  };
  approvedBy: {
    id: string;
    name: string;
  } | null;
  items: {
    itemId: string;
    quantity: number;
    name: string;
    serialNumber: string;
  }[];
  projectName: string;
  requestDate: string;
  approvalDate: string | null;
  issueDate: string | null;
  expectedReturnDate: string | null;
  actualReturnDate: string | null;
  notes: string;
}

export interface MaintenanceEvent {
  id: string;
  itemId: string;
  itemName: string;
  serialNumber: string;
  maintenanceType: 'calibration' | 'repair' | 'inspection';
  status: 'scheduled' | 'in-progress' | 'completed';
  startDate: string;
  endDate: string;
  notes: string;
  technician: string;
}

// Dummy inventory items
export const inventoryItems: InventoryItem[] = [
  {
    id: '1',
    name: 'Pressure Transducer - High Altitude',
    category: 'Pressure Sensors',
    serialNumber: 'PT-HA-10293',
    status: 'available',
    location: 'Main Storage A3',
    lastCalibration: '2023-06-15',
    nextCalibration: '2023-12-15',
    purchaseDate: '2022-03-10',
    price: 3599.99,
    manufacturer: 'SensorTech Aerospace',
    description: 'High-precision pressure transducer designed for high-altitude aerospace applications. Operates in temperature range -65°C to 150°C.',
    quantity: 15,
    assignedTo: null
  },
  {
    id: '2',
    name: 'Temperature Sensor Array - Cryogenic',
    category: 'Temperature Sensors',
    serialNumber: 'TSA-CR-58392',
    status: 'assigned',
    location: 'Project Lab B',
    lastCalibration: '2023-07-22',
    nextCalibration: '2024-01-22',
    purchaseDate: '2022-05-15',
    price: 4850.00,
    manufacturer: 'CryoSense Systems',
    description: 'Array of 6 temperature sensors for cryogenic fuel monitoring. Accurate to within 0.001°C at extreme low temperatures.',
    quantity: 8,
    assignedTo: 'Propulsion Team Alpha'
  },
  {
    id: '3',
    name: 'Vibration Analyzer - Structural',
    category: 'Vibration Sensors',
    serialNumber: 'VA-ST-76201',
    status: 'maintenance',
    location: 'Calibration Lab',
    lastCalibration: '2023-01-30',
    nextCalibration: '2023-09-30',
    purchaseDate: '2021-11-05',
    price: 12750.50,
    manufacturer: 'AeroVibe Technologies',
    description: 'Advanced vibration analyzer for structural integrity testing. Frequency range 0.1Hz to 25kHz with digital signal processing.',
    quantity: 4,
    assignedTo: null
  },
  {
    id: '4',
    name: 'Accelerometer - High G',
    category: 'Acceleration Sensors',
    serialNumber: 'ACC-HG-19482',
    status: 'available',
    location: 'Main Storage B2',
    lastCalibration: '2023-05-18',
    nextCalibration: '2023-11-18',
    purchaseDate: '2022-02-28',
    price: 2399.99,
    manufacturer: 'DynaMetrics Inc.',
    description: 'High G-force accelerometer rated up to 500G. Designed for rocket launch and impact testing scenarios.',
    quantity: 12,
    assignedTo: null
  },
  {
    id: '5',
    name: 'Flow Rate Sensor - Propellant',
    category: 'Flow Sensors',
    serialNumber: 'FRS-PR-29481',
    status: 'assigned',
    location: 'Propulsion Test Bay',
    lastCalibration: '2023-04-10',
    nextCalibration: '2023-10-10',
    purchaseDate: '2022-01-15',
    price: 7850.75,
    manufacturer: 'FluidDynamix',
    description: 'High-precision flow rate sensor for propellant systems. Compatible with LOX, RP-1, and hypergolic propellants.',
    quantity: 6,
    assignedTo: 'Engine Test Team'
  },
  {
    id: '6',
    name: 'Radiation Detector - Cosmic',
    category: 'Radiation Sensors',
    serialNumber: 'RD-CO-73910',
    status: 'available',
    location: 'Main Storage C1',
    lastCalibration: '2023-06-28',
    nextCalibration: '2023-12-28',
    purchaseDate: '2021-12-05',
    price: 9250.00,
    manufacturer: 'CosmicRay Systems',
    description: 'Sensitive radiation detector for cosmic ray and space radiation monitoring. Includes real-time data logging capabilities.',
    quantity: 5,
    assignedTo: null
  },
  {
    id: '7',
    name: 'Altimeter - Digital Barometric',
    category: 'Altitude Sensors',
    serialNumber: 'ALT-DB-62019',
    status: 'assigned',
    location: 'Avionics Integration Lab',
    lastCalibration: '2023-03-15',
    nextCalibration: '2023-09-15',
    purchaseDate: '2022-04-10',
    price: 1899.50,
    manufacturer: 'AltitudeTech',
    description: 'Digital barometric altimeter with integrated temperature compensation. Range from -1,000ft to 100,000ft MSL.',
    quantity: 10,
    assignedTo: 'Avionics Team'
  },
  {
    id: '8',
    name: 'Oxygen Sensor - Cabin Environmental',
    category: 'Gas Sensors',
    serialNumber: 'OS-CE-84721',
    status: 'available',
    location: 'Main Storage A1',
    lastCalibration: '2023-07-05',
    nextCalibration: '2024-01-05',
    purchaseDate: '2022-06-20',
    price: 3450.25,
    manufacturer: 'AtmoSense',
    description: 'Precision oxygen sensor for spacecraft cabin environmental monitoring. Response time < 50ms with redundant sensing elements.',
    quantity: 20,
    assignedTo: null
  },
  {
    id: '9',
    name: 'Strain Gauge Array - Composite Materials',
    category: 'Strain Sensors',
    serialNumber: 'SGA-CM-38291',
    status: 'maintenance',
    location: 'Materials Testing Lab',
    lastCalibration: '2023-02-10',
    nextCalibration: '2023-08-10',
    purchaseDate: '2021-10-15',
    price: 5750.00,
    manufacturer: 'StrainTech Aerospace',
    description: 'Array of 12 strain gauges specifically calibrated for composite material testing. Includes signal conditioning hardware.',
    quantity: 7,
    assignedTo: null
  },
  {
    id: '10',
    name: 'Gyroscopic Stabilization System',
    category: 'Navigation Sensors',
    serialNumber: 'GSS-NA-91042',
    status: 'assigned',
    location: 'Navigation Systems Lab',
    lastCalibration: '2023-05-25',
    nextCalibration: '2023-11-25',
    purchaseDate: '2022-03-01',
    price: 14750.99,
    manufacturer: 'StableOrbit Systems',
    description: 'Three-axis gyroscopic stabilization system for satellite and spacecraft attitude control. Includes redundant sensors and control electronics.',
    quantity: 3,
    assignedTo: 'Attitude Control Team'
  }
];

// Dummy voucher requests
export const voucherRequests: VoucherRequest[] = [
  {
    id: '1',
    requestNumber: 'MV-2023-0001',
    type: 'withdrawal',
    status: 'approved',
    requestedBy: {
      id: '4',
      name: 'Project Engineer',
      email: 'project@aerospace.com',
      role: 'projectUser'
    },
    approvedBy: {
      id: '2',
      name: 'Approve Authority',
    },
    items: [
      {
        itemId: '1',
        quantity: 2,
        name: 'Pressure Transducer - High Altitude',
        serialNumber: 'PT-HA-10293'
      },
      {
        itemId: '4',
        quantity: 1,
        name: 'Accelerometer - High G',
        serialNumber: 'ACC-HG-19482'
      }
    ],
    projectName: 'Satellite Launch Vehicle Testing',
    requestDate: '2023-08-10',
    approvalDate: '2023-08-11',
    issueDate: null,
    expectedReturnDate: '2023-09-10',
    actualReturnDate: null,
    notes: 'Required for upper stage testing'
  },
  {
    id: '2',
    requestNumber: 'MV-2023-0002',
    type: 'withdrawal',
    status: 'issued',
    requestedBy: {
      id: '4',
      name: 'Project Engineer',
      email: 'project@aerospace.com',
      role: 'projectUser'
    },
    approvedBy: {
      id: '2',
      name: 'Approve Authority',
    },
    items: [
      {
        itemId: '6',
        quantity: 1,
        name: 'Radiation Detector - Cosmic',
        serialNumber: 'RD-CO-73910'
      }
    ],
    projectName: 'Radiation Shielding Evaluation',
    requestDate: '2023-08-05',
    approvalDate: '2023-08-06',
    issueDate: '2023-08-07',
    expectedReturnDate: '2023-09-05',
    actualReturnDate: null,
    notes: 'Handle with care, calibrated for specific shielding tests'
  },
  {
    id: '3',
    requestNumber: 'MV-2023-0003',
    type: 'return',
    status: 'completed',
    requestedBy: {
      id: '4',
      name: 'Project Engineer',
      email: 'project@aerospace.com',
      role: 'projectUser'
    },
    approvedBy: {
      id: '2',
      name: 'Approve Authority',
    },
    items: [
      {
        itemId: '8',
        quantity: 2,
        name: 'Oxygen Sensor - Cabin Environmental',
        serialNumber: 'OS-CE-84721'
      }
    ],
    projectName: 'Life Support System Testing',
    requestDate: '2023-07-15',
    approvalDate: '2023-07-15',
    issueDate: '2023-07-16',
    expectedReturnDate: '2023-08-15',
    actualReturnDate: '2023-08-10',
    notes: 'Completed testing early, all items in good condition'
  },
  {
    id: '4',
    requestNumber: 'MV-2023-0004',
    type: 'withdrawal',
    status: 'pending',
    requestedBy: {
      id: '4',
      name: 'Project Engineer',
      email: 'project@aerospace.com',
      role: 'projectUser'
    },
    approvedBy: null,
    items: [
      {
        itemId: '5',
        quantity: 1,
        name: 'Flow Rate Sensor - Propellant',
        serialNumber: 'FRS-PR-29481'
      },
      {
        itemId: '10',
        quantity: 1,
        name: 'Gyroscopic Stabilization System',
        serialNumber: 'GSS-NA-91042'
      }
    ],
    projectName: 'Propulsion Integration Testing',
    requestDate: '2023-09-01',
    approvalDate: null,
    issueDate: null,
    expectedReturnDate: '2023-10-01',
    actualReturnDate: null,
    notes: 'Urgent requirement for upcoming test'
  },
  {
    id: '5',
    requestNumber: 'MV-2023-0005',
    type: 'withdrawal',
    status: 'rejected',
    requestedBy: {
      id: '4',
      name: 'Project Engineer',
      email: 'project@aerospace.com',
      role: 'projectUser'
    },
    approvedBy: {
      id: '2',
      name: 'Approve Authority',
    },
    items: [
      {
        itemId: '3',
        quantity: 2,
        name: 'Vibration Analyzer - Structural',
        serialNumber: 'VA-ST-76201'
      }
    ],
    projectName: 'Wing Structure Analysis',
    requestDate: '2023-08-20',
    approvalDate: '2023-08-21',
    issueDate: null,
    expectedReturnDate: '2023-09-20',
    actualReturnDate: null,
    notes: 'Rejected due to all units being in maintenance'
  }
];

// Dummy maintenance events
export const maintenanceEvents: MaintenanceEvent[] = [
  {
    id: '1',
    itemId: '3',
    itemName: 'Vibration Analyzer - Structural',
    serialNumber: 'VA-ST-76201',
    maintenanceType: 'calibration',
    status: 'in-progress',
    startDate: '2023-09-02',
    endDate: '2023-09-08',
    notes: 'Regular calibration and firmware update',
    technician: 'Michael Chen'
  },
  {
    id: '2',
    itemId: '9',
    itemName: 'Strain Gauge Array - Composite Materials',
    serialNumber: 'SGA-CM-38291',
    maintenanceType: 'repair',
    status: 'scheduled',
    startDate: '2023-09-10',
    endDate: '2023-09-15',
    notes: 'Channel 5 and 6 need replacement',
    technician: 'Sarah Johnson'
  },
  {
    id: '3',
    itemId: '2',
    itemName: 'Temperature Sensor Array - Cryogenic',
    serialNumber: 'TSA-CR-58392',
    maintenanceType: 'inspection',
    status: 'scheduled',
    startDate: '2023-09-20',
    endDate: '2023-09-21',
    notes: 'Quarterly inspection and certification',
    technician: 'Robert Garcia'
  },
  {
    id: '4',
    itemId: '5',
    itemName: 'Flow Rate Sensor - Propellant',
    serialNumber: 'FRS-PR-29481',
    maintenanceType: 'calibration',
    status: 'scheduled',
    startDate: '2023-10-05',
    endDate: '2023-10-07',
    notes: 'Calibration for hypergolic propellants',
    technician: 'Jennifer Patel'
  },
  {
    id: '5',
    itemId: '1',
    itemName: 'Pressure Transducer - High Altitude',
    serialNumber: 'PT-HA-10293',
    maintenanceType: 'calibration',
    status: 'completed',
    startDate: '2023-08-15',
    endDate: '2023-08-17',
    notes: 'Recalibrated to new aerospace standards',
    technician: 'David Wilson'
  }
];

// Inventory statistics
export const getInventoryStats = () => {
  const totalItems = inventoryItems.reduce((sum, item) => sum + item.quantity, 0);
  const availableItems = inventoryItems
    .filter(item => item.status === 'available')
    .reduce((sum, item) => sum + item.quantity, 0);
  const assignedItems = inventoryItems
    .filter(item => item.status === 'assigned')
    .reduce((sum, item) => sum + item.quantity, 0);
  const maintenanceItems = inventoryItems
    .filter(item => item.status === 'maintenance')
    .reduce((sum, item) => sum + item.quantity, 0);

  return {
    totalItems,
    availableItems,
    assignedItems,
    maintenanceItems,
    categoryDistribution: [
      { name: 'Pressure Sensors', value: 15 },
      { name: 'Temperature Sensors', value: 8 },
      { name: 'Vibration Sensors', value: 4 },
      { name: 'Acceleration Sensors', value: 12 },
      { name: 'Flow Sensors', value: 6 },
      { name: 'Radiation Sensors', value: 5 },
      { name: 'Altitude Sensors', value: 10 },
      { name: 'Gas Sensors', value: 20 },
      { name: 'Strain Sensors', value: 7 },
      { name: 'Navigation Sensors', value: 3 },
    ],
    statusDistribution: [
      { name: 'Available', value: availableItems },
      { name: 'Assigned', value: assignedItems },
      { name: 'Maintenance', value: maintenanceItems },
    ]
  };
};

// Request statistics
export const getRequestStats = () => {
  const pendingRequests = voucherRequests.filter(req => req.status === 'pending').length;
  const approvedRequests = voucherRequests.filter(req => req.status === 'approved').length;
  const issuedRequests = voucherRequests.filter(req => req.status === 'issued').length;
  const completedRequests = voucherRequests.filter(req => req.status === 'completed').length;
  const rejectedRequests = voucherRequests.filter(req => req.status === 'rejected').length;

  return {
    pendingRequests,
    approvedRequests,
    issuedRequests,
    completedRequests,
    rejectedRequests,
    totalRequests: voucherRequests.length,
    requestDistribution: [
      { name: 'Pending', value: pendingRequests },
      { name: 'Approved', value: approvedRequests },
      { name: 'Issued', value: issuedRequests },
      { name: 'Completed', value: completedRequests },
      { name: 'Rejected', value: rejectedRequests },
    ],
    requestTypesDistribution: [
      { name: 'Withdrawal', value: voucherRequests.filter(req => req.type === 'withdrawal').length },
      { name: 'Return', value: voucherRequests.filter(req => req.type === 'return').length },
    ]
  };
};
