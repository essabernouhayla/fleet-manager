import { CanActivateFn } from '@angular/router';

export const managerGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.isManager() ? true : router.createUrlTree(['/forbidden']);
};
