import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'vehicles', component: VehicleListComponent, canActivate: [authGuard] },
  { path: 'admin/maintenance', component: MaintenanceAdminComponent,
    canActivate: [authGuard, managerGuard] },   // l'ordre compte : auth d'abord
  { path: 'forbidden', component: ForbiddenComponent },
  { path: '**', redirectTo: 'vehicles' }
];