export type Role = 'COLLAB' | 'MANAGER';
export type VehicleStatus = 'AVAILABLE' | 'IN_SERVICE' | 'MAINTENANCE';
export type Urgency = 'LOW' | 'HIGH';
export type RequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface User { 
    id: number; 
    name: string; 
    email: string; 
    role: Role; 
}


export interface Vehicle {
  id: number; 
  model: string; 
  immatriculation: string;
  status: VehicleStatus; 
  lastServiceDate: string;
}

export interface MaintenanceRequest {
  id?: number;   
  vehicleId: number; 
  description: string;
  urgency: Urgency; 
  status: RequestStatus;
}