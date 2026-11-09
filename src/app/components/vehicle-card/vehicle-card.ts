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
  sending = false;
  error = '';

  form = new FormGroup({
    description: new FormControl('', Validators.required),
    urgency: new FormControl<'LOW' | 'HIGH'>('LOW'),
  });

  get isUrgent(): boolean {
    const limit = new Date();
    limit.setMonth(limit.getMonth() - 12);
    return new Date(this.vehicle.lastServiceDate) < limit;
  }

  toggle() {
    this.showForm = !this.showForm;
    this.error = '';
  }

  cancel() {
    this.showForm = false;
    this.error = '';
    this.form.reset({ description: '', urgency: 'LOW' });
  }

  submit() {
    if (this.form.invalid || this.sending) return;

    this.sending = true;
    this.error = '';

    this.fleet.reportBreakdown({
      vehicleId: this.vehicle.id,
      description: this.form.value.description!,
      urgency: this.form.value.urgency!,
      status: 'PENDING',
    }).subscribe({
      next: () => {
        this.sending = false;
        this.cancel();
        this.reported.emit();
      },
      error: () => {
        this.sending = false;
        this.error = "Échec de l'envoi. Vérifiez que json-server est lancé.";
      }
    });
  }
}