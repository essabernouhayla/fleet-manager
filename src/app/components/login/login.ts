import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  private fleet = inject(FleetService);
  private auth = inject(AuthService);
  private router = inject(Router);
  users$ = this.fleet.getUsers();

  choose(u: User) { this.auth.login(u); this.router.navigate(['/vehicles']); }
}
