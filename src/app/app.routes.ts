import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ShipmentListComponent } from './components/shipment-list/shipment-list.component';
import { ShipmentFormComponent } from './components/shipment-form/shipment-form.component';

export const routes: Routes = [
  { path: '',          component: HomeComponent },
  { path: 'shipments', component: ShipmentListComponent },
  { path: 'create',    component: ShipmentFormComponent },
  { path: '**',        redirectTo: '' },
];