export interface Status {
    id: number;
    name: string;
  }
  
  export interface Shipment {
    id: string;
    trackingId: string;
    phoneNumber: string;
    description: string;
    status: Status;
    creationDate: string;   // ISO date string
    modificationDate: string; // ISO date string
  }
  