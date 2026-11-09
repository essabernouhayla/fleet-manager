import { Component, inject, OnInit, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { FleetService } from '../../services/fleet';
import { MaintenanceRequest, Vehicle } from '../../models/models';

@Component({
  selector: 'app-maintenance-admin',
  imports: [],
  templateUrl: './maintenance-admin.html',
  styleUrl: './maintenance-admin.css'
})
export class MaintenanceAdminComponent implements OnInit {
  private fleet = inject(FleetService);

  pending = signal<MaintenanceRequest[]>([]);
  vehicles = signal<Vehicle[]>([]);
  loading = signal(true);
  busyId = signal<number | null>(null);
  error = signal('');

  ngOnInit() { this.load(); }

  load() {
    forkJoin({ p: this.fleet.getPending(), v: this.fleet.getVehicles() }).subscribe({
      next: ({ p, v }) => {
        this.pending.set(p);
        this.vehicles.set(v);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Impossible de charger les données. Vérifiez que json-server est lancé.');
        this.loading.set(false);
      }
    });
  }

  vehicleOf(id: number) {
    return this.vehicles().find(v => v.id === id);
  }

  decide(r: MaintenanceRequest, d: 'APPROVED' | 'REJECTED') {
    if (this.busyId() !== null) return;

    this.busyId.set(r.id!);
    this.error.set('');

    this.fleet.processRequest(r, d).subscribe({
      next: () => {
        this.busyId.set(null);
        this.load();
      },
      error: () => {
        this.busyId.set(null);
        this.error.set("L'opération a échoué. Réessayez.");
      }
    });
  }
}