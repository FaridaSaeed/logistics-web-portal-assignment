import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShipmentService } from '../../services/shipment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shipment-form',
  templateUrl: './shipment-form.component.html',
  styleUrls: ['./shipment-form.component.scss']
})
export class ShipmentFormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private shipmentService: ShipmentService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      trackingId: ['', Validators.required],
      phoneNumber: ['', [
        Validators.required,
        Validators.pattern(/^(0\d{10}|\+20\d{10})$/)  // Accepts local or international format
      ]],
      description: [''],
    });
  }

  onSubmit(): void {
    console.log('Submit triggered', this.form.value);
  
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
  
    const formValue = { ...this.form.value };
  
    // Convert '01012345678' to '+201012345678'
    if (formValue.phoneNumber.startsWith('0')) {
      formValue.phoneNumber = '+20' + formValue.phoneNumber.slice(1);
    }
  
    this.shipmentService.create(formValue).subscribe({
      next: () => this.router.navigate(['/shipments']),
      error: err => {
        console.error('Create failed', err);
  
        let message = 'Failed to create shipment.';
        const backendMessage = err.error?.message;
  
        if (backendMessage) {
          if (Array.isArray(backendMessage)) {
            message += ' ' + backendMessage.join(' ');
          } else if (typeof backendMessage === 'string') {
            message += ' ' + backendMessage;
          }
        }
  
        alert(message);
      }
    });
  }
}
