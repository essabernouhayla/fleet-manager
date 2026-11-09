import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { ForbiddenComponent } from './components/forbidden/forbidden';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list';
import { MaintenanceAdminComponent } from './components/maintenance-admin/maintenance-admin';
import { authGuard } from './guards/auth-guard';
import { managerGuard } from './guards/manager-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'vehicles', component: VehicleListComponent, canActivate: [authGuard] },
  {
    path: 'admin/maintenance',
    component: MaintenanceAdminComponent,
    canActivate: [authGuard, managerGuard]
  },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: '**', redirectTo: 'vehicles' }
];