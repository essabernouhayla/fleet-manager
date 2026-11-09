import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { FleetService } from '../../services/fleet';
import { AuthService } from '../../services/auth';
import { User } from '../../models/models';

@Component({
  selector: 'app-login',
  imports: [AsyncPipe],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  private fleet = inject(FleetService);
  private auth = inject(AuthService);
  private router = inject(Router);

  users$ = this.fleet.getUsers();

  choose(u: User) {
    this.auth.login(u);
    this.router.navigate(['/vehicles']);
  }
}