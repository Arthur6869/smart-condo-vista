
export type UserRole = "resident" | "manager" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Property {
  id: string;
  name: string;
  address: string;
  units: number;
}

export interface Unit {
  id: string;
  propertyId: string;
  block: string;
  number: string;
  residents: Resident[];
}

export interface Resident {
  id: string;
  name: string;
  email: string;
  phone: string;
  unitId: string;
  isOwner: boolean;
}

export interface Vehicle {
  id: string;
  residentId: string;
  model: string;
  plate: string;
  color: string;
}

export interface Pet {
  id: string;
  residentId: string;
  name: string;
  species: string;
  breed: string;
}

export interface MaintenanceStatus {
  id: string;
  name: string;
  color: string;
}

export interface Maintenance {
  id: string;
  propertyId: string;
  title: string;
  description: string;
  statusId: string;
  reportDate: string;
  estimatedDate?: string;
  completionDate?: string;
  cost?: number;
  assignedTo?: string;
}

export interface CommonArea {
  id: string;
  propertyId: string;
  name: string;
  capacity: number;
  rules: string;
}

export interface Reservation {
  id: string;
  commonAreaId: string;
  residentId: string;
  startTime: string;
  endTime: string;
  guestCount: number;
  status: "pending" | "approved" | "rejected";
}

export interface FinancialSummary {
  totalRevenue: number;
  totalExpenses: number;
  balance: number;
  defaultRate: number;
}

export interface FinancialTransaction {
  id: string;
  propertyId: string;
  date: string;
  amount: number;
  type: "revenue" | "expense";
  category: string;
  description: string;
}

export interface MaintenanceSummary {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  averageCost: number;
}

export interface ReservationSummary {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  mostPopularArea: string;
}

export interface StatsData {
  financial: FinancialSummary;
  maintenance: MaintenanceSummary;
  reservations: ReservationSummary;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
  }[];
}
