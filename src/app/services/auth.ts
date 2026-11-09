import { Injectable, signal } from '@angular/core';
import { User } from '../models/models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user = signal<User | null>(JSON.parse(localStorage.getItem('user') ?? 'null'));
  user = this._user.asReadonly();

  login(u: User) {
    localStorage.setItem('user', JSON.stringify(u));
    this._user.set(u);
  }
  logout() {
    localStorage.removeItem('user');
    this._user.set(null);
  }
  isLoggedIn() { return this._user() !== null; }
  isManager()  { return this._user()?.role === 'MANAGER'; }
}