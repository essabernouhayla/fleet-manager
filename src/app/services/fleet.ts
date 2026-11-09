import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { concatMap, map, of } from 'rxjs';
import { MaintenanceRequest, User, Vehicle } from '../models/models';

@Injectable({ providedIn: 'root' })
export class FleetService {
  private http = inject(HttpClient);
  private api = 'http://localhost:3000';

  getUsers()    { return this.http.get<User[]>(`${this.api}/users`); }
  getVehicles() { return this.http.get<Vehicle[]>(`${this.api}/vehicles`); }
  getRequests() { return this.http.get<MaintenanceRequest[]>(`${this.api}/maintenance_requests`); }
  getPending()  { return this.http.get<MaintenanceRequest[]>(`${this.api}/maintenance_requests?status=PENDING`); }

  // TRAITEMENT 2 : POST puis (si HIGH) PATCH, dans un seul flux
  reportBreakdown(req: MaintenanceRequest) {
    return this.http.post<MaintenanceRequest>(`${this.api}/maintenance_requests`, req).pipe(
      concatMap(created =>
        req.urgency === 'HIGH'
          ? this.http.patch(`${this.api}/vehicles/${req.vehicleId}`, { status: 'MAINTENANCE' })
              .pipe(map(() => created))
          : of(created)
      )
    );
  }

  // TRAITEMENT 3 : rejet simple, approbation = 2 requêtes
  processRequest(r: MaintenanceRequest, decision: 'APPROVED' | 'REJECTED') {
    const updateRequest$ = this.http.patch(`${this.api}/maintenance_requests/${r.id}`, { status: decision });
    if (decision === 'REJECTED') return updateRequest$;
    return updateRequest$.pipe(
      concatMap(() => this.http.patch(`${this.api}/vehicles/${r.vehicleId}`, { status: 'IN_SERVICE' }))
    );
  }
}