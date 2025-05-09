import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Shipment } from '../models/shipment.model';

@Injectable({ providedIn: 'root' })
export class ShipmentService {
  private apiUrl = 'http://localhost:3000/shipments';

  constructor(private http: HttpClient) {}

  /** GET all shipments */
  getAll(): Observable<Shipment[]> {
    return this.http.get<Shipment[]>(this.apiUrl);
  }

  /** POST: create a new shipment */
  create(data: { trackingId: string; phoneNumber: string; description?: string }): Observable<Shipment> {
    return this.http.post<Shipment>(this.apiUrl, data);
  }

  /** PATCH: move to "Out for Delivery" */
  checkout(id: string): Observable<Shipment> {
    return this.http.patch<Shipment>(`${this.apiUrl}/${id}/checkout`, {});
  }

  /** PATCH: move to "Delivered" */
  deliver(id: string): Observable<Shipment> {
    return this.http.patch<Shipment>(`${this.apiUrl}/${id}/deliver`, {});
  }

  /** DELETE: remove a shipment */
  remove(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}