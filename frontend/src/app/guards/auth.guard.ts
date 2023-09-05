import { inject } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const token = localStorage.getItem('token');
  const router = inject(Router)

  if (token) {
    return true;
  } else {
    router.navigateByUrl('/user/log-in');

    return false;
  }
};
