import { Component, inject, OnInit, signal } from '@angular/core';
import { FleetService } from '../../services/fleet';
import { MaintenanceRequest } from '../../models/models';

@Component({
  selector: 'app-maintenance-admin',
  imports: [],
  templateUrl: './maintenance-admin.html',
  styleUrl: './maintenance-admin.css'
})
export class MaintenanceAdminComponent implements OnInit {
  private fleet = inject(FleetService);
  pending = signal<MaintenanceRequest[]>([]);

  ngOnInit() { this.load(); }

  load() {
    this.fleet.getPending().subscribe(r => this.pending.set(r));
  }

  decide(r: MaintenanceRequest, d: 'APPROVED' | 'REJECTED') {
    this.fleet.processRequest(r, d).subscribe(() => this.load());
  }
}