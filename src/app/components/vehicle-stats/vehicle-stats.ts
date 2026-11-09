import { Component, Input } from '@angular/core';

export interface Stats {
  totalVehicles: number;
  totalRequests: number;
  available: number;
  inService: number;
  maintenance: number;
}

@Component({
  selector: 'app-vehicle-stats',
  imports: [],
  templateUrl: './vehicle-stats.html',
  styleUrl: './vehicle-stats.css'
})
export class VehicleStatsComponent {
  @Input({ required: true }) stats!: Stats;
}