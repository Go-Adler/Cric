import { CanActivateFn, Router } from '@angular/router';

export const logInGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  if (token) {
    return true;
  } else {
    const router = new Router();
    return router.createUrlTree(['/user/log-in']);
  }
};
