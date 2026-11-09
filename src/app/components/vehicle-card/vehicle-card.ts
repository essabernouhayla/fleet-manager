import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FleetService } from '../../services/fleet';
import { Vehicle } from '../../models/models';

@Component({
  selector: 'app-vehicle-card',
  imports: [ReactiveFormsModule],
  templateUrl: './vehicle-card.html',
  styleUrl: './vehicle-card.css'
})
export class VehicleCardComponent {
  @Input({ required: true }) vehicle!: Vehicle;
  @Output() reported = new EventEmitter<void>();

  private fleet = inject(FleetService);
  showForm = false;

  form = new FormGroup({
    description: new FormControl('', Validators.required),
    urgency: new FormControl<'LOW' | 'HIGH'>('LOW'),
  });

  get isUrgent(): boolean {
    const limit = new Date();
    limit.setMonth(limit.getMonth() - 12);
    return new Date(this.vehicle.lastServiceDate) < limit;
  }

  submit() {
    if (this.form.invalid) return;
    this.fleet.reportBreakdown({
      vehicleId: this.vehicle.id,
      description: this.form.value.description!,
      urgency: this.form.value.urgency!,
      status: 'PENDING',
    }).subscribe(() => {
      this.showForm = false;
      this.form.reset({ urgency: 'LOW' });
      this.reported.emit();
    });
  }
}