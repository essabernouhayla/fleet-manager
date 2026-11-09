import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { FleetService } from '../../services/fleet';
import { MaintenanceRequest, Vehicle } from '../../models/models';
import { VehicleStatsComponent } from '../vehicle-stats/vehicle-stats';
import { VehicleCardComponent } from '../vehicle-card/vehicle-card';

@Component({
  selector: 'app-vehicle-list',
  imports: [VehicleStatsComponent, VehicleCardComponent],
  templateUrl: './vehicle-list.html',
  styleUrl: './vehicle-list.css'
})
export class VehicleListComponent implements OnInit {
  private fleet = inject(FleetService);

  vehicles = signal<Vehicle[]>([]);
  requests = signal<MaintenanceRequest[]>([]);
  search = signal('');

  filtered = computed(() =>
    this.vehicles().filter(v =>
      (v.model + v.immatriculation).toLowerCase().includes(this.search().toLowerCase())
    )
  );

  stats = computed(() => ({
    totalVehicles: this.vehicles().length,
    totalRequests: this.requests().length,
    available:   this.vehicles().filter(v => v.status === 'AVAILABLE').length,
    inService:   this.vehicles().filter(v => v.status === 'IN_SERVICE').length,
    maintenance: this.vehicles().filter(v => v.status === 'MAINTENANCE').length,
  }));

  ngOnInit() { this.load(); }

  load() {
    forkJoin({ v: this.fleet.getVehicles(), r: this.fleet.getRequests() })
      .subscribe(({ v, r }) => {
        this.vehicles.set(v);
        this.requests.set(r);
      });
  }
}