import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShipmentService } from '../../services/shipment.service';
import { Shipment } from '../../models/shipment.model';

@Component({
  selector: 'app-shipment-list',
  templateUrl: './shipment-list.component.html',
  styleUrls: ['./shipment-list.component.scss'],
})
export class ShipmentListComponent implements OnInit {
  shipments: Shipment[] = [];
  displayedColumns = ['trackingId', 'phoneNumber', 'status', 'actions'];

  constructor(
    private router: Router,
    private shipmentService: ShipmentService,
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.shipmentService.getAll().subscribe({
      next: data => this.shipments = data,
      error: err => console.error('Could not load shipments', err)
    });
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  chipColor(status: string) {
    return status === 'Delivered' ? 'primary'
      : status === 'Out for Delivery' ? 'accent'
      : '';
  }

  onCheckout(s: Shipment) {
    this.shipmentService.checkout(s.id).subscribe({ next: () => this.load() });
  }

  onDeliver(s: Shipment) {
    this.shipmentService.deliver(s.id).subscribe({ next: () => this.load() });
  }

  onDelete(s: Shipment) {
    this.shipmentService.remove(s.id).subscribe({ next: () => this.load() });
  }
}